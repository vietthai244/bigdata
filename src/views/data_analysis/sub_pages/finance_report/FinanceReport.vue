<template lang="pug">
    .finance-report
        card
            .page-tool-bar
                .tool-bar
                    q-select(
                    v-model='classifications',
                    dark,
                    float-label='张变类型',
                    :options='typeList',
                    color='info',
                    style='margin-right: 20px; width: 200px'
                    )
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
                    q-btn(flat, round, dense, icon='search', @click='searchHandler')

            template(v-if="chartType === 'all'")
                SumChart(:data='sumChartData', :loading='chartLoading')

            template(v-else)
                DetailsChart(:data='detailsChartData', :loading='chartLoading')

            q-table(
            title='充值统计表',
            :data='tableData',
            :columns='columns',
            :loading='tableLoading',
            dark, dense,
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
    import axios from '@/axios/finance_report';
    import formatter from '@/tools/formatter';
    import {date} from 'quasar'
    import SumChart from './SummaryChart'
    import DetailsChart from './DetailsChart'

    export default {
        components: {SumChart, DetailsChart},
        data() {
            return {
                typeList: [],
                beginDate: '2017/1/1',
                endDate: '2019/8/10',
                classifications: '游戏类型',

                //表格的数据
                selected: '',
                columns: [
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
                        name: 'type_name',
                        label: '账变类型名',
                        field: 'type_name',
                        align: 'left',
                        sortable: true,
                    },
                    {
                        name: 'money_sum',
                        label: '变动总金额',
                        field: 'money_sum',
                        align: 'left',
                        sortable: true,
                        sort: (a, b) => parseFloat(a) - parseFloat(b)
                    },
                    {
                        name: 'number_count',
                        label: '账变频次',
                        field: 'number_count',
                        align: 'left',
                        sortable: true,
                        sort: (a, b) => parseFloat(a) - parseFloat(b)
                    },
                ],
                tableData: [],
                tableLoading: false,
                //图表的数据
                sumChartData: [],
                detailsChartData: [],
                chartType: '',
                chartLoading: false
            }
        },
        methods: {
            moneyFormatter(val) {   //金额显示格式化
                return formatter.money(val);
            },
            queryHandler(site_id, type_name) {    //获取表格+图表的数据
                this.tableLoading = true;
                this.chartLoading = true;
                let params = {
                    beginDate: date.formatDate(this.beginDate, 'YYYY/MM/DD'),
                    endDate: date.formatDate(this.endDate, 'YYYY/MM/DD'),
                    site_id: site_id,
                    type_name: type_name,
                    classifications: this.classifications
                };
                axios.FundsSelect(params).then(res => {
                    this.tableLoading = false;
                    this.chartLoading = false;
                    if (this.chartType === 'all') {
                        this.tableData = res.data;
                    } else {
                        this.detailsChartData = res.data;
                    }
                }).catch(e => {
                    this.chartLoading = false;
                    this.tableLoading = false;
                    console.log(e)
                })
            },
            queryTypeHandler() {        //获取张变类型
                axios.Funds_classification().then(res => {
                    this.typeList = res.data.map(item => {
                        return {
                            value: item.classification,
                            label: item.classification
                        }
                    });
                })
            },
            queryChartDataHandler() {   //获取图表的数据
                this.chartLoading = true;
                let params = {
                    beginDate: date.formatDate(this.beginDate, 'YYYY/MM/DD'),
                    endDate: date.formatDate(this.endDate, 'YYYY/MM/DD'),
                    site_id: '全部',
                    type_name: '全部',
                    classifications: this.classifications
                };
                axios.funds_select_all(params).then(res => {
                    this.chartLoading = false;
                    this.sumChartData = res.data;
                }).catch(e => {
                    this.chartLoading = false;
                    console.log(e)
                })
            },
            searchHandler() {       //点击查询按钮
                this.chartType = 'all';
                this.selected = '';
                this.tableLoading = true;
                this.queryHandler('全部', '全部');
                this.queryChartDataHandler();
            },
            rowClickHandler(row) {  //点击表格一条数据
                this.chartType = 'details';
                this.selected = row.__index;
                this.queryHandler(row.site_id, row.type_name);
            }
        },
        created() {
            this.queryTypeHandler();
            this.searchHandler();
        }
    }
</script>
