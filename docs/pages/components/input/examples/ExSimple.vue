<template>
    <section>
        <gov-field label="Name">
            <gov-input v-model="name"></gov-input>
        </gov-field>

        <gov-field label="Surname">
            <gov-input></gov-input>
        </gov-field>

        <gov-field label="Email" error
            message="This email is invalid">
            <gov-input type="email"
                value="john@"
                maxlength="30">
            </gov-input>
        </gov-field>

        <gov-field label="Username"
            message="Fill username">
            <gov-input value="johnsilver" maxlength="30"></gov-input>
        </gov-field>

        <gov-field label="Password">
            <gov-input type="password"
                value="iwantmytreasure">
            </gov-input>
        </gov-field>

        <gov-field label="Date">
            <gov-input type="date">
            </gov-input>
        </gov-field>

        <gov-field label="Message">
            <gov-input maxlength="200" textarea></gov-input>
        </gov-field>
    </section>
</template>

<script>
    export default {
        data() {
            return {
                name: 'John Silver'
            }
        }
    }
</script>
