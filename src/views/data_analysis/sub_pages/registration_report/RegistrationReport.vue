<template lang="pug">
    Card
        .page-tool-bar
            .tool-bar
                q-datetime(
                v-model='beginDate',
                type='date',
                dark, clearable,
                style='margin-right: 20px; width: 200px'
                )
                q-datetime(
                v-model='endDate',
                type='date',
                dark, clearable,
                style='margin-right: 20px; width: 200px'
                )
                q-btn(flat, round, dense, icon='search', @click='searchHandler')

        template(v-if="chartType==='all'")
            SumChart(:data='sumChartData', :loading='chartLoading')
        template(v-else='')
            DetailsChart(:data='detailsChartData', :site_name='site_name', :loading='chartLoading')

        q-table(
        title='站点注册人数',
        dense, dark
        :data='tableData',
        :columns='columns',
        :loading='tableLoading',
        color='info',
        row-key='name',
        style='max-height: 500px; overflow: auto'
        )
            q-tr.cursor-pointer(
            slot='body', slot-scope='props',
            :class="selected === props.row.__index  ? 'row-active' : ''",
            :props='props',
            @click.native='rowClickHandler(props.row)'
            )
                q-td(v-for='col in props.cols', :key='col.name', :props='props')
                    | {{ col.value }}
</template>

<script>
    import axios from '@/axios/registration_report';
    import SumChart from './SummaryChart'
    import DetailsChart from './DetailsChart'
    import chart_resize from '@/tools/charts/resize';
    import {date} from 'quasar'

    export default {
        components: {SumChart, DetailsChart},
        data() {
            return {
                site_name: '',
                // 查询参数
                beginDate: '2018/12/11',
                endDate: '2019/12/11',
                site_id: '全部',
                // 表格属性
                selected: '',
                columns: [
                    {
                        name: 'site_id',
                        label: '站点ID',
                        field: 'site_id',
                        align: 'left',
                        required: true,
                        sortable: true,
                        sort: (a, b) => parseInt(a, 10) - parseInt(b, 10)
                    },
                    {
                        name: 'site_name',
                        label: '站点名称',
                        field: 'site_name',
                        align: 'left',
                        required: true,
                        sortable: true,
                        sort: (a, b) => new Date(a) - new Date(b)
                    },
                    {
                        name: 'count_number',
                        label: '注册人数',
                        field: 'count_number',
                        align: 'left',
                        sortable: true,
                        sort: (a, b) => parseInt(a, 10) - parseInt(b, 10)
                    }
                ],
                tableData: [],
                tableLoading: false,
                // 图表的属性
                chartLoading: false,
                sumChartData: null,
                detailsChartData: [],
                chartType: ''
            }
        },
        methods: {
            queryHandler(id) {    //获取表格+图表的数据
                this.tableLoading = true;
                this.chartLoading = true;
                let params = {
                    beginDate: date.formatDate(this.beginDate, 'YYYY/MM/DD'),
                    endDate: date.formatDate(this.endDate, 'YYYY/MM/DD'),
                    site_id: id
                };
                axios.AccountSelect(params).then(res => {
                    this.tableLoading = false;
                    this.chartLoading = false;
                    if (this.chartType === 'all') {
                        this.tableData = res.data;
                        this.selected = '';
                        this.sumChartData = res.data;
                    } else {
                        this.detailsChartData = res.data;
                    }
                }).catch(e => {
                    this.tableLoading = false;
                    this.chartLoading = false;
                    console.log(e)
                })
            },
            searchHandler() {
                this.chartType = 'all';
                this.queryHandler('全部');
            },
            rowClickHandler(row) {     //点击表格的一条数据
                this.chartType = 'details';
                this.selected = row.__index;
                this.site_name = row.site_name;
                this.queryHandler(row.site_id);
            }
        },
        created() {
            chart_resize(this);
            this.searchHandler()
        }
    }
</script>

<style lang="sass">

</style>
