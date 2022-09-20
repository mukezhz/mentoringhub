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
              :name="['user', 'country']"
              :rules="[{ required: true }]"
              label="Country"
            >
              <a-select
                v-model:value="formState.user.country"
                size="large"
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
                v-model:value="formState.user.country"
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
import { COUNTRIES } from "@/constants/countries";
export default defineComponent({
  components: {},

  setup() {
    const countryOptions = ref(COUNTRIES);
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
    });

    const formState = reactive({
      user: {
        fname: "",
        skills: undefined,
        interests: undefined,
        country: undefined,
        languages: undefined,
        dob: undefined,
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
    };
  },
});
</script>
