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
          <v-btn class="ml-n2" icon dark @click="show = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>

        <v-container>
          <v-row class="justify-center mb-n12">
            <v-col cols="5">
              <v-text-field
              v-model="name"
              solo 
              label="نام" 
              clearable 
              color="#3F505E"
              ></v-text-field>
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
              <v-text-field
              v-model="email"
              solo 
              label="ایمیل" 
              clearable 
              color="#3F505E"
              ></v-text-field>
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
          <v-row justify="center">
            <v-col cols="3" class="mr-16 mb-3">
                <v-checkbox
                    v-model="headOfDepartment"
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
          name:"",
          familyName:"",
          email:"",
          password:"",
          headOfDepartment:false
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
          return `ویرایش استاد`;
        return `افزودن استاد`
      }
    }
  },
  mounted(){
    // setInterval(function () {console.log(`this is item ${this.itemObj}`);}, 1000);
    // console.log(`this is item ${this.itemObj}`);
  },
  updated(){
    if (this.edit){
      this.name=this.itemObj.firstName
      this.familyName=this.itemObj.lastName
      this.email=this.itemObj.email
      this.orientation=this.itemObj.orientation
      // this.headOfDepartment = is_departman_boss
    } else {
      this.name="";
      this.familyName="";
      this.email="";
      this.password="";
      this.headOfDepartment=false;
    }
  },
  methods: {
    async addProf(){
      const data = {
        first_name: this.name,
        last_name: this.familyName,
        pass: this.password,
        email: this.email,
        is_departman_boss:this.headOfDepartment
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