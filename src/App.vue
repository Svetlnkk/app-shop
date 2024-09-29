<script setup lang="ts">
import { useRoute, RouterView } from 'vue-router';
import { computed, defineAsyncComponent } from 'vue';

const appLayouts: Record<string, unknown> = {
    default: 'div',
    empty: 'div',
    main: defineAsyncComponent(() => import('./layouts/DefaultLayout.vue'))
};

const route = useRoute();

const layout = computed(() => {
    const routeLayout: any = route.meta.layout;

    return routeLayout && routeLayout in appLayouts
        ? appLayouts[routeLayout]
        : appLayouts.default;
});
</script>

<template>
    <component :is="layout">
        <RouterView />
    </component>
</template>
