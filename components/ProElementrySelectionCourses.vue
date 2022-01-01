<template>
  <v-container>
    <v-card width="100%" justify="center" style="background: #dce4eb">
      <v-card-title class="text-h5 lighten-2 ticket_title_background mb-5">
        {{ title }}
      </v-card-title>
      <v-row justify="center">
        <v-col cols="11">
          <v-data-table
            :headers="headers"
            :items="items"
            sort-by="rowNum"
            class="elevation-1 mb-3"
            item-key="item.name"
          >
          </v-data-table>
        </v-col>
      </v-row>
    </v-card>
  </v-container>
</template>

<script>
export default {
  props: ['title', 'type'],
  data() {
    return {
      headers: [
        { text: 'ردیف', align: 'start', value: 'rowNum' },
        { text: 'نام درس', value: 'courseName', sortable: false },
        { text: 'نام گرایش', value: 'orientationName', sortable: false },
        { text: 'تعداد واحد', value: 'uniteNumber', sortable: false },
        { text: 'نام استاد', value: 'professorName', sortable: false },
        { text: 'تعداد دانشجو‌ها', value: 'takenNumber', sortable: false },
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
      items: [],
    }
  },
  computed: {
    user() {
      return this.$store.getters['auth/user']
    },

    role() {
      return this.user.role.name_role
    },
  },

  async mounted() {
    await this.getItems()
  },
  updated() {
    console.log(this.selects)
  },

  methods: {
    async getItems() {
      try {
        const res = await this.$axios.$get('/get-permitted-course')
        // this.loading = false
        let rowNum = 1
        res.data.forEach((element) => {
          if (
            element.course_section === this.type &&
            this.type === 'bachelor'
          ) {
            this.items.push({
              rowNum: rowNum++,
              courseName: element.course_name,
              orientationName: element.orientation,
              uniteNumber: element.unit_numbers,
              professorName: element.name_professor,
              id_permitted_course: element.id_permitted_course,
              takenNumber: element.number_get_it_in_initial_course_this_term,
              courseSection: element.course_section,
            })
          } else if (
            element.course_section === this.type &&
            this.type === 'master'
          ) {
            this.items.push({
              rowNum: rowNum++,
              courseName: element.course_name,
              orientationName: element.orientation,
              uniteNumber: element.unit_numbers,
              professorName: element.name_professor,
              id_permitted_course: element.id_permitted_course,
              takenNumber: element.number_get_it_in_initial_course_this_term,
              courseSection: element.course_section,
            })
          }
        })
      } catch (e) {
        console.log(e.response.data.status)
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
