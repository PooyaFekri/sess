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
          ViewTicket
        </v-btn>
      </template>

      <v-card class="ticket_background ">
          
          <v-card-title class="text-h5 lighten-2 ticket_title_background mb-5 justify-center" >
            <v-spacer class="mr-10"></v-spacer>
            نوع تیکت
            <v-spacer></v-spacer>
            
            <v-btn
                class="ml-n2"
                icon
                dark
                @click="dialog = false"
              >
                <v-icon>mdi-close</v-icon>
              </v-btn>
          </v-card-title>
        
        <v-container class="mt-n10">
        
            <v-card-text class="justify-center">
              <v-row class="mb-n10">
                <v-col cols="12">
                <v-stepper  alt-labels style="background: transparent; border: none;" outlined >
                  <v-stepper-header>
                    <template v-for="n in 5">
                      <v-stepper-step
                        :key="`${n}-step`"
                        :step="n" 
                        complete-icon="$complete"
                        color="#366991"
                        style="font-size: 1.5em"
                      >
                        Step {{ n }}
                      </v-stepper-step>

                      <v-divider
                        v-if="n !== 5"
                        :key="n"
                      ></v-divider>
                    </template>
                  </v-stepper-header>
                </v-stepper>
                </v-col>
              </v-row>
            </v-card-text>

        
          <v-card-text class="justify-center"  v-for="comment in comments" :key="comment">
            <v-row justify="center">
              <v-col cols="9">
                <v-card flat height="70px" class="mb-n7">
                  <v-card-text class="comments_color" style="font-size: 1.3em">
                    {{comment}}
                  </v-card-text>
                </v-card>
              </v-col>
            </v-row>             
          </v-card-text>
          
          <v-row justify="center" class="mt-5">
              <v-col cols="6">
                <v-card-actions  class="justify-center">
                  <v-btn   
                    text   
                    class="terminate_ticket mb-3"    
                    @click="dialog = false"
                  >
                    خاتمه فرآیند
                  </v-btn>
                </v-card-actions>
              </v-col>
            </v-row>  

        </v-container>
  
      </v-card>
    </v-dialog>
  </div>

</template>

<script>
export default {
  data () {
      return {
        comments: ['مرحله 1', 'مرحله 2', 'مرحله 3', 'مرحله 4', 'مرحله 1', 'مرحله 2', 'مرحله 3', 'مرحله 4'],
        // comments: ['step 1', 'step 2', 'step 3'],
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