<template>
  <v-container>
    <v-card width="100%" justify="center" style="background: #dce4eb">
      <v-card-title class="text-h5 lighten-2 ticket_title_background mb-5">لیست انتخاب واحد‌های فعال</v-card-title>
      <v-row justify="center">
        <v-col cols="11">
          <v-data-table :headers="headers" :items="items" sort-by="rowNum" class="elevation-1 mb-3"></v-data-table>
        </v-col>
      </v-row>
      <v-row justify="end">
        <v-col cols="1" class="ml-7 mt-n5">
          <v-btn icon class="add_ticket_btn">
            <v-icon circle color="white" @click="AddElementarySelection=true">mdi-plus</v-icon>
          </v-btn>
        </v-col>
      </v-row>

      <AddElementarySelection
        :visible="AddElementarySelection"
        @close="AddElementarySelection=false"
      />
    </v-card>
  </v-container>
</template>

<script>
import AddElementarySelection from '@/components/AddElementarySelection.vue'
export default {
  components:{
    AddElementarySelection
  },
  data() {
    return {
      headers: [
        { text: 'ردیف', align: 'start', value: 'rowNum' },
        { text: 'مقطع', value: 'section', sortable: false },
        { text: 'تاریخ شروع', value: 'startDate', sortable: false },
        { text: 'تاریخ پایان', value: 'endDate', sortable: false },
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
      AddElementarySelection: false,
      grades:{
        "master" :"کارشناسی ارشد",
        "bachelor":"کارشناسی"
      },
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
      const temp = this.$store.getters['assistant/courseSections']
      let rowNum = 1
      const items = []
      temp.forEach((element) => {
        items.push({
          rowNum: rowNum++,
          startDate: element.start_date,
          endDate: element.end_date,
          section: this.grades[element.course_section]
        })
      })
      return items
    },
  },

  async mounted() {
    console.log(this.role)
    await this.$store.dispatch('assistant/getCourseSections')
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
