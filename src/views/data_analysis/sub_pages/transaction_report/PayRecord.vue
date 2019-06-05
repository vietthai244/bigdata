<template lang="pug">
    .pay-record
        ResizeableChart(:loading='chartLoading')
            v-chart(ref='chart', style='width: 100%', :options='chartOptions')

        q-table(
        dense, dark,
        title='入款实际状况',
        :data='tableData',
        :columns='columns',
        :loading='tableLoading',
        color='info', row-key='name',
        style='max-height: 500px; overflow: auto'
        )
            q-tr.cursor-pointer(
            slot='body',
            slot-scope='props',
            :props='props'
            )
                q-td(
                v-for='col in props.cols',
                :key='col.name',
                :props='props'
                )
                    span(:style="{ color:props.row.amount >= props.row.real_amount ? '#00C800': 'red' }")
                        template(v-if="col.name !=='site_id' && col.name!=='site_name'")
                            | {{ moneyFormatter(col.value)}}
                        template(v-else='')
                            | {{ col.value }}
            q-tr(slot='top-row', slot-scope='props')
                q-td
                    strong 总计：
                q-td
                q-td {{ moneyFormatter(total_amount) }}
                q-td {{ moneyFormatter(total_actual_amount) }}

</template>

<script>
    import axios from '@/axios/transaction_report';
    import chartStyle from '@/tools/charts/chartStyle';
    import formatter from '@/tools/formatter';

    export default {
        data() {
            return {
                chartLoading: false,
                chartOptions: {
                    chartLoading: false,
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                            type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                        }
                    },
                    legend: {
                        data: ['金额', '实际入款金额'],
                        textStyle: chartStyle.textStyle,
                        right: 10
                    },
                    grid: {
                        top: '12%',
                        left: '5%',
                        right: '5%',
                        containLabel: true
                    },
                    xAxis: {
                        type: 'category',
                        data: [],
                    },
                    yAxis: [{type: 'value'}],
                    series: [
                        {
                            name: '金额',
                            type: 'bar',
                            data: [],
                        },
                        {
                            name: '实际入款金额',
                            type: 'bar',
                            data: [],
                        }
                    ]
                },
                columns: [
                    {
                        name: 'site_id',
                        label: '站点ID',
                        field: 'site_id',
                        align: 'left',
                        required: true,
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
                        name: 'amount',
                        label: '金额',
                        field: 'amount',
                        align: 'left',
                        sortable: true,
                    },
                    {
                        name: 'real_amount',
                        label: '实际入款金额',
                        field: 'real_amount',
                        align: 'left',
                        sortable: true,
                    },
                    {
                        name: 'first_money',
                        label: '首充送金额',
                        field: 'first_money',
                        align: 'left',
                        sortable: true,
                    },
                    {
                        name: 'first_check_money',
                        label: '首充稽核值',
                        field: 'first_check_money',
                        align: 'left',
                        sortable: true,
                    },
                    {
                        name: 'free_money',
                        label: '优惠金额',
                        field: 'free_money',
                        align: 'left',
                        sortable: true,
                    },
                    {
                        name: 'free_check_money',
                        label: '优惠稽核值',
                        field: 'free_check_money',
                        align: 'left',
                        sortable: true,
                    },
                    {
                        name: 'activity_money',
                        label: '活动送金额',
                        field: 'activity_money',
                        align: 'left',
                        sortable: true,
                    },
                    {
                        name: 'activity_check_money',
                        label: '活动稽核值',
                        field: 'activity_check_money',
                        align: 'left',
                        sortable: true,
                    }
                ],
                tableData: [],
                tableLoading: false,
                total_amount: 0,
                total_actual_amount: 0,
            }
        },
        methods: {
            moneyFormatter(val) {
                return formatter.money(val);
            },
            queryHandler(params) {
                this.chartLoading = true;
                this.tableLoading = true;
                axios.PaySelect(params).then(res => {
                    this.chartLoading = false;
                    this.tableLoading = false;
                    if (res.status === 200) {
                        this.chartOptions.xAxis.data = res.data.map(item => {
                            return item.site_name;
                        });
                        let amount_arr = res.data.map(item => {
                            return parseInt(item.amount);
                        });
                        this.chartOptions.series[0].data = amount_arr;               //金额
                        this.total_amount = amount_arr.reduce((prev, cur) => {       //算计总金额
                            return (prev && cur) ? prev + cur : 0;
                        });

                        let actual_amount_arr = res.data.map(item => {
                            return parseInt(item.real_amount);
                        });
                        this.chartOptions.series[1].data = actual_amount_arr;                     //实际入款金额
                        this.total_actual_amount = actual_amount_arr.reduce((prev, cur) => {      //算计总入款金额
                            return (prev && cur) ? prev + cur : 0;
                        });
                        this.tableData = res.data;
                    }
                }).catch(e => {
                    this.chartLoading = false;
                    this.tableLoading = false;
                    console.log(e)
                })
            }
        }
    }
</script>
