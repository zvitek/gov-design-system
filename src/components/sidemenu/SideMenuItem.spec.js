import { shallowMount } from '@vue/test-utils'
import GovSideMenuItem from '@components/sidemenu/SideMenuItem'

let wrapper

describe('GovSideMenuItem', () => {
    beforeEach(() => {
        wrapper = shallowMount(GovSideMenuItem)
    })

    it('is called', () => {
        expect(wrapper.name()).toBe('GovSideMenuItem')
        expect(wrapper.isVueInstance()).toBeTruthy()
    })

    it('render correctly', () => {
        expect(wrapper.html()).toMatchSnapshot()
    })

    it('should have badge slot', () => {
        const slotBadge = '<div> Content </div>'
        wrapper = shallowMount(GovSideMenuItem, {
            slots: {
                badge: slotBadge
            }
        })
        expect(wrapper.find('.gov-sidenav__link :last-child').html()).toBe(slotBadge)
    })

    it('should have icon slot', () => {
        const slotIcon = '<div> Content </div>'
        wrapper = shallowMount(GovSideMenuItem, {
            slots: {
                icon: slotIcon
            }
        })
        expect(wrapper.find('.gov-sidenav__link :first-child').html()).toBe(slotIcon)
    })
})
