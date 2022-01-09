import { shallowMount } from '@vue/test-utils'
import GovMultiselect from '@components/Multiselect/Multiselect'
import GovField from '@components/Field/Field'
import GovAutocomplete from '@components/Autocomplete/Autocomplete'

let wrapper

describe('GovMultiselect', () => {
    beforeEach(() => {
        wrapper = shallowMount(GovMultiselect, {
            propsData: {
                data: []
            },
            components: {
                GovField, GovAutocomplete
            }
        })
    })

    it('is called', () => {
        expect(wrapper.name()).toBe('GovMultiselect')
        expect(wrapper.isVueInstance()).toBeTruthy()
    })

    it('render correctly', () => {
        const wrapper = shallowMount(GovMultiselect, {
            propsData: {
                data: [],
                customUniqueId: 'Multiselect_abc'
            }
        })
        expect(wrapper.html()).toMatchSnapshot()
    })

    it('has a input element', () => {
        expect(wrapper.find(GovAutocomplete)).toBeTruthy()
    })
})
