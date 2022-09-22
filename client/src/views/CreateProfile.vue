<template>
  <a-layout>
    <a-layout-content>
      <a-row justify="center">
        <a-typography-title>Create Profile</a-typography-title>
        <a-divider />
        <a-col :span="8">
          <a-typography-paragraph>
            Please fill in the additional details to complete your profile & get
            the best experience and recommendations.
          </a-typography-paragraph>
          <a-divider />
          <a-form
            :model="formState"
            layout="vertical"
            name="nest-messages"
            :validate-messages="validateMessages"
            @finish="onFinish"
          >
            <a-form-item
              :name="['user', 'role']"
              :rules="[{ required: true }]"
              label="Role"
            >
              <a-select
                v-model:value="formState.user.role"
                size="large"
                style="width: 100%"
                placeholder="Select you role"
                :options="roleOptions"
              ></a-select>
            </a-form-item>

            <a-form-item
              :name="['user', 'fname']"
              label="Full Name"
              :rules="[{ required: true }]"
            >
              <a-input
                placeholder="eg: John Doe"
                size="large"
                v-model:value="formState.user.fname"
              />
            </a-form-item>

            <a-form-item
              :name="['user', 'dob']"
              :rules="[{ required: true }]"
              label="Date of Birth"
            >
              <a-date-picker
                style="width: 100%"
                size="large"
                v-model:value="formState.user.dob"
                placeholder="Select your Date of Birth"
                value-format="YYYY-MM-DD"
              />
            </a-form-item>

            <a-form-item
              :name="['user', 'gender']"
              :rules="[{ required: true }]"
              label="Gender"
            >
              <a-select
                v-model:value="formState.user.gender"
                size="large"
                style="width: 100%"
                placeholder="Select your Gender"
                :options="genderOptions"
              ></a-select>
            </a-form-item>

            <a-form-item
              :name="['user', 'profession']"
              label="Profession"
              :rules="[{ required: true }]"
            >
              <a-input
                placeholder="eg: Engineer"
                size="large"
                v-model:value="formState.user.profession"
              />
            </a-form-item>

            <a-form-item
              :name="['user', 'address']"
              label="Address"
              :rules="[{ required: true }]"
            >
              <a-input
                placeholder="eg: Kathmandu"
                size="large"
                v-model:value="formState.user.address"
              />
            </a-form-item>

            <a-form-item
              :name="['user', 'city']"
              label="City"
              :rules="[{ required: true }]"
            >
              <a-input
                placeholder="eg: Kathmandu"
                size="large"
                v-model:value="formState.user.city"
              />
            </a-form-item>

            <a-form-item
              :name="['user', 'country']"
              :rules="[{ required: true }]"
              label="Country"
            >
              <a-select
                v-model:value="formState.user.country"
                size="large"
                show-search
                style="width: 100%"
                placeholder="Select Country of Residence"
                :options="countryOptions"
              ></a-select>
            </a-form-item>

            <a-form-item
              :name="['user', 'skills']"
              :rules="[{ required: true }]"
              label="Skills"
            >
              <a-select
                v-model:value="formState.user.skills"
                mode="tags"
                size="large"
                style="width: 100%"
                placeholder="Select your Skills"
                :options="skillsOption"
              ></a-select>
            </a-form-item>

            <a-form-item
              :name="['user', 'interests']"
              :rules="[{ required: true }]"
              label="Interests"
            >
              <a-select
                v-model:value="formState.user.interests"
                mode="tags"
                size="large"
                style="width: 100%"
                placeholder="Select your Interests"
                :options="interestsOption"
              ></a-select>
            </a-form-item>

            <a-form-item
              :name="['user', 'languages']"
              :rules="[{ required: true }]"
              label="Languages"
            >
              <a-select
                v-model:value="formState.user.languages"
                mode="multiple"
                size="large"
                style="width: 100%"
                placeholder="Select Languages you can speak"
                :options="languageOptions"
              ></a-select>
            </a-form-item>

            <a-divider
              >Please recheck the provided information before proceeding to
              Submit.</a-divider
            >

            <a-form-item>
              <a-button
                type="primary"
                shape="round"
                size="large"
                block
                html-type="submit"
                >Submit</a-button
              >
            </a-form-item>
          </a-form>
        </a-col>
      </a-row>
    </a-layout-content>
  </a-layout>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, onMounted } from "vue";
import { COUNTRIES, GENDERS, LANGUAGES, SKILLS, ROLES } from "@/constants";
import { profile } from "@/graphql/userprofile";
import { message } from "ant-design-vue";
import { useRouter } from "vue-router";

export default defineComponent({
  components: {},

  setup() {
    const router = useRouter();
    const countryOptions = ref(COUNTRIES);
    const genderOptions = ref(GENDERS);
    const roleOptions = ref(ROLES);
    const skillsOption = ref(SKILLS);
    const interestsOption = ref(SKILLS);
    const languageOptions = ref(LANGUAGES);

    const validateMessages = {
      required: "${label} is required!",
      types: {
        email: "${label} is not a valid email!",
        number: "${label} is not a valid number!",
      },
      number: {
        range: "${label} must be between ${min} and ${max}",
      },
    };
    onMounted(async () => {
      console.log("Fetch the user profile and fill the value!!!");
      const { data } = await (await profile.fetchYourProfile()).json();
      console.log(data);
      const { fetchYourProfile } = data;
      if (fetchYourProfile?.fullName.length) {
        router.push("/profile");
      }
    });

    const formState = reactive({
      user: {
        fname: "",
        city: "",
        role: "Please select your role",
        gender: "Please select your gender",
        profession: "",
        address: "",
        skills: undefined,
        interests: undefined,
        country: "",
        languages: undefined,
        dob: undefined,
      },
    });
    const onFinish = async (values: any) => {
      const { user } = values;
      const {
        country,
        dob,
        fname,
        interests,
        languages,
        skills,
        role,
        city,
        address,
        profession,
        gender,
      } = user;
      const obtainedLanguages = languages.map((lang: string) => lang);
      const obtainedInterests = interests.map((interest: string) => interest);
      const obtainedSkills = skills.map((skill: string) => skill);
      const res = await profile.createProfile(
        address,
        city,
        country,
        new Date(dob).getTime().toString(),
        fname,
        gender,
        role,
        profession,
        "",
        "about user",
        // mobilePhone,
        // aboutUser,
        JSON.stringify(obtainedLanguages),
        JSON.stringify(obtainedInterests),
        JSON.stringify(obtainedSkills)
      );
      const { data, errors } = await res.json();
      console.log(data, errors);
      if (errors?.length){
        for (const error of errors) {
          message.error(error?.message);
        }
      }
      const { createUserProfile } = data;
      const { success, msg } = createUserProfile;
      if (!success) message.error(msg);
      else {
        message.success(msg);
        router.push("/profile");
      }
    };
    return {
      formState,
      onFinish,
      validateMessages,
      countryOptions,
      genderOptions,
      roleOptions,
      languageOptions,
      skillsOption,
      interestsOption,
    };
  },
});
</script>
