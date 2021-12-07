<template>
  <v-app>
    <RightSidebar />
    <Nuxt />
  </v-app>
</template>

<script>
import RightSidebar from '@/components/RightSidebar.vue'
export default {
  components: [RightSidebar]
}
</script>