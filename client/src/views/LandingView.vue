<template>
  <a-layout class="layout">
    <a-layout-header>
      <div class="logo" />

<!-- Menu Start -->
      <a-menu 
      theme="dark" 
      mode="horizontal" 
      :style="{ lineHeight: '64px' }">

        <router-link :to="{ name: 'home' }">
          <a-menu-item key="1">Home
          </a-menu-item>
        </router-link>

        <a href=#faq>
          <a-menu-item key="2">Mentors
          </a-menu-item>
        </a>

        <a href="#faq">
          <a-menu-item key="3">F.A.Q.
          </a-menu-item>
        </a>

        <router-link :to="{ name: 'about' }"> 
          <a-menu-item key="4">About 
          </a-menu-item>
        </router-link>

        <router-link :to="{ name: 'premeet' }">
          <a-menu-item key="5">Pre Meet
          </a-menu-item>
        </router-link>

        <router-link :to="{ name: 'login' }">
          <a-menu-item key="6">Login
          </a-menu-item>
        </router-link>

      </a-menu>
    </a-layout-header>
<!-- Menu End -->
    <a-layout-content style="padding: 0 50px">
      <div
        :style="{
          background: '#fff',
          padding: '24px',
          margin: '20px',
          minHeight: '280px',
          textAlign: 'center',
        }"
      >
        <a-typography-title>Join the Mentoring Hub!</a-typography-title>
        <br />
        <img 
        src="" alt="" />

        <router-link :to="{name: 'signup'}">
        <a-button 
        size="large"
        type="primary">Connect Now</a-button>
        </router-link>
      </div>
    </a-layout-content>

    <a-layout-content style="padding: 0 50px">
      <div
        :style="{
          background: '#fff',
          padding: '24px',
          margin: '20px',
          minHeight: '280px',
        }"
      >
      <a-row justify="center">
        <a-typography-title :level="2">About Us</a-typography-title>
        <a-row justify="center">

        <a-col span="20">
        <p>
          Mentoring Hub is a web-based platform which helps to connect mentees
          with their ideal mentor. This application will try to enhance
          learner’s knowledge about real world problems and also help them to
          acquire skills sets provided by the professionals. By using the
          platform, mentees can interact with their ideal mentor online. mentees
          all around the globe can interact with mentors ie. Now they are free
          from any barrier. Mentees from any place, urban or remote area can
          communicate with mentors. As we know, guidance from the professionals
          are important for the mentees to develop careers in their respective
          fields. Using this platform, mentees can get help from professionals
          in different domains to solve their problems.
        </p>
      </a-col>
    </a-row>
      </a-row>
        <div class="logo" />
      </div>
    </a-layout-content>

    <a-layout-content style="padding: 0 50px">
      <div :style="{ background: '#fff', padding: '24px', margin: '20px' }">
        <a-row justify="center">
          <a-typography-title :level="2">Our Mentors</a-typography-title>
        </a-row>
        

        <div>
          <a-row>
            <a-col
              :xs="20" :sm="16" :md="16" :lg="12" :xl="8" 
              v-for="mentor in mentors"
              :key="mentor.id"
              style="margin: 0 auto"
            >
              <a-card hoverable style="padding: 1rem; margin: 1rem">
                <template #cover>
                  <img :alt="mentor.name" :src="mentor.image" />
                </template>
                <a-card :title="mentor.name" :bordered="false"></a-card>
                <div>
                  <a-tag
                    color="purple"
                    v-for="(skill, index) in mentor.skills"
                    :key="index"
                    :style="{ display: 'flex', justifyContent: 'center' }"
                  >
                    {{ skill }}
                  </a-tag>
                </div>
              </a-card>
            </a-col>
          </a-row>
        </div>
        <a-button type="primary">More</a-button>
      </div>
    </a-layout-content>

    <a-layout-content style="padding: 0 50px">
      <div
      :style="{ 
        background: '#fff',
        padding: '24px',
        margin: '20px',
        minHeight: '280px',
        }"
      >
        <a-typography-title id="faq"
        :level="2">Frequently Asked Questions</a-typography-title>
          <a-collapse v-model:activeKey="activeKey" accordion>
            <a-collapse-panel key="1" header="General">
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Id recusandae repudiandae earum temporibus quod omnis dignissimos mollitia voluptate quam cum quae nisi ea corrupti iure nesciunt facilis odio, voluptas ratione.</p>
            </a-collapse-panel>
            <a-collapse-panel key="2" header="What is Mentoring Hub?">
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore amet inventore numquam provident ad. Maiores, quis harum explicabo, earum ullam fugit inventore, quasi amet odit aperiam iure! Id, odit nemo.</p>
            </a-collapse-panel>
            <a-collapse-panel key="3" header="Why Mentoring Hub">
              <p> Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus recusandae, sunt nulla veritatis a deleniti aliquam non sint accusamus aspernatur optio </p>
            </a-collapse-panel>
            <a-collapse-panel key="4" header="Privacy Policy">
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos sed porro aperiam voluptate expedita rerum dicta excepturi deleniti! Eaque architecto dolor neque nam, qui vitae dolorum dignissimos vel unde explicabo!</p>
            </a-collapse-panel>
          </a-collapse>
      </div>
    </a-layout-content>

    <a-layout-footer style="text-align: center">
      Mentoring Hub &copy; 2022
    </a-layout-footer>
  </a-layout>
</template>
<script lang="ts">
import { defineComponent, ref, reactive } from "vue";
import { RouterLink } from "vue-router";
export default defineComponent({
  components: {
    RouterLink,
  },
  setup() {
    const activeKey = ref([]);
    let mentors = reactive([
      {
        id: "01",
        name: "Sameeksha Khadka",
        image:
          "https://images.unsplash.com/photo-1546961329-78bef0414d7c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60",
        skills: ["Frontend Developer", "Photography"],
        handles: {
          facebook: "KhadkaSameeksha",
        },
      },
      {
        id: "02",
        name: "Mukesh K. Chaudhary",
        image:
          "https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8N3x8dXNlcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
        skills: ["Backend Developer", "Photography"],
        handles: {
          facebook: "",
        },
      },
      {
        id: "03",
        name: "Sagun Khatri",
        image:
          "https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8N3x8dXNlcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
        skills: ["Graphics Designer", "Photography"],
        handles: {
          facebook: "",
        },
      },
    ]);
    return {
      selectedKeys: ref<string[]>(["2"]),
      mentors,
      activeKey,
    };
  },
});
</script>
<style>
.site-layout-content {
  min-height: 280px;
  padding: 24px;
  background: #fff;
}

[data-theme="dark"] .site-layout-content {
  background: #141414;
}
</style>
