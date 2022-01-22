<template>
    <v-container>
        
      <v-card width="100%" justify="center" style="background: #DCE4EB;">
          <v-card-title class="text-h5 lighten-2 ticket_title_background mb-5" >
          تیکت ها
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
                  
                  <!-- to do -->
                  <v-card-text>
                    
                    <v-row justify="center" class="mt-3 mb-n7" style="text-align: center;">                     
                      <v-col cols="8" style="font-size: 1.2rem; font-weight: bold; color: #3F505E;">                        
                        وضعیت : {{ticket_status_text}}                        
                      </v-col>

                      <v-col cols="6" style="font-size: 1.2rem;">
                        <!-- <v-text-field flat solo :label="`نام درس : ${ticket_subject}`" clearable disabled color="#3F505E"></v-text-field> -->
                        نام درس : {{ticket_subject}}
                      </v-col>
                    </v-row>
                    
                  </v-card-text>

                  <v-row v-if="ticket_type === 'other'" class="mb-2">
                    <v-col cols="12">
                      <v-spacer>
                      </v-spacer>
                    </v-col>
                  </v-row>
                  <!-- stepper -->                  
                  <v-card-text v-if="ticket_type !== 'other'" class="justify-center">
                    <v-row >
                      <v-col cols="12">
                      <v-stepper  alt-labels style="background: transparent; border: none;" outlined light  >
                        <v-stepper-header>
                          <template v-for="(n,index) in steps">                            
                            <v-stepper-step
                              :rules="[() => !(ticket_status_number===4 && current_step===index)]"                                                     
                              :key="`${index}-step`"
                              :step="`${index}`"
                              :complete="(current_step > index) || (ticket_status_number === 7)"
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
                  
                  <!-- comments -->
                  <v-row class="mt-n10" justify="center">
                    <v-col cols="10">
                      <v-card-text class="justify-center"  v-for="comment in comments" :key="comment">
                        
                            <!-- <v-card flat height="70px" class="mb-n7">
                              <v-card-text class="comments_color" style="font-size: 1.3em">
                                {{comment}}
                              </v-card-text>
                            </v-card> -->

                            <v-textarea
                              disabled
                              :placeholder="comment"
                              class="pt-5 pr-2 mb-n16 mt-n3"
                              height="80px"
                              color="#3F505E"
                              flat
                              solo
                              no-resize
                            >                            
                            </v-textarea>

                      </v-card-text>
                    </v-col>                   
                  </v-row>

                  <v-row v-if="role !== 'student' && ticket_status_number !== 4 && 
                    ticket_status_number !== 6 && ticket_status_number !== 7 "
                    class="justify-center mb-n5 mt-n7"
                    >
                    <v-col cols="10">
                      <v-card-text class="justify-center" >                    
                        <v-textarea
                          v-model="step_message"
                          placeholder="در صورت لزوم متن اضافه کنید."
                          class="pt-5 pr-2 mt-n2"
                          height="80px"
                          color="#3F505E"
                          flat
                          solo
                          no-resize
                        ></v-textarea>
                      </v-card-text>                    
                    </v-col>
                  </v-row>

                  <v-row v-if="ticket_status_number === 4 || 
                      ticket_status_number === 6 || ticket_status_number === 7 " class="mb-10">
                    <v-spacer>
                    </v-spacer>
                  </v-row>
                  
                  <!-- buttons -->
                  <v-row v-if="role==='student'" justify="center" class="mt-5">
                      <v-col v-if="ticket_status_number !== 4 && 
                      ticket_status_number !== 6 && ticket_status_number !== 7 " cols="3">
                        <v-card-actions >
                          <v-btn   
                            text   
                            class="terminate_ticket mb-3"    
                            @click="finishTicket()"
                          >
                            خاتمه فرایند
                          </v-btn>
                        </v-card-actions>
                      </v-col>
                  </v-row>  
                  <v-row v-else justify="center" class="mt-5">
                      <v-col v-if="ticket_status_number !== 4 && 
                      ticket_status_number !== 6 && ticket_status_number !== 7 " cols="3">
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
                                            
                      
                      <v-col v-if="ticket_status_number !== 4 && 
                      ticket_status_number !== 6 && ticket_status_number !== 7 " cols="2">
                        <v-card-actions>
                          <v-btn   
                            text   
                            class="terminate_ticket mb-3"    
                            @click="rejectTicket()"
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

          <!-- the data table  -->
          <v-row justify="center">
              <v-col cols="11">
                  <v-data-table 
                      :headers="getHeaderByRole()"
                      :items="tickets"
                      sort-by="rowNum"
                      class="elevation-1 mb-3"                      
                  >


                    <template v-slot:[`item.actions`]="{ item }">
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
    data() {
        return {
            nonStudHeader: [
                { text: 'ردیف', align: 'start', value: 'rowNum', },
                { text: 'نوع تیکت', value: 'ticketType', sortable: true},
                { text: 'نام درس', value: 'ticket_course'},
                { text: 'تاریخ', value: 'date',  },
                { text: 'نام فرستنده', value: 'senderName', sortable: false  },
                { text: 'شماره دانشجویی', value: 'senderNum'},
                // { text: 'توضیحات', value: 'caption', sortable: false  },
                { text: 'وضعیت', value: 'status', sortable: false },
                { text: 'Actions', value: 'actions', sortable: false }
            ],
            studHeader: [
                { text: 'ردیف', align: 'start', value: 'rowNum', },
                { text: 'نوع تیکت', value: 'ticketType', sortable: true  },
                { text: 'تاریخ', value: 'date',  },
                { text: 'نام درس', value: 'ticket_course'},          
                // { text: 'توضیحات', value: 'caption', sortable: false  },
                { text: 'وضعیت', value: 'status', sortable: true },
                { text: 'Actions', value: 'actions', sortable: false }
            ],

            dialogFlag: false,
            current_ticket: null,
            comments: [],
            number_of_steps: 0,        
            steps: [],
            current_step: 0,

            step_message: '',

            ticket_subject: '',
            ticket_status_text: '',
            ticket_status_number: '',
            ticket_type: '',
            
        }
    },
    computed: {
      user(){
        return this.$store.getters['auth/user'];
      },

      role(){
        return this.user.role.name_role;
      },
      tickets (){
        return this.$store.getters['ticket/tickets']
      }
    },

    async mounted() {
      await this.$store.dispatch('ticket/getTickets');
      console.log(this.role)
    },


    methods: {
      
      viewTicket(ticket){

        this.dialogFlag = true;
        this.ticket_type = ticket.ticketObject.type_ticket;
        this.current_ticket = ticket.ticketObject;

        // tickets
        if(this.ticket_type !== 'other'){
          this.steps = ticket.ticketObject.all_steps;        
          this.number_of_steps = Object.keys(this.steps).length;
          this.current_step = Object.keys(this.current_ticket.current_step)[0];
        }
        
        // comments
        const commentsLength = Object.keys(this.current_ticket.descriptions).length;
        this.comments = []
        this.comments[0] = 'دانشجو : ' + ticket.ticketObject.message;      
        for (let i = 0; i < commentsLength; i++ ){
          if(Object.values(this.current_ticket.descriptions)[i] !== null && Object.values(this.current_ticket.descriptions)[i] !== ""){
            this.comments.push(Object.values(this.steps)[i+1] + " : " + Object.values(this.current_ticket.descriptions)[i]);
          }
        }
        
        this.ticket_subject = this.current_ticket.course;
        this.ticket_status_text = this.checkStatus(this.current_ticket.status_step)
        this.ticket_status_number = this.current_ticket.status_step
        

        
        // console.log(this.ticket_type);
        // console.log(this.comments);
        // console.log(Object.values(this.steps)[0]);
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

      checkStatus(status){
        switch(status) {
          case 1: 
            return 'در جریان';
          case 2: 
            return 'در جریان';          
          case 4: 
            return 'درخواست رد شده';
          case 6: 
            return 'خاتمه یافته توسط دانشجو';
          case 7: 
            return 'با درخواست شما موافقت شده';
          
          
        }
      },

      async approveTicket(){
        // console.log(this.current_ticket.id);        
        const body = {
          step: 'accept',
          massage: this.step_message,
          id_ticket: this.current_ticket.id,          
        }
        try{
          const {data} = await this.$axios.put('/step-ticket', body);
          await this.$store.dispatch('ticket/getTickets');

          console.log(data);
        }
        catch (error) {
          console.log(error);
        }
        this.dialogFlag = false;
      },
      async rejectTicket(){
        // console.log(this.current_ticket.id);        
        const body = {
          step: 'reject',
          massage: this.step_message,
          id_ticket: this.current_ticket.id,          
        }
        try{
          const {data} = await this.$axios.put('/step-ticket', body);
          await this.$store.dispatch('ticket/getTickets');

          console.log(data);
        }
        catch (error) {
          console.log(error);
        }
        this.dialogFlag = false;
      },      

      async finishTicket(){
        const body = {
          id_ticket: this.current_ticket.id,
        }
        try{
          const {data} = await this.$axios.post('/step-ticket', body);
          await this.$store.dispatch('ticket/getTickets');
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
          case 'other':
            return "متفرقه";
        }
      },
      
      getHeaderByRole(){
        if(this.role === 'student'){
          return this.studHeader
        }
        else {
          return this.nonStudHeader
        }
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
