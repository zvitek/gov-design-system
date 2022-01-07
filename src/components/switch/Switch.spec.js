import { shallowMount } from '@vue/test-utils'
import GovSwitch from '@components/switch/Switch'

let wrapper

describe('GovSwitch', () => {
    beforeEach(() => {
        wrapper = shallowMount(GovSwitch, {
            slots: {
                default: [
                    'Control label'
                ]
            }
        })
    })

    it('is called', () => {
        expect(wrapper.name()).toBe('GovSwitch')
        expect(wrapper.isVueInstance()).toBeTruthy()
    })

    it('render correctly', () => {
        expect(wrapper.html()).toMatchSnapshot()
    })

    it('updates internal value when v-model is changed', () => {
        const newValue = 'switch value'
        wrapper.setProps({ value: newValue })
        expect(wrapper.vm.newValue).toBe(newValue)
    })

    it('emit input event when computedValue is set', () => {
        const newValue = 'switch value'
        wrapper.vm.computedValue = newValue
        const valueEmitted = wrapper.emitted()['input'][0]
        expect(wrapper.vm.newValue).toBe(newValue)
        expect(valueEmitted).toContainEqual(newValue)
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
