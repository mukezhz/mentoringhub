<template>
  <a-layout>
    <a-layout-header style="background: #fff; padding: 0" />
    <a-layout-content>
      <a-row justify="center" :style="{ margin: '5vh auto' }">
        <a-col :span="12">
          <a-row justify="center">
            <a-typogaphy-title :level="2"
              >Please complete your profile</a-typogaphy-title
            ></a-row
          >

          <div>
            <a-steps type="navigation" v-model:current="current">
              <a-step
                v-for="item in steps"
                :key="item.title"
                :title="item.title"
              />
            </a-steps>

            <div class="steps-content">
              <component :is="steps[current].content" />
            </div>
            <a-row justify="end">
              <a-space>
                <div class="steps-action">
                  <a-button
                    v-if="current > 0"
                    style="margin-right: 10px"
                    size="large"
                    shape="round"
                    @click="prev"
                    ><left-outlined /> Previous Step</a-button
                  >
                  <a-button
                    v-if="current < steps.length - 1"
                    type="primary"
                    size="large"
                    shape="round"
                    @click="next"
                    >Next Step <right-outlined
                  /></a-button>
                  <a-button
                    v-if="current == steps.length - 1"
                    type="primary"
                    shape="round"
                    size="large"
                    @click="message.success('Processing complete!')"
                  >
                    Submit <send-outlined />
                  </a-button>
                </div> </a-space
            ></a-row>
          </div>
        </a-col>
      </a-row>
    </a-layout-content>
  </a-layout>
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";
import { message } from "ant-design-vue";
import {
  SendOutlined,
  RightOutlined,
  LeftOutlined,
} from "@ant-design/icons-vue";

export default defineComponent({
  components: {
    SendOutlined,
    RightOutlined,
    LeftOutlined,
  },
  setup() {
    const current = ref<number>(0);
    const next = () => {
      current.value++;
    };
    const prev = () => {
      current.value--;
    };
    return {
      message,
      current,
      steps: [
        {
          title: "Basic Details",
          content: "First-content",
        },
        {
          title: "Interests",
          content: "Second-content",
        },
        {
          title: "Last",
          content: "Last-content",
        },
      ],
      next,
      prev,
    };
  },
});
</script>
<style scoped>
.steps-content {
  margin-top: 16px;
  border: 1px dashed #e9e9e9;
  border-radius: 6px;
  background-color: #fafafa;
  min-height: 60vh;
  text-align: center;
  padding-top: 80px;
}

.steps-action {
  margin-top: 24px;
}

[data-theme="dark"] .steps-content {
  background-color: #2f2f2f;
  border: 1px dashed #404040;
}
</style>
