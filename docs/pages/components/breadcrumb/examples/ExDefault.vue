<template>
    <section>
        <gov-breadcrumb>
            <gov-breadcrumb-item tag='router-link' to="/">Home</gov-breadcrumb-item>
            <gov-breadcrumb-item tag='router-link' to="/documentation">Docs</gov-breadcrumb-item>
            <gov-breadcrumb-item tag='router-link' active>Breadcrumb</gov-breadcrumb-item>
        </gov-breadcrumb>
    </section>
</template>

<script>
export default {

  name: 'ExDefault',

}
</script>
