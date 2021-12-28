import Badge from './Badge'

import { use, registerComponent } from '../../utils/plugins'

const Plugin = {
    install(Vue) {
        registerComponent(Vue, Badge)
    }
}

use(Plugin)

export default Plugin

export {
    Badge as GovBadge
}
