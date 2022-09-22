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
              <div v-if="hasProfile">
                <a-divider>
                  <a-typography>User Details</a-typography>
                </a-divider>
                <a-descriptions bordered :column="1">
                  <a-descriptions-item label="Full Name">{{
                    formState.user.fullName
                  }}</a-descriptions-item>
                  <a-descriptions-item label="Role">{{
                    formState.user.role
                  }}</a-descriptions-item>
                  <a-descriptions-item label="Date of Birth">{{
                    formState.user.dateOfBirth
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
              </div>
              <div v-else>
                <a-button type="dashed" @click="createProfile">
                  Create Your Profile
                </a-button>
              </div>
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
import { defineComponent, reactive, onMounted, ref } from "vue";
import MentorshipForm from "../components/MentorshipForm.vue";
import { UserOutlined } from "@ant-design/icons-vue";
import { useRoute, useRouter } from "vue-router";
import { profile } from "@/graphql/userprofile";
import { message } from "ant-design-vue";

export default defineComponent({
  components: {
    UserOutlined,
    MentorshipForm,
  },

  setup() {
    const route = useRoute();
    const router = useRouter();
    onMounted(async () => {
      if (route.path === "/profile") {
        const res = await (await profile.fetchYourProfile()).json();
        const { data } = res;
        const { fetchYourProfile } = data;
        if (!fetchYourProfile) hasProfile.value = false;
        else {
          hasProfile.value = true;
          for (const k in fetchYourProfile) {
            formState.user[k] = fetchYourProfile[k];
          }
          formState.user.email = fetchYourProfile.user.email;
        }
      } else {
        const { username } = route.params;
        console.log("username", username);
        const res = await (
          await profile.fetchYourProfileByUsername(username)
        ).json();
        const { errors, data } = res;
        console.log(errors, data);
        if (errors.length) {
          for (const error of errors) {
            message.error(error.message);
          }
        }
      }
      console.log(route.params, route.path);
    });
    const hasProfile = ref<boolean>(false);
    const formState = reactive<any>({
      user: {
        address: "",
        city: "",
        fullName: "",
        email: "",
        role: "",
        skills: "",
        interests: "",
        country: "",
        languages: "",
        dateOfBirth: "",
        bio: "",
        gender: "",
        mobilePhone: "",
        profession: "",
      },
    });
    onMounted(async () => {
      console.log("Fetch the user profile and fill the value!!!");
    });
    function createProfile() {
      router.push("/create-profile");
    }
    return {
      formState,
      hasProfile,
      createProfile,
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
