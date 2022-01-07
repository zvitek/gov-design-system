import { shallowMount } from '@vue/test-utils'
import GovSelect from '@components/select/Select'

let wrapper

describe('GovSelect', () => {
    beforeEach(() => {
        wrapper = shallowMount(GovSelect)
    })

    it('is called', () => {
        expect(wrapper.name()).toBe('GovSelect')
        expect(wrapper.isVueInstance()).toBeTruthy()
    })

    it('render correctly', () => {
        const wrapper = shallowMount(GovSelect, {
            propsData: {
                customUniqueId: 'select_abc'
            }
        })
        expect(wrapper.html()).toMatchSnapshot()
    })

    it('has a select element', () => {
        expect(wrapper.contains('select')).toBeTruthy()
    })

    it('emit input event with value when value change', () => {
        wrapper.setProps({ value: true })
        expect(wrapper.vm.computedValue).toBeTruthy()
        wrapper.vm.computedValue = false
        const valueEmitted = wrapper.emitted()['input'][0]
        expect(valueEmitted).toContainEqual(false)
    })
})
