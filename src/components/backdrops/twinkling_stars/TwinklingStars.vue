<template>
    <div class="wrapper">
        <div class="stars"></div>
        <div class="twinkling"></div>
    </div>
</template>

<style scoped>
    @keyframes move-twink-back {
        from {background-position:0 0;}
        to {background-position:-10000px 5000px;}
    }
    @-webkit-keyframes move-twink-back {
        from {background-position:0 0;}
        to {background-position:-10000px 5000px;}
    }
    @-moz-keyframes move-twink-back {
        from {background-position:0 0;}
        to {background-position:-10000px 5000px;}
    }
    @-ms-keyframes move-twink-back {
        from {background-position:0 0;}
        to {background-position:-10000px 5000px;}
    }
    .wrapper {
        opacity: .7;
    }
    .stars, .twinkling {
        position:absolute;
        top:0;
        left:0;
        right:0;
        bottom:0;
        width:100%;
        height:100%;
        display:block;
    }

    .stars {
        background: #000 url(stars.png) repeat center;
        z-index:0;
    }

    .twinkling{
        background:transparent url(twinkling.png) repeat top center;
        z-index:1;
        -moz-animation:move-twink-back 200s linear infinite;
        -ms-animation:move-twink-back 200s linear infinite;
        -o-animation:move-twink-back 200s linear infinite;
        -webkit-animation:move-twink-back 200s linear infinite;
        animation:move-twink-back 200s linear infinite;
    }
</style>
