<template lang="pug">
  main
    Backdrop
    template(v-if='app_show')
      .Layout
        q-layout(view='hHh Lpr lFf')
          transition(appear='', enter-active-class='animated slideInDown')
            q-layout-header(v-model='header')
              HeaderNav

          q-layout-drawer(
          :width='200',
          v-model='side_bar',
          side='left')
            transition(
            appear='',
            enter-active-class='animated fadeInLeft')
              SideNavBar
          transition(
          appear='',
          enter-active-class='animated fadeIn')
            q-page-container
              q-scroll-area(
              style='height: calc(100vh - 60px);width: 100%',
              :content-style="{height: 'inherit'}"
              )
                transition(
                appear='',
                enter-active-class='animated fadeIn',
                leave-active-class='animated fadeOut')
                  router-view
    Preloading
</template>

<script>
  import SideNavBar from './SideNavBar';  //左侧
  import HeaderNav from './Header';       //头部
  import Backdrop from '../../components/BackDrop';     //背景
  import Preloading from '@/components/Preloading';           //WebApp下载中的动画

  export default {
    components: {SideNavBar, HeaderNav, Backdrop, Preloading},
    data() {
      return {
        header: true,
        side_bar: true,
        app_show: false,
      }
    },
    watch: {
      preloading(val) {
        if (!val) {
          setTimeout(() => {
            this.app_show = true;
          }, 1000)
        }
      }
    },
    computed: {
      preloading() {
        return this.$store.state.preloading;
      },
    },
    mounted() {
      let duration = Math.floor(Math.random() * (4 - 1)) + 1;
      setTimeout(() => {
        this.$store.commit('LOADED')
      }, duration * 1000)

    }
  }
</script>

<style lang="sass">
  .Layout
    min-height: 100vh
    max-width: 100vw
    display: flex
    position: relative
    color: #fff
    overflow: hidden
    .q-layout
      .q-layout-header
        height: 60px
        box-shadow: none
      .q-layout-drawer
        background: none
        border: none
        box-shadow: none
        height: 100vh
        &::-webkit-scrollbar
          display: none
          width: 0
          height: 0
      .q-page-container
        height: calc(100vh - 60px)
        width: 100%
    .page-tool-bar
      display: flex
      justify-content: space-between
      align-items: center
      .tool-bar
        display: flex

    .tab-list
      display: flex
      padding: auto 40px
      position: relative
      .nav-item
        opacity: 0.5
        cursor: pointer
        text-align: center
        /*display: flex*/
        /*align-items: center*/
        transition: 1s
        font-weight: bold
        text-shadow: 0 1px 2px rgba(0, 0, 0, .2)
        letter-spacing: 0.35rem
        font-size: 1rem
        .nav-content
          padding: 25px
          display: flex
          align-items: center
          .nav-label
            position: relative
            &:after
              position: absolute
              bottom: -15px
              left: 0
              content: ''
              display: block
              width: 0
              height: 2px
              background: #ffc400 !important
              transition: width .4s
        &:hover, &.active
          opacity: 1
          font-weight: bolder
        &.active
          color: #ffc400 !important
          transition: all 0.3s ease 0s
          .nav-label:after
            /*left: 5%*/
            width: 100%
    .is-animated
      transition: all 1s
      width: 100%
</style>
