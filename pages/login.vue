<template class="as">
  
    <v-row style="height: 65%;" no-gutters align="center" justify="center">
      <v-col cols="4" class="text-center">
        <LoginCard />
      </v-col>
    </v-row>
  
</template>

<script>
import LoginCard from '@/components/LoginCard.vue'
export default {
  components: { LoginCard },
  layout: 'login',
  mounted() {},
}
</script>

<style></style>
