<template>
  <div class="text-center">
    <v-dialog v-model="show" width="700">
      <!--<template v-slot:activator="{ on, attrs }">
        <v-btn color="red lighten-2" dark v-bind="attrs" v-on="on">درخواست افزایش ظرفیت</v-btn>
      </template>-->

      <v-card class="ticket_background">
        <v-card-title class="text-h5 lighten-2 ticket_title_background mb-5">
          <v-spacer class="mr-10"></v-spacer>{{selected_ticket_name}}
          <v-spacer></v-spacer>
          <v-btn class="ml-n2" icon dark @click="show = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>

        <v-container>
          <v-row class="mb-n12 " justify="center">
            <v-col cols="5" >
              <v-text-field
              :value="course"
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
              :value="course"
              solo 
              label="گرایش" 
              clearable 
              disabled 
              color="#3F505E"
              >
              </v-text-field>
            </v-col>
          </v-row>
          <v-row class="justify-center mb-n16">  
            <v-col cols="5" class="mr-n1">
              <v-text-field
                :value="course"
                solo 
                label="تعداد واحد" 
                clearable 
                disabled 
                color="#3F505E"
              ></v-text-field>
            </v-col>

            <v-col cols="5" class="mr-n1">
              <v-select
                v-model="prerequisites"
                color="#3F505E" 
                :items="prerequisites"
                chips
                label="لیست پیش نیاز ها"
                readonly
                multiple
                solo
            ></v-select>
            </v-col>
          </v-row>

          <v-row class="justify-center">
            <v-col cols="10">
              <v-select
                v-model="teacher"
                color="#3F505E" 
                :items="teachers"
                label="نام استاد" 
                solo
              ></v-select>
            </v-col>
          </v-row>
        </v-container>

        <v-card-actions class="justify-center">
          <v-btn text class="terminate_ticket mb-3" @click="show = false">افزودن</v-btn>
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
      selected_ticket_name:"ویرایش استاد درس",
      course:"",
      orientation:"",
      course_units:"",
      prerequisites:['sdfsf','sdfsdf','sdfsd'],
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
    prerequisitesText(prerequisites){
      return `${prerequisites.name_orientation}`;
    },
    
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