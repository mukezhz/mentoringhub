<template>
    <div class="login-view">
        <a-typography-title class="text-center">Welcome to Mentoring Hub</a-typography-title>
        <a-form layout="vertical" :model="formState" name="normal_login" class="login-form" @finish="onFinish"
            @finishFailed="onFinishFailed">
            <a-form-item label="Email" name="email"
                :rules="[{ required: true, message: 'Please input your email!', type: 'email' }]">
                <a-input v-model:value="formState.email">
                    <template #prefix>
                        <UserOutlined class="site-form-item-icon" />
                    </template>
                </a-input>
            </a-form-item>

            <a-form-item label="Password" name="password"
                :rules="[{ required: true, message: 'Please input your password![min 6 characters required.]', min: 6 }]">
                <a-input-password v-model:value="formState.password">
                    <template #prefix>
                        <LockOutlined class="site-form-item-icon" />
                    </template>
                </a-input-password>
            </a-form-item>

            <div class="login-form-wrap">
                <a-form-item name="remember" no-style>
                    <a-checkbox v-model:checked="formState.remember">Remember me</a-checkbox>
                </a-form-item>
                <a class="login-form-forgot" href="">Forgot password</a>
            </div>

            <a-form-item>
                <a-button type="primary" html-type="submit" class="login-form-button">
                    Log in
                </a-button>
            </a-form-item>
            <a-form-item>
                <a-button type="primary" class="login-form-button" ghost>
                    <a href="">Register now!</a>
                </a-button>
            </a-form-item>

        </a-form>
    </div>
</template>
<script lang="ts">
import { defineComponent, reactive, computed } from 'vue';
import { UserOutlined, LockOutlined } from '@ant-design/icons-vue';
interface FormState {
    email: string;
    password: string;
    remember: boolean;
}
export default defineComponent({
    components: {
        UserOutlined,
        LockOutlined,
    },
    setup() {
        const formState = reactive<FormState>({
            email: '',
            password: '',
            remember: true,
        });
        const onFinish = (values: any) => {
            console.log('Success:', values);
        };

        const onFinishFailed = (errorInfo: any) => {
            console.log('Failed:', errorInfo);
        };
        const disabled = computed(() => {
            return !(formState.email && formState.password);
        });
        return {
            formState,
            onFinish,
            onFinishFailed,
            disabled,
        };
    },
});
</script>
<style>
@media screen and (min-width: 640px) {
    .login-view {
        width: 70%;
    }
}

@media screen and (min-width: 1020px) {
    .login-view {
        width: 45%;
    }
}

.login-view {
    /* width: 30%; */
    margin: 15vh auto;
}

#components-form-demo-normal-login .login-form {
    max-width: 300px;
}

.login-form-wrap {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 1rem;
}

#components-form-demo-normal-login .login-form-forgot {
    margin-bottom: 24px;
}

.login-form-button {
    width: 100%;
}

.ant-col label,
span,
a {
    font-size: 1.1rem;
}
</style>
