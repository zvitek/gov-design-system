import * as components from './components'

import {merge} from './utils/helpers'
import config, {setOptions, setVueInstance} from './utils/config'
import {use, registerComponentProgrammatic} from './utils/plugins'

import ConfigComponent from './utils/ConfigComponent'

const Gov = {
    install(Vue, options = {}) {
        setVueInstance(Vue)
        // Options
        setOptions(merge(config, options, true))
        // Components
        for (let componentKey in components) {
            Vue.use(components[componentKey])
        }
        // Config component
        registerComponentProgrammatic(Vue, 'config', ConfigComponent)
    }
}

use(Gov)

export default Gov

// export all components as vue plugin
export * from './components'
export {default as ConfigProgrammatic} from './utils/ConfigComponent'
// export helpers
export * from './utils/helpers'
