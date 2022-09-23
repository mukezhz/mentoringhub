<template>
  <a-layout has-slider style="min-height: 100vh">
    <a-layout-sider :style="{ overflow: 'auto' }" collapsible>
      <div class="logo" />
      <a-menu theme="dark" mode="inline">
        <router-link to="/dashboard">
          <a-menu-item key="1">
            <home-outlined style="font-size: 200%" />
            <span class="nav-text">Home</span>
          </a-menu-item>
        </router-link>

        <router-link v-if="type.length" :to="url">
          <a-menu-item key="2">
            <team-outlined style="font-size: 200%" />
            <span class="nav-text">{{ type }}s</span>
          </a-menu-item>
        </router-link>

        <router-link to="/room">
          <a-menu-item key="3">
            <apartment-outlined style="font-size: 200%" />
            <span class="nav-text">Rooms</span>
          </a-menu-item>
        </router-link>

        <router-link to="/application">
          <a-menu-item key="4">
            <file-add-outlined style="font-size: 200%" />
            <span class="nav-text">Applications</span>
          </a-menu-item>
        </router-link>

        <router-link to="/premeet">
          <a-menu-item key="5">
            <cluster-outlined style="font-size: 200%" />
            <span class="nav-text">PreMeet</span>
          </a-menu-item>
        </router-link>
      </a-menu>
    </a-layout-sider>

    <a-layout>
      <a-layout-header style="padding: 0">
        <a-menu theme="dark">
          <a-row justify="end">
            <!-- Notification Icon -->
            <a-col span="1">
              <a-dropdown :trigger="['click']">
                <a-badge count="1">
                  <a class="ant-dropdown-link">
                    <NotificationOutlined style="font-size: 150%" />
                  </a>
                </a-badge>
                <template #overlay>
                  <a-list
                    size="large"
                    bordered
                    :data-source="notificationsData"
                  >
                    <template #renderItem="{ item }">
                      <a-list-item>
                        <a>{{ item }}</a>
                      </a-list-item>
                    </template>
                    <template #header>
                      <div>Your Notifications</div>
                    </template>
                  </a-list>
                </template>
              </a-dropdown>
            </a-col>

            <!-- User Icon -->
            <a-col span="1">
              <a-dropdown placement="bottomRight" trigger="click" size="large">
                <a href="#">
                  <a-avatar shape="circle" size="large">
                    <template #icon><UserOutlined /></template> </a-avatar
                ></a>
                <template #overlay>
                  <a-menu>
                    <router-link to="/profile">
                      <a-menu-item> <user-outlined /> Profile </a-menu-item>
                    </router-link>
                    <router-link to="/settings">
                      <a-menu-item>
                        <setting-outlined /> Settings
                      </a-menu-item></router-link
                    >
                    <a-menu-item>
                      <a-button @click="logout">
                        <logout-outlined />
                        Log Out
                      </a-button>
                    </a-menu-item>
                  </a-menu>
                </template>
              </a-dropdown>
            </a-col>
          </a-row>
        </a-menu>
      </a-layout-header>

      <a-layout-content style="margin: 10px 16px">
        <RouterView />
      </a-layout-content>
      <a-layout-footer style="text-align: center">
        <a-divider />
        Mentoring Hub &copy; 2022
      </a-layout-footer>
    </a-layout>
  </a-layout>
</template>
<script lang="ts">
import {
  FileAddOutlined,
  ApartmentOutlined,
  UsergroupAddOutlined,
  HomeOutlined,
  UserOutlined,
  TeamOutlined,
  FileOutlined,
  NotificationOutlined,
  SettingOutlined,
  LogoutOutlined,
  ClusterOutlined,
} from "@ant-design/icons-vue";
import { defineComponent, ref, onMounted, reactive } from "vue";
import { message } from "ant-design-vue";

account;
import { account } from "@/graphql/account";
import { titleCase } from "@/utils/string";
import { useRouter } from "vue-router";
export default defineComponent({
  components: {
    FileAddOutlined,
    ApartmentOutlined,
    UsergroupAddOutlined,
    HomeOutlined,
    UserOutlined,
    TeamOutlined,
    FileOutlined,
    NotificationOutlined,
    SettingOutlined,
    LogoutOutlined,
    ClusterOutlined,
  },
  setup() {
    // const collapsed = ref<boolean>(false);
    // const selectedKeys = ref<string[]>(["1"]);
    const notified = ref<number>(0);
    const notificationsData = reactive<string[]>([
      "Your Mentorship has been approved.",
      "Your Mentorship for this person is rejected.",
      "Notification 3",
      "Notification 4",
    ]);
    const type = ref<string>("");
    const url = ref<string>("");
    const router = useRouter();

    onMounted(() => {
      const token = localStorage.getItem("authtoken");
      if (!token) return;
      account
        .fetchYourProfile(token)
        .then((d) => d.json())
        .then((d) => {
          const { data } = d;
          const { me } = data;
          const { userprofile = null } = me;
          if (!userprofile)
            return message.warn("Please create user profile!!!");
          const role = userprofile.role;
          const search = role.toLowerCase() === "mentor" ? "mentee" : "mentor";
          type.value = titleCase(search);
          url.value = `/${search.toLowerCase()}`;
        });
    });

    function logout() {
      localStorage.clear();
      message.success("Logout Successful!");
      router.push("/");
    }
    return {
      logout,
      // collapsed,
      // selectedKeys,
      notified,
      notificationsData,
      type,
      url,
      router,
    };
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
