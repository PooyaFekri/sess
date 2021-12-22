<template>
  <v-card elevation="4" color="#154C79CC" shaped>
    <v-container>
      <v-text-field
        outlined
        v-model="username"
        label="شناسه ورود"
      ></v-text-field>
      <v-text-field
        outlined
        type="password"
        v-model="password"
        label="رمز ورود"
      ></v-text-field>
    </v-container>
    <v-card-actions>
      <v-btn color="Blue" @click="login">ورود</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      username: '',
      password: '',
    }
  },
  methods: {
    login() {
      const data = {
        'username':this.username,
        'password': this.password
      }
      this.$store.dispatch('auth/login', data).then(() => {
        this.$router.push('/');
      }).catch((e)=>{
        console.log(e);
      });
    },
  },
}
</script>
<style scoped>
input {
  text-align: right !important;
}
</style>
