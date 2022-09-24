<template>
  <div>
    <a-button v-if="applied" type="danger" disabled>Already Applied</a-button>
    <a-button v-else type="primary" size="large" @click="visible = true"
      >Request for Mentorship</a-button
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
          name="answer1"
          :label="questions.question1"
          :rules="[{ trigger: 'blur', required: true }]"
        >
          <a-textarea
            v-model:value="formState.answer1"
            placeholder="Please answer this questions carefully. "
            :auto-size="{ minRows: 3, maxRows: 6 }"
          />
        </a-form-item>

        <a-form-item
          name="answer2"
          :label="questions.question2"
          :rules="[{ trigger: 'blur', required: true }]"
        >
          <a-textarea
            v-model:value="formState.answer2"
            placeholder="Please answer this questions carefully. "
            :auto-size="{ minRows: 3, maxRows: 6 }"
          />
        </a-form-item>

        <a-form-item
          name="answer3"
          :label="questions.question3"
          :rules="[{ trigger: 'blur', required: true }]"
        >
          <a-textarea
            v-model:value="formState.answer3"
            placeholder="Please answer this questions carefully. "
            :auto-size="{ minRows: 3, maxRows: 6 }"
          />
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, ref, toRaw, onMounted } from "vue";
import { useRoute } from "vue-router";
import { message, type FormInstance } from "ant-design-vue";
import { mentorship } from "@/graphql/mentorship";

interface Values {
  answer1: string;
  answer2: string;
  answer3: string;
}

export default defineComponent({
  props: {
    email: String,
  },
  setup(props) {
    const route = useRoute();
    const formRef = ref<FormInstance | any>({});
    const visible = ref(false);
    const questions = {
      question1: "Q1",
      question2: "Q2",
      question3: "Q3",
    };
    const formState = reactive<Values>({
      answer1: "",
      answer2: "",
      answer3: "",
    });
    const title = ref<string>("test");
    const applied = ref<boolean>(false);
    onMounted(async () => {
      const res = await mentorship.fetchYourMentorship();
      const { data } = await res.json();
      console.log(data);
      const { fetchYourMentorship } = data;
      const mentorships = fetchYourMentorship.filter((mentorship: any) => {
        const email = `${route.params.username}.com`;
        if (email === mentorship.mentorId) return mentorship;
      });
      console.log(mentorships);
      if (mentorships.length) {
        console.log(mentorships);
        applied.value = true;
        console.log(applied.value);
      }
    });

    const onOk = () => {
      formRef.value
        .validateFields()
        .then(async (values: any) => {
          const { answer1, answer2, answer3 } = values;
          const email = localStorage.getItem("email");
          if (!email) return message.error("Error occured!!!");
          const qna = [
            {
              question: questions.question1,
              answer: formState.answer1,
            },
            {
              question: questions.question2,
              answer: formState.answer2,
            },
            {
              question: questions.question3,
              answer: formState.answer3,
            },
          ];
          const res = await mentorship.applyForMentorship(
            email,
            props.email || "",
            JSON.stringify(qna),
            title.value
          );
          const { data } = await res.json();
          const { applyMentorship } = data;
          if (!applyMentorship.success)
            return message.warn("Failed to apply!!!");
          message.success("Applied successfully!");
          visible.value = false;
          applied.value = true;
          formRef.value.resetFields();
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
      questions,
      applied,
    };
  },
});
</script>
<style>
.collection-create-form_last-form-item {
  margin-bottom: 0;
}
</style>
