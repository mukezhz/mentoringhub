<template>
  <a-row justify="space-between">
    <a-typography-title :level="2">Your Rooms</a-typography-title>
    <a-col>
      <a-input-search
        v-model:value="value"
        placeholder="Search Rooms"
        enter-button
        size="large"
        @search="onSearch"
      />
    </a-col>
  </a-row>

  
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
export default defineComponent({
  setup() {
    const value = ref<string>("");

    const onSearch = (searchValue: string) => {
      console.log("use value", searchValue);
      console.log("or use this.value", value.value);
    };

    return {
      value,
      onSearch,
    };
  },
});
</script>
