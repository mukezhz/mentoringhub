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
            <a-divider>Update your details below and click Save Details</a-divider>
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
                :name="['user', 'fname']"
                label="Full Name"
                :rules="[{ required: true }]"
                has-feedback
              >
                <a-input
                  placeholder="eg: John Doe"
                  size="large"
                  v-model:value="formState.user.fname"
                  allow-clear
                />
              </a-form-item>

              <a-form-item
                :name="['user', 'bio']"
                label="Bio"
                :rules="[{ required: true }]"
                has-feedback
              >
                <a-textarea
                  placeholder="A few words to introduce yourself."
                  v-model:value="formState.user.bio"
                />
              </a-form-item>

              <a-form-item
                :name="['user', 'dob']"
                :rules="[{ required: true }]"
                label="Date of Birth"
                has-feedback
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
                has-feedback
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
import { defineComponent, ref, reactive } from "vue";

export default defineComponent({
  components: {},

  setup() {
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

    const formState = reactive({
      user: {
        fname: "",
        email: "",
        role: "mentor",
        skills: undefined,
        interests: undefined,
        country: undefined,
        languages: undefined,
        dob: undefined,
        bio: "",
      },
    });
    const onFinish = (values: any) => {
      console.log("Success:", values);
    };
    return {
      formState,
      onFinish,
      validateMessages,
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
