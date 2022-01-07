import { shallowMount } from '@vue/test-utils'
import GovRadioContainer from '@components/radio/RadioContainer'

let wrapper

describe('GovRadio', () => {
    beforeEach(() => {
        wrapper = shallowMount(GovRadioContainer)
    })

    it('is called', () => {
        expect(wrapper.name()).toBe('GovRadioContainer')
        expect(wrapper.isVueInstance()).toBeTruthy()
    })

    it('render correctly', () => {
        expect(wrapper.html()).toMatchSnapshot()
    })

    it('should be inline', () => {
        wrapper.setProps({
            inline: true
        })
        expect(wrapper.classes()).toContain('gov-form-group--inline')
    })
})
