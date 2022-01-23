<template>
  <div class="text-center">
    <v-dialog v-model="show" width="700">
      <!-- <template v-slot:activator="{ on, attrs }">
        <v-btn color="red lighten-2" dark v-bind="attrs" v-on="on">{{selected_ticket_name}}</v-btn>
      </template> -->

      <v-card class="ticket_background">
        <v-card-title class="text-h5 lighten-2 ticket_title_background mb-5">
          <v-spacer class="mr-10"></v-spacer>{{selected_ticket_name}}
          <v-spacer></v-spacer>
          <v-btn class="ml-n2" icon dark @click="show = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>

        <v-container>
          <v-row class="mb-n13" justify="center">
            <v-col cols="5" >
              <v-text-field
              v-model="course"
              solo 
              label="نام درس" 
              clearable 
              disabled
              color="#3F505E"
              >
              </v-text-field>
            </v-col>
            <v-col cols="5" >
              <v-text-field 
              v-model="orientation"
              solo 
              label="گرایش" 
              clearable 
              disabled 
              color="#3F505E"
              >
              </v-text-field>
            </v-col>
          </v-row>
          <v-row class="justify-center mb-n13">  
            <v-col cols="10" class="mr-n1">
              <v-text-field
                v-model="course_units"
                solo 
                label="تعداد واحد" 
                clearable 
                disabled 
                color="#3F505E"
              ></v-text-field>
            </v-col> 
          </v-row>

          <v-row class="justify-center mb-n6">
            <v-col cols="10">
              <v-select
                v-model="teacher"
                color="#3F505E" 
                :items="teachers"
                :item-text="(prof) => `${prof.fname} ${prof.lname}`"
                item-value="id"
                label="نام استاد" 
                solo
              ></v-select>
            </v-col>
          </v-row>
        </v-container>

        <v-card-actions class="justify-center">
          <v-btn text class="terminate_ticket mb-3" @click="editProfs">ویرایش</v-btn>
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
    item:{
      type:Object,
      default:() => {
        
      }
    }
  },
  data () {
    return {
      selected_ticket_name:"ویرایش استاد درس",
      course:"",
      orientation:"",
      course_units:"",
      teachers: [],
      teacher:""
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
    prerequisites:{
      get(){
        return ['sdfsf','sdfsdf','sdfsd'];
        // return this.item.prerequisites;
      },
      set(value){
        
      }
    }
  },
  async mounted() {
    await this.getCourseProf();
    await this.getPrerequisites();
    await this.getProfs();
  },
  updated(){
      console.log(`this is course prof: ${this.item}`);
      this.course = this.item.courseName
      this.orientation = this.item.orientationName
      this.course_units = this.item.uniteNumber
      // this.teacher = this.item.professorName
  },
  methods: {
    getCourseProf() {
      try {
        // const courseProf = await this.$axios.$get('/get-courses');
        // this.course = courseProf.course;
        // this.orientation = courseProf.orientation;
        // this.course_units = courseProf.course_units;
        // this.prerequisites = courseProf.prerequisites;
        // this.teacher = courseProf.teacher;
      } catch (error) {
        console.log(error);
      }
    },
    getPrerequisites() {
      try {
        // const prerequisites = await this.$axios.$get('/');
        // this.prerequisites = prerequisites;
      } catch (error) {
        console.log(error);
      }
    },
    async getProfs() {
      try {
        const profs = await this.$axios.$get('/get-professors');
        this.teachers = profs;
        console.log(profs);
      } catch (error) {
        console.log(error);
      }
    },
    async editProfs(){
      const data = {
        permitted_course_id:this.item.id_permitted_course,
        professor_id:this.teacher
      } 
      console.log(data);
      try {
        const response = await this.$axios.$post('/update-permitted-course-professor',data);
        console.log(response);
      } catch (error) {
        console.log(error);
      }
      this.show = false;
    }
    
  }
};
</script>

<style scoped>
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