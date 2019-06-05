<template lang="pug">
    card(height='100%')
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
        .charts
            .row
                .col-lg-6.col-md-12
                    ControlChart(:data='controlData')
                .col-lg-6.col-md-12
                    AgentChart(:data='agentData')
            q-inner-loading(:visible='loading', dark='')
                Loading
</template>

<script>
    import axios from '@/axios/system_usage';
    import formatter from '@/tools/formatter';
    import {date} from 'quasar';
    import ControlChart from './ControlChart';
    import AgentChart from './AgentChart'

    export default {
        components: {
            ControlChart, AgentChart
        },
        data() {
            return {
                //查询的参数
                beginDate: '2018-11-22',
                endDate: '2018-11-28',
                tabs: 'day-record',
                //图标的属性
                loading: true,
                controlData: [],    //上图：总控功能使用频次
                agentData: [],      //下图：代理功能使用频次
            }
        },
        methods: {
            queryHandler() {
                this.loading = true;
                let data = {
                    beginDate: this.beginDate,
                    endDate: this.endDate
                };
                const chart1query = axios.control_features_count(data);
                const chart2query = axios.agent_features_count(data);
                Promise.all([chart1query, chart2query]).then(res => {
                    this.loading = false;
                    this.controlData = res[0].data;
                    this.agentData = res[1].data;
                }).catch(e => {
                    this.loading = false;
                    console.log(e)
                })
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
    .charts {
        height: 100%;
        * {
            height: 100%;
        }
    }
</style>
