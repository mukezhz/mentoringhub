<template>
  <a-row justify="space-between">
    <a-typography-title :level="2">Recommended Mentors</a-typography-title>
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
      <template v-if="column.key === 'email'">
        <span> Mentor's Email </span>
      </template>
    </template>

    <template #bodyCell="{ column, record }">
      <template v-if="column.key === 'fullName'">
        <router-link :to="record.key">
          {{ record.fullName }}
        </router-link>
      </template>
      <template v-else-if="column.key === 'probability'">
        <span>
          <a-tag
            v-for="tag in record.probability"
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
import { recommend } from "@/graphql/recommend";
const columns = [
  {
    name: "Email",
    dataIndex: "email",
    key: "email",
  },
  {
    title: "Probability",
    dataIndex: "probability",
    key: "probability",
  },
  {
    title: "Fullname",
    key: "fullName",
    dataIndex: "fullName",
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
      const res = await recommend.collaborateFiltering();
      const { data } = await res.json();
      const { collaborateFiltering } = data;
      console.log(collaborateFiltering);
      const role = localStorage.getItem("role");
      if (!role) return router.push("/dashboard");
      else {
        const search = role === "mentor" ? "mentee" : "mentor";
        type.value = `${titleCase(search)}s`;
        searchType.value = `Search ${titleCase(search)}s`;
        const res = await profile.fetchYourProfileByRole(search);
        const { data } = await res.json();
        const { fetchProfileAccordingToRole } = data;
        collaborateFiltering.forEach((recommend: any) => {
          users.push({
            key: `/u/${recommend.email.split(".")[0]}`,
            email: recommend.email,
            probability: [recommend.probability],
            fullName: recommend.fullName,
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
