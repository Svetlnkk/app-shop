<script setup lang="ts">
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';

import BasketTable from './BasketTable.vue';
import OrderDoneModal from './OrderDoneModal.vue';

import { useBasketStore } from '@/store';

const router = useRouter();

const basketStore = useBasketStore();

const isOpenModal = ref(false);

const resultCount = computed(() => {
    let res = 0;
    basketStore.basketProducts.forEach((item) => {
        res += item.count;
    });
    return res;
});

const resultSum = computed(() => {
    let res = 0;
    basketStore.basketProducts.forEach((item) => {
        res += item.count * item.product.price;
    });
    return res.toFixed(2);
});

const cleanBasket = () => {
    isOpenModal.value = false;
    basketStore.basketProducts = [];
};
</script>

<template>
    <div class="basket-product" v-if="basketStore.basketProducts.length > 0">
        <BasketTable :basketProducts="basketStore.basketProducts" />
        <div class="order-price">
            <span class="order-price__info"
                >Всего {{ resultCount }} товаров на сумму {{ resultSum }}</span
            >
            <app-button
                label="Оформить"
                viewStyle="secondary"
                @click="isOpenModal = true"
            />
        </div>
    </div>
    <div class="table-empty" v-else>
        <span>Корзина пуста</span>
        <app-button label="К покупкам!" @click="router.push({ name: 'Dashboard' })" />
    </div>

    <OrderDoneModal v-if="isOpenModal" @close="cleanBasket" />
</template>

<style scoped lang="scss">
.order-price {
    display: flex;
    flex-direction: row;
    gap: 16px;
    align-items: center;
    justify-content: space-between;

    &__info {
        font-size: 32px;
        font-weight: 600;
        line-height: 24px;
    }
}

.basket-product {
    display: flex;
    flex-direction: column;
    gap: 32px;
}

table {
    display: block;
    width: 100%;
    background-color: #fff;

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

.table-empty {
    display: flex;
    justify-content: center;
    flex-direction: column;
    gap: 16px;
    align-items: center;
}
</style>
