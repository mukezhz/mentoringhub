<template>
  <a-result
    status="404"
    title="404"
    sub-title="Sorry, the page you requested does not exist."
  >
    <template #extra>
      <router-link to="/">
        <a-button type="primary" size="large">
          <home-outlined />
          Back Home
        </a-button>
      </router-link>
    </template>
  </a-result>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { HomeOutlined } from "@ant-design/icons-vue";

export default defineComponent({
  components: {
    HomeOutlined,
  },
});
</script>
