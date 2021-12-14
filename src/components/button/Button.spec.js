import { shallowMount } from '@vue/test-utils'
import GovButton from '@components/button/Button'

let wrapper

describe('GovButton', () => {
    beforeEach(() => {
        wrapper = shallowMount(GovButton)
    })

    it('is called', () => {
        expect(wrapper.name()).toBe('GovButton')
        expect(wrapper.isVueInstance()).toBeTruthy()
    })

    it('render correctly', () => {
        expect(wrapper.html()).toMatchSnapshot()
    })

    it('emit a click event', () => {
        const click = jest.fn()
        wrapper = shallowMount(GovButton, {
            listeners: {
                'click': click
            }
        })
        wrapper.find('.gov-button').trigger('click')
        expect(click).toHaveBeenCalledTimes(1)
    })

    it('should be primary outlined', () => {
        wrapper.setProps({
            primaryOutlined: true
        })
        expect(wrapper.classes()).toContain('gov-button--primary-outlined')
    })

    it('should be inversed', () => {
        wrapper.setProps({
            inversed: true
        })
        expect(wrapper.classes()).toContain('gov-button--inversed')
    })

    it('should be small', () => {
        wrapper.setProps({
            small: true
        })
        expect(wrapper.classes()).toContain('gov-button--small')
    })

    it('should be large', () => {
        wrapper.setProps({
            large: true
        })
        expect(wrapper.classes()).toContain('gov-button--large')
    })

    it('should set tag to "button" if disabled', () => {
        wrapper.setProps({
            tag: 'a'
        })
        expect(wrapper.vm.computedTag).toBe('a')

        wrapper = shallowMount(GovButton, {
            attrs: {
                'disabled': true
            }
        })
        expect(wrapper.vm.computedTag).toBe('button')
    })

    it('should not emit click if disabled', () => {
        const click = jest.fn()
        wrapper = shallowMount(GovButton, {
            listeners: {
                'click': click
            },
            attrs: {
                'disabled': true
            }
        })
        wrapper.find('.gov-button').trigger('click')
        expect(click).toHaveBeenCalledTimes(0)
    })
})
