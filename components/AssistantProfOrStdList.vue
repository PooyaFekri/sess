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
            <template #[`item.actions`]="{ item }">
              <v-row>
                <v-icon
                  color="black"
                  small
                  class="mx-2"
                  @click="editRow(item)"
                >
                  mdi-pencil
                </v-icon>

                <!-- <v-icon color="black" small @click="deleteItem(item)">
                  mdi-delete
                </v-icon> -->
              </v-row>
            </template>
          </v-data-table>
          <v-row>
            <v-col>
              <AddProfessor 
              v-if="stdOrProf" 
              :visible="AddProfessor"
              :edit="edit"
              :item-obj="itemForEdit"
              @close="closeProf"
              />
              <AddStudent 
              v-else 
              :visible="AddStudent" 
              :edit="edit"
              :item-obj="itemForEdit"
              @close="closeStd"
              />
            </v-col>
          </v-row>

          <v-row justify="end">
            <v-col>
              <v-btn icon class="add_ticket_btn">
                <v-icon
                  circle
                  color="white"
                  @click="activeComponent"
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
      stdHeadrs: [
        { text: 'ردیف', align: 'start', value: 'rowNum' },
        { text: 'نام دانشجو', value: 'stdName', sortable: false },
        { text: 'شماره دانشجویی', value: 'stdNum', sortable: false },
        { text: 'سال ورود', value: 'entryYear', sortable: false },
        { text: 'مقطع', value: 'section', sortable: false },
        { text: 'Actions', value: 'actions', sortable: false },
      ],
      profHeaders: [
        { text: 'ردیف', align: 'start', value: 'rowNum' },
        { text: 'نام استاد', value: 'profName', sortable: false },
        { text: 'ایمیل', value: 'email', sortable: false },
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
      edit: false,
      AddProfessor: false,
      AddStudent: false,
      itemForEdit: {}
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
      return this.type === 'std'
        ? this.$store.getters['assistant/students']
        : this.$store.getters['assistant/profs']
      // console.log(this.type);
      // return this.$store.getters['assistant/students']
    },
    headers() {
      return this.type === 'std' ? this.stdHeadrs : this.profHeaders
    },
    stdOrProf(){
      return this.type === 'prof';
    },
  },

  async mounted() {
  },
  updated() {},

  methods: {
    activeComponent(){
      if (this.type === 'prof')
        this.AddProfessor = true;
      else
        this.AddStudent = true;

      this.edit = false;
    },
    editRow(item){
      this.edit = true;
      this.itemForEdit = item;
      if (this.type === 'prof')
        this.AddProfessor = true;
      else 
        this.AddStudent = true;
    },
    closeStd(){
      this.AddStudent = false;
      this.edit = false;
    },
    closeProf(){
      this.AddProfessor = false;
      this.edit = false;
    }
    // deleteItem(item){
    //   if (this.type === 'std'){
    //     if (confirm(`آيا از حذف دانشجوی ${item.stdNum} مطمئن هستید؟`)) {
    //     try{
    //       await this.$axios.$post('/delete-permitted-course', {
    //         permitted_course_id: item.id_permitted_course,
    //       })
    //       this.$root.appSnackbar.show({message: `درس با موفقیت حذف شد.`})
    //       await this.getItems();
    //     }
    //     catch (e){
    //       console.log(e.response.data.message);
    //     }
    //   }
    //   }else{
    //     if (confirm(`آيا از حذف استاد ${item.email} مطمئن هستید؟`)) {
    //     try{
    //       await this.$axios.$post('/delete-permitted-course', {
    //         permitted_course_id: item.id_permitted_course,
    //       })
    //       this.$root.appSnackbar.show({message: `درس با موفقیت حذف شد.`})
    //       await this.getItems();
    //     }
    //     catch (e){
    //       console.log(e.response.data.message);
    //     }
    //   }
    // }
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
