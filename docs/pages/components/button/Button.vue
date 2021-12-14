<template>
    <div>
        <Example :component="ExSimple" :code="ExSimpleCode" vertical/>

        <Example :component="ExTypesStates" :code="ExTypesStatesCode" title="Types and States" vertical/>

        <Example :component="ExSizes" :code="ExSizesCode" title="Sizes" vertical/>

        <ApiView :data="api"/>
    </div>
</template>

<script>
import api from './api/button'

import ExSimple from './examples/ExSimple'
import ExSimpleCode from '!!raw-loader!./examples/ExSimple'

import ExTypesStates from './examples/ExTypesStates'
import ExTypesStatesCode from '!!raw-loader!./examples/ExTypesStates'

import ExSizes from './examples/ExSizes'
import ExSizesCode from '!!raw-loader!./examples/ExSizes'

export default {
    data() {
        return {
            api,
            ExSimple,
            ExTypesStates,
            ExSizes,
            ExSimpleCode,
            ExTypesStatesCode,
            ExSizesCode
        }
    }
}
</script>
