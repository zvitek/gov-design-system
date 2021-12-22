import { mount } from '@vue/test-utils'
import GovTabs from '@components/tabs/Tabs'
import GovTabItem from '@components/tabs/TabItem'

let wrapper

const WrapperComp = {
    template: `
        <GovTabs value="tab1">
            <GovTabItem value="tab1"></GovTabItem>
            <GovTabItem value="tab2" :visible="false"></GovTabItem>
        </GovTabs>`,
    components: {
        GovTabs, GovTabItem
    }
}

describe('GovTabs', () => {
    beforeEach(() => {
        wrapper = mount(WrapperComp).find(GovTabs)
    })

    it('is called', () => {
        expect(wrapper.name()).toBe('GovTabs')
        expect(wrapper.isVueInstance()).toBeTruthy()
    })

    it('render correctly', () => {
        expect(wrapper.html()).toMatchSnapshot()
    })

    it('emit input event with value when active tab is modified', async () => {
        const idx = 'tab2'
        wrapper.vm.activeId = idx

        await wrapper.vm.$nextTick() // Wait until $emits have been handled

        const valueEmitted = wrapper.emitted().input

        expect(valueEmitted).toBeTruthy()
        expect(valueEmitted[0][0]).toBe(idx)
    })

    it('emit input event with value when childClick is called', async () => {
        const val = 'tab2'

        wrapper.vm.childClick(wrapper.vm.items[1])
        wrapper.vm.childClick(wrapper.vm.items[1])

        await wrapper.vm.$nextTick() // Wait until $emits have been handled

        const valueEmitted = wrapper.emitted().input
        expect(valueEmitted[0][0]).toBe(val)
        // Will be called only once even if we clicked multiple times
        expect(valueEmitted.length).toBe(1)
    })

    it('updates the tab when the value is changed', async () => {
        wrapper.setProps({value: 'tab2'})

        expect(wrapper.vm.activeId).toBe('tab2')

        wrapper.setProps({value: 0})

        expect(wrapper.vm.activeId).toBe('tab1')
    })

    it('finds the children in descendants', () => {
        const testCmp = {
            template: `
                <div>
                    <GovTabItem></GovTabItem>
                    <GovTabItem></GovTabItem>
                </div>`,
            components: {GovTabItem}
        }

        wrapper = mount({
            template: `
                <GovTabs>
                    <test-cmp/>
                    <test-cmp/>
                    <test-cmp/>
                </GovTabs>`,
            components: {
                GovTabs, testCmp
            }
        }).find(GovTabs)

        expect(wrapper.vm.items.length).toBe(6)
        expect(wrapper.vm.items.map((i) => i.index)).toEqual([0, 1, 2, 3, 4, 5])
    })

    it('doesn\'t show a tab if value is null', () => {
        wrapper.setProps({value: null})

        expect(wrapper.vm.activeId).toBeNull()
        expect(wrapper.vm.activeTab).toBe(undefined)
    })

    it('still renders if there is no item', () => {
        wrapper = mount({
            template: `<GovTabs value="tab1"></GovTabs>`,
            components: {
                GovTabs
            }
        }).find(GovTabs)
        expect(wrapper.html()).toMatchSnapshot()
    })
})
