<template>
  <v-card elevation="4" color="#154C79F0" shaped>
    <v-container>
      <v-text-field  outlined label="شناسه ورود" id="id"></v-text-field>
      <v-text-field outlined type="password" label="رمز ورود" id="id"></v-text-field>
    </v-container>
    <v-card-actions>
      <v-btn color="Blue">ورود</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {};
</script>
<style scoped>
input{
  text-align: right !important;
}
</style>