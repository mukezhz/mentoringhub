export const gql = (q: any) => {
  return {
    createProfile: {
      query: `mutation createUserProfile($address: String!, 
                $city: String!, 
                $country: String!, 
                $dateOfBirth: String!, 
                $fullName: String!, 
                $gender: String!, 
                $role: String!, 
                $profession: String!, 
                $mobilePhone: String!, 
                $aboutUser: String!, 
                $languages: JSONString! , 
                $interests: JSONString!,
                $skills: JSONString!) {
                createUserProfile(address: $address, 
                  city: $city, 
                  country: $country, 
                  dateOfBirth: $dateOfBirth, 
                  fullName: $fullName, 
                  gender: $gender, 
                  role: $role, 
                  profession: $profession,
                  mobilePhone: $mobilePhone,
                  aboutUser: $aboutUser,
                  languages: $languages,
                  interests: $interests,
                  skills: $skills) {
                    success
                    msg
                }
              }
            `,
      variables: {
        address: q?.address,
        city: q?.city,
        country: q?.country,
        dateOfBirth: q?.dateOfBirth,
        fullName: q?.fullName,
        gender: q?.gender,
        role: q?.role,
        profession: q?.profession,
        mobilePhone: q?.mobilePhone,
        aboutUser: q?.aboutUser,
        languages: q?.languages,
        interests: q?.interests,
        skills: q?.skills,
      },
    },
    updateProfile: {
      query: `mutation updateUserProfile($address: String!, 
                $city: String!, 
                $country: String!, 
                $dateOfBirth: String!, 
                $fullName: String!, 
                $gender: String!, 
                $role: String!, 
                $profession: String!, 
                $mobilePhone: String!, 
                $aboutUser: String!, 
                $languages: JSONString! , 
                $interests: JSONString!,
                $skills: JSONString!) {
                # createUserProfile(address: "Maharajgunj", city: "Kathmandy", country: "np", dateOfBirth: "1661663825766", fullName: "Test bahadur", gender: "male", role: "mentee", profession: "programmer") {
                updateUserProfile(address: $address, 
                  city: $city, 
                  country: $country, 
                  dateOfBirth: $dateOfBirth, 
                  fullName: $fullName, 
                  gender: $gender, 
                  role: $role, 
                  profession: $profession,
                  mobilePhone: $mobilePhone,
                  aboutUser: $aboutUser,
                  languages: $languages,
                  interests: $interests,
                  skills: $skills) {
                  success
                  msg
                }
              }
            `,
      variables: {
        address: q?.address,
        city: q?.city,
        country: q?.country,
        dateOfBirth: q?.dateOfBirth,
        fullName: q?.fullName,
        gender: q?.gender,
        role: q?.role,
        profession: q?.profession,
        mobilePhone: q?.mobilePhone,
        aboutUser: q?.aboutUser,
        languages: q?.languages,
        interests: q?.interests,
        skills: q?.skills,
      },
    },
    fetchYourProfile: {
      query: `query fetchYourProfile {
                fetchYourProfile {
                  user {
                    username
                    email
                  }
                  fullName
                  dateOfBirth
                  address
                  city
                  country
                  gender
                  mobilePhone
                  role
                  profession
                  languages
                  interests
                  skills
                  aboutUser
                }
              }
        `,
    },
    fetchYourProfileByUsername: {
      query: `query fetchProfileAccordingToUsername($username: String!) {
                fetchProfileAccordingToUsername(username: $username) {
                  user {
                    email
                  }
                  fullName
                  dateOfBirth
                  address
                  city
                  country
                  gender
                  mobilePhone
                  role
                  profession
                  languages
                  interests
                  skills
                  aboutUser
                }
              }
        `,
      variables: {
        username: q?.username,
      },
    },
  };
};
