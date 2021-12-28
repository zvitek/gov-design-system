<template>
    <div>
        <Example :component="ExSize" :code="ExSizeCode" title="Sizes" vertical/>
        <Example :component="ExIcon" :code="ExIconCode" title="Icon" vertical/>

        <ApiView :data="api"/>
    </div>
</template>

<script>
    import api from './api/accordion'

    import ExSize from './examples/ExSize'
    import ExSizeCode from '!!raw-loader!./examples/ExSize'

    import ExIcon from './examples/ExIcon'
    import ExIconCode from '!!raw-loader!./examples/ExIcon'

    export default {
        data() {
            return {
                api,
                ExSize,
                ExSizeCode,
                ExIcon,
                ExIconCode,
            }
        }
    }
</script>
