<template>
    <div>
        <Example :component="ExSimple" :code="ExSimpleCode"/>

        <Example :component="ExObjArray" :code="ExObjArrayCode" title="Object array"/>

        <Example :component="ExCustomAsync" :code="ExCustomAsyncCode" title="Async with custom template">
            <p>You can have a custom template by adding a scoped slot to it.</p>
            <p><small>API from <a href="https://www.themoviedb.org" target="_blank">TMDb</a></small>.</p>
        </Example>

        <ApiView :data="api"/>
    </div>
</template>

<script>
    import api from './api/autocomplete'

    import ExSimple from './examples/ExSimple'
    import ExSimpleCode from '!!raw-loader!./examples/ExSimple'

    import ExObjArray from './examples/ExObjArray'
    import ExObjArrayCode from '!!raw-loader!./examples/ExObjArray'

    import ExCustomAsync from './examples/ExCustomAsync'
    import ExCustomAsyncCode from '!!raw-loader!./examples/ExCustomAsync'

    export default {
        data() {
            return {
                api,
                ExSimple,
                ExSimpleCode,
                ExObjArrayCode,
                ExObjArray,
                ExCustomAsyncCode,
                ExCustomAsync
            }
        }
    }
</script>
