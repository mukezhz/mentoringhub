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

  <a-table :columns="columns" :data-source="applications">
    <template #headerCell="{ column }">
      <template v-if="column.key === 'email'">
        <span> Mentor's Email </span>
      </template>
    </template>

    <template #bodyCell="{ column, record }">
      <template v-if="column.key === 'email'">
        <span>
          <router-link :to="record.url">
            <a>{{ record.email }}</a>
          </router-link>
        </span>
      </template>
      <template v-else-if="column.key === 'title'">
        <router-link :to="url">
          {{ record.title }}
        </router-link>
      </template>

      <template v-else-if="column.key === 'status'">
        <span>
          <a-tag
            v-for="tag in record.status"
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
import { mentorship } from "@/graphql/mentorship";
import { message } from "ant-design-vue";
import { defineComponent, ref, reactive } from "vue";
import { onMounted } from "vue";
const columns = [
  {
    email: "Email",
    dataIndex: "mentor",
    key: "email",
  },
  {
    title: "Title",
    key: "title",
    dataIndex: "title",
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
  },
];

export default defineComponent({
  setup() {
    const applications = reactive<any>([]);
    const value = ref<string>("");
    const url = ref<string>("");
    const onSearch = (searchValue: string) => {
      console.log("use value", searchValue);
      console.log("or use this.value", value.value);
    };

    onMounted(async () => {
      const whoami = localStorage.getItem("role");
      if (!whoami) return;
      const email = localStorage.getItem("email");
      if (!email) return message.error("Error login properly!!!");
      const res = await mentorship.fetchYourMentorship();
      const data = await res.json();
      const {
        data: { fetchYourMentorship },
      } = data;
      if (!fetchYourMentorship) return;
      for (const mentorship of fetchYourMentorship) {
        const email =
          whoami === "mentee" ? mentorship?.mentorId : mentorship?.menteeId;
        applications.push({
          key: mentorship.id,
          email: email,
          title: mentorship.title,
          status: [mentorship.status],
          url: `/a/${mentorship.id}`,
        });
      }
      // fetchYourMentorship.forEach((app: any) => {
      //   applications.push({
      //     key: app.id,
      //     status: app.status,
      //     title: app.title,
      //   });
      // });
      console.log(data);
    });

    return {
      value,
      onSearch,
      applications,
      columns,
      url,
    };
  },
});
</script>
