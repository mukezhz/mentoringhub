<template>
  <div class="login-view">
    <a-typography-title class="text-center"
      >Login to Mentoring Hub</a-typography-title
    >
    <a-row justify="center">
      <a-col :span="16">
        <a-form
          layout="vertical"
          :model="formState"
          name="normal_login"
          class="login-form"
          @finish="onFinish"
          @finishFailed="onFinishFailed"
        >
          <a-form-item
            label="Email"
            name="email"
            has-feedback
            :rules="[
              {
                required: true,
                message: 'Please enter your email!',
                trigger: 'blur',
              },
              {
                trigger: 'blur',
                type: 'email',
                message: 'Please enter a valid email.',
              },
            ]"
          >
            <a-input size="large" v-model:value="formState.email">
              <template #prefix>
                <UserOutlined class="site-form-item-icon" />
              </template>
            </a-input>
          </a-form-item>

          <a-form-item
            label="Password"
            name="password"
            :rules="[
              {
                required: true,
                message: 'Please enter your password!',
                trigger: 'blur',
              },
              { min: 6, message: 'Not enough characters!!', trigger: 'blur' },
            ]"
          >
            <a-input-password size="large" v-model:value="formState.password">
              <template #prefix>
                <LockOutlined class="site-form-item-icon" />
              </template>
            </a-input-password>
          </a-form-item>

          <div class="login-form-wrap">
            <a-form-item name="remember" no-style>
              <a-checkbox v-model:checked="formState.remember"
                >Remember me</a-checkbox
              >
            </a-form-item>
            <router-link to="/resetpassword" class="login-form-forgot"
              >Forgot Password?</router-link
            >
          </div>

          <a-row justify="center"
            ><a-col :span="12">
              <a-form-item>
                <a-button
                  type="primary"
                  block
                  size="large"
                  shape="round"
                  html-type="submit"
                  class="login-form-button"
                  :disabled="disabled"
                >
                  Log in
                </a-button>
              </a-form-item></a-col
            >
          </a-row>

          <a-divider>New to the Mentoring Hub?</a-divider>
          <a-row justify="center">
            <a-form-item>
              <router-link to="/signup">
                <a-button
                  shape="round"
                  size="large"
                  type="primary"
                  class="login-form-button"
                  ghost
                >
                  Register now!
                </a-button>
              </router-link>
            </a-form-item></a-row
          >
        </a-form>
      </a-col>
    </a-row>
  </div>
</template>

<script lang="ts">
import { auth } from "@/graphql/auth";
import { message } from "ant-design-vue";
import { defineComponent, reactive, computed } from "vue";
import { UserOutlined, LockOutlined } from "@ant-design/icons-vue";
import { RouterLink, useRouter } from "vue-router";
import { trigger } from "@vue/reactivity";
// import { Toast } from 'vuex-toast'
interface FormState {
  email: string;
  password: string;
  remember: boolean;
}
export default defineComponent({
  components: {
    UserOutlined,
    LockOutlined,
    RouterLink,
  },

  setup() {
    const router = useRouter();
    const formState = reactive<FormState>({
      email: "",
      password: "",
      remember: true,
    });
    const onFinish = async (values: {
      email: string;
      password: string;
      remember: string;
    }) => {
      const { email, password, remember } = values;
      // TODO: if remember is true need to set email and password saved to cached or in localStorage
      try {
        const res = await auth.login(email, password);
        const { data } = await res.json();
        if (!data.tokenAuth) message.error("Unable to Login!!!");
        else {
          const { errors, success, token, refreshToken } = data.tokenAuth;
          for (const i in errors) {
            for (const j of errors[i]) {
              message.error(j.message);
            }
          }
          if (success) {
            localStorage.setItem("email", email);
            localStorage.setItem("authtoken", token);
            localStorage.setItem("refreshtoken", refreshToken);
            message.success("Login Successful!");
            router.push("/dashboard");
          }
        }
      } catch (e) {
        console.log(e);
        message.error("Connection error!!!");
      }
    };

    const onFinishFailed = (errorInfo: any) => {
      console.log("Failed:", errorInfo);
    };
    const disabled = computed(() => {
      return !(formState.email && formState.password.length >= 6);
    });
    return {
      formState,
      onFinish,
      onFinishFailed,
      disabled,
    };
  },
});
</script>
<style>
@media screen and (min-width: 640px) {
  .login-view {
    width: 70%;
  }
}

@media screen and (min-width: 1020px) {
  .login-view {
    width: 45%;
  }
}

.login-view {
  /* width: 30%; */
  margin: 15vh auto;
}

#components-form-demo-normal-login .login-form {
  max-width: 300px;
}

.login-form-wrap {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
}

#components-form-demo-normal-login .login-form-forgot {
  margin-bottom: 24px;
}

.ant-col label,
span,
a {
  font-size: 1.1rem;
}
</style>
