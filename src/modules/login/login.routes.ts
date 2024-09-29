export default [
    {
        path: '/login',
        name: 'Login',
        meta: { title: 'Авторизация', layout: 'empty' },
        component: () => import('./view/LoginView.vue')
    }
];
