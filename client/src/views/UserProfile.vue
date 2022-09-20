<template>
  <a-layout>
    <!-- content start -->
    <a-layout-content :style="{ padding: '20px 70px', marginTop: '64px' }">
      <div :style="{ padding: '24px', minHeight: '380px' }">
        <a-row justify="center">
          <a-col :span="10">
            <a-card>
              <a-card-meta
                :title="formState.user.email"
                :description="formState.user.role"
              >
                <template #avatar>
                  <a-avatar
                    :size="{ xs: 24, sm: 32, md: 40, lg: 64, xl: 80, xxl: 100 }"
                  >
                    <template #icon>
                      <UserOutlined />
                    </template>
                  </a-avatar>
                </template>
              </a-card-meta>
              <a-divider>
                <a-typography>User Details</a-typography>
              </a-divider>
              <a-descriptions bordered :column="1">
                <a-descriptions-item label="Full Name">{{
                  formState.user.fname
                }}</a-descriptions-item>
                <a-descriptions-item label="Role">{{
                  formState.user.role
                }}</a-descriptions-item>
                <a-descriptions-item label="Date of Birth">{{
                  formState.user.dob
                }}</a-descriptions-item>
                <a-descriptions-item label="Email">{{
                  formState.user.email
                }}</a-descriptions-item>
                <a-descriptions-item label="Country">{{
                  formState.user.country
                }}</a-descriptions-item>
                <a-descriptions-item label="Interests">{{
                  formState.user.interests
                }}</a-descriptions-item>
                <a-descriptions-item label="Skills">{{
                  formState.user.skills
                }}</a-descriptions-item>
                <a-descriptions-item label="Languages">{{
                  formState.user.languages
                }}</a-descriptions-item>
                <a-descriptions-item label="Bio">{{
                  formState.user.bio
                }}</a-descriptions-item>
              </a-descriptions>
            </a-card>
          </a-col>
        </a-row>
        <template v-if="formState.user.role == 'mentor'">
          <a-row justify="center">
            <a-col :span="8">
              <a-divider></a-divider>
              <a-row justify="center">
                <MentorshipForm />
              </a-row>
            </a-col>
          </a-row>
        </template>
      </div>
    </a-layout-content>
  </a-layout>
</template>
<script lang="ts">
import { defineComponent, reactive, onMounted } from "vue";
import MentorshipForm from "../components/MentorshipForm.vue";
import { UserOutlined } from "@ant-design/icons-vue";

export default defineComponent({
  components: {
    UserOutlined,
    MentorshipForm,
  },

  setup() {
    const formState = reactive({
      user: {
        fname: "Test  ",
        email: "test@gmail.com",
        role: "mentor",
        skills: "This is skill",
        interests: "This is interest",
        country: "Nepal",
        languages: "",
        dob: "2022/10/14",
        bio: "",
      },
    });
    onMounted(async () => {
      console.log("Fetch the user profile and fill the value!!!");
    });
    return {
      formState,
    };
  },
});
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

#components-layout-demo-fixed .logo {
  width: 120px;
  height: 31px;
  background: rgba(255, 255, 255, 0.2);
  margin: 16px 24px 16px 0;
  float: left;
}

.site-layout .site-layout-background {
  background: #fff;
}

[data-theme="dark"] .site-layout .site-layout-background {
  background: #141414;
}
</style>
