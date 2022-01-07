import { shallowMount } from '@vue/test-utils'
import GovBadge from '@components/badge/Badge'

let wrapper

describe('GovBadge', () => {
    beforeEach(() => {
        wrapper = shallowMount(GovBadge)
    })

    it('is called', () => {
        expect(wrapper.name()).toBe('GovBadge')
        expect(wrapper.isVueInstance()).toBeTruthy()
    })

    it('render correctly', () => {
        expect(wrapper.html()).toMatchSnapshot()
    })

    it('should be inversed', () => {
        wrapper.setProps({
            inversed: true
        })
        expect(wrapper.classes()).toContain('gov-badge--inversed')
    })

    it('should be warning', () => {
        wrapper.setProps({
            warning: true
        })
        expect(wrapper.classes()).toContain('gov-badge--warning')
    })

    it('should be error', () => {
        wrapper.setProps({
            error: true
        })
        expect(wrapper.classes()).toContain('gov-badge--error')
    })
})
