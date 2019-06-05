<template lang="pug">
    .first-charge-report
        card
            .page-tool-bar
                .tool-bar
                    q-datetime(
                    v-model='beginDate',
                    type='date',
                    dark, clearable,
                    style='margin-right: 20px; width: 200px'
                    )
                    q-datetime(
                    v-model='endDate',
                    type='date',
                    dark, clearable,
                    style='margin-right: 20px; width: 200px'
                    )
                    q-btn(flat, round, dense, icon='search', @click='queryHandler')

            template(v-if="chartType === 'all'")
                SumChart(:data='sumChartData', :loading='chartLoading')

            template(v-else='')
                DetailsChart(:data='detailsChartData', :loading='chartLoading')

            q-table(
            title='充值统计表',
            dense, dark,
            :data='tableData',
            :columns='columns',
            :loading='tableLoading',
            color='info',
            row-key='name',
            style='max-height: 500px; overflow: auto'
            )
                q-tr.cursor-pointer(
                slot='body',
                slot-scope='props',
                :class="selected === props.row.__index ? 'row-active' : ''",
                :props='props',
                @click.native='rowClickHandler(props.row)'
                )
                    q-td(v-for='col in props.cols', :key='col.name', :props='props')
                        template(v-if="['money_sum', 'draw_money_sum'].includes(col.name)")
                            | {{ moneyFormatter(col.value) }}
                        template(v-else='')
                            | {{ col.value }}

</template>

<script>
    import axios from '@/axios/first_charge_report';
    import formatter from '@/tools/formatter';
    import {date} from 'quasar'
    import SumChart from './SummaryChart'
    import DetailsChart from './DetailsChart'

    export default {
        components: {SumChart, DetailsChart},
        data() {
            return {
                page_title: '',
                beginDate: '2017/1/1',
                endDate: '2019/8/10',

                //表格的数据
                selected: '',
                columns: [
                    {
                        name: 'daytime',
                        label: '创建时间',
                        field: 'daytime',
                        align: 'left',
                        required: true,
                        sortable: true,
                        sort: (a, b) => new Date(a) - new Date(b)
                    },
                    {
                        name: 'site_id',
                        label: '站点ID',
                        field: 'site_id',
                        align: 'left',
                        sortable: true,
                    },
                    {
                        name: 'site_name',
                        label: '站点名称',
                        field: 'site_name',
                        align: 'left',
                        sortable: true,
                    },
                    {
                        name: 'count_number',
                        label: '首冲用户数',
                        field: 'count_number',
                        align: 'left',
                        sortable: true,
                        sort: (a, b) => parseInt(a, 10) - parseInt(b, 10)
                    },
                    {
                        name: 'money_sum',
                        label: '入款金额',
                        field: 'money_sum',
                        align: 'left',
                        sortable: true,
                        sort: (a, b) => parseFloat(a) - parseFloat(b)
                    },
                    {
                        name: 'draw_money_sum',
                        label: '出款金额',
                        field: 'draw_money_sum',
                        align: 'left',
                        sortable: true,
                        sort: (a, b) => parseFloat(a) - parseFloat(b)
                    },
                    {
                        name: 'count_sum',
                        label: '入款频次',
                        field: 'count_sum',
                        align: 'left',
                        sortable: true,
                        sort: (a, b) => parseInt(a, 10) - parseInt(b, 10)
                    },
                    {
                        name: 'draw_count_sum',
                        label: '出款频次',
                        field: 'draw_count_sum',
                        align: 'left',
                        sortable: true,
                        sort: (a, b) => parseInt(a, 10) - parseInt(b, 10)
                    },
                ],
                tableData: [],
                tableLoading: false,
                //图表的数据
                chartLoading: false,
                sumChartData: [],
                detailsChartData: [],
                chartType: ''
            }
        },
        methods: {
            moneyFormatter(val) {   //金额显示格式化
                return formatter.money(val);
            },
            queryHandler() {    //获取表格+图表的数据
                this.tableLoading = true;
                this.chartLoading = true;
                this.chartType = 'all';
                this.selected = '';
                let params = {
                    beginDate: date.formatDate(this.beginDate, 'YYYY/MM/DD'),
                    endDate: date.formatDate(this.endDate, 'YYYY/MM/DD'),
                    site_id: '全部'
                };
                axios.ChangeSelectCount(params).then(res => {
                    this.tableLoading = false;
                    this.chartLoading = false;
                    this.tableData = res.data;
                    this.sumChartData = res.data;
                }).catch(e => {
                    this.tableLoading = false;
                    this.chartLoading = false;
                    console.log(e)
                })
            },
            rowClickHandler(row) {  //点击表格一条数据
                this.chartLoading = true;
                this.chartType = 'details';
                this.selected = row.__index;
                let params = {
                    beginDate: date.formatDate(this.beginDate, 'YYYY/MM/DD'),
                    endDate: date.formatDate(this.endDate, 'YYYY/MM/DD'),
                    site_id: row.site_id
                };
                axios.ChangeSelectDay(params).then(res => {
                    this.chartLoading = false;
                    this.detailsChartData = res.data;
                }).catch(e => {
                    this.chartLoading = false
                    console.log(e)
                })
            }
        },
        created() {
            this.page_title = this.$route.name;
            this.queryHandler()
        },
        beforeRouteLeave(to, from, next) {
            console.log('leaved');
            next()
        },
        beforeRouteEnter(to, from, next) {
            console.log('entered');
            next()
        }
    }
</script>

<style lang="sass">
    .first-charge-report
        .row-active
            color: #ffc107 !important
            background-color: rgba(255, 193, 7, .1)
            *
                font-size: .95rem
                font-weight: bolder
</style>
