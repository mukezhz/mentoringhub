<template>
<div class="signup-view">
    <div align="center">
        <a-typography-title :level="2">Sign Up</a-typography-title>
        <a-typography-text>Create a new account for free.</a-typography-text>
    </div>
  <a-divider></a-divider>
  <a-form
    name="registration"
    layout="horizontal"
    :model="formState"
    :rules="rules"
    :label-col="{ span: 6 }"
    :wrapper-col="{ span: 16 }"
    :validate-messages="validateMessages"
    autocomplete="off"
    labelAlign="right"
    @finish="onFinish"
    @finishFailed="onFinishFailed"
  >
    <a-form-item
      label="First Name"
      name="firstName"
      :rules="[{ required: true }]"
    >
      <a-input v-model:value="formState.firstName" placeholder="eg. John" />
    </a-form-item>

    <a-form-item
      label="Last Name"
      name="lastName"
      :rules="[{ required: true }]"
    >
      <a-input v-model:value="formState.lastName" placeholder="eg. Doe" />
    </a-form-item>

    <a-form-item
      label="Location"
      name="location"
      :rules="[{ required: true }]"
    >
      <a-input v-model:value="formState.location" placeholder="eg. Earth" />
    </a-form-item>

    <a-form-item
      label="Role"
      name="role"
      :rules="[{ required: true }]"
    >
      <a-select v-model:value="formState.role" placeholder="Please select account type">
        <a-select-option value="mentor">Mentor</a-select-option>
        <a-select-option value="mentee">Mentee</a-select-option>
      </a-select>
    </a-form-item>

    <a-form-item
    v-if="formState.role==='mentor'"
      label="Skills"
      name="skills"
      :rules="[{ required: true, type:'array'}]"
    >
      <a-select
      v-model:value="formState.skills"
      mode="tags"
      style="width: 100%"
      placeholder="Enter or Select Skills"
      :options="options"
      >
      </a-select>
    </a-form-item>

    <a-form-item
      label="Interests"
      name="interests"
      :rules="[{ required: true, type:'array'}]"
    >
      <a-select
      v-model:value="formState.interests"
      mode="tags"
      style="width: 100%"
      placeholder="Enter or Select Interests"
      :options="options"
      >
      </a-select>
    </a-form-item>

    <a-form-item
      label="Contact"
      name="contact"
      :rules="[{ required: true, max:10}]"
    >
      <a-input addon-before="+977" v-model:value="formState.contact"  placeholder="eg. 9xxx-xxxxxx" />
    </a-form-item>

    <a-form-item
      label="Email"
      name="email"
      :rules="[{ required: true, message: 'Please enter your email!'},{ trigger: 'blur', type:'email', message:'Please enter a valid email!' }]"
    >
      <a-input v-model:value="formState.email" placeholder="eg. name@example.com"/>
    </a-form-item>

    <a-form-item
      label="Password"
      name="password"
      has-feedback  
    >
      <a-input-password v-model:value="formState.password" placeholder="Enter a strong password" />
    </a-form-item>

    <a-form-item
      label="Confirm Password"
      name="confirmPassword"
      has-feedback
    >
      <a-input-password v-model:value="formState.confirmPassword" placeholder="Retype password" />
    </a-form-item>

    <a-form-item name="agreement" :wrapper-col="{ offset: 6, span: 16 }">
      <a-checkbox v-model:checked="formState.agreement">
      I agree to the <router-link to=/terms&conditions>Terms & Conditions</router-link> and <router-link to=/privacypolicy>Privacy Policy</router-link>
      </a-checkbox>
    </a-form-item>

    <a-form-item :wrapper-col="{ offset: 6 , span: 16 }">
      <a-button :disabled="disabled" block shape="round" type="primary" html-type="submit" class="login-form-button">SIGN UP</a-button>
    </a-form-item>
    
  <a-form-item :wrapper-col="{ offset: 6 , span: 16 }">
  <div class="text-center">
    <a-typography-text>Already have an account? </a-typography-text>
  </div>
  <router-link to="/login" >
  <a-button type="default" block shape="round" class="login-form-button">
    Sign In
  </a-button>
  </router-link>
  </a-form-item>
  </a-form>
  
</div>
</template>


<script lang="ts">
import { auth } from "../utils/auth"
import { defineComponent, reactive, computed, ref } from 'vue';
import type { Rule } from 'ant-design-vue/es/form'; 

interface FormState {
  firstName: string;
  lastName: string;
  location: string;
  role: string;
  contact: number | undefined;
  email: string;
  password: string;
  confirmPassword: string;
  agreement: boolean;
  skills:{},
  interests:{},
}
export default defineComponent({
  setup() {
    const formState = reactive<FormState>({
      firstName: '',
      lastName:'',
      location: '',
      contact: undefined,
      role: 'Please select account type',
      email: '',
      skills:[],
      interests:[],
      password: '',
      confirmPassword: '',
      agreement: false,
    });

    const validateMessages = {
      required: '${label} is a required field!',
      types: {
        email: '${label} is not a valid email!',
        number: '${label} is not a valid number!',
      },
    };
    
    let validatePass = async (_rule: Rule, value: string) => {
      if (value === '') {
        return Promise.reject('Please Retype password ');
      } else if (value !== formState.password) {
        return Promise.reject("Passwords does not match!");
      } else {
        return Promise.resolve();
      }
    };

    const rules: Record<string, Rule[]> = {
      password: [{ required: true, message: 'Please enter your password!', trigger: 'change' },{min: 6, message:'Minimum 6 characters'}],
      confirmPassword: [{ required: true, validator: validatePass, trigger: 'change' }],
    };

    const disabled = computed(() => {
      return !(formState.email && formState.password !== '' && formState.password === formState.confirmPassword && formState.agreement);
    });

    // const handleChange = (value: string) => {
    //   console.log(`selected ${value}`);
    // };

    const onFinish = async (values: { email: string, password: string, confirmPassword: string}) => {
            const { email, password, confirmPassword} = values
            // TODO: if remember is true need to set email and password saved to cached or in localStorage
            try {
                const res = await auth.register(email, password, confirmPassword)
                const { data } = await res.json()
                const { errors, success, token } = data.tokenAuth
                if (success) {
                    localStorage.setItem('token', token)
                }
                console.log(errors);
            } catch (e) {
                console.log(e);
            }

        };

    const onFinishFailed = (errorInfo: any) => {
      console.log('Failed:', errorInfo);
    };
    return {
      formState,
      validateMessages,
      disabled,
      rules,
      // handleChange,
      options: [...Array(5)].map((_, i) => ({ value: (i + 10).toString(36) + (i + 1) })),
      onFinish,
      onFinishFailed,
    };
  },
});
</script>

<style scoped>
@media screen and (min-width: 640px) {
    .signup-view {
        width: 45%;
    }
}

@media screen and (min-width: 1020px) {
    .signup-view {
        width: 60%;
    }
}
.signup-view {
    margin: 8vh auto;
    padding-bottom: 20px;
}
.ant-form{
  align-content: center;
}
.ant-input,
.ant-input-password,
.ant-select
{
  border-radius: 5px;
  width: 100%;
}
</style>