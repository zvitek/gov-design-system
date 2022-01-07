import { shallowMount } from '@vue/test-utils'
import AccordionItem from '@components/accordion/AccordionItem'

let wrapper

describe('AccordionItem', () => {
    describe('default', () => {
        beforeEach(() => {
            wrapper = shallowMount(AccordionItem, {
                propsData: {
                    open: true,
                    label: 'Acc Label'
                }
            })
        })

        it('is called', () => {
            expect(wrapper.name()).toBe('GovAccordionItem')
            expect(wrapper.isVueInstance()).toBeTruthy()
        })

        it('default props and vm', () => {
            expect(wrapper.props().open).toBe(true)
            expect(wrapper.vm.isOpen).toBe(true)
        })

        it('render correctly', () => {
            expect(wrapper.html()).toMatchSnapshot()
        })
    })
    describe('open prop is false', () => {
        beforeEach(() => {
            wrapper = shallowMount(AccordionItem, {
                propsData: {
                    open: false,
                    label: 'Acc Label'
                }
            })
        })

        it('set default open prop', () => {
            expect(wrapper.props().open).toBe(false)
            expect(wrapper.vm.isOpen).toBe(false)
        })

        it('call toggle method', async () => {
            expect(wrapper.find('.gov-accordion__content').isVisible()).toBe(false)
            wrapper.vm.toggle()
            await wrapper.vm.$nextTick()
            expect(wrapper.vm.isOpen).toBe(true)
            expect(wrapper.find('.gov-accordion__content').isVisible()).toBe(true)
        })

        it('emit a click event', () => {
            expect(wrapper.find('.gov-accordion__content').isVisible()).toBe(false)
            const updateOpen = jest.fn()
            wrapper.vm.$on('update:open', updateOpen)
            wrapper.find('.gov-accordion__header').trigger('click')
            expect(updateOpen).toHaveBeenCalledTimes(1)
            expect(updateOpen).toHaveBeenCalledWith(true)
            expect(wrapper.vm.isOpen).toBe(true)
            expect(wrapper.find('.gov-accordion__content').isVisible()).toBe(true)
        })

        it('should emit open event', () => {
            const open = jest.fn()
            wrapper.vm.$on('open', open)
            wrapper.find('.gov-accordion__header').trigger('click')
            expect(open).toHaveBeenCalledTimes(1)
        })

        it('update open prop', () => {
            expect(wrapper.find('.gov-accordion__content').isVisible()).toBe(false)
            wrapper.setProps({ open: true })
            expect(wrapper.vm.isOpen).toBe(true)
            expect(wrapper.find('.gov-accordion__content').isVisible()).toBe(true)
        })
    })

    it('should have icon slot', () => {
        const iconSlot = '<strong> Icon </strong>'
        const wrapper = shallowMount(AccordionItem, {
            scopedSlots: {
                icon: iconSlot
            }
        })
        expect(wrapper.find('.gov-accordion__header h3 :first-child').html()).toBe(iconSlot)
    })

    it('should have default slot', () => {
        const slotDefault = '<div> Content </div>'
        wrapper = shallowMount(AccordionItem, {
            slots: {
                default: slotDefault
            }
        })
        expect(wrapper.find('.gov-accordion__content-inner :first-child').html()).toBe(slotDefault)
    })

    it('should emit close event', () => {
        wrapper = shallowMount(AccordionItem, {
            propsData: {
                open: true
            }
        })
        const close = jest.fn()
        wrapper.vm.$on('close', close)
        wrapper.find('.gov-accordion__header').trigger('click')
        expect(close).toHaveBeenCalledTimes(1)
    })
})
