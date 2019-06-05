<template>
    <ResizeableChart :loading="loading">
        <v-chart ref="chart"
                 style="width: 100%"
                 :options="options"/>
    </ResizeableChart>
</template>

<script>
    export default {
        props: ['data', 'loading'],
        data() {
            return {}
        },
        computed: {
            // count_series() {      //图表的数据-账变频次
            //     if (this.data.name) {
            //         return this.data.name.map(item => {
            //             return item.map(child_item => {
            //                 return child_item[0];
            //             })
            //         })
            //     } else {
            //         return []
            //     }
            // },
            val_series() {          //图表的数据-张变金额
                if (this.data.name) {
                    return this.data.name.map(item => {
                        return item.map(child_item => {
                            return child_item[1];
                        })
                    })
                } else {
                    return ['']
                }
            },
            indicator() {    //张变类型
                if (this.data.name) {
                    return this.data.name.map(item => {
                        return item.map(child_item => {
                            return {
                                name: child_item[4],
                            };
                        })
                    })
                } else {
                    return []
                }
            },
            timeline() {    //图表的时间线
                return this.data.time ? this.data.time : [];
            },
            chart_options() {
                let timeline = this.timeline;           //图表的时间线
                let val_series = this.val_series;       //图表的数据-张变金额
                let indicator = this.indicator;
                let chart_options = [];
                if (this.timeline) {
                    for (let n = 0; n < timeline.length; n++) {
                        chart_options.push({
                            title: [{text: timeline[n]}],
                            radar: {indicator: indicator[n]},
                            series: [{data: [val_series[n]]}]
                        });
                    }
                }
                return chart_options;
            },
            options() {     //图表的选项
                let timeline = this.timeline;
                // let count_series = this.count_series;
                let val_series = this.val_series;
                let chart_options = this.chart_options;
                let indicator = this.indicator;

                return {
                    baseOption: {
                        timeline: {
                            axisType: 'category',
                            orient: 'vertical',
                            autoPlay: true,
                            inverse: true,
                            playInterval: 2500,
                            left: null,
                            right: 0,
                            top: 20,
                            bottom: 20,
                            width: 100,
                            height: null,
                            label: {
                                normal: {
                                    textStyle: {
                                        color: '#999'
                                    }
                                },
                                emphasis: {
                                    textStyle: {
                                        color: '#fff'
                                    }
                                }
                            },
                            symbol: 'none',
                            lineStyle: {
                                color: '#555'
                            },
                            checkpointStyle: {
                                color: '#bbb',
                                borderColor: '#777',
                                borderWidth: 2
                            },
                            controlStyle: {
                                showNextBtn: false,
                                showPrevBtn: false,
                                normal: {
                                    color: '#666',
                                    borderColor: '#666'
                                },
                                emphasis: {
                                    color: '#aaa',
                                    borderColor: '#aaa'
                                }
                            },
                            data: timeline
                        },
                        animationDurationUpdate: 1000,
                        animationEasingUpdate: 'quinticInOut',
                        backgroundColor: 'transparent',
                        normal: {
                            "top": 200,
                            "left": 300,
                            "width": 500,
                            "height": 400,
                            "zIndex": 6,
                            "backgroundColor": ""
                        },
                        color: ["rgba(245, 166, 35, 1)", "rgba(19, 173, 255, 1)"],
                        tooltip: {
                            "show": true,
                            "trigger": "item"
                        },
                        title: [
                            {
                                text: timeline[0],
                                textAlign: 'center',
                                left: '50%',
                                top: '50%',
                                textStyle: {
                                    fontSize: 40,
                                    color: 'rgba(255, 255, 255, 0.7)'
                                },
                                "show": true,
                            },
                        ],
                        // "legend": {
                        //     "show": true,
                        //     "icon": "circle",
                        //     "left": "35%",
                        //     "top": "90%",
                        //     "orient": "horizontal",
                        //     "textStyle": {
                        //         "fontSize": 14,
                        //         "color": "#fff"
                        //     },
                        //     "data": ["数据1", "数据2"]
                        // },
                        radar: {
                            "center": ["50%", "50%"],
                            "radius": "70%",
                            "startAngle": 90,
                            "splitNumber": 4,
                            "shape": "circle",
                            "splitArea": {
                                "areaStyle": {
                                    "color": ["transparent"]
                                }
                            },
                            "axisLabel": {
                                "show": false,
                                "fontSize": 18,
                                "color": "#fff",
                                "fontStyle": "normal",
                                "fontWeight": "normal"
                            },
                            "axisLine": {
                                "show": true,
                                "lineStyle": {
                                    "color": "grey"//
                                }
                            },
                            "splitLine": {
                                "show": true,
                                "lineStyle": {
                                    "color": "grey"//
                                }
                            },
                            indicator: indicator[0] ? indicator[0] : []
                        },
                        series: [
                            {
                                name: "账变金额",
                                type: "radar",
                                symbol: "circle",
                                symbolSize: 10,
                                itemStyle: {
                                    "normal": {
                                        color:'rgba(19, 173, 255, 1)',
                                        "borderColor": "rgba(19, 173, 255, 0.4)",
                                        "borderWidth": 10
                                    }
                                },
                                areaStyle: {
                                    "normal": {
                                        "color": "rgba(19, 173, 255, 0.5)"
                                    }
                                },
                                lineStyle: {
                                    "normal": {
                                        "color": "rgba(19, 173, 255, 1)",
                                        "width": 2,
                                        "type": "dashed"
                                    }
                                },
                                data: val_series[0] ? [val_series[0]] : []
                            },
                        ]
                    },
                    options: chart_options
                }
            }
        },
        methods: {},
    }
</script>
