<template>
    <ResizeableChart :loading="loading">
        <v-chart ref="chart"
                 style="width: 100%;"
                 :options="options"/>
    </ResizeableChart>
</template>

<script>
    export default {
        props: ['data', 'loading'],
        computed: {
            options() {
                const yAxis = this.data.map(item => {   //Y轴：时间
                    return item.daytime;
                });
                const count_number_arr = this.data.map(item => {   //X轴：数值
                    return item.count_number;
                });
                const money_sum_arr = this.data.map(item => {   //X轴：数值
                    return item.money_sum;
                });
                const draw_money_sum_arr = this.data.map(item => {   //X轴：数值
                    return item.draw_money_sum;
                });
                const count_sum_arr = this.data.map(item => {   //X轴：数值
                    return item.count_sum;
                });
                const draw_count_sum_arr = this.data.map(item => {   //X轴：数值
                    return item.draw_count_sum;
                });
                return {
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                            type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                        }
                    },
                    legend: {
                        data: ['首充用户数', '入款金额', '出款金额', '入款频次', '出款频次'],
                        selected: {
                            '首充用户数': false,
                            '入款金额': true,
                            '出款金额': true,
                            '入款频次': false,
                            '出款频次': false
                        }
                    },
                    grid: {
                        left: '3%',
                        right: '4%',
                        bottom: '3%',
                        containLabel: true
                    },
                    xAxis: {
                        type: 'value'
                    },
                    yAxis: {
                        type: 'category',
                        data: yAxis
                    },
                    series: [
                        {
                            name: '首充用户数',
                            type: 'bar',
                            stack: '',
                            label: {
                                normal: {
                                    show: true,
                                    // position: 'insideRight'
                                }
                            },
                            barMaxWidth: '40rem',
                            data: count_number_arr
                        },
                        {
                            name: '入款金额',
                            type: 'bar',
                            stack: '出入款金额比例',
                            label: {
                                normal: {
                                    show: true,
                                    // position: 'insideRight'
                                }
                            },
                            barMaxWidth: '40rem',
                            data: money_sum_arr
                        },
                        {
                            name: '出款金额',
                            type: 'bar',
                            stack: '出入款金额比例',
                            label: {
                                normal: {
                                    show: true,
                                    // position: 'insideRight'
                                }
                            },
                            barMaxWidth: '40rem',
                            data: draw_money_sum_arr
                        },
                        {
                            name: '入款频次',
                            type: 'bar',
                            stack: '出入款频次比例',
                            label: {
                                normal: {
                                    show: true,
                                    // position: 'insideRight'
                                }
                            },
                            barMaxWidth: '40rem',
                            data: count_sum_arr
                        },
                        {
                            name: '出款频次',
                            type: 'bar',
                            stack: '出入款频次比例',
                            label: {
                                normal: {
                                    show: true,
                                    // position: 'insideRight'
                                }
                            },
                            barMaxWidth: '40rem',
                            data: draw_count_sum_arr
                        }
                    ]
                }
            }
        },
    }
</script>
