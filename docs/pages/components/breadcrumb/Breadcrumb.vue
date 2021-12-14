<template>
    <section>
        <Example :component="ExDefault" :code="ExDefaultCode" title="Alignments"/>

        <ApiView :data="api"/>
    </section>
</template>

<script>
    import api from './api/breadcrumb'

    import ExDefault from './examples/ExDefault'
    import ExDefaultCode from '!!raw-loader!./examples/ExDefault'

    export default {

        name: 'Breadcrumb',

        data () {
            return {
                api,
                ExDefault,
                ExDefaultCode
            }
        }
    }
</script>
