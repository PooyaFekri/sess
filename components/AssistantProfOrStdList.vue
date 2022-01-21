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
          <!--<v-row>
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
          </v-row>-->

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
    <v-row>
    <v-dialog v-model="AddProfessor" width="700">
      <!--<template v-slot:activator="{ on, attrs }">
        <v-btn color="red lighten-2" dark v-bind="attrs" v-on="on">{{selected_ticket_name}}</v-btn>
      </template>-->

      <v-card class="ticket_background">
        <v-card-title class="text-h5 lighten-2 ticket_title_background mb-5">
          <v-spacer class="mr-10"></v-spacer>{{selected_ticket_name_prof}}
          <v-spacer></v-spacer>
          <v-btn class="ml-n2" icon dark @click="AddProfessor = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>

        <v-container>
          <v-row class="justify-center mb-n12">
            <v-col cols="5">
              <v-text-field
              v-model="professorFields.name"
              solo 
              label="نام" 
              clearable 
              color="#3F505E"
              ></v-text-field>
            </v-col>
            <v-col cols="5">
              <v-text-field
                v-model="professorFields.familyName"
                color="#3F505E"
                clearable
                label="نام خانوادگی" 
                solo
              ></v-text-field>
              
            </v-col>
          </v-row>
          <v-row class="justify-center mb-n12">
            <v-col cols="5">
              <v-text-field
              v-model="professorFields.email"
              solo 
              label="ایمیل" 
              clearable 
              color="#3F505E"
              ></v-text-field>
            </v-col>
            <v-col cols="5">
              <v-text-field
                v-model="professorFields.password"
                type="password"
                color="#3F505E"
                clearable
                label="کلمه عبور" 
                solo
              ></v-text-field>
              
            </v-col>
          </v-row>
          <v-row justify="center">
            <v-col cols="3" class="mr-16 mb-3">
                <v-checkbox
                    v-model="professorFields.headOfDepartment"
                    label="رییس بخش"
                    color="orange"
                    hide-details
                ></v-checkbox>
            </v-col>
          </v-row>
        </v-container>

        <v-card-actions class="justify-center">
          <v-btn v-if="!edit" text class="terminate_ticket mb-3" @click="addProf">افزودن</v-btn>
          <v-btn v-else text class="terminate_ticket mb-3" @click="addProf">ویرایش</v-btn>
          <v-btn text class="cancel_ticket mb-3" @click="AddProfessor = false">لغو</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    </v-row>
    <v-row>
      <v-dialog v-model="AddStudent" width="700">
      <!--<template v-slot:activator="{ on, attrs }">
        <v-btn color="red lighten-2" dark v-bind="attrs" v-on="on">{{selected_ticket_name}}</v-btn>
      </template>-->

      <v-card class="ticket_background">
        <v-card-title class="text-h5 lighten-2 ticket_title_background mb-5">
          <v-spacer class="mr-10"></v-spacer>{{selected_ticket_name_std}}
          <v-spacer></v-spacer>
          <v-btn class="ml-n2" icon dark @click="AddStudent = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>

        <v-container>
          <v-row class="justify-center mb-n12">
            <v-col cols="5">
              <v-text-field
              v-model="studentFields.name"
              solo 
              label="نام" 
              clearable 
              color="#3F505E"
              ></v-text-field>
            </v-col>
            <v-col cols="5">
              <v-text-field
                v-model="studentFields.familyName"
                color="#3F505E"
                clearable
                label="نام خانوادگی" 
                solo
              ></v-text-field>
              
            </v-col>
          </v-row>
          <v-row class="justify-center mb-n12">
            <v-col cols="5">
              <v-text-field
              v-model="studentFields.stdNum"
              solo 
              label="شماره دانشجویی" 
              clearable 
              :disabled=editStdNumButton
              color="#3F505E"
              ></v-text-field>
            </v-col>
            <v-col cols="5">
              <v-text-field
              v-if="edit"
              v-model="studentFields.new_student_number"
              solo 
              label="شماره دانشجویی جدید" 
              clearable 
              color="#3F505E"
              ></v-text-field>
              <v-text-field
                v-else
                v-model="studentFields.password"
                type="password"
                color="#3F505E"
                clearable
                label="کلمه عبور" 
                solo
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row v-if="edit" class="justify-center mb-n14" >
            <v-col cols="10">
              <v-text-field
                v-model="studentFields.password"
                type="password"
                color="#3F505E"
                clearable
                label="کلمه عبور" 
                solo
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row class="justify-center mb-n14">
            <v-col cols="5">
              <v-select
                v-model="studentFields.orientation"
                color="#3F505E" 
                :item-text="orientationText"
                :items="orientations"
                item-value="name"
                label="گرایش" 
                solo
              ></v-select>
            </v-col>
            <v-col cols="5">
              <v-select
                v-model="studentFields.grade"
                color="#3F505E" 
                :items="grades"
                :item-text="(grade) => `${grade.persianName}`"
                item-value="name"
                label="مقطع" 
                solo
              ></v-select>
            </v-col>
          </v-row>
          <v-row class="justify-center">
            <v-col cols="10">
                <v-text-field
                v-model="studentFields.enteranceYear"
                color="#3F505E"
                clearable
                label="سال ورود: مثلا 1401" 
                solo
              ></v-text-field>
              
            </v-col>
          </v-row>
          <v-row class="justify-center mb-n14">
            <v-col cols="5">
              <v-select
                v-model="studentFields.advisor"
                color="#3F505E" 
                :items="profs"
                :item-text="(prof) => `${prof.fname} ${prof.lname}`"
                item-value="id"
                label="استاد مشاور" 
                solo
              ></v-select>
            </v-col>
            <v-col cols="5">
              <v-select
                v-model="studentFields.supervisor"
                color="#3F505E"
                :items="profs"
                :item-text="(prof) => `${prof.fname} ${prof.lname}`"
                item-value="id"
                label="استاد راهنما" 
                solo
              ></v-select>
            </v-col>
          </v-row>
        </v-container>

        <v-card-actions class="justify-center">
          <v-btn v-if="!edit" text class="terminate_ticket mb-3" @click="addStd">افزودن</v-btn>
          <v-btn v-else text class="terminate_ticket mb-3" @click="addStd">ویرایش</v-btn>
          <v-btn text class="cancel_ticket mb-3" @click="AddStudent = false">لغو</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    </v-row>
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
      itemForEdit: {},
      professorFields:{
        name:"",
        familyName:"",
        email:"",
        password:null,
        headOfDepartment:false
      },
      studentFields:{
        name:"",
        familyName:"",
        stdNum:"",
        password:null,
        orientation:"",
        new_student_number:null,
        grade:"",
        enteranceYear:"",
        advisor:null,
        supervisor:null
      },
      courses:[],
      orientations:[],
      profs:[],
      grades:[
        {name:"master",persianName:"کارشناسی ارشد"},
        {name:"bachelor",persianName:"کارشناسی"}
      ],
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
    selected_ticket_name_prof: {
      get(){
        if (this.edit)
          return `ویرایش استاد`;
        return `افزودن استاد`
      }
    },
    selected_ticket_name_std: {
      get(){
        if (this.edit)
          return `ویرایش دانشجو`;
        return `افزودن دانشجو`
      }
    },
    editStdNumButton(){
      return this.edit;
    }
  },

  async mounted() {
    await this.getProfs();
    await this.getOrientations(); 
  },
  updated() {},

  methods: {
    activeComponent(){
      if (this.type === 'prof')
        this.AddProfessor = true;
      else
        this.AddStudent = true;

      this.professorFields={
        name:"",
        familyName:"",
        email:"",
        password:null,
        headOfDepartment:false
      };
      this.studentFields={
        name:"",
        familyName:"",
        stdNum:"",
        new_student_number:null,
        password:null,
        orientation:"",
        grade:"",
        enteranceYear:"",
        advisor:null,
        supervisor:null
      }
      this.edit = false;
    },
    editRow(item){
      this.edit = true;
      this.itemForEdit = item;
      if (this.type === 'prof'){
        this.AddProfessor = true;
        const professor = {
        name:item.firstName,
        familyName:item.lastName,
        email:item.email,
        password:null,
        headOfDepartment:item.is_dep_head
      };
        this.professorFields = professor;
      }
      else{
        const student = {
          name:item.firstName,
          familyName:item.lastName,
          stdNum:item.stdNum,
          orientation:item.orientation,
          grade:item.section,
          enteranceYear:item.entryYear,
          advisor:item.adviserId,
          password:null,
          supervisor:item.superviserId,
          new_student_number:null
        };
        this.AddStudent = true;
        this.studentFields = student;
      } 
    },
    closeStd(){
      this.AddStudent = false;
      this.edit = false;
    },
    closeProf(){
      this.AddProfessor = false;
      this.edit = false;
    },
    courseText(course) {
      return `${course.course}`;
    },
    orientationText(orientation){
      return `${orientation.name}`;
    },
    async getProfs() {
      try {
        const profs = await this.$axios.$get('/get-professors');
        this.profs = profs;
        console.log(profs);
      } catch (error) {
        console.log(error);
      }
    },
    async getOrientations() {
      try {
        const orientations = await this.$axios.$get('/get-orientations');
        this.orientations = orientations;
      } catch (error) {
        console.log(error);
      }
    },
    async addProf(){
      const data = {
        first_name: this.professorFields.name,
        last_name: this.professorFields.familyName,
        pass: this.professorFields.password,
        email: this.professorFields.email,
        is_departman_boss: this.professorFields.headOfDepartment
      };
      console.log(data);
      try {
        if (this.edit){
          await this.$axios.$put('/update-professor', data);
        } else {
          await this.$axios.$post('/add-professor', data);
        }
      } catch (error) {
        console.log(error);
      }
      this.AddProfessor = false;
    },
    async addStd(){
      const data = {
        first_name:this.studentFields.name,
        last_name:this.studentFields.familyName,
        student_number:this.studentFields.stdNum,
        password:this.studentFields.password,
        orientation:this.studentFields.orientation,
        cross_section:this.studentFields.grade,
        enter_year:this.studentFields.enteranceYear,
        adviser_id:this.studentFields.advisor,
        superviser_id:this.studentFields.supervisor
      };
      try {
        if (this.edit){
          const dataEdit = {
            first_name:this.studentFields.name,
            last_name:this.studentFields.familyName,
            student_number:this.studentFields.stdNum,
            password:this.studentFields.password,
            orientation:this.studentFields.orientation,
            cross_section:this.studentFields.grade,
            enter_year:this.studentFields.enteranceYear,
            adviser_id:this.studentFields.advisor,
            superviser_id:this.studentFields.supervisor,
            new_student_number:this.studentFields.new_student_number
          };
          console.log(dataEdit);
          await this.$axios.$put('/update-student-system', dataEdit);
        } else {
          await this.$axios.$post('/add-student', data);
        }
      } catch (error) {
        console.log(error);
      }
      this.AddStudent = false;
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
