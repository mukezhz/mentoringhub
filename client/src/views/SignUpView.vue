<template>
<div class="signup-view">
    <div align="center">
        <a-typography-title :level="2">Registration</a-typography-title>
        <a-typography-text>Create a new account for free.</a-typography-text>
    </div>
  <a-divider></a-divider>
<a-row justify="center">
  <a-col :span="8">
    <a-form
      name="registration"
      layout="vertical"
      :model="formState"
      :rules="rules"
      autocomplete="off"
      @finish="onFinish"
      @finishFailed="onFinishFailed"
    >
      <a-form-item
        label="Email"
        name="email"
        has-feedback
        :rules="[{trigger:'blur', required: true, message: 'Please enter your email!'},{ trigger: 'change', type:'email', message:'Please enter a valid email!' }]"
      >
        <a-input 
          size="large"
          v-model:value="formState.email" 
          placeholder="eg. name@example.com"/>
      </a-form-item>

      <a-form-item
        label="Password"
        name="password"
        has-feedback  
      >
        <a-input-password 
          size="large"
          v-model:value="formState.password" 
          placeholder="Enter a strong password" />
      </a-form-item>

      <a-form-item
        label="Confirm Password"
        name="confirmPassword"
        has-feedback
      >
        <a-input-password 
          size="large"
          v-model:value="formState.confirmPassword" 
          placeholder="Retype your password" />
      </a-form-item>

      <a-form-item
      label="Role"
      name="role"
      :rules="[{ required: true }]"
    >
      <a-select 
        size="large"
        v-model:value="formState.role" 
        placeholder="Please select account type">
        <a-select-option value="mentor">Mentor</a-select-option>
        <a-select-option value="mentee">Mentee</a-select-option>
      </a-select>
    </a-form-item>


      <a-form-item name="agreement">
        <a-checkbox v-model:checked="formState.agreement">
        I agree to the <router-link to=/terms&conditions>Terms & Conditions</router-link> and <router-link to=/privacypolicy>Privacy Policy</router-link>
        </a-checkbox>
      </a-form-item>

      <a-form-item>
        <a-button :disabled="disabled" block shape="round" type="primary" html-type="submit" class="login-form-button">SIGN UP</a-button>
      </a-form-item>
      
      <a-divider>Already have an account?</a-divider>

    <a-form-item>
    <router-link to="/login" >
      <a-button 
        type="default" 
        block 
        shape="round" 
        class="login-form-button">Sign In
      </a-button>
    </router-link>
    </a-form-item>
    </a-form>
  </a-col>
</a-row>
  
</div>
</template>


<script lang="ts">
import { auth } from "../utils/auth"
import { defineComponent, reactive, computed } from 'vue';
import type { Rule } from 'ant-design-vue/es/form'; 

interface FormState {
  email: string;
  password: string;
  confirmPassword: string;
  role: string;
  agreement: boolean;
}
export default defineComponent({
  setup() {
    const formState = reactive<FormState>({
      email: '',
      password: '',
      confirmPassword: '',
      role:'Choose your account type',
      agreement: false,
    });
    
    let validatePass = async (_rule: Rule, value: string) => {
      if (value === '') {
        return Promise.reject('Please Retype your password!');
      } else if (value !== formState.password) {
        return Promise.reject("Passwords does not match!");
      } else {
        return Promise.resolve();
      }
    };

    const rules: Record<string, Rule[]> = {
      password: [{trigger:'blur', required: true, message: 'Please enter your password!' },{min: 6, message:'Minimum 6 characters'}],
      confirmPassword: [{ required: true, validator: validatePass, trigger: 'blur' }],
    };

    const disabled = computed(() => {
      return !(formState.email && formState.password !== '' && formState.password === formState.confirmPassword && formState.agreement);
    });

    const onFinish = async (values: { email: string, password: string, confirmPassword: string}) => {
            const { email, password, confirmPassword} = values
            // TODO: if remember is true need to set email and password saved to cached or in localStorage
            try {
                const res = await auth.register(email, password, confirmPassword)
                const { data } = await res.json()
                const { errors, success, token, refreshToken } = data.register
                if (success) {
                    localStorage.setItem('token', token)
                    localStorage.setItem('refreshToken', refreshToken)
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
      disabled,
      rules,
      onFinish,
      onFinishFailed,
    };
  },
});
</script>

<style scoped>
.ant-input,
.ant-input-password,
.ant-select
{
  border-radius: 5px;
}

.ant-col label, span{
  font-size: 1.1rem;
}

</style>