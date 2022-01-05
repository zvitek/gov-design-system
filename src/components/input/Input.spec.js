import { shallowMount, mount } from '@vue/test-utils'
import GovInput from '@components/input/Input'

let wrapper

describe('GovInput', () => {
    beforeEach(() => {
        wrapper = shallowMount(GovInput)
    })

    it('render correctly', () => {
        const wrapper = shallowMount(GovInput, {
            propsData: {
                customUniqueId: 'input_abc'
            }
        })
        expect(wrapper.html()).toMatchSnapshot()
    })

    it('is vue instance', () => {
        expect(wrapper.name()).toBe('GovInput')
        expect(wrapper.isVueInstance()).toBeTruthy()
    })

    it('renders input element by default', () => {
        expect(wrapper.contains('input')).toBeTruthy()
        expect(wrapper.classes()).toContain('gov-form-control__input')
    })

    it('render textarea element when type is textarea', () => {
        wrapper.setProps({ textarea: true })
        const target = wrapper.find('textarea')

        expect(target.exists()).toBeTruthy()
    })

    it('render field password when the type property is password', () => {
        const wrapper = shallowMount(GovInput, {
            propsData: {
                type: 'password'
            }
        })

        const target = wrapper.find('input')
        expect(target.exists()).toBeTruthy()
        expect(target.attributes().type).toBe('password')
    })

    it('render the placeholder and readonly attribute when passed', () => {
        const wrapper = shallowMount(GovInput, {
            attrs: { placeholder: 'Awesome!', readonly: true }
        })
        const target = wrapper.find('input')

        expect(target.element.getAttribute('placeholder')).toBe('Awesome!')
        expect(target.element.getAttribute('readonly')).toBe('readonly')
    })

    it('keep its value on blur', async () => {
        const wrapper = mount(GovInput, {
            propsData: {
                value: 'foo'
            }
        })

        const input = wrapper.find('input')

        input.element.value = 'bar'
        input.trigger('input')
        input.trigger('blur')

        expect(input.element.value).toBe('bar')
    })
})
