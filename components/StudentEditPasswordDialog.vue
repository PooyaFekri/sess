<template>
  <div class="text-center">
    <v-dialog v-model="show" width="700">
    

      <v-card class="ticket_background">
        <v-card-title class="text-h5 lighten-2 ticket_title_background mb-5">
          <v-spacer class="mr-10"></v-spacer>
          تغییر کلمه عبور
          <v-spacer></v-spacer>
          <v-btn 
          class="ml-n2" 
          icon 
          dark 
          @click="closeDialog">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>

        <v-container>
            
            <v-row v-if="notEqualityFlag" justify="center">
                کلمه عبور نامعتبر است!
            </v-row>

          <v-row justify="center" class="mb-n8">
              <v-col cols="8">
                 <v-text-field 
                 v-model="newPassword" 
                 :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'" 
                 :type="show1 ? 'text' : 'password'"
                 :rules="[rules.required, rules.min]"
                 solo 
                 label="کلمه عبور جدید"                  
                 color="#3F505E"
                 counter
                 @click:append="show1 = !show1"
                  >

                 </v-text-field>
              </v-col>
          </v-row>
          <v-row justify="center" class="mb-n8">
              <v-col cols="8">
                 <v-text-field 
                 v-model="repeatPassword" 
                 :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'" 
                 :type="show1 ? 'text' : 'password'"
                 :rules="[rules.required, rules.min, rules.equality]"
                 solo 
                 label="تکرار کلمه عبور جدید"                 
                 color="#3F505E"
                 counter
                 hint="حداقل 4 حرف"
                 @click:append="show1 = !show1"

                  >

                 </v-text-field>
              </v-col>
          </v-row>
          <!-- <v-row justify="center">
              <v-col cols="8">
                 <v-text-field v-model="repeatPassword" solo label="تکرار کلمه عبور جدید" clearable color="#3F505E"></v-text-field>
              </v-col>
          </v-row> -->
        </v-container>

        <v-card-actions class="justify-center">
          <v-btn text class="terminate_ticket mb-3" @click="changePassword">تایید</v-btn>
          <v-btn text class="cancel_ticket mb-3" @click="closeDialog">لغو</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  props:{
    visible:{type:Boolean}, 
  },
  data () {
        return {
            newPassword: '',
            repeatPassword: '',
            notEqualityFlag: false,
            show1: false,
            show2: false,
            rules: {
                required: value => !!value || 'Required.',
                min: v => v.length >= 4 || 'حداقل 4 حرف',
                equality: () => (this.newPassword === this.repeatPassword) || 'کلمات عبور شبیه نیستند!',
            },
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

  methods: {
    async changePassword(){
        if(this.newPassword === this.repeatPassword && this.newPassword !== ''){
            this.notEqualityFlag = false;
            const data = {
            password: this.newPassword,            
            };
            // console.log(data);
            try {
                const response = await this.$axios.$put('/update-student-person',data);
                console.log(response);
            } catch (error) {
                console.log(error);
            }
            this.closeDialog();
        
        }
        else{
            this.notEqualityFlag = true;
        }                            
    },

    closeDialog(){
        this.newPassword = '';
        this.repeatPassword = '';
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

.add_ticket_btn {
    background: #3F505E;
  }
</style>