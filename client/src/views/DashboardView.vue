<template>
    <div>

        <!-- Mentors -->
        <a-breadcrumb style="margin: 16px 0">
            <a-breadcrumb-item>Mentor</a-breadcrumb-item>
        </a-breadcrumb>
        <div :style="{ padding: '24px', background: '#fff', minHeight: '360px' }">
            Here are your mentors.
            <a-row>
                <a-col :xs="20" :sm="16" :md="16" :lg="12" :xl="6" style="margin: 0 auto">
                    <a-card hoverable style="padding: 1rem; margin: 1rem;">
                        <template #cover>
                            <img alt="mentor" src="https://www.insidehimalayas.com/wp-content/uploads/2017/11/Nepali-Man-Patan-Durbar-Square-1_edit.jpg" />
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
                <a-col :xs="20" :sm="16" :md="16" :lg="12" :xl="6" style="margin: 0 auto">
                    <a-card hoverable style="padding: 1rem; margin: 1rem;">
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
                <a-col :xs="20" :sm="16" :md="16" :lg="12" :xl="6" style="margin: 0 auto">
                    <a-card hoverable style="padding: 1rem; margin: 1rem;">
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
    import { defineComponent, ref } from 'vue';
    import {
        PieChartOutlined,
        DesktopOutlined,
        UserOutlined,
        TeamOutlined,
        FileOutlined,} from '@ant-design/icons-vue';

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
