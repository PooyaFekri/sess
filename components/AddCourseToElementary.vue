<template>
  <div class="text-center">
    <v-dialog v-model="show" width="700">

    <template v-slot:activator="{ on, attrs }">
        <v-btn color="red lighten-2" dark v-bind="attrs" v-on="on">{{selected_ticket_name}}</v-btn>
      </template>
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
            <v-col cols="10">
              <v-select
                v-model="selectedCourses"
                color="#3F505E" 
                :items="courses"
                :item-text="courseText"
                item-value="id_course"
                label="نام درس و گرایش" 
                chips
                multiple
                solo
              ></v-select>
            </v-col>
          </v-row>
        </v-container>

        <v-card-actions class="justify-center">
          <v-btn text class="terminate_ticket mb-3" @click="chooseCourses">افزودن</v-btn>
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
    masterOrBachelor:{type:Boolean}
  },
  data () {
        return {
            courses:[],
            selectedCourses:[]
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
    selected_ticket_name:{
        get(){
            if (this.masterOrBachelor)
                return "افزودن درس به لیست دروس کارشناسی ارشد";
            return "افزودن درس به لیست دروس کارشناسی";
        }
    },
    course_section: {
        get(){
            if (this.masterOrBachelor)
                return 'master';
            return 'bachelor';
        }
    }
  },
  async mounted() {
    await this.getCourses();
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
    courseText(course) {
      return `${course.course} - ${course.name_orientation}`;
    },
    async chooseCourses(){
        const data = {
            course_section: this.course_section,
            id_courses: this.selectedCourses
        };
        console.log(data);
        try {
            const response = await this.$axios.$post('/add-permitted-courses',data);
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