<script setup lang="ts">
const emits = defineEmits(['close']);
</script>

<template>
    <app-modal @close="emits('close')" containerStyle="width: 450px">
        <div class="order-done">
            <p class="order-done__info">Заказ №{{ Math.floor(Math.random() * 1000) }}</p>
            <p class="order-done__description">Ваш заказ успешно оформлен</p>
            <app-button label="Закрыть" @click="emits('close')" />
        </div>
    </app-modal>
</template>

<style scoped lang="scss">
.order-done {
    display: flex;
    flex-direction: column;
    gap: 24px;
    align-items: center;

    &__info {
        font-size: var(--font-size-m);
        font-weight: var(--font-weight-bold);
        line-height: var(--font-line-height-medium);
    }

    &__description {
        font-size: var(--font-size-sm);
        font-weight: var(--font-weight-medium);
        line-height: var(--font-line-height);
    }
}
</style>
