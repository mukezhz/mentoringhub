<template>
  <a-form
    :model="formState"
    v-bind="layout"
    name="nest-messages"
    :validate-messages="validateMessages"
    @finish="onFinish"
  >
    <a-form-item :name="['user', 'fname']" label="First Name" :rules="[{ required: true }]">
      <a-input v-model:value="formState.user.fname" />
    </a-form-item>
    <a-form-item :name="['user', 'lname']" label="Last Name" :rules="[{ required: true }]">
      <a-input v-model:value="formState.user.lname" />
    </a-form-item>
    <a-form-item :name="['user', 'dob']" label="Date of Birth">
      <a-date-picker v-model:value="formState.user.dob"/>
    </a-form-item>
    <a-form-item :name="['user', 'email']" label="Email" :rules="[{ type: 'email' , required: true }]">
      <a-input v-model:value="formState.user.email" />
    </a-form-item>
    <a-form-item has-feedback label="Password" name="pass" :rules="[{ required: true}]">
      <a-input v-model:value="formState.user.pass" type="password" autocomplete="off" />
    </a-form-item>
    <a-form-item has-feedback label="Confirm Password" name="checkPass" :rules="[{ required: true}]">
      <a-input v-model:value="formState.user.checkPass" type="password" autocomplete="off" />
    </a-form-item>
    <a-form-item :wrapper-col="{ ...layout.wrapperCol, offset: 8 }">
      <a-button type="primary" html-type="submit">Register</a-button>
    </a-form-item>
  </a-form>
</template>

<script lang="ts">
import type { Rule } from 'ant-design-vue/es/form';
import { defineComponent, reactive, ref } from 'vue';
import type { FormInstance } from 'ant-design-vue';
import type { Dayjs } from 'dayjs';

interface FormState {
  pass: string;
  checkPass: string;
}

export default defineComponent({
  setup() {
    const layout = {
      labelCol: { span: 8 },
      wrapperCol: { span: 16 },
    };

    const validateMessages = {
      required: '${label} is required!',
      types: {
        email: '${label} is not a valid email!',
        number: '${label} is not a valid number!',
      },
      number: {
        range: '${label} must be between ${min} and ${max}',
      },
    };

    const formState = reactive({
      user: {
        fname: '',
        lname: '',
        dob: ref<Dayjs>(),
        pass: '',
        checkPass: '',
        email: '',
      },
    });
    const onFinish = (values: any) => {
      console.log('Success:', values);
    };
    return {
      formState,
      onFinish,
      layout,
      validateMessages,
    };
  },
});
</script>

 