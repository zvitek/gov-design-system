import Multiselect from './Multiselect'

import { use, registerComponent } from '../../utils/plugins'

const Plugin = {
    install(Vue) {
        registerComponent(Vue, Multiselect)
    }
}

use(Plugin)

export default Plugin

export {
    Multiselect as GovMultiselect
}
