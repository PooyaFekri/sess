import Vue from "vue";

import VuePersianDatetimePicker from "vue-persian-datetime-picker";
// Vue.component("DatePicker", VuePersianDatetimePicker);

Vue.use(VuePersianDatetimePicker, {
    name: 'DatePicker',
    props: {
      inputFormat: 'YYYY-MM-DD HH:mm',
      format: 'YYYY-MM-DD HH:mm',
      editable: false,
      inputClass: 'form-control my-custom-class-name',
      altFormat: 'YYYY-MM-DD HH:mm',
      color: '#3f505e',
      autoSubmit: false,
    }
  });