<template>
  <v-container>
    <v-card width="100%" justify="center" style="background: #dce4eb">
      <v-card-title class="text-h5 lighten-2 ticket_title_background mb-5">
        لیست دروس
      </v-card-title>
      <v-row justify="center">
        <v-col cols="11">
          <v-data-table
            :headers="headrs"
            :items="items"
            sort-by="rowNum"
            class="elevation-1 mb-3"
            show-select
            v-model="selects"
            item-key="rowNum"
            :loading="loading"
            loading-text="در حال دریافت اطلاعات"
          >
          </v-data-table>
        </v-col>
      </v-row>
      <!-- <v-row v-if="role === 'student'" justify="end">
            <v-col cols="1" class="ml-3">            
              <v-btn icon class="add_ticket_btn" >
                <v-icon           
                  circle
                  color="white"
                  small                  
                >
                  mdi-plus
                </v-icon>
              </v-btn>
            </v-col>           
          </v-row>            -->
      <v-card-actions class="justify-center">
        <v-btn :loading="btnLoading" dark @click="registerCourses">
          ثبت دروس انتخاب شده
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      headrs: [
        { text: 'ردیف', align: 'start', value: 'rowNum' },
        { text: 'نام درس', value: 'courseName', sortable: false },
        { text: 'نام گرایش', value: 'orientationName', sortable: false },
        { text: 'تعداد واحد', value: 'uniteNumber', sortable: false },
        { text: 'نام استاد', value: 'professorName', sortable: false },
      ],
      // studHeader: [
      //     { text: 'ردیف', align: 'start', value: 'rowNum', },
      //     { text: 'نوع تیکت', value: 'ticketType', sortable: false  },
      //     { text: 'تاریخ', value: 'date',  },
      //     // { text: 'توضیحات', value: 'caption', sortable: false  },
      //     { text: 'وضعیت', value: 'status', sortable: false },
      //     { text: 'Actions', value: 'actions', sortable: false }
      // ],

      selects: [],
      loading: true,
      btnLoading: false,
    }
  },
  computed: {
    user() {
      return this.$store.getters['auth/user']
    },

    role() {
      return this.user.role.name_role
    },
    items() {
      return this.$store.getters['stdCourseList/courses']
    },
  },
  async mounted() {
    await this.$store.dispatch('stdCourseList/getCourses')
    this.loading = false
  },
  updated() {
    console.log(this.selects)
  },

  methods: {
    async registerCourses() {
      if (!this.selects) {
        return
      }
      this.btnLoading = true
      try {
        const addId = []
        this.selects.forEach((element) => {
          addId.push(element.id_permitted_course)
        })
        await this.$axios.$post('/post-permitted-course', {
          id_permitted_course: addId,
        })
        this.$root.appSnackbar.show({ message: `دروس با موفقیت اضافه شدند.` })
        await this.$store.dispatch('stdCourseList/getCourses')
        await this.$store.dispatch('stdCourseList/getTakenCourses')
        this.selects = [];
      } catch (e) {
        console.log(e.response.data.message)
      }
      this.btnLoading = false
    },
  },
}
</script>

<style scoped>
.ticket_title_background {
  background: #3f505e;
  /* background: #618AAB;     */
  color: white;
  display: flex;
  justify-content: center;
}

.terminate_ticket {
  background: #e28743;
  color: white;
  width: 128px;
}

.cancel_ticket {
  background: #84a7c4;
  color: white;
  width: 128px;
}

.ticket_background {
  background: #dce4eb;
}

.closeWhite {
  color: white;
  background: white;
}

.comments_color {
  color: #3f505e;
  font-size: 24px;
}

.add_ticket_btn {
  background: #3f505e;
}

/* the dialog styles */
.ticket_title_background {
  background: #3f505e;
  /* background: #618AAB; */
  color: white;
  display: flex;
  justify-content: center;
}

.terminate_ticket {
  background: #e28743;
  color: white;
}

.ticket_background {
  background: #dce4eb;
}

.closeWhite {
  color: white;
}

.comments_color {
  color: #3f505e;
  font-size: 24px;
}
</style>
