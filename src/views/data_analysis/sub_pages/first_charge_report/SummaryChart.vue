<template>
    <ResizeableChart :loading="loading">
        <v-chart ref="chart"
                 style="width: 100%; height: 920px"
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
            charge_amount() { // 入款金额与出款金额 比例（上饼状图）
                let total_charge_amount = 0;
                let total_withdraw_amount = 0;

                for (let item of this.data) {
                    total_charge_amount += item.money_sum;
                    total_withdraw_amount += item.draw_money_sum;
                }
                return {
                    total_charge_amount: {
                        label: '总入款金额',
                        value: total_charge_amount
                    },
                    total_withdraw_amount: {
                        label: '总出款金额',
                        value: total_withdraw_amount
                    }
                }
            },
            charge_count() { //入款频次与出款频次 比例（下饼状图）

                let total_charge_count = 0;
                let total_withdraw_count = 0;

                for (let item of this.data) {
                    total_charge_count += item.count_sum;
                    total_withdraw_count += item.draw_count_sum;
                }
                return {
                    total_charge_amount: {
                        label: '入款频次',
                        value: total_charge_count
                    },
                    total_withdraw_amount: {
                        label: '出款频次',
                        value: total_withdraw_count
                    }
                }
            },
            site_count() { //首冲用户数  左边柱状图  Y轴：站点名   X轴：用户数量
                let data = {};
                let total = 0; //全部站点的总注册人数
                for (let item in this.data) {
                    data[`${this.data[item].site_name}`] = this.data[item].count_number
                }
                for (let item in data) {
                    total += data[item];
                }
                return {
                    total: total,
                    data: data,
                }
            },
            options() {     //图表的选项
                const charge_amount = this.charge_amount;
                const charge_count = this.charge_count;
                const site_count = this.site_count;
                return {
                    tooltip: {},
                    title: [
                        {
                            text: '首充用户数',
                            subtext: '总计: ' + this.site_count.total,
                            x: '25%',
                            textAlign: 'center'
                        },
                        {
                            text: '出入款金额比例',
                            x: '75%',
                            textAlign: 'center'
                        },
                        {
                            text: '出入款频次比例',
                            x: '75%',
                            y: '50%',
                            textAlign: 'center'
                        }
                    ],
                    grid: [
                        {
                            top: 50,
                            height: '90%',
                            width: '50%',
                            left: 10,
                            containLabel: true
                        },
                    ],
                    xAxis: [
                        {
                            type: 'value',
                            max: site_count.total,
                            splitLine: {
                                show: true
                            }
                        }
                    ],
                    yAxis: [
                        {
                            type: 'category',
                            data: Object.keys(site_count.data),
                            axisLabel: {
                                interval: 0,
                                rotate: 30
                            },
                            splitLine: {
                                show: false
                            }
                        }
                    ],
                    series: [
                        {
                            type: 'bar',
                            stack: 'chart',
                            z: 3,
                            label: {
                                normal: {
                                    position: 'right',
                                    show: true
                                }
                            },
                            data: Object.keys(site_count.data).map(function (key) {
                                return site_count.data[key];
                            })
                        },
                        {
                            type: 'bar',
                            stack: 'chart',
                            silent: true,
                            itemStyle: {
                                normal: {
                                    color: 'rgba(0,0,0,.4)'
                                }
                            },
                            data: Object.keys(site_count.data).map(function (key) {
                                return site_count.total - site_count.data[key];
                            })
                        },
                        {
                            type: 'pie',
                            radius: [0, '30%'],
                            center: ['75%', '25%'],
                            data: Object.keys(charge_amount).map(function (key) {
                                return {
                                    name: charge_amount[key].label,
                                    value: charge_amount[key].value
                                }
                            })
                        },
                        {
                            type: 'pie',
                            radius: [0, '30%'],
                            center: ['75%', '75%'],
                            data: Object.keys(charge_count).map(function (key) {
                                return {
                                    name: charge_count[key].label,
                                    value: charge_count[key].value
                                }
                            })
                        }
                    ]
                }
            }
        },
        methods: {},
    }
</script>
