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
  <a-table :dataSource="roomData" :columns="columns" />
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
      roomData: [
        {
          key: "1",
          name: "Python Study Room",
          owner: "Sagar",
          address: "Dang",
        },
        {
          key: "2",
          name: "C++ Study Room",
          owner: "Basantey",
          address: "Myagdi",
        },
      ],

      columns: [
        {
          title: "Room Name",
          dataIndex: "name",
          key: "name",
        },
        {
          title: "Mentor",
          dataIndex: "owner",
          key: "owner",
        },
        {
          title: "Address",
          dataIndex: "address",
          key: "address",
        },
      ],
    };
  },
});
</script>
