<template>
    <main>
        <ResizeableChart :loading="loading">
            <v-chart ref="chart"
                     style="width: 100%;"
                     :options="options"/>
        </ResizeableChart>
    </main>
</template>

<script>
    export default {
        props: ['loading', 'data'],
        computed: {
            options() {
                const dateList = this.data.map(item => {
                    return item.create_date;
                });
                const drawList = this.data.map(function (item) {
                    return item.ring_ratio_draw;
                });
                const payList = this.data.map(function (item) {
                    return item.ring_ratio_pay;
                });
                return {
                    // Make gradient line here
                    visualMap: [{
                        show: false,
                        type: 'continuous',
                        seriesIndex: 0,
                        min: 0,
                        max: 400
                    }, {
                        show: false,
                        type: 'continuous',
                        seriesIndex: 1,
                        dimension: 0,
                        min: 0,
                        max: dateList.length - 1
                    }],


                    title: [{
                        left: 'center',
                        text: '出款环比',
                        textStyle: {
                            color: '#fff'
                        }
                    }, {
                        top: '50%',
                        left: 'center',
                        text: '入款环比',
                        textStyle: {
                            color: '#fff'
                        }
                    }],
                    tooltip: {
                        trigger: 'axis'
                    },
                    xAxis: [{
                        data: dateList
                    }, {
                        data: dateList,
                        gridIndex: 1
                    }],
                    yAxis: [{
                        splitLine: {show: false}
                    }, {
                        splitLine: {show: false},
                        gridIndex: 1
                    }],
                    grid: [{
                        bottom: '60%'
                    }, {
                        top: '60%'
                    }],
                    series: [{
                        type: 'line',
                        showSymbol: false,
                        data: drawList
                    }, {
                        type: 'line',
                        showSymbol: false,
                        data: payList,
                        xAxisIndex: 1,
                        yAxisIndex: 1
                    }]
                }
            }
        }
    }
</script>
