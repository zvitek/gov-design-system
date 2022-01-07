import { shallowMount, createLocalVue } from '@vue/test-utils'
import GovField from '@components/field/Field'
import GovInput from '@components/input/Input'

const localVue = createLocalVue()
localVue.component('gov-field', GovField)
localVue.component('gov-input', GovInput)

describe('GovField', () => {
    it('is called', () => {
        const wrapper = shallowMount(GovField)
        expect(wrapper.name()).toBe('GovField')
        expect(wrapper.isVueInstance()).toBeTruthy()
    })

    it('render correctly', () => {
        const wrapper = shallowMount(GovField)
        expect(wrapper.html()).toMatchSnapshot()
    })

    describe('Passing a message prop', () => {
        const generateMountOptions = ({message}) => {
            return {
                propsData: {message},
                localVue,
                slots: {
                    default: [GovInput, '<button class="gov-button">Button</button>']
                }
            }
        }

        it('given an array of string as message, it joins the messages with line breaks', () => {
            const message = [
                'Some string message 1',
                'Some string message 2',
                'Some string message 3',
                'Some string message 4',
                'Some string message 5'
            ]
            const mountOptions = generateMountOptions({message})
            const wrapper = shallowMount(GovField, mountOptions)
            expect(wrapper.find('.gov-form-control__message').html().split('<br>').length).toEqual(message.length)
        })

        it('given an object as message, it grabs the keys and joins them with line breaks', () => {
            const message = {
                message1: 'Some string message 1',
                message2: 'Some string message 2',
                message3: 'Some string message 3',
                message4: 'Some string message 4',
                message5: 'Some string message 5'
            }
            const mountOptions = generateMountOptions({message})
            const wrapper = shallowMount(GovField, mountOptions)
            expect(wrapper.find('.gov-form-control__message').html().split('<br>').length).toEqual(Object.keys(message).length)
        })

        it(`given an array of string with an object as one of the elements as message, it grabs the
        keys of the object and joins them with the messages with line breaks`, () => {
            const message = [
                'Some string message 1',
                {
                    message2: 'Some string message 2',
                    message3: 'Some string message 3'
                },
                'Some string message 4',
                'Some string message 5'
            ]
            const mountOptions = generateMountOptions({message})
            const wrapper = shallowMount(GovField, mountOptions)
            expect(wrapper.find('.gov-form-control__message').html().split('<br>').length).toEqual(5)
        })
    })
})
