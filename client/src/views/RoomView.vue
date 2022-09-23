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
import { meeting } from "@/graphql/meeting";
import { message } from "ant-design-vue";
import { defineComponent, ref, onMounted, reactive } from "vue";
export default defineComponent({
  setup() {
    const value = ref<string>("");

    const onSearch = (searchValue: string) => {
      console.log("use value", searchValue);
      console.log("or use this.value", value.value);
    };
    const columns = [
      {
        title: "Room Name",
        dataIndex: "name",
        key: "name",
      },
      {
        title: "Title",
        dataIndex: "title",
        key: "title",
      },
      {
        title: "Status",
        dataIndex: "status",
        key: "status",
      },
      {
        title: "Mentor",
        dataIndex: "mentor",
        key: "mentor",
      },
    ];
    const roomData = reactive<any>([]);
    onMounted(async () => {
      const res = await meeting.fetchYourMeetings();
      const { data } = await res.json();
      const { fetchYourMeetings } = data;
      console.log(fetchYourMeetings);
      if (!fetchYourMeetings) return message.info("unable to fetch data");
      console.log(fetchYourMeetings);
      fetchYourMeetings;
      fetchYourMeetings.forEach((meeting: any) => {
        roomData.push({
          key: meeting.id,
          title: meeting.title,
          name: meeting.room,
          status: meeting.status,
          mentor: meeting.users.email,
        });
      });
    });

    return {
      value,
      onSearch,
      roomData,
      columns,
    };
  },
});
</script>
