<template lang="pug">
    .sidenav(key='sidenav')
        span.indicator(key='indicator', style='visibility: inherit; opacity: 1; transform: matrix(1, 0, 0, 1, 0, 432);') circ
        ul(key='list')
            li(v-for='item in navList', :class="activeItem===item.url? 'active': ''", @click='navClickHandler(item)', :key='item.id')
                p.nav-label {{ item.label }}
                span &nbsp;
                span.border-indicator
</template>

<script>
    export default {
        data() {
            return {}
        },
        computed: {
            activeItem() {
                return this.$store.getters.side_bar_active
            },
            navList() {
                return this.$store.getters.side_nav_list
            }
        },
        methods: {
            navClickHandler(item) {
                this.$store.dispatch('sideNavHandler', item).then(() => {
                    // console.log(this.$store.state.nav.scroll_direction)
                });
            }
        }
    }
</script>

<style lang="sass">
    .sidenav
        background: transparent
        z-index: 20
        margin-top: 150px
        left: 24px
        padding: 0
        border: 0
        font-size: 100%
        vertical-align: baseline
        .indicator
            display: none
            visibility: inherit
            opacity: 1
            transform: matrix(1, 0, 0, 1, 0, 72)
            left: -3px
            top: 0
            position: fixed
            width: 18px
            margin-top: 0
            height: 18px
            text-indent: -99999px
            z-index: 300
            border: 1px solid #fff
            border-radius: 18px
            &:after
                background: #fff
                position: absolute
                content: ""
                border-radius: 18px
                width: 12px
                height: 12px
                top: 3px
                left: 3px

        ul
            list-style: none
            opacity: .5
            transition: opacity .5s
            &:hover
                opacity: 1

            li
                visibility: inherit
                position: relative
                display: block
                margin-bottom: 57px
                font: inherit
                vertical-align: baseline

                &:hover .nav-label,
                &.active .nav-label
                    color: #fff
                    opacity: 1
                &.active span.border-indicator
                    opacity: 1
                    /* transform: scale(1.6); */
                &:not(:last-child):after
                    content: ""
                    position: absolute
                    width: 2px
                    height: 53px
                    background-color: #fff
                    display: block
                    left: 4px
                    top: 19px
                    opacity: 0.3
                .nav-label
                    cursor: pointer
                    display: block
                    padding: 0 0 0 49px
                    color: #eee
                    font-size: 11px
                    text-transform: uppercase
                    text-decoration: none
                    transition: all 0.5s ease
                    opacity: 0.7
                    &:before
                        content: " "
                        display: block
                        position: absolute
                        left: 0
                        top: 3px
                        z-index: 1
                        opacity: 0.5
                        width: 10px
                        height: 10px
                        /* border: 1px solid #fff; */
                        border: 1px solid rgba(255, 255, 255, 1)
                        border-radius: 10px
                        transition: opacity 0.6s ease-in-out

                span
                    display: block
                    border-right: #fff solid 1px
                    left: 1px
                    position: absolute
                    height: 13.7%
                    opacity: 0.1
                    margin: 0
                    padding: 0
                    &.border-indicator
                        position: absolute
                        top: -1px
                        left: -3.55px
                        opacity: 0
                        width: 18px
                        height: 18px
                        border: 2px solid #fff
                        border-radius: 18px
                        transition: opacity 0.6s ease-in-out
                        margin: 0
                        padding: 0
</style>
