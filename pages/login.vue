<template class="as">
  <v-container>
    <v-row>
      <v-col offset="4">
    <LoginCard />
    </v-col>
    </v-row>
  </v-container>
</template>

<script>
import LoginCard from "@/components/LoginCard.vue";
export default {
  layout: "login",
  components: { LoginCard },
  mounted () {
    this.$vuetify.rtl = true;
  }
}
</script>

<style>
</style>
