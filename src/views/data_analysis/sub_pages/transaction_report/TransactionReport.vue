<template lang="pug">
    .transaction-report
        Card
            .page-tool-bar
                .tool-bar
                    q-datetime(
                    v-model='beginDate',
                    type='date',
                    color='info',
                    dark, clearable,
                    style='margin-right: 20px; width: 200px'
                    )
                    q-datetime(
                    v-model='endDate',
                    type='date',
                    color='info',
                    dark, clearable,
                    style='margin-right: 20px; width: 200px'
                    )
                    q-btn(flat, round, dense, icon='search', @click='queryHandler')
            .tab-list
                template(
                v-for="(item, idx) in [['出款实际状况','draw-record'], ['入款实际状况', 'pay-record'], ['出入款状况比例', 'conclusion-record']]"
                )
                    .nav-item(
                    :class="tabs===item[1] ? 'active' : ''",
                    :key='idx',
                    @click='tabs=item[1]'
                    )
                        .nav-content.relative-position
                            p.nav-label {{item[0]}}
            .tab-pane
                template(v-if="tabs==='draw-record'")
                    DrawRecord(ref='draw-record')
                template(v-if="tabs==='pay-record'")
                    PayRecord(ref='pay-record')
                template(v-if="tabs==='conclusion-record'")
                    ConslusionRecord(ref='conclusion-record')

</template>

<script>
    import DrawRecord from './DrawRecord'
    import PayRecord from './PayRecord'
    import ConslusionRecord from './ConclusionRecord'
    import {date} from 'quasar'

    export default {
        components: {DrawRecord, PayRecord, ConslusionRecord},
        data() {
            return {
                beginDate: '2017/1/1',
                endDate: '2019/8/10',
                tabs: 'draw-record',
            }
        },
        watch: {
            tabs(val) {
                setTimeout(() => {
                    this.queryHandler();
                }, 1);
            }
        },
        methods: {
            queryHandler() { //获取表格+图表的数据
                let params = {
                    beginDate: date.formatDate(this.beginDate, 'YYYY/MM/DD'),
                    endDate: date.formatDate(this.endDate, 'YYYY/MM/DD')
                };
                this.$refs[this.tabs].queryHandler(params);
            }
        },
        mounted() {
            this.queryHandler();
        }
    }
</script>

<style lang="sass">
    .transaction-report
        .q-tab-pane
            padding: 5px
</style>
