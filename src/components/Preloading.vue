<template lang="pug">
  transition(appear, leave-active-class='animated fadeOut')
    .preloading-wrapper(v-if='preloading')
      .loading-anim
        .loading-text
          span.loading-text-words 下
          span.loading-text-words 载
          span.loading-text-words 中

</template>

<script>
  export default {
    computed: {
      preloading() {
        return this.$store.state.preloading;
      }
    },
  }
</script>

<style lang="scss">
  .preloading-wrapper {
    background-color: #000;
    z-index: 999;
    height: 100%;
    width: 100%;
    position: fixed;
    top: 0;
    left: 0;
    display: flex;
    align-items: center;
  }

  .loading-anim {
    vertical-align: middle;
    width: 150px;
    height: 150px;
    line-height: 150px;
    margin: auto;
    position: relative;
    box-sizing: border-box;
    text-align: center;
    z-index: 0;
    text-transform: uppercase;
  }

  .loading-anim:before,
  .loading-anim:after {
    opacity: 0;
    box-sizing: border-box;
    content: "\0020";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: 100px;
    border: 5px solid #fff;
    box-shadow: 0 0 50px #fff, inset 0 0 50px #fff;
  }

  .loading-anim:after {
    z-index: 1;
    -webkit-animation: gogoloader 2s infinite 1s;
  }

  .loading-anim:before {
    z-index: 2;
    -webkit-animation: gogoloader 2s infinite;
  }

  @-webkit-keyframes gogoloader {
    0% {
      -webkit-transform: scale(0);
      opacity: 0;
    }
    50% {
      opacity: 1;
    }
    100% {
      -webkit-transform: scale(1);
      opacity: 0;
    }
  }

  @mixin position-center($text-align: center) {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
    text-align: $text-align;
  }

  .loading-text {
    @include position-center;
    width: 100%;
    height: 100px;
    line-height: 100px;
    span {
      display: inline-block;
      margin: 0 5px;
      color: #fff;
      @for $i from 0 through 2 {
        &:nth-child(#{$i + 1}) {
          -webkit-filter: blur(0px);
          filter: blur(0px);
          -webkit-animation: blur-text 1.5s 0.2s infinite linear alternate;
          animation: blur-text 1.5s 0.2s infinite linear alternate;
        }
      }
    }
  }

  @keyframes blur-text {
    0% {
      filter: blur(0px);
    }
    100% {
      filter: blur(4px);
    }
  }

</style>
