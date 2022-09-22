<template>
  <a-row justify="space-between">
    <a-typography-title :level="2">Your {{ type }}</a-typography-title>
    <a-col>
      <a-input-search
        v-model:value="value"
        :placeholder="searchType"
        enter-button
        size="large"
        @search="onSearch"
      />
    </a-col>
  </a-row>

  <a-table :columns="columns" :data-source="users">
    <template #headerCell="{ column }">
      <template v-if="column.key === 'name'">
        <span> Mentor's Name </span>
      </template>
    </template>

    <template #bodyCell="{ column, record }">
      <template v-if="column.key === 'name'">
        <router-link :to="record.key">
          {{ record.name }}
        </router-link>
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
    </template>
  </a-table>
</template>

<script lang="ts">
import { useRouter } from "vue-router";
import { defineComponent, ref, reactive } from "vue";
import { onMounted } from "vue";
import { profile } from "@/graphql/userprofile";
import { titleCase } from "@/utils/string";
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
];

export default defineComponent({
  setup() {
    const users = reactive<any>([]);
    const type = ref<string>("");
    const url = ref<string>("");
    const searchType = ref<string>("");
    const router = useRouter();
    const value = ref<string>("");

    const onSearch = (searchValue: string) => {
      console.log("use value", searchValue);
      console.log("or use this.value", value.value);
    };

    onMounted(async () => {
      const role = localStorage.getItem("role");
      if (!role) router.push("/dashboard");
      else {
        const search = role === "mentor" ? "mentee" : "mentor";
        type.value = `${titleCase(search)}s`;
        searchType.value = `Search ${titleCase(search)}s`;
        const res = await profile.fetchYourProfileByRole(search);
        const { data } = await res.json();
        const { fetchProfileAccordingToRole } = data;
        fetchProfileAccordingToRole.forEach((user: any) => {
          users.push({
            key: `/u/${user.user.email.split(".")[0]}`,
            name: user.fullName,
            address: user.address,
            skills: JSON.parse(user.skills),
          });
        });
      }
    });

    return {
      value,
      onSearch,
      columns,
      users,
      type,
      searchType,
    };
  },
});
</script>
