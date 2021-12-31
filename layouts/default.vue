<template>
  <v-app style="position: relative">
    <v-container grid-list-xs>
      <v-main class="app-content">
        <Nuxt />
      </v-main>
      <RightSidebar />
      <app-snackbar ref="appSnackbar"></app-snackbar>
    </v-container>
  </v-app>
</template>

<script>
import RightSidebar from '@/components/RightSidebar.vue'
export default {
  components: { RightSidebar },
  mounted() {
    this.$root.appSnackbar = this.$refs.appSnackbar
  },
}
</script>

<style scoped>
.app-content {
  min-height: 100vh;
  display: grid;
}
</style>
