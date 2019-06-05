<template>
    <div>
        <template v-if="type===''">
            <!--add more type later-->
        </template>
        <!--//default-->
        <Spinner1 v-else/>
    </div>
</template>

<script>
    import Spinner1 from '@/components/animation/LoadingSpinner1';

    export default {
        components: {Spinner1},
        props: ['type']
    }
</script>
