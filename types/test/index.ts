import { Dialog, LoadingProgrammatic, ModalProgrammatic, Snackbar, Toast, GovConfig } from "../index";
import Gov from "../index";
import Vue from "vue";

Vue.use(Gov);

const app = new Vue();

const loader = app.$gov.loading.open({});
loader.close();

app.$gov.dialog.alert("Testing Gov Typescript Typings");
app.$gov.dialog.alert({
    message: "Testing this works",
    onConfirm: (value) => {
        console.log("confirm");
    }
});

app.$gov.dialog.prompt({
    message: "Message",
    title: "Dialog Title",
    onCancel: () => {
        console.log("Canceled");
    },
    onConfirm: (value) => {
        console.log(value);
    },
    inputAttrs: {
        maxlength: 5
    }
})

app.$gov.toast.open({
    message: "Ok",
    type: 'is-primary',
    position: 'is-top'
});

app.$gov.toast.open("I like this");

app.$gov.toast.open({
    message: 'Something happened correctly!',
    type: 'is-success'
});

app.$gov.toast.open({
    duration: 5000,
    message: `Something's not good, also I'm on bottom`,
    position: 'is-bottom',
    type: 'is-danger'
})

app.$gov.snackbar.open("Snackbar");

app.$gov.snackbar.open({
    message: 'Yellow button and positioned top-left',
    type: 'is-warning',
    position: 'is-top-left',
    actionText: 'Retry',
    onAction: () => {
        app.$gov.toast.open('Action pressed')
    }
});

app.$gov.snackbar.open({
    duration: 5000,
    message: 'Snackbar with red action, positioned on bottom-left and a callback',
    type: 'is-danger',
    position: 'is-bottom-left',
    actionText: 'Undo',
    onAction: () => {
        app.$gov.toast.open('Action pressed')
    }
});

app.$gov.modal.open({
    parent: app
});
