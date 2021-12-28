<template>
    <div>
        <Example :component="ExSimple" :code="ExSimpleCode" vertical/>
        <Example :component="ExComplex" :code="ExComplexCode" vertical/>
        <Example :component="ExIcon" :code="ExIconCode" vertical/>

        <ApiView :data="api"/>
    </div>
</template>

<script>
    import api from './api/menu'

    import ExSimple from './examples/ExSimple'
    import ExSimpleCode from '!!raw-loader!./examples/ExSimple'

    import ExComplex from './examples/ExComplex'
    import ExComplexCode from '!!raw-loader!./examples/ExComplex'

    import ExIcon from './examples/ExIcon'
    import ExIconCode from '!!raw-loader!./examples/ExIcon'

    export default {
        data() {
            return {
                api,
                ExSimple,
                ExSimpleCode,
                ExComplex,
                ExComplexCode,
                ExIcon,
                ExIconCode
            }
        }
    }
</script>
