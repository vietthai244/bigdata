<template>
    <div class="particle-waves">
        <div class="page-backdrop" id="page-backdrop">
        </div>
        <div class="backdrop-bg"></div>
    </div>
</template>

<script>
    // import './particles-waves'
    // setTimeout(() => {
    //     return import('./particles-waves')
    // })
    export default {
        mounted() {
            return import('./particles-waves');
        }
    }
</script>

<style lang="scss">
    .particle-waves {
        overflow: hidden;
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
    }

    .backdrop-bg {
        overflow: hidden;
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-size: 100% 100%;
        background: url(~@/assets/backdrop-bg.jpg) no-repeat;
        animation: animatedBackground 20s linear infinite;
        z-index: -1;
    }

    @keyframes animatedBackground {
        0% {
            transform: scale(1, 1);
            filter: blur(4px);
        }
        50% {
            transform: scale(1.2, 1.2);
            filter: blur(0px);
        }
        100% {
            transform: scale(1, 1);
            filter: blur(4px);
        }
    }
</style>
