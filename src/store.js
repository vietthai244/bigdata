import Vue from 'vue'
import Vuex from 'vuex'
import nav from '@/store/navigation'

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        nav,
    },
    state: {
        preloading: true,
    },
    getters: {
        header_nav_list: state => state.nav.lv1_menu,   //头部菜单
        side_nav_list: state => state.nav.lv2_menu,      //左侧菜单
        header_active: state => state.nav.header_active,      //头部激活项
        side_bar_active: state => state.nav.side_bar_active     //左侧激活项
    },
    mutations: {
        LOADED(state) {                 //finished loading
            state.preloading = false;
        },
    }
})
