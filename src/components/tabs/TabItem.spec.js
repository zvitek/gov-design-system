import {mount} from '@vue/test-utils'
import GovTabs from '@components/tabs/Tabs'
import GovTabItem from '@components/tabs/TabItem'

let wrapper
let wrapperParent

const WrapperComp = {
    data() {
        return {
            show1: true
        }
    },
    template: `
        <GovTabs>
            <GovTabItem v-if="show1" value="tab1"/>
            <GovTabItem ref="testItem" value="tab2"/>
            <GovTabItem value="tab3" :visible="false"/>
        </GovTabs>`,
    components: {
        GovTabs, GovTabItem
    }
}

describe('GovTabItem', () => {
    beforeEach(() => {
        wrapperParent = mount(WrapperComp)
        wrapper = wrapperParent.find({ ref: 'testItem' })
    })

    it('is called', () => {
        expect(wrapper.name()).toBe('GovTabItem')
        expect(wrapper.isVueInstance()).toBeTruthy()
        expect(wrapper.vm.value).toBe('tab2')
    })

    it('render correctly', () => {
        expect(wrapper.html()).toMatchSnapshot()
    })

    it('computes its position correctly', () => {
        expect(wrapper.vm.index).toBe(1)
    })

    it('will recompute indexes when a sibling gets removed', async () => {
        expect(wrapper.vm.index).toBe(1)
        wrapperParent.vm.show1 = false

        await wrapper.vm.$nextTick()

        expect(wrapper.vm.index).toBe(0)
    })

    it('doesn\'t mount when it has no parent', () => {
        const spy = jest.spyOn(global.console, 'error').mockImplementation(() => {})

        try {
            wrapper = mount({
                template: `<GovTabItem/>`,
                components: {
                    GovTabItem
                },
                destroyed() {
                    spy()
                }
            })
        } catch (error) {
            expect(error.message).stringMatching(/You should wrap/)
        } finally {
            spy.mockRestore()
        }
    })

    it('doesn\'t render when parent has destroyOnHide', async () => {
        wrapper = mount({
            template: `
                <GovTabs :destroy-on-hide="true">
                    <GovTabItem></GovTabItem>
                </GovTabs>`,
            components: {
                GovTabs, GovTabItem
            }
        }).find(GovTabItem)

        expect(wrapper.html()).not.toBe(undefined)

        wrapper.setProps({visible: false})

        await wrapper.vm.$nextTick() // Wait until it's rerendered

        expect(wrapper.html()).toBe(undefined)
    })

    it('unregisters when destroyed', async () => {
        const wrapper = mount({
            template: `
                <GovTabs>
                    <GovTabItem ref="item1"/>
                    <GovTabItem v-if="item2" ref="item2"/>
                </GovTabs>`,
            props: {
                item2: {
                    type: Boolean,
                    default: true
                }
            },
            components: {
                GovTabs, GovTabItem
            }
        })

        expect(wrapper.find({ref: 'item2'})).toBeTruthy()
        expect(wrapper.find(GovTabs).vm.items.length).toBe(2)

        wrapper.setProps({item2: false})

        expect(wrapper.find(GovTabs).vm.items.length).toBe(1)

        wrapper.setProps({item2: true})
        wrapper.find(GovTabs).setProps({value: 1})

        await wrapper.vm.$nextTick()

        expect(wrapper.find(GovTabs).vm.items.length).toBe(2)
        expect(wrapper.find({ref: 'item2'}).vm.isActive).toBeTruthy()
    })
})
