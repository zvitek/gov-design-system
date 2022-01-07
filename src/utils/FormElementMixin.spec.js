import { shallowMount } from '@vue/test-utils'
import FormElementMixin from '@utils/FormElementMixin'

let wrapper

describe('FormElementMixin', () => {
    HTMLElement.prototype.insertAdjacentElement = jest.fn()
    beforeEach(() => {
        const component = {
            template: '<div class="b-component"></div>'
        }
        wrapper = shallowMount(component, {
            attachToDocument: true,
            mixins: [FormElementMixin]
        })
    })

    it('should set isFocused and emit focus event on onFocus', (done) => {
        wrapper.vm.onFocus()
        wrapper.vm.$nextTick(() => {
            expect(wrapper.vm.isFocused).toBeTruthy()
            expect(wrapper.emitted()['focus']).toBeTruthy()
            done()
        })
    })
})
