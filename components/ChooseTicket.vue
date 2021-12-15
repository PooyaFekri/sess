<template>
  <div class="text-center">
    <v-dialog 
      v-model="dialog"
      width="500"
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
              icon
              dark
              @click="dialog = false"
            >
              <v-icon>mdi-close</v-icon>
            </v-btn>
        </v-card-title>
        

        
        <v-select        
            class="ma-10 mb-0"
            placeholder="نوع تیکت را انتخاب کنید"
            :items="items"
            solo
            v-model="selected"
            return-object
        ></v-select>
       
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
            @click="cancelOnClick"
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
            items: ['درخواست افزایش ظرفیت', 'درخواست تغییر ساعت کلاس', 'درخواست تغییر ساعت امتحان ', ' درخواست درس از ارشد', 'درخواست درس از گرایش دیگر(کارشناسی ارشد)', 'درخواست درس خارج از بخش'],
            selected: '',
            dialog: false,
            }
        },
    methods: {
      cancelOnClick(){
        this.dialog = false
        this.selected = false
      }
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
  }

  .comments_color {
    color: #3F505E;
    font-size: 24px;
  }

</style>