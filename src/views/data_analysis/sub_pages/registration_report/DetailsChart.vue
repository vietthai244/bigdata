<template>
    <ResizeableChart :loading="loading">
        <v-chart ref="chart"
                 style="width: 100%;"
                 :options="options"/>
    </ResizeableChart>
</template>

<script>
    export default {
        props: ['data', 'site_name', 'loading'],
        computed: {
            options() {
                const xAxis = this.data.map(item => {
                    return item.create_date;
                });
                const register_count = this.data.map(item => {
                    return item.count_number
                });
                return {
                    title: {
                        text: `站点：${this.site_name}`,
                        textAlign: 'center',
                        left: '50%',
                        right: '50%'
                    },
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'shadow',
                            label: {
                                show: true
                            }
                        }
                    },
                    toolbox: {
                        show: true,
                        feature: {
                            mark: {show: true},
                            dataView: {show: true, readOnly: false},
                            magicType: {show: true, type: ['line', 'bar']},
                            restore: {show: true},
                            saveAsImage: {show: true}
                        }
                    },
                    calculable: true,
                    // legend: {
                    //     data: ['Growth', 'Budget 2011', 'Budget 2012'],
                    //     itemGap: 5
                    // },
                    grid: {
                        top: '12%',
                        left: '5%',
                        right: '5%',
                        containLabel: true
                    },
                    xAxis: [
                        {
                            type: 'category',
                            data: xAxis,
                            name: '注册时间'
                        }
                    ],
                    yAxis: [
                        {
                            type: 'value',
                            name: '注册人数',
                        }
                    ],
                    dataZoom: [
                        {
                            show: true,
                            start: 94,
                            end: 100
                        },
                        {
                            type: 'inside',
                            start: 94,
                            end: 100
                        },
                        {
                            show: true,
                            yAxisIndex: 0,
                            filterMode: 'empty',
                            width: 30,
                            height: '80%',
                            showDataShadow: false,
                            left: '93%'
                        }
                    ],
                    series: [
                        {
                            name: '注册人数',
                            type: 'bar',
                            data: register_count,
                            barMaxWidth: '50rem'
                        },
                    ]
                }
            }
        },
    }
</script>
