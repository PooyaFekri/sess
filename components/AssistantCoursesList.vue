<template>
  <v-container>
    <v-card width="100%" justify="center" style="background: #dce4eb">
      <v-card-title class="text-h5 lighten-2 ticket_title_background mb-5">
        {{ title }}
      </v-card-title>
      <v-row justify="center">
        <v-col cols="11">
          <v-data-table
            :headers="headrs"
            :items="type === 'bachelor' ? bachelorItems : masterItems"
            sort-by="rowNum"
            class="elevation-1 mb-3"
            item-key="item.name"
          >
            <template v-slot:[`item.actions`]="{ item }">
              <v-row>
                <v-icon
                  color="black"
                  small
                  class="mx-2"
                  @click="editCourseProf = true"
                >
                  mdi-pencil
                </v-icon>

                <v-icon color="black" small @click="deleteCourse(item)">
                  mdi-delete
                </v-icon>
              </v-row>
            </template>
          </v-data-table>

          <v-row>
            <v-col>
              <AddCourseToElementary
                :visible="AddCourseToElementary"
                :masterOrBachelor="type === 'master' ? true : false"
                @close="AddCourseToElementary = false"
              />
              <EditCourseProf
                :visible="editCourseProf"
                :item="{}"
                @close="editCourseProf = false"
              />
            </v-col>
          </v-row>
          <v-row justify="end">
            <v-col>
              <v-btn icon class="add_ticket_btn">
                <v-icon
                  circle
                  color="white"
                  @click="AddCourseToElementary = true"
                >
                  mdi-plus
                </v-icon>
              </v-btn>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-card>
  </v-container>
</template>

<script>
export default {
  props: {
    title: { type: String, default: () => '' },
    type: { type: String, default: () => '' },
  },
  data() {
    return {
      headrs: [
        { text: 'ردیف', align: 'start', value: 'rowNum' },
        { text: 'نام درس', value: 'courseName', sortable: false },
        { text: 'نام گرایش', value: 'orientationName', sortable: false },
        { text: 'تعداد واحد', value: 'uniteNumber', sortable: false },
        { text: 'نام استاد', value: 'professorName', sortable: false },
        { text: 'تعداد دانشجو‌ها', value: 'takenNumber', sortable: false },
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
      bachelorItems: [],
      masterItems: [],
      editCourseProf: false,
      AddCourseToElementary: false,
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
      return this.type === 'bachelor' ? this.bachelorItems : this.masterItems
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
      this.bachelorItems = []
      this.masterItems = []
      try {
        const res = await this.$axios.$get('/get-permitted-course')
        // this.loading = false
        let rowNum = 1
        res.data.forEach((element) => {
          if (
            element.course_section === this.type &&
            this.type === 'bachelor'
          ) {
            this.bachelorItems.push({
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
            this.masterItems.push({
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
    async deleteCourse(item) {
      if (confirm(`آيا از حذف درس  ${item.courseName} مطمئن هستید؟`)) {
        try{
          await this.$axios.$post('/delete-permitted-course', {
            permitted_course_id: item.id_permitted_course,
          })
          this.$root.appSnackbar.show({message: `درس با موفقیت حذف شد.`})
          await this.getItems();
        }
        catch (e){
          console.log(e.response.data.message);
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
