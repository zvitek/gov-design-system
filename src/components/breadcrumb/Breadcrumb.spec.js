import { shallowMount } from '@vue/test-utils'
import GovBreadcrumb from '@components/breadcrumb/Breadcrumb'

describe('GovBreadcrumb', () => {
    let wrapper

    beforeEach(() => {
        wrapper = shallowMount(GovBreadcrumb)
    })

    it('is called', () => {
        expect(wrapper.name()).toBe('GovBreadcrumb')
        expect(wrapper.isVueInstance()).toBeTruthy()
    })

    it('render correctly', () => {
        expect(wrapper.html()).toMatchSnapshot()
    })
})
