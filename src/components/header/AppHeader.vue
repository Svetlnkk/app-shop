<script setup lang="ts">
import { useBasketStore } from '@/store';

const basketStore = useBasketStore();
</script>

<template>
    <header class="app-header">
        <div class="app-header-menu">
            <router-link class="app-header-menu__logo" to="/">
                <svg-icon name="sun" />
            </router-link>
            <router-link class="app-header-menu__basket" to="/basket">
                <svg-icon name="basket" />
                <app-badge :value="basketStore.productCounts" absolute />
            </router-link>
        </div>
    </header>
</template>

<style scoped lang="scss">
.app-header {
    position: sticky;
    top: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    z-index: 3;
    padding-inline: var(--layout-pad-x);
    height: var(--header-height);
    background: var(--bg-globe-color);
    border-bottom: var(--border-width) solid var(--btn-secondary-default);
}

.app-header-menu {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 100%;
    margin: 0 auto;
    max-width: var(--layout-max-width);

    --svg-icon-width: var(--header-logo-width);
    --svg-icon-height: var(--header-logo-height);

    &__logo {
        --svg-icon-color: var(--icon-secondary-color);
    }

    &__basket {
        display: flex;
        position: relative;

        &:hover {
            --svg-icon-color: var(--icon-secondary-color);
        }
    }
}
</style>
