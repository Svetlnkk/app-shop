<script setup lang="ts">
import TableCard from './TableCard.vue';
import TableHeader from './TableHeader.vue';

import type { IBasketProduct } from '../basket.types';

interface IProps {
    basketProducts: IBasketProduct[];
}

defineProps<IProps>();
</script>

<template>
    <table>
        <TableHeader />
        <tbody>
            <TableCard
                v-for="product in basketProducts"
                :key="product.id"
                :product="product"
            />
        </tbody>
    </table>
</template>

<style scoped lang="scss">
table {
    display: block;
    width: 100%;
    background-color: var(--bg-island-color);

    display: table;
    table-layout: auto;
    border-collapse: separate;
    border-spacing: 8px 16px;
    margin: 0 -16px;
    width: calc(100% + 32px);
    background-color: transparent;

    tbody {
        display: table-row-group;
    }
}
</style>
