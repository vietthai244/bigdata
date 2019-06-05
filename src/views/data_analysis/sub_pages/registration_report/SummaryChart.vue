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
                let xAxis = [];
                let register_count = [];
                if (this.data) {
                    xAxis = this.data.map(item => {
                        return item.site_name;
                    });
                    register_count = this.data.map(item => {
                        return item.count_number
                    });
                }

                return {
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
                            name: '站点名称',
                            axisLabel: {
                                interval: 0,
                                rotate: 60
                            },
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
                            data: register_count
                        },
                    ]
                }
            }
        },
    }
</script>
