<template>
    <div>
        <p class="content">
            Gowue supports icons from the design system. See the <a href="https://designsystem.gov.cz/#/dokumentace/styly/ikony" target="_blank">official documentation</a> for a full list.
        </p>

        <Example :component="ExGov" :code="ExGovCode" title="Gov Icons" vertical/>
        <Example :component="ExGovComplex" :code="ExGovComplexCode" title="Gov Complex Icons" vertical/>

        <p class="content">
            Gowue is compatible with both <a href="https://materialdesignicons.com/" target="_blank">Material Design Icons</a>
            , <a href="http://fontawesome.io/" target="_blank">FontAwesome 4</a>
            and <a href="https://fontawesome.com/" target="_blank">FontAwesome 5</a>.
        </p>

        <Example :component="ExMdi" :code="ExMdiCode" title="Material Design Icons" vertical/>

        <b-message type="is-info">
            Using <code>far</code> or <code>fad</code> while having FontAwesome free tier might have missing icons.
        </b-message>

        <Example :component="ExFa" :code="ExFaCode" title="FontAwesome" vertical/>

        <b-message type="is-info">
            You can set the <code>defaultIconComponent</code> constructor option to render icons with the
            <a href="https://www.npmjs.com/package/@fortawesome/vue-fontawesome" target="_blank">vue-fontawesome</a> component.
        </b-message>

        <div class="example is-paddingless">
            <CodeView :code="usage | pre" lang="javascript" expanded/>
        </div>

        <ApiView :data="api"/>
    </div>
</template>

<script>
    import api from './api/icon'

    import ExGov from './examples/ExGov'
    import ExGovCode from '!!raw-loader!./examples/ExGov'

    import ExGovComplex from './examples/ExGovComplex'
    import ExGovComplexCode from '!!raw-loader!./examples/ExGovComplex'

    import ExMdi from './examples/ExMdi'
    import ExMdiCode from '!!raw-loader!./examples/ExMdi'

    import ExFa from './examples/ExFa'
    import ExFaCode from '!!raw-loader!./examples/ExFa'

    export default {
        data() {
            return {
                api,
                ExGov,
                ExGovCode,
                ExGovComplex,
                ExGovComplexCode,
                ExMdi,
                ExFa,
                ExMdiCode,
                ExFaCode,
                usage: `
                import { library } from '@fortawesome/fontawesome-svg-core';
                // internal icons
                import { faCheck, faCheckCircle, faInfoCircle, faExclamationTriangle, faExclamationCircle,
                    faArrowUp, faAngleRight, faAngleLeft, faAngleDown,
                    faEye, faEyeSlash, faCaretDown, faCaretUp, faUpload } from "@fortawesome/free-solid-svg-icons";
                import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

                library.add(faCheck, faCheckCircle, faInfoCircle, faExclamationTriangle, faExclamationCircle,
                    faArrowUp, faAngleRight, faAngleLeft, faAngleDown,
                    faEye, faEyeSlash, faCaretDown, faCaretUp, faUpload);
                Vue.component('vue-fontawesome', FontAwesomeIcon);

                // ...

                import Gowue from 'Gowue'
                Vue.use(Gowue, {
                  defaultIconComponent: 'vue-fontawesome',
                  defaultIconPack: 'fas',
                });`
            }
        }
    }
</script>
