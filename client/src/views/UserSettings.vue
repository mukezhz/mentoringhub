<template>
  <a-layout>
    <!-- content start -->
    <a-layout-content :style="{ padding: '20px 70px', marginTop: '64px' }">
      <div :style="{ minHeight: '380px' }">
        <a-row justify="center">
          <a-typography-title :level="2">
            Update User Details
          </a-typography-title></a-row
        >
        <a-row justify="center">
          <a-col :span="8">
            <a-divider
              >Update your details below and click Save Details</a-divider
            >
            <a-form
              :model="formState"
              layout="vertical"
              name="nest-messages"
              :validate-messages="validateMessages"
              @finish="onFinish"
            >
              <a-form-item
                :name="['user', 'email']"
                label="Email"
                :rules="[
                  {
                    trigger: 'blur',
                    required: true,
                    message: 'Please enter your new email.',
                  },
                  {
                    trigger: 'blur',
                    type: 'email',
                    message: 'Please provide a valid email.',
                  },
                ]"
                has-feedback
              >
                <a-input
                  placeholder="eg: name@example.com"
                  size="large"
                  v-model:value="formState.user.email"
                  allow-clear
                />
              </a-form-item>

              <a-form-item
                :name="['user', 'fullName']"
                label="Full Name"
                :rules="[{ required: true }]"
                has-feedback
              >
                <a-input
                  placeholder="eg: Harke Haldar"
                  size="large"
                  v-model:value="formState.user.fullName"
                  allow-clear
                />
              </a-form-item>

              <a-form-item
                :name="['user', 'aboutUser']"
                label="Bio"
                :rules="[{ required: true }]"
                has-feedback
              >
                <a-textarea
                  placeholder="A few words to introduce yourself."
                  v-model:value="formState.user.aboutUser"
                />
              </a-form-item>

              <a-form-item
                :name="['user', 'dateOfBirth']"
                :rules="[{ required: true }]"
                label="Date of Birth"
                has-feedback
              >
                <a-date-picker
                  style="width: 100%"
                  size="large"
                  v-model:value="formState.user.dateOfBirth"
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
                :name="['user', 'mobilePhone']"
                label="Contact Number"
                :rules="[{ required: true }]"
              >
                <a-input-number
                  placeholder="Enter phone number"
                  size="large"
                  style="width: 100%"
                  v-model:value="formState.user.mobilePhone"
                />
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
                  placeholder="eg: Kalimati"
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
                has-feedback
              >
                <a-select
                  v-model:value="formState.user.country"
                  size="large"
                  style="width: 100%"
                  show-search
                  placeholder="Select Country of Residence"
                  :options="countryOptions"
                ></a-select>
              </a-form-item>

              <a-form-item
                :name="['user', 'skills']"
                :rules="[{ required: true }]"
                label="Skills"
                has-feedback
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
                has-feedback
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
                has-feedback
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
                Save.</a-divider
              >

              <a-form-item>
                <a-button
                  type="primary"
                  shape="round"
                  size="large"
                  block
                  html-type="submit"
                  >Save Details</a-button
                >
              </a-form-item>
            </a-form>
          </a-col>
        </a-row>
      </div>
    </a-layout-content>
  </a-layout>
</template>
<script lang="ts">
import { message } from "ant-design-vue";
import { profile } from "@/graphql/userprofile";
import { defineComponent, ref, reactive, onMounted } from "vue";
import { COUNTRIES, GENDERS, ROLES, SKILLS, LANGUAGES } from "@/constants";

export default defineComponent({
  components: {},

  setup() {
    const hasProfile = ref<boolean>(false);

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
      const res = await (await profile.fetchYourProfile()).json();
      const { data } = res;
      const { fetchYourProfile } = data;
      if (!fetchYourProfile) hasProfile.value = false;
      else {
        hasProfile.value = true;
        for (const k in fetchYourProfile) {
          if (k === "skills" || k === "interests" || k === "languages")
            formState.user[k] = JSON.parse(fetchYourProfile[k]);
          else formState.user[k] = fetchYourProfile[k];
        }
        formState.user.email = fetchYourProfile.user.email;
        console.log(formState.user);
      }
    });

    const formState = reactive<any>({
      user: {
        address: "",
        city: "",
        fullName: "",
        email: "",
        role: "",
        skills: [],
        interests: [],
        country: "",
        languages: [],
        dateOfBirth: "",
        aboutUser: "",
        gender: "",
        mobilePhone: "",
        profession: "",
      },
    });
    const onFinish = (values: any) => {
      console.log("Success:", values);
    };
    return {
      formState,
      onFinish,
      validateMessages,
      countryOptions,
      genderOptions,
      roleOptions,
      skillsOption,
      interestsOption,
      languageOptions,
    };
  },
});
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

#components-layout-demo-fixed .logo {
  width: 120px;
  height: 31px;
  background: rgba(255, 255, 255, 0.2);
  margin: 16px 24px 16px 0;
  float: left;
}

.site-layout .site-layout-background {
  background: #fff;
}

[data-theme="dark"] .site-layout .site-layout-background {
  background: #141414;
}
</style>
