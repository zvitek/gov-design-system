import Menu from './SideMenu'
import MenuItem from './SideMenuItem'

import { use, registerComponent } from '../../utils/plugins'

const Plugin = {
    install(Vue) {
        registerComponent(Vue, Menu)
        registerComponent(Vue, MenuItem)
    }
}

use(Plugin)

export default Plugin

export {
    Menu as GovSideMenu,
    MenuItem as GovSideMenuItem
}
