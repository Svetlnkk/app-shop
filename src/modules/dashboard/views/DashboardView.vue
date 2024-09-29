<script setup lang="ts">
import { onBeforeMount, computed } from 'vue';

import SideBarFilter from '../components/SideBarFilter.vue';
import ProductCard from '../components/ProductCard.vue';

import { useProductStore } from '@/store';

const orderStore = useProductStore();

onBeforeMount(() => {
    orderStore.getAllProducts();
    orderStore.getCategories();
});
</script>

<template>
    <div class="app-dashboard">
        <SideBarFilter />
        <div class="products" v-if="orderStore.products.length > 0">
            <ProductCard
                v-for="product in orderStore.products"
                :key="product.id"
                :product="product"
            />
        </div>
        <div class="products" v-else>
            <span class="products__empty">Товары не найдены</span>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.app-dashboard {
    display: flex;
    flex-direction: row;
}

.products {
    display: flex;
    padding: 24px;
    flex-direction: row;
    gap: 24px;
    flex-wrap: wrap;
    height: fit-content;
    width: calc(100% - 285px);

    &__empty {
        display: flex;
        justify-content: center;
        width: 100%;

        font-size: var(--font-size-m);
        font-weight: var(--font-weight-bold);
        line-height: var(--font-line-height-medium);
    }
}
</style>
