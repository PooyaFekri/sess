<template>
    <v-container>
        
      <v-card width="100%" justify="center" style="background: #DCE4EB;">
          <v-card-title class="text-h5 lighten-2 ticket_title_background mb-5" >
          لیست تیکت ها
          </v-card-title>

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
        <!-- <template #[`item.actions`]="{ item }" > -->
      
      <ViewTicket  :visible="dialogFlag" @close="dialogFlag=false" />
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
            number_of_steps: 0,
            dialogFlag: false,
            
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
          
          console.log((ticketsList[0]).all_steps)
          console.log(Object.keys((ticketsList[0]).all_steps).length)
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
        console.log(ticket)
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

</style>
