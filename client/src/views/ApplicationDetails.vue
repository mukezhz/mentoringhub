<template>
  <a-card>
    <a-descriptions title="Application Details" :column="1">
      <a-descriptions-item label="Mentor's Name">
        {{ variable1 }}
      </a-descriptions-item>
      <a-descriptions-item label="Some text">
        {{ variable2 }}
      </a-descriptions-item>
      <a-descriptions-item label="Status">
        <a-tag> Pending/Accepted </a-tag>
      </a-descriptions-item>
    </a-descriptions>
  </a-card>
</template>
<script lang="ts" setup>
import { defineComponent } from "@vue/runtime-core";
import { ref } from "vue";
const variable1 = ref<string>();
const variable2 = ref<string>();
</script>
