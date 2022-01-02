<template>
  <v-container>
    <v-card width="100%" justify="center" style="background: #dce4eb">
      <v-card-title class="text-h5 lighten-2 ticket_title_background mb-5">
        لیست دروس
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
      
      <v-row justify="end">
        <v-col cols="2">
          <v-btn icon class="add_ticket_btn">
            <v-icon
              circle
              color="white"
              @click="AddCourse=true"
            >
              mdi-plus
            </v-icon>
          </v-btn>
        </v-col>
      </v-row>
      
      <AddCourse :visible="AddCourse" @close="AddCourse=false" />
      
    </v-card>
  </v-container>
</template>

<script>
import AddCourse from '@/components/AddCourse.vue'

export default {

  components: {
    AddCourse,
  },

  data() {
    return {
      headers: [
        { text: 'ردیف', align: 'start', value: 'rowNum' },
        { text: 'نام درس', value: 'courseName', sortable: false },
        // { text: 'تعداد واحد', value: 'uniteNumber', sortable: false },
        { text: 'گرایش', value: 'orientationName', sortable: false },
      ],

      selects: [],
      bachelorItems: [],
      masterItems: [],
      editCourseProf: false,
      AddCourseToElementary: false,
      AddCourse: false,
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
      return this.$store.getters['assistant/courses']
    },
  },

  async mounted() {
    await this.$store.dispatch('assistant/getCourses')
  },
  updated() {
    console.log(this.selects)
  },

  methods: {},
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
