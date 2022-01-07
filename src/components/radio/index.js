import Radio from './Radio'
import RadioContainer from './RadioContainer'

import { use, registerComponent } from '../../utils/plugins'

const Plugin = {
    install(Vue) {
        registerComponent(Vue, Radio)
        registerComponent(Vue, RadioContainer)
    }
}

use(Plugin)

export default Plugin

export {
    Radio as GovRadio,
    RadioContainer as GovRadioContainer
}
