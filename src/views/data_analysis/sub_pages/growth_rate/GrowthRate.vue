<template lang="pug">
    Card
        .page-tool-bar
            .tool-bar
                q-datetime(
                v-model='beginDate',
                type='date',
                dark, clearable,
                float-label='开始时间',
                color='info',
                style='margin-right: 20px; width: 200px'
                )
                q-datetime(
                v-model='endDate',
                type='date',
                float-label='结束时间',
                dark, clearable,
                color='info',
                style='margin-right: 20px; width: 200px'
                )
                q-btn(flat, round, dense, icon='search', @click='queryHandler')

        .tab-list
            template(
            v-for="(item, idx) in\
            [['天增长率','day-record'],\
            ['月增长率', 'month-record'],\
            ['年增长率', 'annual-record']]"
            )
                .nav-item(
                :class="tabs===item[1] ? 'active' : ''",
                :key='idx',
                @click='tabs=item[1]'
                )
                    .nav-content.relative-position
                        p.nav-label {{item[0]}}
        .tab-pane
            transition(name='tab-slide')
                charts.is-animated(:loading='loading', :data='chartData')
</template>

<script>
    import axios from '@/axios/growth_rate';
    import formatter from '@/tools/formatter';
    import {date} from 'quasar';
    import Charts from './Charts'

    export default {
        components: {Charts},
        data() {
            return {
                //查询的参数
                beginDate: '2017/1/1',
                endDate: '2019/8/10',
                tabs: 'day-record',
                //图标的属性
                loading: true,
                chartData: [],
            }
        },
        watch: {
            tabs(val) {
                this.queryHandler()
            }
        },
        methods: {
            queryHandler() {
                this.loading = true;
                let query = null;
                if (this.tabs === 'day-record') {
                    query = axios.ConclusionRingRatio;
                }
                if (this.tabs === 'month-record') {
                    query = axios.ConclusionRingRatio_month;
                }
                if (this.tabs === 'annual-record') {
                    query = axios.ConclusionRingRatio_year;
                }
                let data = {
                    beginDate: this.beginDate,
                    endDate: this.endDate
                };
                query(data).then(res => {
                    this.loading = false;
                    this.chartData = res.data;
                }).catch(e => {
                    this.loading = false;
                    console.log(e);
                });
            },
        },
        created() {
            setTimeout(() => {
                this.queryHandler();
            }, 1000);
        }
    }
</script>

<style lang="scss" scoped>
    .tab-slide-enter {
        opacity: 0;
        transform: translateX(-50px);
        position: absolute;
    }

    .tab-slide-enter-active {
        opacity: 1;
    }

    .tab-slide-leave-active {
        transform: translateX(50px);
        opacity: 0;
        position: absolute;
    }

</style>
