<template>
  <a-layout style="min-height: 100vh">
    <a-layout-sider collapsible>
      <div class="logo" />
      <a-menu theme="dark" mode="inline">
        <router-link to="dashboard">
          <a-menu-item key="1">
            <pie-chart-outlined />
            <span> Home</span>
          </a-menu-item>
        </router-link>

        <router-link to="mentor">
          <a-menu-item key="2">
            <smile-outlined />
            <span> Mentors</span>
          </a-menu-item>
        </router-link>

        <router-link to="room">
          <a-menu-item key="3">
            <file-outlined />
            <span> Room</span>
          </a-menu-item>
        </router-link>

        <router-link to="application">
          <a-menu-item key="4">
            <desktop-outlined />
            <span> Application</span>
          </a-menu-item>
        </router-link>
      </a-menu>
    </a-layout-sider>
    <a-layout>
      <a-layout-header style="padding: 0 ">
        <a-menu>
          <a-row justify="space-between">
            <a-col flex="100px">Icon</a-col>
            <!-- <a-col flex="auto">auto</a-col> -->
            <a-sub-menu key="sub1">
              <template #icon>
                <NotificationOutlined />
              </template>
              <template #title flex="auto">Notification</template>
              <a-menu-item key="5">This is notification 1.</a-menu-item>
              <a-menu-item key="6">This is notification 2.</a-menu-item>
            </a-sub-menu>
          </a-row>
        </a-menu>

      </a-layout-header>

      <a-layout-content style="margin: 0 16px">
        <RouterView />
      </a-layout-content>
      <a-layout-footer style="text-align: center">
        Mentoring Hub &copy; 2022
      </a-layout-footer>
    </a-layout>
  </a-layout>
</template>
<script lang="ts">
import {
  PieChartOutlined,
  DesktopOutlined,
  UserOutlined,
  SmileOutlined,
  TeamOutlined,
  FileOutlined,
  NotificationOutlined
} from '@ant-design/icons-vue';
import { Col, Row } from 'ant-design-vue'
import { defineComponent, ref } from 'vue';
import { RouterView, RouterLink } from 'vue-router';
export default defineComponent({
  components: {
    PieChartOutlined,
    DesktopOutlined,
    SmileOutlined,
    UserOutlined,
    TeamOutlined,
    FileOutlined,
    NotificationOutlined
  },
  data() {
    return {
      collapsed: ref<boolean>(false),
      selectedKeys: ref<string[]>(['1']),
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

[data-theme='dark'] .site-layout .site-layout-background {
  background: #141414;
}
</style>

<style scoped>

</style>