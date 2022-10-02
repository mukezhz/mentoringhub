<template>
  <div>
    <a-button type="primary" @click="visible = true">Action</a-button>
    <a-modal centered v-model:visible="visible" title="Select your Available Date and Time" ok-text="Approve"
      cancel-text="Reject" @ok="onOk">
      <a-row justify="center">
        <a-col span="16">
          <a-form
            ref="formRef"
            :model="formState"
            layout="vertical"
            name="form_in_modal"
          >
            <a-form-item
              name="availableDate"
              label="Available Date"
              :rules="[
                {
                  required: true,
                  message: 'Please select your available date!',
                },
              ]"
            >
              <a-date-picker
                style="width: 100%"
                v-model:value="formState.availableDate"
                value-format="YYYY-MM-DD"
              />
            </a-form-item>
            <a-form-item
              name="availableTime"
              label="Available Hour"
              class="collection-create-form_last-form-item"
              :rules="[
                {
                  required: true,
                  message: 'Please select your available time!',
                },
              ]"
            >
              <a-time-picker
                style="width: 100%"
                v-model:value="formState.availableTime"
                :minute-step="15"
                format="HH:mm a"
              />
            </a-form-item>
            <a-form-item name="description" label="Description">
              <a-textarea
                placeholder="A few words to introduce yourself."
                v-model:value="formState.description"
              />
            </a-form-item>
            <a-form-item
              name="status"
              label="Status"
              class="collection-create-form_last-form-item"
              :rules="[
                {
                  required: true,
                  message: 'Please select the status!',
                },
              ]"
            >
              <a-select v-model:value="formState.status">
                <a-select-option key="ACCEPTED" value="ACCEPTED"
                  >APPROVED</a-select-option
                ><a-select-option key="REJECTED" value="REJECTED"
                  >REJECTED</a-select-option
                >
              </a-select>
            </a-form-item>
          </a-form>
        </a-col>
      </a-row>
    </a-modal>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, ref, toRaw } from "vue";
import type { FormInstance } from "ant-design-vue";
import { mentorship } from "@/graphql/mentorship";
import { useRoute } from "vue-router";

interface Values {
  availableDate: string;
  availableTime: string;
  status: string;
  description: string;
}

export default defineComponent({
  props: {
    app_id: String,
  },
  setup(props) {
    const formRef = ref<any>();
    const visible = ref(false);
    const answers = {
      answer1: "some blabla 1",
      answer2: "some blabla 2",
      answer3: "some blabla 3",
    };
    const formState = reactive<Values>({
      availableDate: "",
      availableTime: "",
      status: "PENDING",
      description: "",
    });

    const onOk = () => {
      const route = useRoute();
      const applicationId = props.app_id;
      if (!applicationId) return;
      formRef.value
        .validateFields()
        .then(async (values: any) => {
          console.log("Received values of form: ", values);
          const { status, availableTime, availableDate, description } = values;
          console.log(status, availableTime, availableDate, description);
          const participants = JSON.stringify([]);
          const res = await mentorship.replyOfMentorship(
            applicationId,
            status,
            availableDate,
            availableTime,
            participants,
            description
          );
          console.log("formState: ", toRaw(formState));
          visible.value = false;
          formRef.value.resetFields();
          console.log("reset formState: ", toRaw(formState));
        })
        .catch((info: any) => {
          console.log("Validate Failed:", info);
        });
    };

    return {
      formState,
      formRef,
      visible,
      onOk,
      answers,
    };
  },
});
</script>
<style>
.collection-create-form_last-form-item {
  margin-bottom: 0;
}
</style>
