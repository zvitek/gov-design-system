import Input from './Input'
import Textarea from './Textarea'

import { use, registerComponent } from '../../utils/plugins'

const Plugin = {
    install(Vue) {
        registerComponent(Vue, Input)
        registerComponent(Vue, Textarea)
    }
}

use(Plugin)

export default Plugin

export {
    Input as GovInput,
    Textarea as GovTexarea
}
