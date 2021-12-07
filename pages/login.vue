<template class="as">
  
    <v-row style="height: 65%;" no-gutters align="center" justify="center">
      <v-col cols="3" class="text-center">
        <LoginCard />
      </v-col>
    </v-row>
  
</template>

<script>
import LoginCard from '@/components/LoginCard.vue'
export default {
  layout: 'login',
  components: { LoginCard },
  mounted() {},
}
</script>

<style></style>
