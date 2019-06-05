<template lang="pug">
  .header-nav
    Twinkling
    .logo
      Logo
    .nav-list
      template(v-for='item in menu')
        .nav-item(
        :class="activeItem === item.url ? 'active' : ''",
        :key='item.id', @click='menuClickHandler(item)'
        )
          .nav-content.relative-position
            p.nav-label {{ item.label }}

</template>

<script>
  import Logo from './Logo'
  import Twinkling from '@/components/backdrops/twinkling_stars/TwinklingStars';

  export default {
    components: {Logo, Twinkling},
    data() {
      return {}
    },
    computed: {
      menu() {
        return this.$store.getters.header_nav_list
      },
      activeItem() {
        return this.$store.getters.header_active
      }
    },
    methods: {
      menuClickHandler(item) {
        this.$store.dispatch('headerNavHandler', item).then(() => {
          this.$router.push(item.url);
        })
      }
    }
  }
</script>

<style lang="sass">
  .header-nav
    height: 60px
    width: 100%
    border-bottom: rgba(255, 255, 255, .26) 1px solid
    transition: 0.3s
    display: flex
    justify-content: center
    align-items: center
    overflow: hidden
    position: relative
    &:hover
      height: 90px
    .logo
      transition: 1s
      z-index: 10
    .nav-list
      z-index: 20
      display: flex
      padding: auto 40px
      position: relative
      .nav-item
        opacity: 0.5
        cursor: pointer
        display: flex
        align-items: center
        transition: 1s
        font-weight: bolder
        text-shadow: 0 1px 2px rgba(0, 0, 0, .1)
        letter-spacing: 0.35rem
        font-size: 1rem
        font-style: normal
        -webkit-text-stroke: .03rem rgba(255, 255, 255, 0.3)
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
              background: #00D7FE !important
              transition: width .4s
        &:hover
          opacity: 1
        &.active
          opacity: 1
          color: #00D7FE !important
          transition: all 0.3s ease 0s
          .nav-label:after
            /*left: 5%*/
            width: 100%

</style>
