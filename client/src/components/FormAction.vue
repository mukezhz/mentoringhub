<template>
    <div>
      <a-button type="primary" @click="visible = true">Action</a-button>
      <a-modal
      centered
        v-model:visible="visible"
        title="Select your Available Date and Time"
        ok-text="Accept"
        cancel-text="Cancel"
        @ok="onOk"
      >
      <a-row justify="center">
        <a-col span="16">
            <a-form ref="formRef" :model="formState" layout="vertical" name="form_in_modal">
          <a-form-item
            name="availDate"
            label="Available Date"
            :rules="[{ required: true, message: 'Please select your available date!' }]"
          >
            <a-date-picker 
            style="width: 100%"
             v-model:value="formState.availDate" value-format="YYYY-MM-DD" />
    </a-form-item>
          <a-form-item 
            name="availTime" 
            label="Available Time" 
            class="collection-create-form_last-form-item"
            :rules="[{ required: true, message: 'Please select your available time!' }]"
            >
            <a-time-picker
            style="width: 100%" v-model:value="formState.availTime" :minute-step="15" format="HH:mm a" />
          </a-form-item>
            </a-form>
        </a-col>
      </a-row>
        
      </a-modal>
    </div>
  </template>
  <script lang="ts">
    import { defineComponent, reactive, ref, toRaw } from 'vue';
    import type { FormInstance } from 'ant-design-vue';
    
    interface Values {
      availDate: string;
      availTime: string;
    }
    
    export default defineComponent({
      setup() {
        const formRef = ref<FormInstance>();
        const visible = ref(false);
        const formState = reactive<Values>({
          availDate: '',
          availTime: '',
        });
    
        const onOk = () => {
          formRef.value
            .validateFields()
            .then(values => {
              console.log('Received values of form: ', values);
              console.log('formState: ', toRaw(formState));
              visible.value = false;
              formRef.value.resetFields();
              console.log('reset formState: ', toRaw(formState));
            })
            .catch(info => {
              console.log('Validate Failed:', info);
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