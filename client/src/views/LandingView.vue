<template>
    <a-layout class="layout">
        <a-layout-header>
            <div class="logo" />
            <a-menu v-model:selectedKeys="selectedKeys" theme="dark" mode="horizontal" :style="{ lineHeight: '64px' }">
                <a-menu-item key="1">Home</a-menu-item>
                <a-menu-item key="2">Mentors</a-menu-item>
                <a-menu-item key="3">F.A.Q</a-menu-item>
                <a-menu-item key="4">About</a-menu-item>
                <a-menu-item key="5">Login</a-menu-item>
            </a-menu>
        </a-layout-header>

        <a-layout-content style="padding: 0 50px">
            <div
                :style="{ background: '#fff', padding: '24px', margin: '20px', minHeight: '280px', textAlign: 'center' }">
                <h1> Join the Mentoring Hub!</h1>  <br />
                <img src="" alt="">
                <a-button type="primary">Connect Now</a-button>
            </div>
        </a-layout-content>

        <a-layout-content style="padding: 0 50px;;">
            <div :style="{ background: '#fff', padding: '24px', margin: '20px' }">
            <h2>Our Mentors <br /></h2>
                

                <div>
                    <a-row>
                        <a-col :xs="20" :sm="16" :md="16" :lg="12" :xl="8" v-for="mentor in mentors" :key="mentor.id"
                            style="margin: 0 auto;">

                            <a-card hoverable style="padding: 1rem; margin: 1rem;">
                                <template #cover>
                                    <img :alt="mentor.name" :src="mentor.image" />
                                </template>
                                <a-card :title="mentor.name" :bordered="false"></a-card>
                                <div>
                                    <a-tag color="purple" v-for="(skill, index) in mentor.skills" :key="index"
                                        :style="{ display: 'flex', justifyContent: 'center' }"> {{ skill }}
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
            <div :style="{ background: '#fff', padding: '24px', margin: '20px', minHeight: '280px' }">
                <h2> FAQ<br /></h2>
                <p>General</p>
                <p>What is mentoring hub ?</p>
                <p>Why Mentoring ?</p>
                <p>Privacy</p>
            </div>
        </a-layout-content>

        <a-layout-content style="padding: 0 50px">
            <div :style="{ background: '#fff', padding: '24px', margin: '20px', minHeight: '280px' }">
                <h2>About US</h2> <br />
                <p>Mentoring Hub is a web-based platform which helps to connect mentees with their ideal
                    mentor. This application will try to enhance learner’s knowledge about real world problems
                    and also help them to acquire skills sets provided by the professionals.
                    By using the platform, mentees can interact with their ideal mentor online. mentees all
                    around the globe can interact with mentors ie. Now they are free from any barrier. Mentees
                    from any place, urban or remote area can communicate with mentors.
                    As we know, guidance from the professionals are important for the mentees to develop
                    careers in their respective fields. Using this platform, mentees can get help from professionals
                    in different domains to solve their problems.</p>
                <div class="logo" />
            </div>
        </a-layout-content>
        <a-layout-footer style="text-align: center">
            Mentoring Hub &copy; 2022
        </a-layout-footer>
    </a-layout>
</template>
<script lang="ts">
import { defineComponent, ref, reactive } from 'vue';
export default defineComponent({
    setup() {
        let mentors = reactive([
            {
                id: '01',
                name: 'Sameeksha Khadka',
                image: "https://images.unsplash.com/photo-1546961329-78bef0414d7c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60",
                skills: ['Frontend Developer', 'Photography'],
                handles: {
                    facebook: 'KhadkaSameeksha',
                }
            },
            {
                id: '02',
                name: 'Mukesh K. Chaudhary',
                image: 'https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8N3x8dXNlcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60',
                skills: ['Backend Developer', 'Photography'],
                handles: {
                    facebook: '',
                }
            },
            {
                id: '03',
                name: 'Sagun Khatri',
                image: 'https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8N3x8dXNlcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60',
                skills: ['Graphics Designer', 'Photography'],
                handles: {
                    facebook: '',
                }
            }
        ])
        return {
            selectedKeys: ref<string[]>(['2']),
            mentors
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

[data-theme='dark'] .site-layout-content {
    background: #141414;
}
</style>
