<template>
    <v-container>
        
      <v-card width="100%" justify="center" style="background: #DCE4EB;">
          <v-card-title class="text-h5 lighten-2 ticket_title_background mb-5" >
          {{tableTitle}}
          </v-card-title>
          <v-row justify="center">
              <v-col cols="11">
                  <v-data-table 
                      :headers="headers"
                      :items="courses"
                      sort-by="rowNum"
                      class="elevation-1 mb-3"  
                      :show-select='show-select'              
                  >


                    <slot name='action'>
                    </slot>
                  </v-data-table>
              </v-col>
          </v-row>
          <!-- <v-row v-if="role === 'student'" justify="end">
            <v-col cols="1" class="ml-3">            
              <v-btn icon class="add_ticket_btn" >
                <v-icon           
                  circle
                  color="white"
                  small                  
                >
                  mdi-plus
                </v-icon>
              </v-btn>
            </v-col>           
          </v-row>            -->
      </v-card>
      

        
    </v-container>

</template>

<script>


export default {
    props: ['tableTitle', 'headers', 'show-select'],
    data() {
        return {
            studHeader: [
                { text: 'ردیف', align: 'start', value: 'rowNum', },
                { text: 'نام درس', value: 'ticketType', sortable: false  },
                { text: 'نام گرایش', value: 'date', sortable: false},
                { text: 'تعداد واحد', value: 'status', sortable: false },
                { text: 'Actions', value: 'actions', sortable: false }
            ],
            // studHeader: [
            //     { text: 'ردیف', align: 'start', value: 'rowNum', },
            //     { text: 'نوع تیکت', value: 'ticketType', sortable: false  },
            //     { text: 'تاریخ', value: 'date',  },                
            //     // { text: 'توضیحات', value: 'caption', sortable: false  },
            //     { text: 'وضعیت', value: 'status', sortable: false },
            //     { text: 'Actions', value: 'actions', sortable: false }
            // ],

            courses: [
                {

                }
            ],
            dialogFlag: false,
            current_ticket: null,
            comments: [],
            number_of_steps: 0,        
            steps: [],
            current_step: 0,

            
        }
    },
    computed: {
      user(){
        return this.$store.getters['auth/user'];
      },

      role(){
        return this.user.role.name_role;
      }
    },

    mounted() {
      console.log(this.role)
    },


    methods: {
      
      getHeaderByRole(){
        if(this.role === 'student'){
          return this.studHeader
        }
        else {
          return this.nonStudHeader
        }
        // return this.nonStudHeader
      }
      
    }
}
</script>


<style scoped>

  .ticket_title_background {
    background: #3F505E;    
    /* background: #618AAB;     */
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

  .add_ticket_btn {
    background: #3F505E;
  }

  /* the dialog styles */
  .ticket_title_background {
    background: #3F505E;
    /* background: #618AAB; */
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
