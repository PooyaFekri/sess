<template>
  <div class="text-center">
    <v-dialog v-model="show" width="700">
      <!--<template v-slot:activator="{ on, attrs }">
        <v-btn color="red lighten-2" dark v-bind="attrs" v-on="on">درخواست تغییر ساعت امتحان</v-btn>
      </template>-->

      <v-card class="ticket_background">
        <v-card-title class="text-h5 lighten-2 ticket_title_background mb-5">
          <v-spacer class="mr-10"></v-spacer>ایجاد تیکت
          <v-spacer></v-spacer>
          <v-btn class="ml-n2" icon dark @click="show = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>

        <v-container>
          <v-row class="justify-center mb-n12">
            <v-col cols="5">
              <v-text-field solo :label="selected_ticket_name" clearable disabled color="#3F505E"></v-text-field>
            </v-col>
            <v-col cols="5">
              <v-select
                v-model="course"
                :items="courses"
                :item-text="courseText"
                label="نام درس" 
                solo
              ></v-select>
            </v-col>
          </v-row>
          <v-row class="justify-center mb-n14">
            <v-col cols="5">
              <v-select
                v-model="orientation"
                color="#3F505E" 
                :items="orientations"
                :item-text="orientationText"
                item-value="id_course"
                label="نام گرایش" 
                solo
              ></v-select>
            </v-col>
            <v-col cols="5">
              <v-text-field
                v-model="conflicted_course_name"
                solo
                label="نام درسی که با درس تداخل دارد"
                clearable
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row class="justify-center">
            <v-col cols="10">
              <v-textarea
                v-model="description"
                placeholder="در صورت لزوم متن اضافه کنید."
                class="pt-5 pr-2"
                color="#3F505E"
                solo
                no-resize
              ></v-textarea>
            </v-col>
          </v-row>
        </v-container>

        <v-card-actions class="justify-center">
          <v-btn text class="terminate_ticket mb-3" @click="createTicket">تایید</v-btn>
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
          dialog: false,
          selected_ticket_name:"درخواست تغییر ساعت امتحان",
          course:"",
          courses:[],
          conflicted_course_name:"",
          description:"",
          orientation:""
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
    orientations:{
      get(){
        if (this.course !== ""){
          const course = this.courses.find((element) =>{
            return element.course === this.course;
          })
          return course.list_orientation;
        } 
        return [];
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
      return `${course.course}`;
    },
    orientationText(orientation){
      return `${orientation.name_orientation}`;
    },
    async createTicket(){
      console.log('we are in create ticket');
      console.log(`${this.course}`);
      const body = {
        receiver_id : "Hossainy",
        subject : "exam_time_change",
        description: this.description,
        course_id : this.orientation,
        conflicted_course_name: this.conflicted_course_name
      }
      console.log(body);
      try {
        const {data} = await this.$axios.post('/create-ticket', body)
        console.log(data);
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