import { ref, computed } from 'vue';
import { defineStore } from 'pinia';

import type { IBasketProduct } from '@/modules/basket/basket.types';
import type { IProduct } from '@/modules/dashboard/product.types';

export const useBasketStore = defineStore('basket', () => {
    const basketProducts = ref<IBasketProduct[]>([]);

    const productCounts = computed(() => {
        return basketProducts.value.length;
    });

    const findProductInBasket = (product: IProduct) => {
        const findProduct = basketProducts.value.find(
            (item) => product.id === item.product.id
        );
        return findProduct;
    };

    const addProductInBasket = (product: IProduct, count?: number) => {
        if (findProductInBasket(product) && count !== undefined) {
            basketProducts.value = basketProducts.value.map((item) => {
                if (item.product.id === product.id) {
                    item.count = count;
                }
                return item;
            });
            basketProducts.value = basketProducts.value.filter(
                (item) => item.count !== 0
            );
        }
    };

    const addNewProduct = (product: IProduct) => {
        if (!findProductInBasket(product)) {
            basketProducts.value.push({
                id: basketProducts.value.length + 1,
                count: 1,
                product
            });
        }
    };

    return {
        productCounts,
        basketProducts,

        addProductInBasket,
        findProductInBasket,
        addNewProduct
    };
});
