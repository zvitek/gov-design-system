<script>
import TabbedChildMixin from '../../utils/TabbedChildMixin.js'

export default {
    name: 'GovTabItem',
    mixins: [TabbedChildMixin('tab')],
    props: {
        disabled: Boolean
    },
    data() {
        return {
            elementClass: 'gov-tabs__content is-active',
            elementRole: 'tabpanel'
        }
    }
}
</script>
