<template lang="pug">
    card
        .page-tool-bar
            .tool-bar
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
                q-btn(flat, round, dense, icon='search')
        ResizeableChart(:loading='chartLoading')
            v-chart(ref='chart', style='width: 100%;', :options='daily_chart')
        ResizeableChart(:loading='chartLoading')
            v-chart(ref='chart', style='width: 100%;', :options='hourly_chart')
</template>

<script>
    import axios from '@/axios/activities_log';
    import formatter from '@/tools/formatter';
    import {date} from 'quasar';
    import echarts from 'echarts'

    export default {
        data() {
            return {
                //查询的参数
                beginDate: '2018-11-22',
                endDate: '2018-11-28',
                //图标的属性
                chartLoading: false,
                daily_series: [],
                daily_xAxis: [],
                hourly_series: [],
                selected_date: '',
                chartOptions: {
                    title: {
                        text: '',
                        left: '50%',
                        textAlign: 'center',
                        textStyle: {color: '#fff'}
                    },
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            lineStyle: {
                                color: '#ddd'
                            }
                        },
                        backgroundColor: 'rgba(255,255,255,1)',
                        padding: [5, 10],
                        textStyle: {
                            color: '#7588E4',
                        },
                        extraCssText: 'box-shadow: 0 0 5px rgba(0,0,0,0.3)'
                    },
                    xAxis: {
                        type: 'category',
                        data: [],
                        boundaryGap: false,
                        splitLine: {
                            show: true,
                            interval: 'auto',
                            lineStyle: {
                                color: ['#D4DFF5']
                            }
                        },
                        axisTick: {
                            show: false
                        },
                        axisLine: {
                            lineStyle: {
                                color: '#609ee9'
                            }
                        },
                        axisLabel: {
                            margin: 10,
                            textStyle: {
                                fontSize: 14
                            }
                        }
                    },
                    yAxis: {
                        type: 'value',
                        splitLine: {
                            lineStyle: {
                                color: ['#D4DFF5']
                            }
                        },
                        axisTick: {
                            show: false
                        },
                        axisLine: {
                            lineStyle: {
                                color: '#609ee9'
                            }
                        },
                        axisLabel: {
                            margin: 10,
                            textStyle: {
                                fontSize: 14
                            }
                        }
                    },
                    series: []
                }
            }
        },
        computed: {
            daily_chart() {
                let options = Object.assign({}, this.chartOptions);
                options.title.text = '用户登入日志';
                options.xAxis.data = this.daily_xAxis;
                options.series = [
                    {
                        type: 'line',
                        smooth: true,
                        showSymbol: false,
                        symbol: 'circle',
                        symbolSize: 6,
                        data: this.daily_series,
                        areaStyle: {
                            normal: {
                                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                    offset: 0,
                                    color: 'rgba(199, 237, 250,0.5)'
                                }, {
                                    offset: 1,
                                    color: 'rgba(199, 237, 250,0.2)'
                                }], false)
                            }
                        },
                        itemStyle: {
                            normal: {
                                color: '#f7b851'
                            }
                        },
                        lineStyle: {
                            normal: {
                                width: 3
                            }
                        }
                    },
                ];
                return options;
            },
            hourly_chart() {
                let options = Object.assign({}, this.chartOptions);
                options.title.text = this.selected_date;
                options.xAxis.data = ['00:00', '1:00', '2:00', '3:00', '4:00', '5:00', '6:00',
                    '7:00', '8:00', '9:00', '10:00', '11:00', '12:00',
                    '13:00', '14:00', '15:00', '16:00', '17:00', '18:00',
                    '19:00', '20:00', '21:00', '22:00', '23:00'];
                options.series = [
                    {
                        type: 'line',
                        smooth: true,
                        showSymbol: false,
                        symbol: 'circle',
                        symbolSize: 6,
                        data: this.hourly_series,
                        areaStyle: {
                            normal: {
                                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                    offset: 0,
                                    color: 'rgba(216, 244, 247,1)'
                                }, {
                                    offset: 1,
                                    color: 'rgba(216, 244, 247,1)'
                                }], false)
                            }
                        },
                        itemStyle: {
                            normal: {
                                color: '#58c8da'
                            }
                        },
                        lineStyle: {
                            normal: {
                                width: 3
                            }
                        }
                    }
                ];
                return options;
            }
        },
        methods: {
            hourlyQueryHandler() {
                let data = {
                    beginDate: this.beginDate
                };
                axios.login_hours(data).then(res => {
                    this.hourly_series = res.data.map(item => {
                        return item.login_count
                    })
                }).catch(e => {
                    console.log(e);
                })
            },
            dailyQueryHandler() {
                let data = {
                    beginDate: this.beginDate,
                    endDate: this.endDate
                };
                axios.login_day(data).then(res => {
                    this.daily_xAxis = res.data.map(item => item.daytime);
                    this.daily_series = res.data.map(item => item.login_count)
                }).catch(e => {
                    console.log(e);
                })
            }
        },
        created() {
            setTimeout(() => {
                this.hourlyQueryHandler();
                this.dailyQueryHandler();
            }, 1000);
        }
    }
</script>
