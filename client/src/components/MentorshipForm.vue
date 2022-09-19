<template>
  <div>
    <a-button type="primary" size="large" @click="visible = true"
      >Apply for Mentorship</a-button
    >
    <a-modal
      v-model:visible="visible"
      title="Mentorship Form"
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
          name="description"
          label="Q1. Why?"
          :rules="[{ trigger:'blur',required: true }]"
        >
          <a-textarea
            v-model:value="formState.description"
            placeholder="Please answer this questions carefully. "
            :auto-size="{ minRows: 3, maxRows: 6 }"
          />
        </a-form-item>

        <a-form-item
          name="preferences"
          label="Q2. Preferences?"
          :rules="[{ trigger:'blur',required: true }]"
        >
          <a-textarea
            v-model:value="formState.preferences"
            placeholder="Please answer this questions carefully. "
            :auto-size="{ minRows: 3, maxRows: 6 }"
          />
        </a-form-item>

        <a-form-item 
          name="Custom Question 3" 
          label="Q3. ......?" 
          :rules="[{trigger:'blur', required: true }]"
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
  preferences: string;
  description: string;
  question3: string;
}

export default defineComponent({
  setup() {
    const formRef = ref<FormInstance>();
    const visible = ref(false);
    const formState = reactive<Values>({
      description: "",
      preferences: "",
      question3: "",
    });

    const onOk = () => {
      formRef.value
        .validateFields()
        .then((values) => {
          console.log("Received values of form: ", values);
          console.log("formState: ", toRaw(formState));
          visible.value = false;
          formRef.value.resetFields();
          console.log("reset formState: ", toRaw(formState));
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
