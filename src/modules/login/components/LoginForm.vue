<script setup lang="ts">
import { useForm, useField } from 'vee-validate';

import { loginSchema } from '../login.schema';
import { useUserStore } from '@/store';

const userStore = useUserStore();

const initialValues = {
    email: '',
    password: ''
};

const { handleSubmit } = useForm({
    validationSchema: loginSchema,
    initialValues
});

const { value: email, errorMessage: errorEmail } = useField<string>('email');
const { value: password, errorMessage: errorPassword } = useField<string>('password');

const onSubmit = handleSubmit(async (values) => {
    try {
        userStore.login(values);
        const sessionKey = 'req-path';
        const reqPath = sessionStorage.getItem(sessionKey);
        sessionStorage.removeItem(sessionKey);

        window.location.href = reqPath ?? '/dashboard';
    } catch (error) {
        console.log(error);
    }
});
</script>

<template>
    <form class="login-form" @submit="onSubmit">
        <app-text
            v-model="email"
            name="email"
            placeholder="Электронная почта"
            :error="errorEmail"
        />
        <app-password
            name="password"
            placeholder="Пароль"
            v-model="password"
            :error="errorPassword"
        />

        <app-button label="Войти" type="submit" />
    </form>
</template>

<style scoped lang="scss">
.login-form {
    display: flex;
    gap: 30px;
    flex-direction: column;
    align-items: center;
    max-width: 400px;
    transition: var(--el-transition-all);
}
</style>
