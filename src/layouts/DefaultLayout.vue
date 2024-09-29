<script setup lang="ts">
import AppHeader from '../components/header/AppHeader.vue';
</script>

<template>
    <div>
        <AppHeader />

        <main class="page-container">
            <slot />
        </main>
    </div>
</template>

<style scoped lang="scss"></style>
