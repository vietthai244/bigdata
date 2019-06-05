<template lang="pug">
    main(style='height: inherit')
        transition(:name='transition_class')
            keep-alive
                template(v-if="activeCmp==='/transaction_report'")
                    Transaction.is-animated
                template(v-if="activeCmp==='/registration_report'")
                    Registration.is-animated
                template(v-if="activeCmp==='/first_charge_report'")
                    FirstCharge.is-animated
                template(v-if="activeCmp==='/finance_report'")
                    Finance.is-animated
                template(v-if="activeCmp==='/activities_log'")
                    ActivitiesLog.is-animated
                template(v-if="activeCmp==='/growth_rate'")
                    GrowthRate.is-animated
                template(v-if="activeCmp==='/system_usage'")
                    SystemUsage.is-animated
        q-scroll-observable(@scroll='scrollHandler')
</template>

<script>
    import Transaction from './sub_pages/transaction_report/TransactionReport';
    import Registration from './sub_pages/registration_report/RegistrationReport';
    import FirstCharge from './sub_pages/first_charge_report/FirstChargeReport';
    import Finance from './sub_pages/finance_report/FinanceReport';
    import ActivitiesLog from './sub_pages/activities_log/ActivitiesLog'
    import GrowthRate from './sub_pages/growth_rate/GrowthRate'
    import SystemUsage from './sub_pages/system_usage/SystemUsage'

    export default {
        components: {Transaction, Registration, FirstCharge, Finance, ActivitiesLog, GrowthRate, SystemUsage},
        data() {
            return {
                nav_change: false
            }
        },
        computed: {
            activeCmp() {
                return this.$store.getters.side_bar_active
            },
            transition_class() {
                let dir = this.$store.state.nav.scroll_direction;
                if (dir === 'up') {
                    return 'slide-up'
                } else {
                    return 'slide-down'
                }
            }
        },
        methods: {
            scrollHandler(ev) {
                // if (ev.type !== 'wheel') {
                //     this.nav_change = false;
                //     return;
                // }
                // this.nav_change = true;
                // setTimeout(() => {
                //     this.scrollNav(ev)
                // });
            },
            scrollNav() {
                // if (!this.nav_change) return;
                // if (ev.deltaY > 0) {
                //     this.$store.dispatch('sideNavHandler', 'down').then().catch();
                // } else {
                //     this.$store.dispatch('sideNavHandler', 'up').then().catch();
                // }
            }
        },
        mounted() {
            // window.addEventListener('wheel', this.scrollHandler);
        }
    }
</script>

<style lang="scss">
    //transition slide down
    .slide-down-enter {
        opacity: 0;
        transform: translateY(100vh);
        position: fixed;
        animation-duration: 1s;
    }

    .slide-down-enter-active {
        opacity: 1;
    }

    .slide-down-leave-active {
        transform: translateY(-100vh);
        opacity: 0;
        position: fixed;
    }

    //transition slide up
    .slide-up-enter {
        opacity: 0;
        transform: translateY(-100vh);
        position: fixed;
    }

    .slide-leave {
        overflow: hidden;
    }

    .slide-up-leave-active {
        position: absolute;
        opacity: 0;
        transform: translateY(20vh);
    }
</style>
