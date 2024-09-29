export default [
    {
        path: '/basket',
        name: 'Basket',
        meta: { title: 'Корзина', layout: 'main' },
        component: () => import('./view/BasketView.vue')
    }
];
