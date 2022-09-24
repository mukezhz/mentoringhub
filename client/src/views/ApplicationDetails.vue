<template>
  <a-card>
    <a-descriptions title="Application Details" :column="1">
      <a-descriptions-item label="Title">
        {{ applications.title }}
      </a-descriptions-item>
      <a-descriptions-item label="Mentor Email">
        {{ applications.mentorId }}
      </a-descriptions-item>
      <a-descriptions-item label="Mentee Email">
        {{ applications.menteeId }}
      </a-descriptions-item>
      <a-descriptions-item label="Status">
        <a-tag> {{ applications.status }} </a-tag>
      </a-descriptions-item>
      <a-descriptions-item label="QNA">
        <div v-for="(application, index) in applications.qna" :key="index">
          <div>
            {{ application.question }}
          </div>
          <div>
            {{ application.answer }}
          </div>
        </div>
      </a-descriptions-item>
    </a-descriptions>
  </a-card>
</template>
<script lang="ts" setup>
import { mentorship } from "@/graphql/mentorship";
import { ref, onMounted, reactive } from "vue";
import { useRoute } from "vue-router";
const applications = reactive<any>({});

const route = useRoute();
onMounted(async () => {
  const applicationId = route.params.application;
  const res = await mentorship.fetchMentorshipById(applicationId);
  const { data } = await res.json();
  const { fetchMentorshipById } = data;
  applications.available = fetchMentorshipById.available;
  applications.availableHour = fetchMentorshipById.availableHour;
  applications.mentorId = fetchMentorshipById.mentorId;
  applications.menteeId = fetchMentorshipById.menteeId;
  applications.qna = JSON.parse(fetchMentorshipById.qna);
  applications.status = fetchMentorshipById.status;
  applications.title = fetchMentorshipById.title;
  console.log(applications);
});
</script>
