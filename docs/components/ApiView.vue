<template>
    <section id="api-view" class="api-view">
        <h2 class="title is-4">
            <router-link to="#api-view">#</router-link>
            API
        </h2>

        <template v-for="component in data">
            <div :key="component.title">
                <h3
                    v-if="component.title"
                    class="subtitle">
                    {{ component.title }}
                </h3>
                <gov-tabs>
                    <gov-tab-item v-if="component.props" label="Properties">
                        <gov-table
                            :mobile-cards="false"
                            :data="component.props"
                            :columns="propsColumns"
                        />
                    </gov-tab-item>

                    <gov-tab-item v-if="component.slots" label="Slots">
                        <gov-table
                            :mobile-cards="false"
                            :data="component.slots"
                            :columns="slotsColumns"
                        />
                    </gov-tab-item>

                    <gov-tab-item v-if="component.events" label="Events">
                        <gov-table
                            :mobile-cards="false"
                            :data="component.events"
                            :columns="eventsColumns"
                        />
                    </gov-tab-item>

                    <gov-tab-item v-if="component.methods" label="Methods">
                        <gov-table
                            :mobile-cards="false"
                            :data="component.methods"
                            :columns="methodsColumns"
                        />
                    </gov-tab-item>
                </gov-tabs>
            </div>
        </template>
    </section>
</template>

<script>
export default {
    props: {
        data: Array
    },
    data() {
        return {
            propsColumns: [
                { label: 'Name', field: 'name', renderHtml: true },
                { label: 'Description', field: 'description', renderHtml: true },
                { label: 'Type', field: 'type' },
                { label: 'Values', field: 'values', renderHtml: true },
                { label: 'Default', field: 'default', renderHtml: true }
            ],
            slotsColumns: [
                { label: 'Slot name', field: 'name', renderHtml: true },
                { label: 'Description', field: 'description', renderHtml: true },
                { label: 'Props (if scoped)', field: 'props', renderHtml: true }
            ],
            eventsColumns: [
                { label: 'Name', field: 'name', renderHtml: true },
                { label: 'Description', field: 'description', renderHtml: true },
                { label: 'Parameters', field: 'parameters', renderHtml: true }
            ],
            methodsColumns: [
                { label: 'Name', field: 'name', renderHtml: true },
                { label: 'Description', field: 'description', renderHtml: true },
                { label: 'Parameters', field: 'parameters', renderHtml: true },
                { label: 'Return', field: 'return', renderHtml: true }
            ]
        }
    }
}
</script>
