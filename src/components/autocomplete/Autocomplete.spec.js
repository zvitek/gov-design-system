import { mount } from '@vue/test-utils'
import GovAutocomplete from '@components/autocomplete/Autocomplete'

const findStringsStartingWith = (array, value) =>
    array.filter((x) => x.startsWith(value))

const DATA_LIST = [
    'Angular',
    'Angular 2',
    'Aurelia',
    'Backbone',
    'Ember',
    'jQuery',
    'Meteor',
    'Node.js',
    'Polymer',
    'React',
    'RxJS',
    'Vue.js'
]
const dropdownMenu = '.gov-autocomplete__results'
let wrapper, $input, $dropdown

describe('GovAutocomplete', () => {
    beforeEach(() => {
        wrapper = mount(GovAutocomplete, {
            propsData: {
                checkInfiniteScroll: true,
                customUniqueId: 'autocomplete_abc'
            }
        })

        $input = wrapper.find('input')
        $dropdown = wrapper.find(dropdownMenu)
    })

    it('is called', () => {
        expect(wrapper.name()).toBe('GovAutocomplete')
        expect(wrapper.isVueInstance()).toBeTruthy()
    })

    it('render correctly', () => {
        expect(wrapper.html()).toMatchSnapshot()
    })

    it('has an input type', () => {
        expect(wrapper.contains('.gov-form-control__input[type=text]')).toBeTruthy()
    })

    it('has a dropdown menu hidden by default', () => {
        expect(wrapper.contains(dropdownMenu)).toBeTruthy()
        expect($dropdown.isVisible()).toBeFalsy()
    })

    it('can select a value using v-model', () => {
        const value = DATA_LIST[0]
        wrapper.setProps({ value })
        expect(wrapper.vm.newValue).toBe(value)
    })

    it('can emit input, focus and blur events', async () => {
        const VALUE_TYPED = 'test'
        wrapper.setProps({ data: DATA_LIST })

        $input.trigger('focus')
        expect(wrapper.emitted()['focus']).toBeTruthy()
        $input.setValue(VALUE_TYPED)

        await wrapper.vm.$nextTick()

        const valueEmitted = wrapper.emitted()['input'][0]
        expect(valueEmitted).toContainEqual(VALUE_TYPED)

        $input.trigger('blur')
        expect(wrapper.emitted()['blur']).toBeTruthy()
    })

    it('can autocomplete with keydown', async () => {
        const VALUE_TYPED = 'Ang'
        wrapper.setProps({ data: DATA_LIST })

        $input.trigger('focus')
        $input.setValue(VALUE_TYPED)
        await wrapper.vm.$nextTick()

        expect($dropdown.isVisible()).toBeTruthy()

        const itemsInDropdowm = findStringsStartingWith(DATA_LIST, VALUE_TYPED)

        $input.trigger('keydown', {'key': 'Down'})
        $input.trigger('keydown', {'key': 'Enter'})
        await wrapper.vm.$nextTick()
        expect($input.element.value).toBe(VALUE_TYPED)
        expect('Angular').toBe(itemsInDropdowm[0])
        expect($dropdown.isVisible()).toBeFalsy()

        $input.trigger('focus')
        $input.setValue(VALUE_TYPED)
        await wrapper.vm.$nextTick()

        expect($dropdown.isVisible()).toBeTruthy()

        $input.trigger('keydown', {'key': 'Down'})
        $input.trigger('keydown', {'key': 'Down'})
        $input.trigger('keydown', {'key': 'Enter'})
        await wrapper.vm.$nextTick()

        expect('Angular 2').toBe(itemsInDropdowm[1])
        expect($dropdown.isVisible()).toBeFalsy()
    })

    it('close dropdown on esc', () => {
        wrapper.setProps({ data: DATA_LIST })

        wrapper.vm.isActive = true
        expect($dropdown.isVisible()).toBeTruthy()

        $input.trigger('keydown', {'key': 'Escape'})

        expect($dropdown.isVisible()).toBeFalsy()
    })

    it('close dropdown on click outside', () => {
        wrapper.setProps({ data: DATA_LIST })

        wrapper.vm.isActive = true
        expect($dropdown.isVisible()).toBeTruthy()

        window.document.body.click()
        expect($dropdown.isVisible()).toBeFalsy()
    })

    it('open dropdown on down key click', async () => {
        wrapper.vm.setHovered = jest.fn(() => wrapper.vm.setHovered)
        wrapper.setProps({
            data: DATA_LIST,
            dropdownPosition: 'bottom'
        })

        expect($dropdown.isVisible()).toBeFalsy()

        $input.trigger('focus')
        $input.trigger('keydown.down')
        await wrapper.vm.$nextTick()

        expect($dropdown.isVisible()).toBeTruthy()
    })

    it('manages tab pressed as expected', async () => {
        // hovered is null
        $input.trigger('keydown', {'key': 'Tab'})
        expect($dropdown.isVisible()).toBeFalsy()

        // The first element will be hovered
        wrapper.setProps({
            openOnFocus: true,
            keepFirst: true
        })
        wrapper.setProps({
            data: DATA_LIST
        })
        // Set props in 2 steps to trigger Watch with keepFirst true so the 1st element is hovered

        $input.trigger('focus')
        await wrapper.vm.$nextTick()

        $input.trigger('keydown', {'key': 'Tab'})
        expect($input.element.value).toBe(DATA_LIST[0])
    })

    it('can be used with objects', async () => {
        const data = [
            {
                id: 1,
                name: 'Value 1'
            },
            {
                id: 2,
                name: 'Value 2'
            }
        ]
        wrapper.setProps({
            data,
            field: 'name'
        })

        wrapper.vm.isActive = true
        expect($dropdown.isVisible()).toBeTruthy()

        $input.trigger('keydown', {'key': 'Enter'})
        expect(wrapper.vm.hovered).toBeNull()

        $input.trigger('keydown', {'key': 'Down'})
        $input.trigger('keydown', {'key': 'Enter'})
        expect($input.element.value).toBe(data[0].name)
    })

    it('clears the value if clearOnSelect is used', async () => {
        wrapper.setProps({
            data: DATA_LIST,
            clearOnSelect: (val) => true
        })

        wrapper.vm.isActive = true
        expect($dropdown.isVisible()).toBeTruthy()

        $input.trigger('keydown', {'key': 'Down'})
        $input.trigger('keydown', {'key': 'Enter'})
        expect($input.element.value).toBe('')
    })

    it('can be used with a custom data formatter', async () => {
        wrapper.setProps({
            data: DATA_LIST,
            customFormatter: (val) => `${val} formatted`
        })

        wrapper.vm.isActive = true
        expect($dropdown.isVisible()).toBeTruthy()

        $input.trigger('keydown', {'key': 'Down'})
        $input.trigger('keydown', {'key': 'Enter'})
        expect($input.element.value).toBe(`${DATA_LIST[0]} formatted`)
    })

    it('can openOnFocus and keepFirst', async () => {
        wrapper.setProps({
            openOnFocus: true,
            keepFirst: true
        })

        expect($dropdown.isVisible()).toBeFalsy()

        $input.trigger('focus')
        expect(wrapper.vm.hovered).toBeNull()

        wrapper.setProps({
            data: DATA_LIST
        }) // Set props in 2 steps to trigger the Watch for data having keepFirst true

        $input.trigger('focus')
        await wrapper.vm.$nextTick()

        expect($dropdown.isVisible()).toBeTruthy()

        expect(wrapper.vm.hovered).toBe(DATA_LIST[0])
    })

    it('clear button does not exist when the search input is empty', () => {
        wrapper.setData({newValue: ''})
        wrapper.setProps({ clearable: true })
        const subject = wrapper.find('b-icon-stub').exists()

        expect(subject).toBeFalsy()
    })

    it('clear button does not appear when clearable property is not set to true', () => {
        wrapper.setData({newValue: 'Jquery'})
        const subject = wrapper.find('b-icon-stub').exists()

        expect(subject).toBeFalsy()
    })

    it('reset events before destroy', () => {
        document.removeEventListener = jest.fn()
        window.removeEventListener = jest.fn()

        wrapper.destroy()

        expect(document.removeEventListener).toBeCalledWith('click', expect.any(Function))
    })
})
