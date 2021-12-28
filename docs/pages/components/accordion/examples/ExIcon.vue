<template>
    <section>
        <gov-accordion large>
            <gov-accordion-item
                v-for="(collapse, index) of collapses"
                :key="index"
                :label="collapse.title"
                :aria-id="collapse.id + 'icon'">
                <template #icon>
                    <gov-icon govComplex :icon="collapse.icon"/>
                </template>
                <p>{{collapse.text}}</p>
            </gov-accordion-item>
        </gov-accordion>
    </section>
</template>

<script>
export default {
    data() {
        return {
            isOpen:    0,
            collapses: [
                {
                    id:    'acc-1',
                    title: 'Lorem Ipsum is simply dummy text',
                    text:  'The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested.',
                    icon: 'covid'
                },
                {
                    id:    'acc-2',
                    title: 'It has survived not only five',
                    text:  'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old.',
                    icon: 'vacation',
                },
                {
                    id:    'acc-3',
                    title: 'Many desktop publishing packages',
                    text:  'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.',
                    icon: 'senior'
                }
            ]
        }
    }
}
</script>
