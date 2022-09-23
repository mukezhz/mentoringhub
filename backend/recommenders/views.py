import numpy as np
import pandas as pd
import ast
from sklearn.feature_extraction.text import CountVectorizer
from nltk.stem.porter import PorterStemmer
from sklearn.metrics.pairwise import cosine_similarity


from users.models import CustomUser, UserProfile
from mentorships.models import Mentorship


def convert(text):
    L = []
    for i in ast.literal_eval(text):
        L.append(i["name"])
    return L


def collapse(L):
    L1 = []
    for i in L:
        L1.append(i.replace(" ", ""))
    return L1


def init():
    users = CustomUser.objects.values()
    profiles = UserProfile.objects.values()
    mentorships = Mentorship.objects.values()
    df_users = pd.DataFrame(users)
    df_profiles = pd.DataFrame(profiles)
    df_mentorships = pd.DataFrame(mentorships)
    df_users_mentorships = df_users.merge(df_profiles, on="id")
    return df_users_mentorships


def cleaner(df):
    required_columns = df[
        [
            "id",
            "email",
            "role",
            "gender",
            "city",
            "country",
            "about_user",
            "profession",
            "languages",
            "interests",
            "skills",
        ]
    ]
    return required_columns.dropna(inplace=False)


def create_tags(cleaned_df):
    cleaned_df["about_user"] = cleaned_df["about_user"].apply(lambda x: x.split())
    cleaned_df["profession"] = cleaned_df["profession"].apply(lambda x: x.split())
    cleaned_df["role"] = cleaned_df["role"].apply(lambda x: x.split(" "))
    cleaned_df["skills"] = cleaned_df["skills"].apply(collapse)
    cleaned_df["languages"] = cleaned_df["languages"].apply(collapse)
    cleaned_df["interests"] = cleaned_df["interests"].apply(collapse)
    cleaned_df["country"] = cleaned_df["country"].apply(lambda x: x.split())
    cleaned_df["city"] = cleaned_df["city"].apply(lambda x: x.split())
    cleaned_df["gender"] = cleaned_df["gender"].apply(lambda x: x.split())

    cleaned_df["tags"] = (
        cleaned_df["about_user"]
        + cleaned_df["role"]
        + cleaned_df["profession"]
        + cleaned_df["skills"]
        + cleaned_df["languages"]
        + cleaned_df["interests"]
        + cleaned_df["country"]
        + cleaned_df["city"]
        + cleaned_df["gender"]
    )
    return cleaned_df


def remove_unnecessary_column(df):
    return df.drop(
        columns=[
            "about_user",
            "role",
            "profession",
            "skills",
            "languages",
            "interests",
            "country",
            "city",
            "gender",
        ]
    )


def convert_tags_to_string(df):
    df["tags"] = df["tags"].apply(lambda x: " ".join(x))
    return df


def vectorized_tags(df):
    cv = CountVectorizer(max_features=5000, stop_words="english")
    vector = cv.fit_transform(df["tags"]).toarray()

    return vector


def stem_text(text):
    ps = PorterStemmer()
    y = []
    for i in text.split(" "):
        y.append(ps.stem(i))
    return " ".join(y)


def recommend_email(df, email, similarity):
    index = df[df["email"] == email].index[0]
    distances = sorted(
        list(enumerate(similarity[index])), reverse=True, key=lambda x: x[1]
    )
    email_list = sorted(list(enumerate(distances)), reverse=True, key=lambda x: x[1])[
        1:10
    ]
    emails = []
    for email in email_list:
        emails.append(df.iloc[email[0]].email)
    return emails


def recommend_content(email):
    initial_df = init()
    cleaned_df = cleaner(initial_df)
    tags_df = create_tags(cleaned_df)
    required_columns = remove_unnecessary_column(tags_df)
    joined_tags = convert_tags_to_string(required_columns)
    joined_tags["tags"] = joined_tags["tags"].apply(stem_text)
    joined_tags["tags"] = joined_tags["tags"].apply(lambda x: x.lower())
    vectorized = vectorized_tags(joined_tags)
    similarity = cosine_similarity(vectorized)
    emails = recommend_email(joined_tags, email, similarity)
    result = []
    for i, v in enumerate(emails):
        users = CustomUser.objects.get(email=emails[i])
        result.append(
            {
                "email": emails[i],
                "full_name": users.userprofile.full_name,
            }
        )
    return result


def recommend_colaborate():
    initial_df = init()
    cleaned_df = cleaner(initial_df)
    tags_df = create_tags(cleaned_df)
    required_columns = remove_unnecessary_column(tags_df)
    joined_tags = convert_tags_to_string(required_columns)
    joined_tags["tags"] = joined_tags["tags"].apply(stem_text)
    joined_tags["tags"] = joined_tags["tags"].apply(lambda x: x.lower())
    all_text = get_total_text(joined_tags)
    # calculate_jacard_index(joined_tags)
    joined_tags["probability"] = joined_tags["tags"].apply(
        calculate_jacard_index, args=(all_text,)
    )
    probabilities = joined_tags[joined_tags["probability"] > 40]["probability"]
    emails = joined_tags[joined_tags["probability"] > 40]["email"]
    result = []
    for i, v in enumerate(probabilities):
        users = CustomUser.objects.get(email=emails[i])
        result.append(
            {
                "email": emails[i],
                "probability": probabilities[i],
                "full_name": users.userprofile.full_name,
            }
        )
    return result


def jaccard_index(text: str):
    arr = text.split(" ")
    return arr


def get_total_text(df):
    all_text = [text for text in df["tags"].values]
    merged_text = ""
    for text in all_text:
        merged_text += text
    return merged_text


def calculate_jacard_index(text, all_text):
    data_set = set(text.split(" "))
    all_data_set = set(all_text.split(" "))
    intersection = all_data_set.intersection(data_set)
    intersection_len = len(intersection)
    all_data_len = len(all_data_set)
    jaccard_index = (all_data_len - intersection_len) / all_data_len * 100
    return jaccard_index
    # return jaccard_index
