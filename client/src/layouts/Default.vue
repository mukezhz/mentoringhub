<template>
  <a-layout has-slider style="min-height: 100vh">
    <a-layout-sider :style="{ overflow: 'auto' }" collapsible>
      <div class="logo" />
      <a-menu theme="dark" mode="inline">
        <router-link to="dashboard">
          <a-menu-item key="1">
            <home-outlined />
            <span class="nav-text">Home</span>
          </a-menu-item>
        </router-link>

        <router-link to="mentor">
          <a-menu-item key="2">
            <team-outlined />
            <span class="nav-text">Mentors</span>
          </a-menu-item>
        </router-link>

        <router-link to="room">
          <a-menu-item key="3">
            <apartment-outlined />
            <span class="nav-text">Rooms</span>
          </a-menu-item>
        </router-link>

        <router-link to="application">
          <a-menu-item key="4">
            <file-add-outlined />
            <span class="nav-text">Applications</span>
          </a-menu-item>
        </router-link>

        <router-link to="premeet">
          <a-menu-item key="5">
            <ClusterOutlined />
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
                    item-layout="horizontal"
                    :data-source="notificationsData"
                  >
                    <a-list-item>
                      <a-list-item-meta> {{}} </a-list-item-meta>
                    </a-list-item>
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
                    <router-link to="profile">
                      <a-menu-item> <user-outlined /> Profile </a-menu-item>
                    </router-link>
                    <router-link to="settings">
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
import { defineComponent, ref } from "vue";
import { message } from "ant-design-vue";
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
  data() {
    return {
      collapsed: ref<boolean>(false),
      selectedKeys: ref<string[]>(["1"]),
      notified: ref<number>(0),
      notificationsData: ref<string>(""),
    };
  },
  methods: {
    logout() {
      localStorage.clear();
      this.$router.push("/");
      message.success("Logout Successful!");
    },
  },
  // onMounted(() => {
  //     setInterval(() => {
  //       this.notified = this.notified + 1;
  //     }, 5000);
  // })
  // watch: {
  //   notified: function (val) {
  //     console.log(val);
  // },
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
