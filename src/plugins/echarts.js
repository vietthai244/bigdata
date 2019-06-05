import Vue from 'vue'
import VueECharts from 'vue-echarts' // refers to components/ECharts.vue in webpack

// import ECharts modules manually to reduce bundle size
import 'echarts/lib/chart/bar'
import 'echarts/lib/chart/line'
import 'echarts/lib/chart/pie'
import 'echarts/lib/chart/radar'
// import 'echarts/lib/chart/scatter'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/legend';
import 'echarts/lib/component/title';
import 'echarts/lib/component/timeline';
// import 'echarts/lib/component/visualMap';

// If you want to use ECharts extensions, just import the extension package and it will work
// Taking ECharts-GL as an example:
// You only need to install the package with `npm install --save echarts-gl` and import it as follows
// import 'echarts-gl'

// register component to use
Vue.component('v-chart', VueECharts);
