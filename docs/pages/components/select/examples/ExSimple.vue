<template>
    <section>
        <gov-field label="Simple">
            <gov-select placeholder="Select a name">
                <option
                    v-for="option in data"
                    :value="option.id"
                    :key="option.id">
                    {{ option.user.first_name }}
                </option>
            </gov-select>
        </gov-field>

        <gov-field label="Grouped">
            <gov-select placeholder="Select a character">
                <optgroup label="Black Sails">
                    <option value="flint">Flint</option>
                    <option value="silver">Silver</option>
                    <option value="vane">Vane</option>
                    <option value="billy">Billy</option>
                    <option value="jack">Jack</option>
                </optgroup>

                <optgroup label="Breaking Bad">
                    <option value="heisenberg">Heisenberg</option>
                    <option value="jesse">Jesse</option>
                    <option value="saul">Saul</option>
                    <option value="mike">Mike</option>
                </optgroup>

                <optgroup label="Game of Thrones">
                    <option value="tyrion-lannister">Tyrion Lannister</option>
                    <option value="jamie-lannister">Jamie Lannister</option>
                    <option value="daenerys-targaryen">Daenerys Targaryen</option>
                    <option value="jon-snow">Jon Snow</option>
                </optgroup>
            </gov-select>
        </gov-field>

        <gov-field
            label="Error"
            message="Something went wrong with this field">
            <gov-select placeholder="Select a character">
                <option value="flint">Flint</option>
                <option value="silver">Silver</option>
            </gov-select>
        </gov-field>

        <gov-field label="Required">
            <gov-select placeholder="Vyberte" validation-message="This field is required">
                <option value="flint">Flint</option>
                <option value="silver">Silver</option>
            </gov-select>
        </gov-field>

        <gov-field label="Required">
            <gov-select placeholder="Select a character" required>
                <option value="flint">Flint</option>
                <option value="silver">Silver</option>
            </gov-select>
        </gov-field>

        <gov-field label="Disabled">
            <gov-select placeholder="Select a character" disabled>
                <option value="flint">Flint</option>
                <option value="silver">Silver</option>
            </gov-select>
        </gov-field>

        <gov-field label="Disabled option">
            <gov-select placeholder="Select a character">
                <option value="flint">Flint</option>
                <option value="silver" disabled>Silver</option>
            </gov-select>
        </gov-field>
    </section>
</template>

<script>
    const data = require('@/data/sample.json')

    export default {
        data() {
            return { data }
        }
    }
</script>
