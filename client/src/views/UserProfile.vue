<template>
    <a-layout>
      <a-layout-header :style="{ position: 'fixed', zIndex: 1, width: '100%' }">

        <div class="logo" />

        <a-row justify="end">
            <a-col :span="1">
          <!-- User Avatar   -->
                <a-dropdown placement="bottomRight" size="large">
                    <a-avatar size="large">
                        <template #icon><UserOutlined /></template>
                    </a-avatar>
                    <template #overlay>
                    <a-menu>
                        <a-menu-item>
                        <a rel="noopener noreferrer" href="#">
                            <user-outlined /> Profile
                        </a>
                        </a-menu-item>
                        <a-menu-item>
                        <a rel="noopener noreferrer" href="#">
                            <setting-outlined /> Settings
                        </a>
                        </a-menu-item>
                        <a-menu-item>
                        <a rel="noopener noreferrer" href="#">
                            <logout-outlined /> Log Out
                        </a>
                        </a-menu-item>
                    </a-menu>
                    </template>
                </a-dropdown>
      <!-- User Avatar -->
                
            </a-col>
        </a-row>
      </a-layout-header>
      <!-- header end -->
      
      <!-- content start -->

      <a-layout-content :style="{ padding: '20px 70px', marginTop: '64px' }">
        <div :style="{ padding: '24px', minHeight: '380px' }">
            <a-row justify="center">
                <a-col>
                    <a-card style="width: 400px">
                        <a-card-meta title="Name" description="role" >
                        <template #avatar>
                            <a-avatar :size="{ xs: 24, sm: 32, md: 40, lg: 64, xl: 80, xxl: 100 }">
                                <template #icon>
                                <UserOutlined />
                                </template>
                            </a-avatar>
                        </template>
                        </a-card-meta>
                        <a-divider>
                            User Details
                        </a-divider>
                        <a-descriptions bordered :column="1">
                            <a-descriptions-item label="Full Name">Zhou Maomao</a-descriptions-item>
                            <a-descriptions-item label="Contact">1810000000</a-descriptions-item>
                            <a-descriptions-item label="Address">Hangzhou, Zhejiang</a-descriptions-item>
                        </a-descriptions>
                    </a-card>
                </a-col>
            </a-row>
            <a-divider>Additional Details</a-divider>

        </div>
      </a-layout-content>



      <a-layout-footer :style="{ textAlign: 'center' }">
        Mentoring Hub © 2022 
      </a-layout-footer>
    </a-layout>
    
  </template>
  <script lang="ts">
  import { defineComponent, ref } from 'vue';
  import { UserOutlined, 
    SettingOutlined,
    LogoutOutlined,
 } from '@ant-design/icons-vue';
  export default defineComponent({
    components:{
        UserOutlined,
        SettingOutlined,
        LogoutOutlined,


    },
    setup() {
      return {
        selectedKeys: ref<string[]>(['2']),
      };
    },
  });
  </script>
  <style>
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
  
  [data-theme='dark'] .site-layout .site-layout-background {
    background: #141414;
  }
  </style>
  