import { mount } from '@vue/test-utils'
import GovTable from '@components/table/Table'
import GovTableColumn from '@components/table/TableColumn'

let wrapper
const WrapperComp = {
    template: `
        <GovTable>
            <GovTableColumn/>
            <GovTableColumn ref="testItem" />
            <GovTableColumn />
        </GovTable>`,
    components: {
        GovTable, GovTableColumn
    }
}

describe('GovTableColumn', () => {
    beforeEach(() => {
        wrapper = mount(WrapperComp, { sync: false }).find({ ref: 'testItem' })
    })

    it('is called', () => {
        expect(wrapper.name()).toBe('GovTableColumn')
        expect(wrapper.isVueInstance()).toBeTruthy()
    })
})
