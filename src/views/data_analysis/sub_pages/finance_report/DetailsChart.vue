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
                const money_sum_arr = this.data.map(item => item.money_sum);
                const number_count_arr = this.data.map(item => item.number_count);
                const dateList = this.data.map(item => item.create_date);
                return {
                    // Make gradient line here
                    visualMap: [
                        {
                            show: false,
                            type: 'continuous',
                            seriesIndex: 0,
                            min: 0,
                            max: dateList.length - 1
                        },
                        {
                            show: false,
                            type: 'continuous',
                            seriesIndex: 1,
                            dimension: 1,
                            min: 0,
                            max: dateList.length - 1
                            // max: dateList.length - 1
                        }
                    ],
                    title: [
                        {
                            left: 'center',
                            text: '变动总金额',
                            textStyle: {
                                color: '#fff'
                            }
                        },
                        {
                            top: '50%',
                            left: 'center',
                            text: '频次变动',
                            textStyle: {
                                color: '#fff'
                            }
                        },

                    ],
                    tooltip: {
                        trigger: 'axis'
                    },
                    xAxis: [
                        {
                            data: dateList,
                            nameTextStyle: {
                                color: '#fff'
                            }

                        }, {
                            data: dateList,
                            gridIndex: 1
                        }
                    ],
                    yAxis: [
                        {
                            splitLine: {show: false}
                        },
                        {
                            splitLine: {show: false},
                            gridIndex: 1
                        }
                    ],
                    grid: [{
                        bottom: '60%'
                    }, {
                        top: '60%'
                    }],
                    series: [
                        {
                            type: 'line',
                            showSymbol: false,
                            data: money_sum_arr
                        },
                        {
                            type: 'line',
                            showSymbol: false,
                            data: number_count_arr,
                            xAxisIndex: 1,
                            yAxisIndex: 1
                        }
                    ]
                }
            }
        },
    }
</script>
