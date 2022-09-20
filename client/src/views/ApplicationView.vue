<template>
  <a-row justify="space-between">
    <a-typography-title :level="2">Your Applications</a-typography-title>
    <a-col>
      <a-input-search
        v-model:value="value"
        placeholder="Search Applications"
        enter-button
        size="large"
        @search="onSearch"
      />
    </a-col>
  </a-row>

  <a-table :columns="columns" :data-source="data">
    <template #headerCell="{ column }">
      <template v-if="column.key === 'name'">
        <span> Mentor's Name </span>
      </template>
    </template>

    <template #bodyCell="{ column, record }">
      <template v-if="column.key === 'name'">
        <a>
          {{ record.name }}
        </a>
      </template>
      <template v-else-if="column.key === 'skills'">
        <span>
          <a-tag
            v-for="tag in record.skills"
            :key="tag"
            :color="
              tag === 'loser'
                ? 'volcano'
                : tag.length > 5
                ? 'geekblue'
                : 'green'
            "
          >
            {{ tag.toUpperCase() }}
          </a-tag>
        </span>
      </template>
      <template v-else-if="column.key === 'action'">
        <span>
          <a>Delete</a>
        </span>
      </template>
    </template>
  </a-table>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
const columns = [
  {
    name: "Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Address",
    dataIndex: "address",
    key: "address",
  },
  {
    title: "Skills",
    key: "skills",
    dataIndex: "skills",
  },
  {
    title: "Action",
    key: "action",
  }
];

const data = [
  {
    key: "1",
    name: "Harke Haldar",
    address: "Sundhara",
    skills: ["python", "architect"],
  },
  {
    key: "2",
    name: "Dhurmus",
    address: "Butwal",
    skills: ["mysql"],
  },
  {
    key: "3",
    name: "Suntali",
    address: "Bharatpur",
    skills: ["javaScript", "teacher"],
  },
];
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
      data,
      columns,
    };
  },
});
</script>
