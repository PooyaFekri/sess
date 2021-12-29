<template>
  <v-snackbar
    v-model="snackbar"
    :timeout="snackbarTimeout"
    :top="true"
    shaped
  >
    {{ message }}

    <template v-slot:action="{ attrs }">
      <v-btn
        color="pink"
        text
        v-bind="attrs"
        @click="snackbar = false"
      >
        بستن
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script>
export default {
  data: () => ({
    snackbar: false,
    message: '',
    snackbarTimeout: 4000
  }),
  methods: {
    show(data) {
      this.snackbar = true
      this.message = data.message || 'پیامی یافت نشد'
      this.timer = data.timer || this.snackbarTimeout
    }
  }
}
</script>