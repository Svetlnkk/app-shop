<script setup lang="ts">
import { computed } from 'vue';

import type { IBasketProduct } from '../basket.types';
import { useBasketStore } from '@/store';

interface IProps {
    product: IBasketProduct;
}

const props = defineProps<IProps>();

const basketStore = useBasketStore();

const productPrice = computed(() => {
    return props.product.count * props.product.product.price;
});
</script>

<template>
    <tr>
        <td>{{ product.id }}</td>
        <td>
            <div class="product-content">
                <app-image
                    :src="product.product.image"
                    lazy
                    fit="cover"
                    style="width: 94px; height: 94px; border-radius: 16px"
                />
                <p class="product-content__name">{{ product.product.title }}</p>
            </div>
        </td>
        <td>
            <div class="product-count">
                <button
                    class="product-count__control"
                    :disabled="product.count < 1"
                    @click="
                        basketStore.addProductInBasket(product.product, product.count - 1)
                    "
                >
                    <svg-icon name="minus" />
                </button>

                <span class="product-count__number">{{ product.count }}</span>

                <button
                    class="product-count__control"
                    @click="
                        basketStore.addProductInBasket(product.product, product.count + 1)
                    "
                >
                    <svg-icon name="plus" />
                </button>
            </div>
        </td>
        <td>
            {{ product.product.price }}
        </td>
        <td>{{ productPrice }}</td>
    </tr>
</template>

<style scoped lang="scss">
.product-content {
    display: flex;
    flex-direction: row;
    gap: 8px;
    align-items: center;

    &__name {
        line-height: var(--font-line-height);
        width: calc(100% - 94px);
    }
}

.product-count {
    display: flex;
    flex-direction: row;
    gap: 8px;
    align-items: center;
    justify-content: space-between;

    &__control {
        cursor: pointer;
        --svg-icon-width: 40px;
        --svg-icon-height: 40px;
        &:hover {
            --svg-icon-color: var(--icon-secondary-color);
        }

        &:disabled {
            cursor: default;
            opacity: var(--opacity-disabled);
            &:hover {
                --svg-icon-color: var(--icon-primary-color);
            }
        }
    }
}

tr {
    display: table-row;
    padding: 0;
    box-shadow: none;
}

td {
    display: table-cell;
    margin-bottom: 0;
    padding: 16px;
    box-shadow: var(--shadow-default);
    border-radius: 5px;
    vertical-align: middle;

    &:last-child {
        margin: 0;
    }
}
</style>
