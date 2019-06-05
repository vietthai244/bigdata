<template>
    <div id="app">
        <router-view/>
    </div>
</template>

<style lang="sass">
    #app
        /*font-family: "Microsoft YaHei", "微软雅黑", "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB",  Arial, sans-serif*/
        font-family: "华文细黑", "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB",  Arial, sans-serif
        overflow: auto
    .q-loading-bar.top.bg-red   /*remove default loading bar*/
        display: none
</style>
