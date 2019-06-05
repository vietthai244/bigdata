import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
/****Quasar 框架***/
import './registerServiceWorker'
import './styles/quasar.styl'
import 'quasar-framework/dist/quasar.ie.polyfills'
import lang from 'quasar-framework/i18n/zh-hans'
import 'quasar-extras/animate'
import 'quasar-extras/material-icons'
import Quasar from 'quasar'
/**第三方插件**/
import './plugins/echarts'
import './plugins/sequential-entrance'
/**自定义组件**/
import './components'
import './hoc'

Vue.use(Quasar, {
    config: {}, i18n: lang
});

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
