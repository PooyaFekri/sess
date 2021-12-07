<template>
  <v-app style="position: relative">
    <v-main class="app-content">
      <Nuxt />
    </v-main>
    <RightSidebar />
  </v-app>
</template>

<script>
import RightSidebar from '@/components/RightSidebar.vue'
export default {
  components: [RightSidebar],
}
</script>

<style scoped>
.app-content {
  min-height: 100vh;
  display: grid;
}
</style>
