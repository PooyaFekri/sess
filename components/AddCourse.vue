<template>
  <div class="text-center">
    <v-dialog v-model="show" width="700">

    <!--<template v-slot:activator="{ on, attrs }">
        <v-btn color="red lighten-2" dark v-bind="attrs" v-on="on">{{selected_ticket_name}}</v-btn>
      </template>-->
      <v-card class="ticket_background">
        <v-card-title class="text-h5 lighten-2 ticket_title_background mb-5">
          <v-spacer class="mr-10"></v-spacer>{{selected_ticket_name}}
          <v-spacer></v-spacer>
          <v-btn 
          class="ml-n2" 
          icon 
          dark 
          @click="show=false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>

        <v-container>
          <v-row class="justify-center mb-n12">
            <v-col cols="5">
              <v-text-field
              v-model="course"
              solo 
              label="نام درس" 
              clearable 
              color="#3F505E"
              ></v-text-field>
            </v-col>
            <v-col cols="5">
              <v-text-field
                v-model="course_units"
                color="#3F505E"
                clearable
                label="تعداد واحد" 
                solo
              ></v-text-field>
              
            </v-col>
          </v-row>
          <v-row class="justify-center mb-n14">
            <v-col cols="5">
              <v-select
                v-model="prerequisites"
                color="#3F505E" 
                :items="courses"
                :item-text="courseOrientationText"
                item-value="id_course"
                label="لیست پیش نیاز ها" 
                chips
                multiple
                solo
              ></v-select>
            </v-col>
            <v-col cols="5">
              <v-select
                v-model="orientation"
                color="#3F505E" 
                :items="orientations"
                :item-text="orientationName"
                item-value="id"
                label="گرایش" 
                solo
              ></v-select>
            </v-col>
          </v-row>
          <v-row class="justify-center">
            <v-col cols="10">
            </v-col>
          </v-row>
        </v-container>

        <v-card-actions class="justify-center">
          <v-btn text class="terminate_ticket mb-3" @click="addCourse">افزودن</v-btn>
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
    visible:{type:Boolean}
  },
  data () {
        return {
            selected_ticket_name:"افزودن درس",
            courses:[],
            course:"",
            course_units:"",
            orientation:"",
            orientations:[],
            prerequisites:[]
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
    }
  },
  async mounted() {
    await this.getCourses();
    await this.getOrientations();
  },
  methods: {
    async getCourses() {
      try {
        const courses = await this.$axios.$get('/get-courses');
        this.courses = courses;
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
    courseOrientationText(course){
      return `${course.course} - ${course.name_orientation}`;
    },
    orientationName(orientation){
        return `${orientation.name}`
    },
    async addCourse(){
        const data = {
            name_course:this.course,
            orientation:parseInt(this.orientation),
            unit_numbers :parseInt(this.course_units),
            prerequisites:this.prerequisites
        }
        try {
            const {courses} = await this.$axios.$post('/add-course', data);
            console.log(courses)
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