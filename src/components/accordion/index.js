import AccordionItem from './AccordionItem'
import Accordion from './Accordion'

import { use, registerComponent } from '../../utils/plugins'

const Plugin = {
    install(Vue) {
        registerComponent(Vue, Accordion)
        registerComponent(Vue, AccordionItem)
    }
}

use(Plugin)

export default Plugin

export {
    AccordionItem as GovAccordionItem,
    Accordion as GovAccordion
}
