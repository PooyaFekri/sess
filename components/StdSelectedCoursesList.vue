<template>
  <v-container>
    <v-card width="100%" justify="center" style="background: #dce4eb">
      <v-card-title class="text-h5 lighten-2 ticket_title_background mb-5">
        لیست دروس انتخاب شده
      </v-card-title>
      <v-row justify="center">
        <v-col cols="11">
          <v-data-table
            :headers="headrs"
            :items="items"
            sort-by="rowNum"
            class="elevation-1 mb-3"
            :loading="loading"
          >
            <template v-slot:[`item.actions`]="{ item }">
              <v-icon color="black" @click="deleteCourse(item)" small>
                mdi-delete
              </v-icon>
            </template>
          </v-data-table>
        </v-col>
      </v-row>
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
        { text: 'Actions', value: 'actions', sortable: false },
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
      return this.$store.getters['stdCourseList/takenCourses']
    },
  },

  async mounted() {
    await this.$store.dispatch('stdCourseList/getTakenCourses')
    this.loading = false;
  },
  updated() {
    console.log(this.selects)
  },

  methods: {
    async deleteCourse(item) {
      if (confirm(`آيا از حذف درس  ${item.courseName} مطمئن هستید؟`)) {
        try {
          await this.$axios.$post('/delete-initial-course-selection', {
            id_initial_course_selection: item.id_initial_course_selection,
          })
          this.$root.appSnackbar.show({ message: `درس با موفقیت حذف شد.` })
          await this.$store.dispatch('stdCourseList/getTakenCourses')
          await this.$store.dispatch('stdCourseList/getCourses')
        } catch (e) {
          console.log(e.response.data.message)
        }
      }
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
