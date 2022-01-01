<template>
    <v-container>
        
      <v-card width="100%" justify="center" style="background: #DCE4EB;">
          <v-card-title class="text-h5 lighten-2 ticket_title_background mb-5" >
          لیست دروس
          </v-card-title>
          <v-row justify="center">
              <v-col cols="11">
                  <v-data-table 
                      :headers="headers"
                      :items="items"
                      sort-by="rowNum"
                      class="elevation-1 mb-3"
                      show-select
                      v-model='selects'
                      item-key="rowNum"
                      loading
                      loading-text="در حال دریافت اطلاعات"      
                  >
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
          <v-card-actions class="justify-center">
            <v-btn dark>
              ثبت دروس انتخاب شده
            </v-btn>
          </v-card-actions>
      </v-card>
      
    </v-container>

</template>

<script>

export default {
    data() {
        return {
            headers: [
                { text: 'ردیف', align: 'start', value: 'rowNum', },
                { text: 'نام درس', value: 'courseName', sortable: false  },
                { text: 'نام گرایش', value: 'orientationName', sortable: false},
                { text: 'تعداد واحد', value: 'uniteNumber', sortable: false },
                { text: 'نام استاد', value: 'professorName', sortable: false},
            ],
            // studHeader: [
            //     { text: 'ردیف', align: 'start', value: 'rowNum', },
            //     { text: 'نوع تیکت', value: 'ticketType', sortable: false  },
            //     { text: 'تاریخ', value: 'date',  },                
            //     // { text: 'توضیحات', value: 'caption', sortable: false  },
            //     { text: 'وضعیت', value: 'status', sortable: false },
            //     { text: 'Actions', value: 'actions', sortable: false }
            // ],

            selects: [
              
            ],
            items : [
            ],
            loading: true
            
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
      this.getItems();
    },
    updated(){
      console.log(this.selects);
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
      },
      async getItems(){
        try{
          const res = await this.$axios.$get('/get-permitted-course');
          // this.loading = false
          let rowNum = 1;
          res.data.forEach(element => {
            this.items.push({
                rowNum: rowNum++,
                courseName: element.course_name,
                orientationName: element.orientation,
                uniteNumber: element.unit_numbers,
                professorName : element.name_professor,
                id_permitted_course: element.id_permitted_course
            })
          });
        }catch (e){
          console.log(e.response.data.status);
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
