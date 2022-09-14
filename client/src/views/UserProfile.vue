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
                    <a-card style="width: 500px">
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
                            <a-typography >User Details</a-typography>
                        </a-divider>
                        <a-descriptions bordered :column="1">
                            <a-descriptions-item label="Email">{{formState.user.email}}</a-descriptions-item>
                            <a-descriptions-item label="Role">Mentee</a-descriptions-item>
                        </a-descriptions>
                    </a-card>
                </a-col>
            </a-row>
            <a-divider>Additional Details</a-divider>
            <a-row justify="center">
              
              <a-col :span="8">
                <a-typography-paragraph>
                Please fill in the additional details to get the best experience and recommendations.
              </a-typography-paragraph>
              <a-divider />
                <a-form
                  :model="formState"
                  layout="vertical"
                  name="nest-messages"
                  :validate-messages="validateMessages"
                  @finish="onFinish"
                >
                  <a-form-item 
                  :name="['user', 'fname']" 
                  label="Full Name"
                  :rules="[{ required: true }]">
                    <a-input placeholder="eg: John Doe" size="large" v-model:value="formState.user.fname" />
                  </a-form-item>

                  <a-form-item 
                  :name="['user', 'introduction']" 
                  label="Introduction"
                  :rules="[{required: true}]">
                    <a-textarea placeholder="A few words about yourself." v-model:value="formState.user.introduction" />
                  </a-form-item>

                  <a-form-item 
                  :name="['user', 'dob']"
                  :rules="[{required: true}]"
                  label="Date of Birth" >
                    <a-date-picker v-model:value="formState.user.dob" value-format="YYYY-MM-DD" />
                  </a-form-item>

                  <a-form-item
                  :name="['user', 'tags']"
                  :rules="[{required: true}]"
                  label="Skills and Interests">
                    <a-select
                      v-model:value="formState.user.tags"
                      mode="tags"
                      style="width: 100%"
                      placeholder="Select Skills and Interests"
                      :options="TagsOption"
                    ></a-select>
                  </a-form-item>

                  <a-form-item
                  :name="['user', 'country']"
                  :rules="[{required: true}]"
                  label="Country">
                    <a-select
                      v-model:value="formState.user.country"
                      mode="multiple"
                      style="width: 100%"
                      placeholder="Select a Country"
                      :options="countryOptions"
                    ></a-select>
                  </a-form-item>

                  <a-form-item
                  :name="['user', 'languages']"
                  :rules="[{required: true}]"
                  label="Languages">
                    <a-select
                      v-model:value="formState.user.country"
                      mode="multiple"
                      style="width: 100%"
                      placeholder="Tags Mode"
                      :options="languageOptions"
                    ></a-select>
                  </a-form-item>
                 
                  
                 
                  
                  <a-form-item>
                    <a-button type="primary" html-type="submit">Submit</a-button>
                  </a-form-item>
                </a-form>
              </a-col>
            </a-row>

        </div>
      </a-layout-content>



      <a-layout-footer :style="{ textAlign: 'center' }">
        Mentoring Hub © 2022 
      </a-layout-footer>
    </a-layout>
    
  </template>
  <script lang="ts">
  import { defineComponent, ref, reactive } from 'vue';
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

    const validateMessages = {
      required: '${label} is required!',
      types: {
        email: '${label} is not a valid email!',
        number: '${label} is not a valid number!',
      },
      number: {
        range: '${label} must be between ${min} and ${max}',
      },
    };

    const formState = reactive({
      user: {
        fname: '',
        email:'',
        role:'',
        tags:[{}],
        country:'',
        languages:'',
        dob: undefined,
        introduction: '',
      },
    });
    const onFinish = (values: any) => {
      console.log('Success:', values);
    };
    return {
      formState,
      onFinish,
      validateMessages,
    };
  },
  });
  </script>
  <style>
  #app{
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
  
  [data-theme='dark'] .site-layout .site-layout-background {
    background: #141414;
  }
  </style>
  