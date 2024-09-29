<script setup lang="ts">
import { useForm, useField } from 'vee-validate';

import { useProductStore } from '@/store';

import { filterSchema } from '../product.schema';

const orderStore = useProductStore();

const initialValues = {
    selectCategory: orderStore.categories[0] ?? '',
    minPrice: null,
    maxPrice: null
};

const { handleSubmit } = useForm({
    validationSchema: filterSchema,
    initialValues
});

const { value: selectCategory } = useField<string>('selectCategory');
const { value: minPrice, errorMessage: errorMinPrice } = useField<number | null>(
    'minPrice'
);
const { value: maxPrice, errorMessage: errorMaxPrice } = useField<number | null>(
    'maxPrice'
);

const onSubmit = handleSubmit(async (values) => {
    try {
        orderStore.getFilterProducts(
            values.selectCategory,
            values.minPrice,
            values.maxPrice
        );
    } catch (error) {
        console.log(error);
    }
});

const resetForm = () => {
    selectCategory.value = orderStore.categories[0];
    minPrice.value = null;
    maxPrice.value = null;

    orderStore.getFilterProducts(selectCategory.value, minPrice.value, maxPrice.value);
};
</script>

<template>
    <div class="app-sidebar-container">
        <form class="app-sidebar" @submit="onSubmit">
            <p class="app-sidebar__title">Фильтр</p>
            <div class="app-sidebar__filter">
                <span class="app-sidebar__filter--title">Выберите категорию</span>
                <app-select
                    v-model="selectCategory"
                    :selectArray="orderStore.categories"
                    name="selectCategory"
                />
            </div>
            <div class="app-sidebar__filter">
                <span class="app-sidebar__filter--title">Цена</span>
                <div class="filter-price">
                    <div class="filter-price__item">
                        <span class="filter-price__item--title">От</span>
                        <app-number
                            allowNull
                            v-model="minPrice"
                            name="minPrice"
                            :error="errorMinPrice"
                        />
                    </div>
                    <div class="filter-price__item">
                        <span class="filter-price__item--title">До</span>
                        <app-number
                            allowNull
                            v-model="maxPrice"
                            name="maxPrice"
                            :error="errorMaxPrice"
                        />
                    </div>
                </div>
            </div>
            <div class="app-sidebar__btn">
                <app-button label="Применить" type="submit" />
                <app-button
                    label="Сбросить"
                    viewStyle="secondary"
                    type="button"
                    @click="resetForm"
                />
            </div>
        </form>
    </div>
</template>

<style lang="scss" scoped>
.app-sidebar-container {
    position: sticky;
    left: 0;
    top: var(--header-height);
    display: block;
    justify-content: space-between;
    align-items: center;
    z-index: 3;
    padding: 16px;
    width: 285px;
    height: calc(100vh - var(--header-height));
    background: var(--bg-globe-color);
    border-right: var(--border-width) solid var(--btn-secondary-default);
}

.app-sidebar {
    display: flex;
    flex-direction: column;
    gap: 32px;

    &__title {
        text-align: center;
        font-size: var(--font-size-lg);
        font-weight: var(--font-weight-bold);
        line-height: var(--font-line-height-medium);
    }

    &__filter {
        display: flex;
        flex-direction: column;
        gap: 16px;

        &--title {
            font-size: var(--font-size-sm);
            font-weight: var(--font-weight-medium);
            line-height: var(--font-line-height);
        }
    }

    &__btn {
        display: flex;
        flex-direction: column;
        gap: 16px;
    }
}

.filter-price {
    display: flex;
    flex-direction: row;
    gap: 8px;

    &__item {
        display: flex;
        flex-direction: column;
        gap: 8px;

        &--title {
            line-height: var(--font-line-height);
            font-weight: var(--font-weight-bold);
        }
    }
}
</style>
