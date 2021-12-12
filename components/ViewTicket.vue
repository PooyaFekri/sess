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
          نوع تیکت
          <v-spacer></v-spacer>
          <v-btn
            text
            @click="dialog = false"
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        
  
        <v-card-text>
          <v-stepper alt-labels>
            <v-stepper-header>
              <v-stepper-step step="1" color="#366991">
                Ad unit details
              </v-stepper-step>

              <v-divider></v-divider>

              <v-stepper-step step="2">
                Ad sizes
              </v-stepper-step>

              <v-divider></v-divider>

              <v-stepper-step step="3">
                Ad templates
              </v-stepper-step>
            </v-stepper-header>
          </v-stepper>
        </v-card-text>

        <v-card-text v-for="comment in comments" :key="comment">
          <v-card flat height="80px">
            <v-card-text class="comments_color">
              {{comment}}
            </v-card-text>
          </v-card>
        </v-card-text>
        
        
       
        <v-card-actions  class="justify-center">
          <v-btn   
            text   
            class="terminate_ticket"    
            @click="dialog = false"
          >
            خاتمه فرآیند
          </v-btn>
        </v-card-actions>

        
      </v-card>
    </v-dialog>
  </div>
    <!-- <v-dialog
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
      <v-card>
        <v-card-title color="#3F505E">
          <v-card-actions>
            <v-btn
              icon
              dark
              @click="dialog = false"
            >
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-card-actions>
          <v-spacer></v-spacer>
          <v-toolbar-title color="#FFF">نوع تیکت 2</v-toolbar-title>
        </v-v-card-title>

        <v-card-text>
          hello
        </v-card-text>
        
        <v-card-actions>
            <v-btn
              icon
              dark
              @click="dialog = false"
            >
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-card-actions>

      </v-card>
    </v-dialog> -->


</template>

<script>
export default {
  data () {
      return {
        comments: ['مرحله 3', 'مرحله 2', 'مرحله 1:'],
        dialog: false,
      }
    },
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
  }

  .ticket_background {
    background: #DCE4EB;
  }

  .closeWhite {
    color: white;
  }

  .comments_color {
    color: #3F505E;
    font-size: 24px;
  }

</style>