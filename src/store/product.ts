import { ref } from 'vue';
import { defineStore } from 'pinia';

import type { IProduct } from '@/modules/dashboard/product.types';
import { ALL_CATEGORY } from '@/modules/dashboard/product.constants';

export const useProductStore = defineStore('product', () => {
    const products = ref<IProduct[]>([]);
    const categories = ref<string[]>([ALL_CATEGORY]);

    const getAllProducts = async () => {
        fetch('https://fakestoreapi.com/products')
            .then((res) => res.json())
            .then((data) => {
                products.value = data;
            });
    };

    const getCategories = async () => {
        fetch('https://fakestoreapi.com/products/categories')
            .then((res) => res.json())
            .then((data) => {
                categories.value = [...categories.value, ...data];
            });
    };

    const getFilterProducts = async (
        selectCategory: string,
        minPrice: number | null,
        maxPrice: number | null
    ) => {
        if (selectCategory === ALL_CATEGORY && !minPrice && !maxPrice) {
            await getAllProducts();
        } else if (selectCategory === ALL_CATEGORY && minPrice && maxPrice) {
            await getAllProducts();
            products.value = products.value.filter(
                (item) => item.price >= minPrice && item.price <= maxPrice
            );
        } else {
            fetch(`https://fakestoreapi.com/products/category/${selectCategory}`)
                .then((res) => res.json())
                .then((data) => {
                    if (minPrice && maxPrice) {
                        products.value = data.filter(
                            (item: IProduct) =>
                                item.price >= minPrice && item.price <= maxPrice
                        );
                    } else {
                        products.value = data;
                    }
                });
        }
    };

    return {
        products,
        categories,

        getAllProducts,
        getCategories,
        getFilterProducts
    };
});
