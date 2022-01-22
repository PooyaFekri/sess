<template>
  <div class="text-center">
    <v-dialog v-model="show" width="700">
      <!--<template v-slot:activator="{ on, attrs }">
        <v-btn color="red lighten-2" dark v-bind="attrs" v-on="on">{{selected_ticket_name}}</v-btn>
      </template>-->

      <v-card class="ticket_background">
        <v-card-title class="text-h5 lighten-2 ticket_title_background mb-5">
          <v-spacer class="mr-10"></v-spacer>
          {{selected_ticket_name}}
          <v-spacer></v-spacer>
          <v-btn class="ml-n2" icon dark @click="show = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>

        <v-container>
          <v-row class="justify-center mb-n12">
            <v-col cols="5">
              <v-text-field v-model="name" solo label="نام" clearable color="#3F505E"></v-text-field>
            </v-col>
            <v-col cols="5">
              <v-text-field
                v-model="familyName"
                color="#3F505E"
                clearable
                label="نام خانوادگی"
                solo
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row class="justify-center mb-n12">
            <v-col cols="5">
              <v-text-field v-model="stdNum" solo label="شماره دانشجویی" clearable color="#3F505E"></v-text-field>
            </v-col>
            <v-col cols="5">
              <v-text-field
                v-model="password"
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
                v-model="orientation"
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
                v-model="grade"
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
                v-model="enteranceYear"
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
                v-model="advisor"
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
                v-model="supervisor"
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
          <v-btn text class="cancel_ticket mb-3" @click="show = false">لغو</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  // TODO: add upload and download files
  props:{
    visible:{type:Boolean},
    itemObj:{type:Object, default:() => {}},
    edit:{type:Boolean, default: () => false}
  },
  data () {
        return {
          courses:[],
          orientations:[],
          profs:[],
          grades:[
            {name:"master",persianName:"کارشناسی ارشد"},
            {name:"bachelor",persianName:"کارشناسی"}
          ],
          name:"",
          familyName:"",
          stdNum:"",
          password:"",
          orientation:"",
          grade:"",
          enteranceYear:"",
          advisor:"",
          supervisor:null

        }
    },
  computed: {
    show: {
      get() {
        return this.visible;
      }, 
      set(value) {
        if (!value){
          this.$emit('close');
        }
      }
    },
    selected_ticket_name: {
      get(){
        if (this.edit)
          return `ویرایش دانشجو`;
        return `افزودن دانشجو`
      }
    }
  },
  async mounted() {
    // setInterval(function () {console.log(`this is item ${this.itemObj}`);}, 1000);
    // console.log(`this is item ${this.itemObj}`);
    await this.getProfs();
    await this.getOrientations();
  },
  updated(){
    if (this.edit){
      this.name=this.itemObj.firstName
      this.familyName=this.itemObj.lastName
      this.stdNum=this.itemObj.stdNum
      this.orientation=this.itemObj.orientation
      this.grade=this.itemObj.section
      this.enteranceYear=this.itemObj.entryYear
      this.advisor=this.itemObj.advisor
      this.supervisor=this.itemObj.superviserId
    } else {
      this.name="";
      this.familyName="";
      this.stdNum="";
      this.password="";
      this.orientation="";
      this.grade="";
      this.enteranceYear="";
      this.advisor="";
      this.supervisor=null;
    }
  },
  methods: {
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
    courseText(course) {
      return `${course.course}`;
    },
    orientationText(orientation){
      return `${orientation.name}`;
    },
    async addStd(){
      const data = {
        first_name:this.name,
        last_name:this.familyName,
        student_number:this.stdNum,
        password:this.password,
        orientation:this.orientation,
        cross_section:this.grade,
        enter_year:this.enteranceYear,
        adviser_id:this.advisor,
        superviser_id:this.supervisor
      };
      try {
        if (this.edit){
          await this.$axios.$put('/update-student-system', data);
        } else {
          await this.$axios.$post('/add-student', data);
        }
      } catch (error) {
        console.log(error);
      }
      this.show = false;
    }
  }
};
</script>

<style scoped>
.v-list-item--theme--light {
  background-color: black !important;
}
.v-list-item--link--theme--light {
  background-color: black !important;
}

.ticket_title_background {
  background: #3f505e;
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
</style>