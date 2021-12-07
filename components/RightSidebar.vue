<template>
  <div>
    <v-navigation-drawer
      absolute
      permanent
      right
      color="#154C79"
      class="rounded-lg"
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
              <v-list-item-conten>
                <p>نام کاربری</p>
              </v-list-item-conten>
            </v-list-item>
            <v-list-item>
              <v-list-item-conten>
                <p>شماره دانشجویی</p>
              </v-list-item-conten>
            </v-list-item>
          </v-list>
        </v-row>
      </template>
      <v-divider></v-divider>
      <template>
        <v-row style="height: 40%" align="center" dense>
          <v-list >
            <v-list-item v-for="item in items" :key="item.title">
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
      <template absolute class="bottom-0">
        <v-list dense class="logout">
          <v-list-item>
            <v-list-item-icon>
              <v-icon>mdi-logout</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <p>خروج</p>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </template>
    </v-navigation-drawer>
  </div>
</template>
<script>
export default {
  data() {
    return {
      items: [
        { title: 'انتخاب واحد مقدماتی', icon: 'mdi-home-city' },
        { title: 'چارت', icon: 'mdi-account' },
        { title: 'تیکت', icon: 'mdi-account-group-outline' },
        { title: 'درخواست گریدری', icon: 'mdi-account-group-outline' },
      ],
    }
  },
}
</script>

<style scoped>
.logout {
  position: absolute;
  bottom: 0%;
}
</style>
