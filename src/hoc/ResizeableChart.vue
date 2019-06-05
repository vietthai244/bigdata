<template>
    <div class="resizeable-chart">
        <q-resize-observable @resize="onResize"/>
        <slot></slot>
        <q-inner-loading :visible="loading" dark>
            <Loading/>
        </q-inner-loading>
    </div>
</template>

<script>
    export default {
        props: ['loading'],
        data() {
            return {
                echart: null
            }
        },
        methods: {
            onResize(size) {
                //resize chart if dom size changed
                if (this.echart) {
                    this.echart.resize();
                }
            }
        },
        mounted() {
            //get echart el
            this.$children.forEach(item => {
                if (item.$el.className === 'echarts') {
                    this.echart = item
                }
            });
        }
    }
</script>

<style>
    .resizeable-chart{
        /*height: inherit;*/
        margin-top: 15px;
    }
</style>
