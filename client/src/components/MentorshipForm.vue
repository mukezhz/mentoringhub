<template>
  <div>
    <a-button type="primary" size="large" @click="visible = true"
      >Apply for Mentorship</a-button
    >
    <a-modal
      v-model:visible="visible"
      title="Mentorship Form"
      centered
      ok-text="Apply"
      cancel-text="Cancel"
      @ok="onOk"
    >
      <a-form
        ref="formRef"
        :model="formState"
        layout="vertical"
        name="form_in_modal"
      >
        <a-form-item
          name="question1"
          label="Q1. Why?"
          :rules="[{ trigger: 'blur', required: true }]"
        >
          <a-textarea
            v-model:value="formState.question1"
            placeholder="Please answer this questions carefully. "
            :auto-size="{ minRows: 3, maxRows: 6 }"
          />
        </a-form-item>

        <a-form-item
          name="question2"
          label="Q2. question2?"
          :rules="[{ trigger: 'blur', required: true }]"
        >
          <a-textarea
            v-model:value="formState.question2"
            placeholder="Please answer this questions carefully. "
            :auto-size="{ minRows: 3, maxRows: 6 }"
          />
        </a-form-item>

        <a-form-item
          name="question3"
          label="Q3. ......?"
          :rules="[{ trigger: 'blur', required: true }]"
        >
          <a-textarea
            v-model:value="formState.question3"
            placeholder="Please answer this questions carefully. "
            :auto-size="{ minRows: 3, maxRows: 6 }"
          />
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, ref, toRaw } from "vue";
import type { FormInstance } from "ant-design-vue";

interface Values {
  question2: string;
  question1: string;
  question3: string;
}

export default defineComponent({
  setup() {
    const formRef = ref<FormInstance>({});
    const visible = ref(false);
    const formState = reactive<Values>({
      question1: "",
      question2: "",
      question3: "",
    });

    const onOk = () => {
      formRef.value
        .validateFields()
        .then((values) => {
          const { question1, question2, question3 } = values;
          // TODO: send call apply for mentorship
          visible.value = false;
          formRef.value.resetFields();
        })
        .catch((info) => {
          console.log("Validate Failed:", info);
        });
    };

    return {
      formState,
      formRef,
      visible,
      onOk,
    };
  },
});
</script>
<style>
.collection-create-form_last-form-item {
  margin-bottom: 0;
}
</style>
