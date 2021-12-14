<template>
  <div class="text-center">
    <v-dialog 
      v-model="dialog"
      width="700"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          color="red lighten-2"
          dark
          v-bind="attrs"
          v-on="on"
        >
          Click Me
        </v-btn>
      </template>

      <v-card class="ticket_background">
        <v-card-title class="text-h5 lighten-2 ticket_title_background mb-5" >
          ایجاد تیکت
          <v-spacer></v-spacer>
          <v-btn
            text
            @click="dialog = false"
          >
            <v-icon white>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        
        <v-container>
            <v-row>
                <v-col>
                    <v-text-field
                        v-model="message2"
                        solo
                        label="درخواست درس از بخش دیگر"
                        clearable
                    ></v-text-field>
                </v-col>
                <v-col>
                    <v-text-field
                        v-model="message2"
                        solo
                        label="نام بخش"
                        clearable
                    ></v-text-field>
                </v-col>
            </v-row>
            <v-row>
                <v-col>
                    <v-text-field
                        v-model="message2"
                        solo
                        label="نام درس"
                        clearable
                    ></v-text-field>
                </v-col>
                <v-col>
                    <!--<v-text-field
                        v-model="message2"
                        solo
                        label="Solo"
                        clearable
                    ></v-text-field>-->
                    <v-file-input
                        truncate-length="15"
                        label="افزودن فایل ضمیمه"
                    ></v-file-input>
                </v-col>
            </v-row>
            <v-row class="ma-4">
                <v-textarea
                    v-model="title"
                    label="در صورت لزوم متن اضافه کنید."
                    class="closeWhite"
                    counter
                    maxlength="120"
                    single-line
                ></v-textarea>
            </v-row>
            <v-row></v-row>
        </v-container>
       
        <v-card-actions  class="justify-center" >
          <v-btn   
            text   
            class="terminate_ticket mb-3"    
            @click="dialog = false"
          >
            تایید
          </v-btn>
          <v-btn   
            text   
            class="cancel_ticket mb-3"    
            @click="dialog = false"
          >
            لغو
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
    data () {
        return {
            items: ['Foo', 'Bar', 'Fizz', 'Buzz'],
            selected:"",
            dialog: false,
            title:"",

            }
        },
    methods: {
        
    }
};
</script>

<style scoped>

  .ticket_title_background {
    background: #3F505E;
    color: white;
    display: flex;
    justify-content: center;
  }

  .terminate_ticket {
    background: #E28743;
    color: white;
    width: 128px;
  }

  .cancel_ticket {
    background: #84A7C4;
    color: white;
    width: 128px;
  }

  .ticket_background {
    background: #DCE4EB;
  }

  .closeWhite {
    color: white;
    background: white;
  }

  .comments_color {
    color: #3F505E;
    font-size: 24px;
  }

</style>