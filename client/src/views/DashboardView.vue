<template>
  <div v-if="!isVerified">
    <a-alert
      message="Please check your email to verify your account!!!"
      banner
    />
    <a-button type="ghost" @click="resendEmail"
      >Resend verification link</a-button
    >
  </div>
  <div v-if="!hasProfile">
    <a-alert message="Please create your profile!!!" banner />
    <a-button type="ghost" @click="createProfile">Create Profile</a-button>
  </div>
  <div>
    <!-- Mentors -->
    <a-breadcrumb style="margin: 16px 0">
      <a-breadcrumb-item>Mentor</a-breadcrumb-item>
    </a-breadcrumb>
    <div :style="{ padding: '24px', background: '#fff', minHeight: '360px' }">
      Here are your mentors.
      <a-row>
        <a-col
          :xs="20"
          :sm="16"
          :md="16"
          :lg="12"
          :xl="6"
          style="margin: 0 auto"
        >
          <a-card hoverable style="padding: 1rem; margin: 1rem">
            <template #cover>
              <img
                alt="mentor"
                src="https://www.insidehimalayas.com/wp-content/uploads/2017/11/Nepali-Man-Patan-Durbar-Square-1_edit.jpg"
              />
            </template>
            <a-card title="mentor" :bordered="false"></a-card>
            <!-- <a-tag color="purple" v-for="(skill, index) in mentor.skills" :key="index"> {{ skill }} -->
            <!-- </a-tag> -->
          </a-card>
        </a-col>
      </a-row>
    </div>

    <!-- Room -->
    <a-breadcrumb style="margin: 16px 0">
      <a-breadcrumb-item>Room</a-breadcrumb-item>
    </a-breadcrumb>

    <div :style="{ padding: '24px', background: '#fff', minHeight: '360px' }">
      Here's your room.
      <a-row>
        <a-col
          :xs="20"
          :sm="16"
          :md="16"
          :lg="12"
          :xl="6"
          style="margin: 0 auto"
        >
          <a-card hoverable style="padding: 1rem; margin: 1rem">
            <a-card title="room" :bordered="false"></a-card>
            <!-- <a-tag color="purple" v-for="(skill, index) in mentor.skills" :key="index"> {{ skill }} -->
            <!-- </a-tag> -->
          </a-card>
        </a-col>
      </a-row>
    </div>
    <!-- Application -->
    <a-breadcrumb style="margin: 16px 0">
      <a-breadcrumb-item>Application</a-breadcrumb-item>
    </a-breadcrumb>

    <div :style="{ padding: '24px', background: '#fff', minHeight: '360px' }">
      Here's your Application.
      <a-row>
        <a-col
          :xs="20"
          :sm="16"
          :md="16"
          :lg="12"
          :xl="6"
          style="margin: 0 auto"
        >
          <a-card hoverable style="padding: 1rem; margin: 1rem">
            <a-card title="application" :bordered="false"></a-card>
            <!-- <a-tag color="purple" v-for="(skill, index) in mentor.skills" :key="index"> {{ skill }} -->
            <!-- </a-tag> -->
          </a-card>
        </a-col>
      </a-row>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";
import {
  PieChartOutlined,
  DesktopOutlined,
  UserOutlined,
  TeamOutlined,
  FileOutlined,
} from "@ant-design/icons-vue";
import { account } from "@/utils/account";
import { message } from "ant-design-vue";
export default defineComponent({
  components: {
    PieChartOutlined,
    DesktopOutlined,
    UserOutlined,
    TeamOutlined,
    FileOutlined,
  },
  data() {
    return {
      collapsed: ref<boolean>(false),
      selectedKeys: ref<string[]>(["1"]),
      isVerified: ref<boolean>(false || !localStorage.getItem("isverified")),
      hasProfile: ref<boolean>(false || !localStorage.getItem("hasProfile")),
    };
  },
  mounted() {
    const token = localStorage.getItem("authtoken");
    if (token?.length) {
      account
        .isVerfied(token)
        .then((res: any) => res.json())
        .then((data: any) => {
          const {
            data: { me },
          } = data;
          if (!me) {
            localStorage.clear();
            this.$router.push("/login");
          }
          this.isVerified = me?.verified;
        });
    }
    const authToken = localStorage.getItem("authtoken");
    if (authToken?.length) {
      account
        .fetchYourProfile(authToken)
        .then((res: any) => res.json())
        .then((data: any) => {
          console.log("datatata", data);
          const {
            data: { me },
          } = data;
          if (!me?.userprofile) this.hasProfile = false;
        });
    }
  },
  methods: {
    async resendEmail() {
      const email = localStorage.getItem("email");
      const token = localStorage.getItem("authtoken");
      if (email?.length && token?.length) {
        const res = await account.resendActivationEmail(email);
        const { data } = await res.json();
        const { resendActivationEmail } = data;
        const { errors, success } = resendActivationEmail;
        for (const i in errors) {
          for (const j of errors[i]) {
            message.error(j.message);
          }
        }
        if (success) {
          localStorage.setItem("email", email);
          localStorage.setItem("authtoken", token);
          message.success("Email resend successfully!!!");
        }
      }
    },
    async createProfile() {
      this.$router.push("/create-profile");
    },
  },
});
</script>

<style>
#components-layout-demo-side .logo {
  height: 32px;
  margin: 16px;
  background: rgba(255, 255, 255, 0.3);
}

.site-layout .site-layout-background {
  background: #fff;
}

[data-theme="dark"] .site-layout .site-layout-background {
  background: #141414;
}
</style>
