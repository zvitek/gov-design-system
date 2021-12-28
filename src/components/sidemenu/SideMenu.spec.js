import { shallowMount } from '@vue/test-utils'
import GovSideMenu from '@components/sidemenu/SideMenu'

let wrapper

describe('GovSideMenu', () => {
    beforeEach(() => {
        wrapper = shallowMount(GovSideMenu)
    })

    it('is called', () => {
        expect(wrapper.name()).toBe('GovSideMenu')
        expect(wrapper.isVueInstance()).toBeTruthy()
    })

    it('render correctly', () => {
        expect(wrapper.html()).toMatchSnapshot()
    })

    it('should be complex', () => {
        wrapper.setProps({
            complex: true
        })
        expect(wrapper.classes()).toContain('gov-sidenav--complex')
    })

    it('should have default slot', () => {
        const slotDefault = '<div> Content </div>'
        wrapper = shallowMount(GovSideMenu, {
            slots: {
                default: slotDefault
            }
        })
        expect(wrapper.find('.gov-sidenav :first-child').html()).toBe(slotDefault)
    })
})
