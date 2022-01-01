<template>
  <div>
    <v-navigation-drawer
      absolute
      permanent
      right
      app
      color="#154C79"
      class="rounded-lg rounded-r-0"
      fixed
    >
      <template>
        <v-row style="height: 15%" dense justify="center" class="mb-5">
          <img src="../static/logo-rtl.png" alt="لوگوی دانشگاه شیراز" />
        </v-row>
      </template>

      <template>
        <v-row dense align="center" style="height: 15%" class="mt-2">
          <v-list dense>
            <v-list-item>
              <v-list-item-content class="sidebar_text">
                <p>{{ fullname }}</p>
              </v-list-item-content>
            </v-list-item>
            <v-list-item color="primary">
              <v-list-item-content class="sidebar_text">
                <!-- <p>{{ username }}</p> -->
                <p>{{ persianRoleTitles[role] }}</p>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-row>
      </template>

      <template>
        <v-row align="center" dense class="mt-5">
          <v-col>
            <v-list>
              <v-list-item
                v-for="item in navbarItem"
                :key="item.title"
                @click="gotoPage(item.link)"
                class="pr-9"
              >
                <v-list-item-icon>
                  <v-icon class="sidebar_text">{{ item.icon }}</v-icon>
                </v-list-item-icon>

                <v-list-item-content class="sidebar_text">
                  <v-list-item-title>{{ item.title }}</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-col>
        </v-row>
      </template>

      <template>
        <v-row style="height: 30%">
          <v-spacer></v-spacer>
        </v-row>
      </template>

      <template>
        <v-row justify="start">
          <v-col cols="7" class="mr-10">
            <v-list dense>
              <v-list-item @click="logout" class="v-clickable" justify="center">
                <v-list-item-icon>
                  <v-icon class="sidebar_text">mdi-logout</v-icon>
                </v-list-item-icon>
                <v-list-item-content class="sidebar_text">
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
          { title: 'صفحه اصلی', icon: 'mdi-home-city', link: '' },
          {
            title: 'انتخاب واحد مقدماتی',
            icon: 'mdi-account-group-outline',
            link: 'elementray-selection',
          },
          { title: 'چارت', icon: 'mdi-account', link: '' },
          {
            title: 'درخواست گریدری',
            icon: 'mdi-account-group-outline',
            link: '',
          },
        ],
        professor: [
          { title: 'صفحه اصلی', icon: 'mdi-home-city', link: '' },
          {
            title: 'انتخاب واحد مقدماتی',
            icon: 'mdi-account-group-outline',
            link: 'elementray-selection',
          },
          { title: 'چارت', icon: 'mdi-account', link: '' },
          {
            title: 'تیکت',
            icon: 'mdi-account-group-outline',
            link: 'TicketTable',
          },
          {
            title: 'درخواست گریدری',
            icon: 'mdi-account-group-outline',
            link: '',
          },
        ],
        responsibleTrainings: [
          { title: 'صفحه اصلی', icon: 'mdi-home-city', link: '' },
          { title: 'چارت', icon: 'mdi-account', link: '' },
          {
            title: 'تیکت',
            icon: 'mdi-account-group-outline',
            link: 'TicketTable',
          },
          {
            title: 'درخواست گریدری',
            icon: 'mdi-account-group-outline',
            link: '',
          },
        ],
        advisers: [
          { title: 'صفحه اصلی', icon: 'mdi-home-city', link: '' },
          { title: 'چارت', icon: 'mdi-account', link: '' },
          {
            title: 'تیکت',
            icon: 'mdi-account-group-outline',
            link: 'TicketTable',
          },
          {
            title: 'درخواست گریدری',
            icon: 'mdi-account-group-outline',
            link: '',
          },
        ],
        supervisors: [
          { title: 'صفحه اصلی', icon: 'mdi-home-city', link: '' },
          { title: 'چارت', icon: 'mdi-account', link: '' },
          {
            title: 'تیکت',
            icon: 'mdi-account-group-outline',
            link: 'TicketTable',
          },
          {
            title: 'درخواست گریدری',
            icon: 'mdi-account-group-outline',
            link: '',
          },
        ],
        advisers_supervisors: [
          { title: 'صفحه اصلی', icon: 'mdi-home-city', link: '' },
          { title: 'چارت', icon: 'mdi-account', link: '' },
          {
            title: 'تیکت',
            icon: 'mdi-account-group-outline',
            link: 'TicketTable',
          },
          {
            title: 'درخواست گریدری',
            icon: 'mdi-account-group-outline',
            link: '',
          },
        ],
        educationAssistants: [
          { title: 'صفحه اصلی', icon: 'mdi-home-city', link: '' },
          {
            title: 'انتخاب واحد مقدماتی',
            icon: 'mdi-account-group-outline',
            link: 'elementray-selection',
          },
          { title: 'چارت', icon: 'mdi-account', link: '' },
          {
            title: 'تیکت',
            icon: 'mdi-account-group-outline',
            link: 'TicketTable',
          },
        ],
        departmentHead: [
          { title: 'صفحه اصلی', icon: 'mdi-home-city', link: '' },
          { title: 'چارت', icon: 'mdi-account', link: '' },
          {
            title: 'تیکت',
            icon: 'mdi-account-group-outline',
            link: 'TicketTable',
          },
          {
            title: 'درخواست گریدری',
            icon: 'mdi-account-group-outline',
            link: '',
          },
        ],
      },
      persianRoleTitles: {
        student: 'دانشجو',
        professor: 'استاد',
        responsibleTrainings: 'معاون آموزشی',
        advisers: 'استاد مشاور',
        supervisors: 'استاد راهنما',
        advisers_supervisors: 'استاد مشاور،استاد راهنما',
        educationAssistants: 'کارشناس بخش',
        departmentHead: 'رئیس بخش',
      },
    }
  },
  computed: {
    user() {
      return this.$store.getters['auth/user']
    },
    fullname() {
      return this.user.first_name + ' ' + this.user.last_name
    },
    username() {
      return this.user.username
    },
    navbarItem() {
      return this.items[this.user.role.name_role]
    },
    role() {
      return this.user.role.name_role
    },
  },
  methods: {
    logout() {
      this.$store.dispatch('auth/logout')
      this.$router.push('/login')
    },
    gotoPage(link) {
      this.$router.push(`/${link}`)
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

.sidebar_text {
  color: white;
}
.sidebar_divider {
  background: white;
}
</style>
