<template lang="pug">
    .conclusion-record
        ResizeableChart(:loading='chartLoading')
            v-chart(dark='', ref='chart', style='width: 100%;', :options='chartOptions')

        q-table(
        dense, dark,
        title='出入款状况比例',
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
            :props='props',
            @click.native='setChartData(props.row)'
            )
                q-td(key='create_date', :props='props')
                    | {{ props.row.create_date }}
                q-td(key='draw_sum', :props='props')
                    | {{ props.row.draw_sum | moneyFormatter }}
                q-td(key='draw_percentage', :props='props')
                    | {{ props.row.draw_percentage*100 | moneyFormatter}}%
                q-td(key='pay_sum', :props='props')
                    | {{ props.row.pay_sum | moneyFormatter}}
                q-td(key='pay_percentage', :props='props')
                    | {{ props.row.pay_percentage*100 | moneyFormatter }}%
                q-td(key='difference', :props='props')
                    | {{ props.row.difference | moneyFormatter }}
                q-td(key='in_conclusion', :props='props')
                    template(v-if="props.row.in_conclusion==='出入款收支异常'")
                        q-chip(small='', square='', color='pink')  {{ props.row.in_conclusion }}
                    template(v-if="props.row.in_conclusion==='出入款收支正常'")
                        q-chip(small='', square='', color='green') {{ props.row.in_conclusion }}
                    template(v-if="props.row.in_conclusion==='出入款收支持平'")
                        q-chip(small='', square='', color='amber') {{ props.row.in_conclusion }}

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
                    backgroundColor: 'transparent',
                    tooltip: {
                        trigger: 'item',
                        formatter: "{a} <br/>{b}: {c} ({d}%)"
                    },
                    legend: {
                        x: 'right',
                        textStyle: chartStyle.textStyle,
                        data: ['天出款总额', '天入款总额']
                    },
                    grid: {
                        top: '12%',
                        left: '5%',
                        right: '5%',
                        containLabel: true
                    },
                    series: [
                        {
                            name: '访问来源',
                            type: 'pie',
                            radius: ['50%', '70%'],
                            avoidLabelOverlap: false,
                            label: {
                                normal: {
                                    show: false,
                                    position: 'center'
                                },
                                emphasis: {
                                    show: true,
                                    textStyle: {
                                        fontSize: '30',
                                        fontWeight: 'bold'
                                    }
                                }
                            },
                            labelLine: {
                                normal: {
                                    show: false
                                }
                            },
                            data: [
                                {value: '', name: '天出款总额'},
                                {value: '', name: '天入款总额'}
                            ]
                        }
                    ]
                },
                columns: [
                    {
                        name: 'create_date',
                        label: '日期',
                        field: 'create_date',
                        align: 'left',
                        required: true,
                        sortable: true,
                        sort: (a, b) => new Date(a) - new Date(b)
                    },
                    {
                        name: 'draw_sum',
                        label: '出款总额',
                        field: 'draw_sum',
                        align: 'left',
                        required: true,
                        sortable: true,
                        sort: (a, b) => parseFloat(a) - parseFloat(b)
                    },
                    {
                        name: 'draw_percentage',
                        label: '出款总额比值',
                        field: 'draw_percentage',
                        align: 'left',
                        sortable: true,
                        sort: (a, b) => parseFloat(a) - parseFloat(b)
                    },
                    {
                        name: 'pay_sum',
                        label: '入款总额',
                        field: 'pay_sum',
                        align: 'left',
                        sortable: true,
                        sort: (a, b) => parseFloat(a) - parseFloat(b)
                    },
                    {
                        name: 'pay_percentage',
                        label: '入款额/出入款总额比值',
                        field: 'pay_percentage',
                        align: 'left',
                        sortable: true,
                        sort: (a, b) => parseFloat(a) - parseFloat(b)
                    },
                    {
                        name: 'difference',
                        label: '亏损收益值',
                        field: 'difference',
                        align: 'left',
                        sortable: true,
                        sort: (a, b) => parseFloat(a) - parseFloat(b)
                    },
                    {
                        name: 'in_conclusion',
                        label: '结论叙述',
                        field: 'in_conclusion',
                        align: 'left',
                        sortable: true,
                    }
                ],
                tableData: [],
                tableLoading: false,
            }
        },
        filters: {
            moneyFormatter(val) {
                return formatter.money(val)
            }
        },
        methods: {
            queryHandler(params) {
                this.tableLoading = true;
                this.chartLoading = true;
                axios.ConclusionSelect(params).then(res => {
                    this.tableLoading = false;
                    this.chartLoading = false;
                    if (res.status === 200) {
                        this.setChartData(res.data[0]);
                        this.tableData = res.data;
                    }
                }).catch(e => {
                    this.chartLoading = false;
                    this.tableLoading = false;
                    console.log(e)
                })
            },
            setChartData(data) {
                this.chartOptions.series[0].name = data.create_date;
                this.chartOptions.series[0].data[0].value = data.draw_sum;
                this.chartOptions.series[0].data[1].value = data.pay_sum;
            }
        }
    }
</script>
