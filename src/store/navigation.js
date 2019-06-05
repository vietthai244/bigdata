// import router from '@/router'

const menu = [
    {
        id: 1,
        label: '大数据分析',
        url: '/data_analysis',
        child: [
            {
                id: 1,
                label: '出入款汇总',
                url: '/transaction_report'
            },
            {
                id: 2,
                label: '注册人数汇总',
                url: '/registration_report'
            },
            {
                id: 3,
                label: '首充用户汇总',
                url: '/first_charge_report'
            },
            {
                id: 4,
                label: '资金流量',
                url: '/finance_report'
            },
            {
                id: 5,
                label: '用户登入日志',
                url: '/activities_log'
            },
            {
                id: 6,
                label: '环比增长率',
                url: '/growth_rate'
            },
            {
                id: 7,
                label: '功能使用频次统计',
                url: '/system_usage'
            }
        ]
    },
    {
        id: 2,
        label: '分组2',
        url: '/'
    },
    {
        id: 3,
        label: '分组3',
        url: '/'
    },
    {
        id: 4,
        label: '分组4',
        url: '/'
    },
    {
        id: 5,
        label: '分组5',
        url: '/'
    },
    {
        id: 6,
        label: '分租6',
        url: '/'
    },
];

const nav = {
    state: {
        lv1_menu: menu,     //一级菜单
        lv2_menu: [],       //二级菜单
        header_active: '',          //头部激活项
        side_bar_active: '',        //左侧激活项
        scroll_direction: '',       //页面滚动方向
        page_transitioning: false
    },
    mutations: {
        /**获取二级菜单**/
        SET_LV2_MENU: (state, list) => {
            state.lv2_menu = list;
        },
        /**设头部激活项**/
        SET_ACTIVE_HEADER: (state, item) => {
            state.header_active = item
        },
        /**设左侧激活项**/
        SET_ACTIVE_SCROLL: (state, item) => {
            if (state.lv2_menu.length === 0) return;    //没有二级菜单
            let cur_idx = state.lv2_menu.map(item => item.url).indexOf(state.side_bar_active);
            if (item === 'up') {     //页面滚动的事件
                if (cur_idx === 0) return;
                state.side_bar_active = state.lv2_menu[cur_idx-1].url
            } else if (item === 'down') {
                if (cur_idx === state.lv2_menu.length - 1) return;
                state.side_bar_active = state.lv2_menu[cur_idx+1].url
            } else {        //点击左侧菜单的事件
                state.side_bar_active = item.url;
            }
        }
    },
    actions: {
        headerNavHandler({commit}, item) {
            commit('SET_ACTIVE_HEADER', item.url);
            let lv2_menu = item.child ? item.child : [];
            commit('SET_LV2_MENU', lv2_menu);
            commit('SET_ACTIVE_SCROLL', lv2_menu[0]);
        },
        sideNavHandler({state, commit}, item) {
            if (state.page_transitioning) return;
            state.page_transitioning = true;
            let current = state.lv2_menu.filter(item => item.url === state.side_bar_active)[0];
            //判断页面滚动方向
            if (item.id) {
                if (item.id > current.id) state.scroll_direction = 'down';
                else if (item.id < current.id) state.scroll_direction = 'up';
                else state.scroll_direction = '';
            } else {
                state.scroll_direction = item;
            }
            commit('SET_ACTIVE_SCROLL', item);
            setTimeout(() => {
                state.page_transitioning = false
            }, 1000)
        }
    }
};

export default nav;
