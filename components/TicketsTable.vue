<template>
    <v-container>
        
      <v-card width="100%" justify="center" style="background: #DCE4EB;">
          <v-card-title class="text-h5 lighten-2 ticket_title_background mb-5" >
          لیست تیکت ها
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
                                color="#366991"
                                style="font-size: 1.5em"
                              >
                                 {{ n }}
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
                            @click="dialogFlag=false"
                          >
                            تایید
                          </v-btn>
                        </v-card-actions>
                      </v-col>
                      <v-col cols="6">
                        <v-card-actions  class="justify-center">
                          <v-btn   
                            text   
                            class="terminate_ticket mb-3"    
                            @click="dialogFlag=false"
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
                      :headers="headers"
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
      </v-card>
      

        
    </v-container>

</template>

<script>


export default {
    data() {
        return {
            headers: [
                { text: 'ردیف', align: 'start', value: 'rowNum', },
                { text: 'نوع تیکت', value: 'ticketType', sortable: false  },
                { text: 'تاریخ', value: 'date',  },
                { text: 'نام فرستنده', value: 'senderName', sortable: false  },
                { text: 'شماره دانشجویی', value: 'senderNum'},
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
            
        }
    },

    async mounted() {
      await this.getTickets();
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
              status: 'waitForBack',              
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
        this.comments = ticket.ticketObject.descriptions;
        // this.comments = ticket.message;
        // console.log(ticket.message);
        // console.log(ticket.descriptions);
        // this.number_of_steps = Object.keys(ticket.all_steps).length;
        // console.log(ticket.ticketObject.all_steps);
        console.log(ticket.ticketObject.descriptions);
        // console.log(this.current_ticket);
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

      
    }
}
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

  /* the dialog styles */
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
