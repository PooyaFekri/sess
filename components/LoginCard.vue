<template>
  <v-card elevation="4" color="#154C79CC" shaped>
    <v-container class="pt-5">
      <v-text-field
        outlined
        solo
        dense
        v-model="username"
        label="شناسه ورود"
      ></v-text-field>
      <v-text-field
        outlined
        solo
        dense
        type="password"
        v-model="password"
        label="رمز ورود"
      ></v-text-field>
      <v-row justify="end">
        <v-col cols="3" align-self="center" class="ml-10">
          <v-card-actions class="mr-3">
            <v-btn width="100px" color="Blue" @click="login">ورود</v-btn>
          </v-card-actions>
        </v-col>        
      </v-row>
    </v-container>
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
