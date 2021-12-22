<template>
    <div>
        <Example :component="ExSimple" :code="ExSimpleCode"/>

        <Example :component="ExDynamic" :code="ExDynamicCode" title="Dynamic">
            <p>Items can be created / modified / deleted and will always keep the defined order.</p>
            <p>You can also use <code>v-if</code> to show (or not) a Tab Item.</p>
        </Example>

        <ApiView :data="api"/>
    </div>
</template>

<script>
    import api from './api/tabs'

    import ExSimple from './examples/ExSimple'
    import ExSimpleCode from '!!raw-loader!./examples/ExSimple'

    import ExDynamic from './examples/ExDynamic'
    import ExDynamicCode from '!!raw-loader!./examples/ExDynamic'

    export default {
        data() {
            return {
                api,
                ExSimple,
                ExDynamic,
                ExSimpleCode,
                ExDynamicCode,
            }
        }
    }
</script>
