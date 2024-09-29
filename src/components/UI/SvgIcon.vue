<template>
    <svg class="svg-icon" aria-hidden="true">
        <use :xlink:href="'#icon-' + name" />
    </svg>
</template>

<script setup>
defineProps({
    name: {
        type: String,
        required: true
    }
});
</script>

<style lang="scss" scoped>
.svg-icon {
    overflow: hidden;
    fill: transparent;
    color: var(--svg-icon-color);
    min-width: var(--svg-icon-width);
    max-width: var(--svg-icon-width);
    min-height: var(--svg-icon-height);
    max-height: var(--svg-icon-height);
}
</style>
