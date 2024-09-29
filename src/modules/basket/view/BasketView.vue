<script setup lang="ts">
import BasketBlock from '../components/BasketBlock.vue';
</script>

<template>
    <div class="app-basket-container">
        <div class="app-basket-container__title">Товары в корзине</div>

        <BasketBlock />
    </div>
</template>

<style scoped lang="scss">
.app-basket-container {
    display: flex;
    flex-direction: column;
    gap: 32px;
    padding: 32px;

    &__title {
        font-size: var(--font-size-lg);
        font-weight: var(--font-weight-bold);
        line-height: var(--font-line-height-medium);
    }
}
</style>
