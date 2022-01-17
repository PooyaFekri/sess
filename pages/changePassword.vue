<template>
  <div>
      <v-container>
        
        <v-btn class="add_ticket_btn mt-5" @click="StudentEditPasswordDialog=true">
        تغییر کلمه عبور
        </v-btn>         
        
        <StudentEditPasswordDialog :visible="StudentEditPasswordDialog" @close="StudentEditPasswordDialog=false" />
      </v-container>
  </div>
</template>

<script>
import StudentEditPasswordDialog from '~/components/StudentEditPasswordDialog.vue'

export default {
  components: {
    StudentEditPasswordDialog,        
  },
  data() {
    return {
        StudentEditPasswordDialog: true,
    }
  },

  methods: {

  },
}
</script>

<style scoped>

.ticket_title_background {
  background: #3f505e;
  color: white;
  display: flex;
  justify-content: center;
}

.terminate_ticket {
  background: #e28743;
  color: white;
  width: 128px;
}

.cancel_ticket {
  background: #84a7c4;
  color: white;
  width: 128px;
}

.ticket_background {
  background: #dce4eb;
}

.closeWhite {
  color: white;
  background: white;
}

.comments_color {
  color: #3f505e;
  font-size: 24px;
}

.add_ticket_btn {
    background: #3F505E;
  }
</style>
