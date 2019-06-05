import Vue from "vue";
import Router from "vue-router";
import store from './store'

const Landing = () => import('./views/landing_page/Landing.vue');
const Login = () => import('./views/Login.vue');

Vue.use(Router);

const router = new Router({
    routes: [
        {
            path: "/landing",
            name: "landing",
            component: Landing
        },
        {
            path: "/login",
            name: "login",
            component: Login
        },
        {
            path: "/",
            name: "",
            // route level code-splitting
            // this generates a separate chunk (about.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () =>
                import(/* webpackChunkName: "Layout" */ "./views/layouts/Layout.vue"),
            children: [
                {
                    path: '/data_analysis',
                    name: '大数据分析',
                    component: () => import('@/views/data_analysis/DataAnalysis'),
                },
            ]
        }
    ]
});

const menu = store.getters.header_nav_list;
router.beforeEach((to, from, next) => {
    if (to.path === '/landing') {
        return next()
    }
    if (menu) {
        const item = menu.filter(menu_item => {
            return menu_item.url === to.path;
        }).pop();
        store.dispatch('headerNavHandler', item).then(() => {
            next();
        }).catch((e) => {
            console.log(e);
            next('/')
        });
    } else {
        next();
    }

});
router.beforeEach((to, from, next) => {
    next()
});

export default router;
