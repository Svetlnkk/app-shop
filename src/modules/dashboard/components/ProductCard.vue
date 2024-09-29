<script setup lang="ts">
import { computed } from 'vue';

import type { IProduct } from '../product.types';
import { useBasketStore } from '@/store';

interface IProps {
    product: IProduct;
}

const basketStore = useBasketStore();

const props = defineProps<IProps>();

const checkProductBasket = computed(() => {
    return basketStore.findProductInBasket(props.product) ? true : false;
});
</script>

<template>
    <div class="product-card-container">
        <div class="product-card">
            <div class="product-card__logo">
                <app-image
                    :src="product.image"
                    preview
                    lazy
                    style="width: 282px; height: 179px; border-radius: 8px"
                />
            </div>
            <span class="product-card__name">{{ product.title }}</span>
            <app-button
                :label="checkProductBasket ? 'В корзине' : 'В корзину'"
                :disabled="checkProductBasket"
                @click="basketStore.addNewProduct(product)"
            />
        </div>
    </div>
</template>

<style scoped lang="scss">
.product-card-container {
    display: flex;
    width: 282px;
}

.product-card {
    display: flex;
    background: var(--bg-island-color);
    box-shadow: var(--shadow-default);
    border-radius: var(--card-border-radius);
    flex-direction: column;
    padding: 8px;
    gap: 8px;
    justify-content: space-between;
    align-items: center;

    &__name {
        display: flex;
        font-weight: var(--font-weight-bold);
        font-size: var(--font-size-sm);
        line-height: var(--font-line-height);
    }

    &:hover {
        box-shadow: var(--shadow-default-secondary);
    }
}
</style>
