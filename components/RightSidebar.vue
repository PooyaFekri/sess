<template>
  <div>
    <v-navigation-drawer
      absolute
      permanent
      right
      app
      color="#154C79"
      class="rounded-lg"
      fixed
    >
      <template>
        <v-row style="height: 15%" dense justify="center">
          <img src="../static/logo-rtl.png" alt="لوگوی دانشگاه شیراز" />
        </v-row>
      </template>

      <v-divider></v-divider>
      <template>
        <v-row dense align="center" style="height: 15%">
          <v-list dense>
            <v-list-item>
              <v-list-item-content>
                <p>{{ fullname }}</p>
              </v-list-item-content>
            </v-list-item>
            <v-list-item color="primary">
              <v-list-item-content>
                <p>{{ username }}</p>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-row>
      </template>
      <v-divider></v-divider>
      <template>
        <v-row style="height: 40%" align="center" dense>
          <v-list>
            <v-list-item v-for="item in navbarItem" :key="item.title">
              <v-list-item-icon>
                <v-icon>{{ item.icon }}</v-icon>
              </v-list-item-icon>

              <v-list-item-content>
                <v-list-item-title>{{ item.title }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-row>
      </template>

      <template>
        <v-row>
          <v-col cols="12">
            <v-list dense justify="center">
              <v-list-item @click="logout" class="v-clickable">
                <v-list-item-icon>
                  <v-icon>mdi-logout</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <p>خروج</p>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-col>
        </v-row>
      </template>
    </v-navigation-drawer>
  </div>
</template>
<script>
export default {
  data() {
    return {

      items: {
        student: [
          { title: 'انتخاب واحد مقدماتی', icon: 'mdi-home-city' },
          { title: 'چارت', icon: 'mdi-account' },
          { title: 'تیکت', icon: 'mdi-account-group-outline' },
          { title: 'درخواست گریدری', icon: 'mdi-account-group-outline' },
        ],
        professor: [
          { title: 'انتخاب واحد مقدماتی', icon: 'mdi-home-city' },
          { title: 'چارت', icon: 'mdi-account' },
          { title: 'تیکت', icon: 'mdi-account-group-outline' },
          { title: 'درخواست گریدری', icon: 'mdi-account-group-outline' },
        ],
      },
    }
  },
  computed:{
      user(){
        return this.$store.getters['auth/user']
      },
      fullname() {
        return this.user.first_name+ ' ' + this.user.last_name
      },
      username (){
        return this.user.username
      },
      navbarItem(){
        return this.items[this.user.role.name_role];
      }
  },
  methods: {
    logout() {
      this.$store.dispatch('auth/logout')
      this.$router.push('/login')
    },
  },
}
</script>

<style scoped>
.logout {
  position: absolute;
  bottom: 0%;
}

.v-clickable {
  cursor: pointer;
}
</style>
