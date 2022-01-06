import { shallowMount } from '@vue/test-utils'
import GovRadio from '@components/radio/Radio'

let wrapper

describe('GovRadio', () => {
    beforeEach(() => {
        wrapper = shallowMount(GovRadio)
    })

    it('is called', () => {
        expect(wrapper.name()).toBe('GovRadio')
        expect(wrapper.isVueInstance()).toBeTruthy()
    })

    it('render correctly', () => {
        const wrapper = shallowMount(GovRadio, {
            propsData: {
                customUniqueId: 'radio_abc'
            }
        })
        expect(wrapper.html()).toMatchSnapshot()
    })

    it('has an input radio', () => {
        expect(wrapper.contains('input[type=radio]')).toBeTruthy()
    })

    it('emit input event with value when value change', () => {
        wrapper.setProps({ value: true })
        expect(wrapper.vm.computedValue).toBeTruthy()
        wrapper.vm.computedValue = false
        const valueEmitted = wrapper.emitted()['input'][0]
        expect(valueEmitted).toContainEqual(false)
    })

    it('method focus() gives focus to the input element', (done) => {
        wrapper.vm.$refs.input.focus = jest.fn()
        wrapper.vm.focus()
        wrapper.vm.$nextTick(() => {
            expect(wrapper.vm.$refs.input.focus).toHaveBeenCalled()
            done()
        })
    })
})
