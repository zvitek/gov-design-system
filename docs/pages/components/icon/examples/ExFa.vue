<template>
    <section>
        <div class="block">
            <gov-icon
                pack="fas"
                icon="user"
                size="is-small">
            </gov-icon>
            <gov-icon
                pack="fas"
                icon="home"
                size="is-small">
            </gov-icon>
            <gov-icon
                pack="fas"
                icon="tachometer-alt"
                size="is-small">
            </gov-icon>
        </div>

        <div class="block">
            <gov-icon
                pack="fas"
                icon="user">
            </gov-icon>
            <gov-icon
                pack="fas"
                icon="home">
            </gov-icon>
            <gov-icon
                pack="fas"
                icon="tachometer-alt">
            </gov-icon>
        </div>

        <div class="block">
            <gov-icon
                pack="fas"
                icon="user"
                size="is-medium">
            </gov-icon>
            <gov-icon
                pack="fas"
                icon="home"
                size="is-medium">
            </gov-icon>
            <gov-icon
                pack="fas"
                icon="tachometer-alt"
                size="is-medium">
            </gov-icon>
        </div>

        <div class="block">
            <gov-icon
                pack="fas"
                icon="user"
                size="is-large"
                type="is-success">
            </gov-icon>
            <gov-icon
                pack="fas"
                icon="home"
                size="is-large"
                type="is-info">
            </gov-icon>
            <gov-icon
                pack="fas"
                icon="tachometer-alt"
                size="is-large"
                type="is-primary">
            </gov-icon>
        </div>

        <div class="buttons">
            <gov-button
                label="Finish"
                type="is-dark"
                icon-pack="fas"
                icon-left="check" />
            <gov-button
                label="Finish"
                type="is-warning"
                icon-pack="fas"
                icon-left="check" />
            <gov-button type="is-warning">
                <gov-icon
                    pack="fas"
                    icon="sync-alt"
                    custom-class="fa-spin">
                </gov-icon>
                <span>Refresh</span>
            </gov-button>
        </div>
    </section>
</template>
