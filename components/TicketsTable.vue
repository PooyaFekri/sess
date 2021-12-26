<template>
    <v-container>
        
      <v-card width="100%" justify="center" style="background: #DCE4EB;">
          <v-card-title class="text-h5 lighten-2 ticket_title_background mb-5" >
          تیکت های بررسی نشده
          </v-card-title>
          <!-- <template v-slot:activator="{ on, attrs }">
            <v-btn
              color="red lighten-2"
              dark
              v-bind="attrs"
              v-on="on"
            >
              ViewTicket
            </v-btn>
          </template> -->
          <div v-if="dialogFlag" class="text-center">
            <v-dialog v-model="dialogFlag" width="700" >

              <v-card class="ticket_background ">
                  
                  <v-card-title class="text-h5 lighten-2 ticket_title_background mb-5 justify-center" >
                    <v-spacer class="mr-10"></v-spacer>
                    {{determineTicketType(current_ticket.type_ticket)}}
                    <v-spacer></v-spacer>
                    
                    <v-btn
                        class="ml-n2"
                        icon
                        dark
                        @click="dialogFlag=false"
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
                            <template v-for="(n,index) in steps">
                              <v-stepper-step
                              
                                :key="`${index}-step`"
                                :step="index"
                                complete-icon="$complete"
                                :complete ="current_step > index"
                                color="#366991"
                                style="font-size: 1em"
                              >
                                 {{ n }}
                              </v-stepper-step>

                              <v-divider
                                v-if="(index < number_of_steps-1)"
                                :key="`${index}-divider`"
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
                  
                  <v-row v-if="role==='student'" justify="center" class="mt-5">
                      <v-col cols="6">
                        <v-card-actions >
                          <v-btn   
                            text   
                            class="terminate_ticket mb-3"    
                            @click="terminateTicket()"
                          >
                            خاتمه فرایند
                          </v-btn>
                        </v-card-actions>
                      </v-col>
                  </v-row>  
                  <v-row v-else justify="center" class="mt-5">
                      <v-col cols="3">
                        <v-card-actions >
                          <v-btn   
                            text   
                            class="terminate_ticket mb-3"    
                            @click="approveTicket()"
                          >
                            تایید
                          </v-btn>
                        </v-card-actions>
                      </v-col>
                                            
                      
                      <v-col cols="2">
                        <v-card-actions>
                          <v-btn   
                            text   
                            class="terminate_ticket mb-3"    
                            @click="terminateTicket()"
                          >
                            رد
                          </v-btn>
                        </v-card-actions>
                      </v-col>
                    </v-row>  

                </v-container>
          
              </v-card>
            </v-dialog>
          </div>
          <v-row justify="center">
              <v-col cols="11">
                  <v-data-table 
                      :headers="getHeaderByRole()"
                      :items="tickets"
                      sort-by="rowNum"
                      class="elevation-1"                      
                  >


                    <template v-slot:item.actions="{ item }">
                      <v-icon
                        color="black"
                        small                        
                        @click="viewTicket(item)"
                      >
                        mdi-eye
                      </v-icon>          
                    </template>
                  </v-data-table>
              </v-col>
          </v-row>
          <v-row v-if="role === 'student'" justify="end">
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
          </v-row>           
      </v-card>
      

        
    </v-container>

</template>

<script>


export default {
    data() {
        return {
            nonStudHeader: [
                { text: 'ردیف', align: 'start', value: 'rowNum', },
                { text: 'نوع تیکت', value: 'ticketType', sortable: false  },
                { text: 'تاریخ', value: 'date',  },
                { text: 'نام فرستنده', value: 'senderName', sortable: false  },
                { text: 'شماره دانشجویی', value: 'senderNum'},
                // { text: 'توضیحات', value: 'caption', sortable: false  },
                { text: 'وضعیت', value: 'status', sortable: false },
                { text: 'Actions', value: 'actions', sortable: false }
            ],
            studHeader: [
                { text: 'ردیف', align: 'start', value: 'rowNum', },
                { text: 'نوع تیکت', value: 'ticketType', sortable: false  },
                { text: 'تاریخ', value: 'date',  },                
                // { text: 'توضیحات', value: 'caption', sortable: false  },
                { text: 'وضعیت', value: 'status', sortable: false },
                { text: 'Actions', value: 'actions', sortable: false }
            ],

            tickets: [],
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

    async mounted() {
      await this.getTickets();
      console.log(this.role)
    },


    methods: {
      async getTickets() {
        try {
          const tickets = await this.$axios.$get('/get-tickets');
          const ticketsList = tickets
          
          // console.log((ticketsList[0]).all_steps)
          // console.log(Object.keys((ticketsList[0]).all_steps).length)
          let rowIndex = 1
          ticketsList.forEach(ticket => {
            
            console.log(this.determineTicketType(ticket.type_ticket));
            this.tickets.push({
              ticketObject: ticket,
              rowNum: rowIndex,
              ticketType: this.determineTicketType(ticket.type_ticket),
              date: ticket.created_date,
              senderName: ticket.sender_lname + ' ' + ticket.sender_fname,
              senderNum: ticket.sender_id,
              allSteps: ticket.all_steps,
              // caption: 'waitForBack',
              status: 'درحال انجام',              
            })
            rowIndex += 1;
          });
        }
        catch(error) {
          console.log(error);
        }
      },
      viewTicket(ticket){
        this.dialogFlag = true;
        this.current_ticket = ticket.ticketObject;
        this.steps = ticket.ticketObject.all_steps;        
        this.number_of_steps = Object.keys(this.steps).length;
        this.current_step = Object.keys(this.current_ticket.current_step)[0];
        // console.log(Object.keys(this.current_ticket.current_step)[0]);
        // this.comments = ticket.ticketObject.descriptions;
        // this.comments = ticket.message;
        // console.log(ticket.message);
        // console.log(ticket.descriptions);
        // this.number_of_steps = Object.keys(ticket.all_steps).length;
        // console.log(ticket.ticketObject.all_steps);
        // console.log(ticket.ticketObject.descriptions);
        // console.log(this.current_ticket);
      },

      async approveTicket(){
        // console.log(this.current_ticket.id);        
        const body = {
          'step': 'accept',
          'massage': 'ok',
          "id_ticket": this.current_ticket.id,
          "url":""
        }
        try{
          const {data} = await this.$axios.post('/step-ticket', body);
          console.log(data);
        }
        catch (error) {
          console.log(error);
        }
        this.dialogFlag = false;
      },

      async terminateTicket(){
        const body = {
          'step': 'reject',
          'id_ticket': this.current_ticket.id
        }
        try{
          const {data} = await this.$axios.post('/step-ticket', body);
          console.log(data);
        }
        catch(error){
          console.log(error);
        }
        this.dialogFlag = false;
      },

      determineTicketType(ticketType){
        switch(ticketType){
          case 'capacity_increase':
            return "درخواست افزایش ظرفیت";           
          case 'lessons_from_another_section': 
            return "درخواست درس خارج از بخش";
          case 'exam_time_change': 
            return "درخواست تغییر ساعت امتحان"; 
          case 'master_course_request': 
            return "درخواست درس از ارشد"; 
          case 'course_from_another_orientation': 
            return " درخواست درس دانشجویان ارشد از بخش دیگر"; 
          case 'class_change_time': 
            return "درخواست تغییر ساعت کلاس";
        }
      },
      
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
