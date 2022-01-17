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
          <v-btn class="ml-n2" icon dark @click="show = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>

        <v-container>
          <v-row class="mb-n12 " justify="center">
            <v-col cols="5" >
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
            <v-col cols="5" >
              <v-text-field 
              v-model="year"
              solo 
              label="سال تحصیلی : مثلا 1401" 
              clearable 
              color="#3F505E"
              >
              </v-text-field>
            </v-col>
          </v-row>
          <v-row class="justify-center mb-n16">  
            <v-col cols="10" class="mr-n1">
              <v-select
                v-model="semester"
                color="#3F505E" 
                :item-text="(semester) => semester.name"
                :items="semesters"
                item-value="id"
                label="ترم" 
                solo
              ></v-select>
            </v-col>

            
          </v-row>
          <v-row justify="center" class="mt-5 mb-5">
            <v-col cols="5">
              <p>تاریخ شروع:</p>
              <client-only>
                <date-picker v-model="start_date"></date-picker>
              </client-only>
            </v-col>
            <v-col cols="5">
              <client-only>
                <p>تاریخ پایان:</p>
                <date-picker v-model="end_date"></date-picker>
              </client-only>
            </v-col>
          </v-row>
        </v-container>
        <v-card-actions class="justify-center">
          <v-btn text class="terminate_ticket mb-3" @click="addCourseSelectionPeriod">افزودن</v-btn>
          <v-btn text class="cancel_ticket mb-3" @click="show = false">لغو</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>


export default {
  components:{
    DatePicker: () => import('vue-persian-datetime-picker'),
  },
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
      selected_ticket_name:"افزودن انتخاب واحد",
      grades:[
        {name:"master",persianName:"کارشناسی ارشد"},
        {name:"bachelor",persianName:"کارشناسی"}
      ],
      grade:"",
      year:"",
      semester:"",
      semesters:[{id:1, name:"نیمسال اول"},{id:2, name:"نیمسال دوم"},{id:3, name:"ترم تابستان"}],
      start_date:"",
      end_date:""
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
  
  },
  async mounted() {
   
  },
  methods: {
    async addCourseSelectionPeriod() {
      const data = {
        course_section:this.grade,
        term:parseInt(this.semester),
        start_date:new Date(this.start_date).getTime(),
        end_date:new Date(this.end_date).getTime()
      }
      console.log(data);
      try {
        const {response} = await this.$axios.$post('/add-course-selection-period', data);
        console.log(response);
      } catch (error) {
        console.log(error);
      }
      this.show = false;
    },
    // timeStamp() {
      // console.log('this is time stamp:');
      // console.log(new Date(this.start_date).getTime());
      // console.log(new Date(this.end_date).getTime());
      // const mydate = new Date("2022-01-01");
      // const mypersiandate = mydate.toLocaleDateString('fa-IR');
      // console.log(mypersiandate);
      // console.log(mydate);
      // return (new Date("2022-01-01")).getTime();
    // }
    
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