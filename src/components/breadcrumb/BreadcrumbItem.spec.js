import { shallowMount } from '@vue/test-utils'
import GovBreadcrumbItem from '@components/breadcrumb/BreadcrumbItem.vue'

let wrapper

describe('GovBreadcrumbItem', () => {
    beforeEach(() => {
        wrapper = shallowMount(GovBreadcrumbItem)
    })

    it('is called', () => {
        expect(wrapper.name()).toBe('GovBreadcrumbItem')
        expect(wrapper.isVueInstance()).toBeTruthy()
    })

    it('render correctly', () => {
        expect(wrapper.html()).toMatchSnapshot()
    })

    it('active item must be tag strong', () => {
        wrapper.setProps({
            tag: 'a',
            active: true
        })
        expect(wrapper.vm.computedTag).toBe('strong')
        expect(wrapper.find('strong').classes()).toContain('gov-title--delta')
    })
})
