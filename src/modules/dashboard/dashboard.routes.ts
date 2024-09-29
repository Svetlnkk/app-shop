export default [
    {
        path: '/',
        name: 'Dashboard',
        meta: { title: 'Домашняя страница', layout: 'main' },
        component: () => import('./views/DashboardView.vue')
    }
];
