<script setup lang="ts">
import LoginForm from '../components/LoginForm.vue';
</script>

<template>
    <div class="login-container">
        <div class="login-content">
            <span class="login-content__title">Авторизация</span>
            <LoginForm />
        </div>
    </div>
</template>

<style scoped lang="scss">
.login-container {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
}

.login-content {
    display: flex;
    flex-direction: column;
    gap: 32px;
    align-items: center;

    &__title {
        font-weight: var(--font-weight-bold);
        font-size: var(--font-size-l);
        line-height: var(--font-line-height-medium);
    }
}
</style>
