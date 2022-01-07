import { shallowMount } from '@vue/test-utils'
import GovCheckbox from '@components/checkbox/Checkbox'

let wrapper

describe('GovCheckbox', () => {
    beforeEach(() => {
        wrapper = shallowMount(GovCheckbox)
    })

    it('is called', () => {
        expect(wrapper.name()).toBe('GovCheckbox')
        expect(wrapper.isVueInstance()).toBeTruthy()
    })

    it('render correctly', () => {
        expect(wrapper.html()).toMatchSnapshot()
    })

    it('has an input checkbox', () => {
        expect(wrapper.contains('input[type=checkbox]')).toBeTruthy()
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
