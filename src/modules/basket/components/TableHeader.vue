<script setup lang="ts"></script>

<template>
    <thead>
        <tr>
            <th>№</th>
            <th>Наименование товара</th>
            <th>Количество</th>
            <th>Цена за ед.</th>
            <th>Итого</th>
        </tr>
    </thead>
</template>

<style scoped lang="scss">
thead {
    display: table-header-group;

    tr {
        & > th:nth-child(3),
        & > th:nth-child(4),
        & > th:nth-child(5) {
            width: 20%;
        }

        & > th:nth-child(1) {
            width: 1%;
        }
    }

    th {
        padding: 16px;
        font-weight: var(--font-weight-bold);
        box-shadow: var(--shadow-default);
        border-radius: 5px;
    }
}
</style>
