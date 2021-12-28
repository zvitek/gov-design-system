import { shallowMount } from '@vue/test-utils'
import GovIcon from '@components/icon/Icon'

describe('GovIcon', () => {
    it('render correctly', () => {
        const wrapper = shallowMount(GovIcon)

        expect(wrapper.html()).toMatchSnapshot()
    })

    it('is vue instance', () => {
        const wrapper = shallowMount(GovIcon)

        expect(wrapper.name()).toBe('GovIcon')
        expect(wrapper.isVueInstance()).toBeTruthy()
    })

    it('render gov icon when icon property is passed', () => {
        const wrapper = shallowMount(GovIcon, {
            propsData: {
                icon: 'plus',
                gov: true
            }
        })

        expect(wrapper.classes()).toContain('gov-icon')
        expect(wrapper.find('span').classes()).toContain('gov-icon', 'gov-icon--plus')
    })

    it('render gov complex icon when icon property is passed', () => {
        const wrapper = shallowMount(GovIcon, {
            propsData: {
                icon: 'senior',
                govComplex: true
            }
        })

        expect(wrapper.classes()).toContain('gov-complex-icon')
        expect(wrapper.find('span').classes()).toContain('gov-complex-icon', 'gov-complex-icon--senior')
    })

    it('render icon when icon property is passed', () => {
        const wrapper = shallowMount(GovIcon, {
            propsData: { icon: 'eye' }
        })

        expect(wrapper.classes()).toContain('icon')
        expect(wrapper.find('i').classes()).toContain('mdi', 'mdi-eye', 'mdi-24px')
    })

    it('render icon package correctly when the pack property is is passed.', () => {
        const wrapper = shallowMount(GovIcon, {
            propsData: {
                icon: 'eye',
                pack: 'fa'
            }
        })

        expect(wrapper.find('i').classes()).toContain('fa-eye')
    })

    it('use both packages when the both property is passed', () => {
        const wrapper = shallowMount(GovIcon, {
            propsData: {
                icon: 'eye',
                both: true
            }
        })

        expect(wrapper.find('i').classes()).toContain('mdi-eye')
        wrapper.setProps({ pack: 'fa' })

        const equivalentIcons = {
            'check': 'check',
            'information': 'info-circle',
            'check-circle': 'check-circle',
            'alert': 'exclamation-triangle',
            'alert-circle': 'exclamation-circle',
            'arrow-up': 'arrow-up',
            'chevron-right': 'angle-right',
            'chevron-left': 'angle-left',
            'chevron-down': 'angle-down',
            'eye': 'eye',
            'eye-off': 'eye-slash',
            'menu-down': 'caret-down',
            'menu-up': 'caret-up',
            'other': 'other'
        }

        const expectEquivalentIcon = (icon, expected) => {
            wrapper.setProps({ icon })
            expect(wrapper.find('i').classes()).toContain(`fa-${expected}`)
        }

        Object.keys(equivalentIcons).forEach((icon) => {
            expectEquivalentIcon(icon, equivalentIcons[icon])
        })
    })

    it('display size when size propery is passed', () => {
        const wrapper = shallowMount(GovIcon, {
            propsData: {
                icon: 'eye'
            }
        })

        expect(wrapper.find('i').classes()).toContain('mdi-24px')
        wrapper.setProps({ size: 'is-small' })
        expect(wrapper.find('i').classes()).toContainEqual('mdi', 'mdi-eye')
        wrapper.setProps({ size: 'is-medium' })
        expect(wrapper.find('i').classes()).toContain('mdi-36px')
        wrapper.setProps({ size: 'is-large' })
        expect(wrapper.find('i').classes()).toContain('mdi-48px')
    })

    it('overrides icon font size when customSize property is passed', () => {
        const wrapper = shallowMount(GovIcon, {
            propsData: {
                icon: 'eye',
                pack: 'fa',
                customSize: 'fa-2x'
            }
        })

        expect(wrapper.find('i').classes()).toContainEqual('fa', 'fa-2x')
    })

    it('render custom classes when customClass property is passed', () => {
        const wrapper = shallowMount(GovIcon, {
            propsData: {
                icon: 'eye',
                customClass: 'foo-bar'
            }
        })

        expect(wrapper.find('i').classes()).toContain('foo-bar')
    })
})
