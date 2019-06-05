<template>
    <div class="atom">
        <template v-for="i in 4">
            <div :key="i" class="atom_particle">
                <svg>
                    <circle cx="50" cy="50" fill="none" r="40" stroke-width="5"></circle>
                </svg>
            </div>
        </template>
    </div>
</template>

<style lang="scss">
    $color: #00D7FE;

    // Animation
    $animation-duration: 2.5s;
    $animation-timing-function: cubic-bezier(0.47, 0, 0.745, 0.715);
    $circle-perimeter: 2 * 3.14 * 80; // 2πr

    .atom {
        width: 100px;
        height: 100px;
        position: relative;

        &::before {
            font-size: 6px;
            width: 1em;
            height: 1em;
            background: $color;
            border-radius: 50%;
            box-shadow: 0 0 1.5em 1px $color;
            content: "";
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%,-50%);
        }

        &_particle {
            width: 100%;
            height: 100%;
            position: absolute;
            left: 0;
            top: 0;
            transform-style: preserve-3d;

            svg {
                width: 100%;
                height: 100%;
                position: absolute;
                left: 0;
                top: 0;

                circle {
                    stroke: $color;
                    stroke-dasharray: $circle-perimeter;
                    stroke-dashoffset: $circle-perimeter;
                    animation: draw-circle $animation-duration $animation-timing-function infinite;
                }
            }

            @keyframes draw-circle {
                0% {
                    stroke-dashoffset: $circle-perimeter;
                }

                50% {
                    stroke-dashoffset: 0;
                }

                100% {
                    stroke-dashoffset: -$circle-perimeter;
                }
            }

            &:nth-child(1){
                transform: rotateX(80deg) rotateY(20deg);
            }

            &:nth-child(2){
                transform: rotateX(75deg) rotateY(60deg);

                circle {
                    animation-delay: .2s;
                }
            }

            &:nth-child(3){
                transform: rotateX(-75deg) rotateY(60deg);

                circle {
                    animation-delay: .4s;
                }
            }

            &:nth-child(4){
                transform: rotateX(-80deg) rotateY(20deg);

                circle {
                    animation-delay: .6s;
                }
            }
        }
    }
</style>
