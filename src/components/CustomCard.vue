<template lang="pug">
    transition(
    appear,
    mode='out-in',
    enter-active-class='animated fadeIn',
    leave-active-class='animated fadeOut',
    duration='1500'
    )
        .CustomCard(
        :style="{\
        height: height ? height : 'inherit',\
        width: width ? width : '100%',\
        minWidth: minWidth ? minWidth : '',\
        maxWidth: maxWidth ? maxWidth : '',\
        minHeight: minHeight ? minHeight : '',\
        maxHeight: maxHeight ? maxHeight : ''\
        }")
            .CardHeading(v-if='title')
                | {{title}}
            .CardBody
                slot

</template>

<script>
    export default {
        props: ['width', 'height', 'minWidth', 'maxWidth', 'minHeight', 'maxHeight', 'title'],
    }
</script>

<style lang="sass">
    .CustomCard
        box-sizing: border-box
        border: none
        border-radius: 2px
        position: relative
        margin-bottom: 24px
        background: none
        padding: 30px
        /*background: linear-gradient(30deg, rgba(0, 0, 0, 0.2) 25%, rgba(0, 0, 0, 0.4) 50%, rgba(0, 0, 0, 0.6) 75%, rgba(0, 0, 0, 0.8) 100%)*/
        /*box-shadow: 1px 1px 4px 1px rgba(255, 255, 255, .3)*/
        .CardHeading
            border-bottom: 1px solid rgba(0, 0, 0, .12)
            height: 44px
            font-size: 16px
            text-align: center
            padding: 14px 22px
            box-shadow: 0 1px 0 0 rgba(255, 255, 255, .12)
            border-top-left-radius: 3px
            border-top-right-radius: 3px
        .CardBody
            height: 100%
            table
                tbody
                    height: 200px
                    overflow: auto
            .row-active
                color: #ffc107 !important
                background-color: rgba(255, 193, 7, .1)
                *
                    font-size: .95rem
                    font-weight: bolder
</style>
