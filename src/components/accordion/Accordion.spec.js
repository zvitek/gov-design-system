import { shallowMount } from '@vue/test-utils'
import GovAccordion from '@components/accordion/Accordion'

let wrapper

describe('GovAccordion', () => {
    describe('default', () => {
        beforeEach(() => {
            wrapper = shallowMount(GovAccordion)
        })

        it('is called', () => {
            expect(wrapper.name()).toBe('GovAccordion')
            expect(wrapper.isVueInstance()).toBeTruthy()
        })

        it('render correctly', () => {
            expect(wrapper.html()).toMatchSnapshot()
        })
    })
    it('should have default slot', () => {
        const slotDefault = '<div> Content </div>'
        wrapper = shallowMount(GovAccordion, {
            slots: {
                default: slotDefault
            }
        })
        expect(wrapper.find('.gov-accordion :first-child').html()).toBe(slotDefault)
    })
    it('should be small', () => {
        wrapper.setProps({
            small: true
        })
        expect(wrapper.classes()).toContain('gov-accordion--small')
    })

    it('should be large', () => {
        wrapper.setProps({
            large: true
        })
        expect(wrapper.classes()).toContain('gov-accordion--large')
    })

    it('should be without inner offset', () => {
        wrapper.setProps({
            noInnerOffset: true
        })
        expect(wrapper.classes()).toContain('gov-accordion--no-inner-offset')
    })
})
