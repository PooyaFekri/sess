<template>
  <div justify-center>

    <v-row justify="center" class="mt-1">
      <v-col cols="11">
        <TicketsTable />
      </v-col>
    </v-row>

    <ChooseTicket v-if="role === 'student'" justify="end" @ticket-selected="ticketHandler" />
    <CapacityIncrease :visible="CapacityIncrease" @close="CapacityIncrease=false" />
    <ChangeClassTime :visible="ChangeClassTime" @close="ChangeClassTime=false" />
    <ChangeExamTime :visible="ChangeExamTime" @close="ChangeExamTime=false" />
    <CourseFromAnotherOrientation
      :visible="CourseFromAnotherOrientation"
      @close="CourseFromAnotherOrientation=false"
    />
    <LessonFromAnotherSection
      :visible="LessonFromAnotherSection"
      @close="LessonFromAnotherSection=false"
    />
    <MasterCourseRequest
      :visible="MasterCourseRequest"
      @close="MasterCourseRequest=false"
    />
    <NormalTicket :visible="NormalTicket" @close="NormalTicket=false" />


    <!-- <v-row justify="center" class="mt-1">
      <v-col cols="10">
        <Table title="فرآیندها" />
      </v-col>
    </v-row> -->
    
  </div>
</template>

<script>
import TicketsTable from "@/components/TicketsTable.vue"
import ChooseTicket from "@/components/ChooseTicket.vue"
import CapacityIncrease from "@/components/CapacityIncrease.vue"
import ChangeClassTime from "@/components/ChangeClassTime.vue"
import ChangeExamTime from "@/components/ChangeExamTime.vue"
import CourseFromAnotherOrientation from "@/components/CourseFromAnotherOrientation.vue"
import LessonFromAnotherSection from "@/components/LessonFromAnotherSection.vue"
import MasterCourseRequest from "@/components/MasterCourseRequest.vue"
import NormalTicket from "@/components/NormalTicket.vue"

export default {
  components: {
    TicketsTable,
    ChooseTicket,
    CapacityIncrease,
    ChangeClassTime,
    ChangeExamTime,
    CourseFromAnotherOrientation,
    LessonFromAnotherSection,
    MasterCourseRequest,
    NormalTicket
  },
  data (){
    return {
      CapacityIncrease:false,
      ChangeClassTime:false,
      ChangeExamTime:false,
      CourseFromAnotherOrientation:false,
      LessonFromAnotherSection:false,
      MasterCourseRequest:false,
      NormalTicket:false,
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
    // console.log(this.$store.getters['auth/user']);
  },
  methods:{
    ticketHandler(event){
      // console.log(event);
      switch (event.index) {
        case 0:
          this.CapacityIncrease = true;
          break;
        case 1:
          this.ChangeClassTime = true;
          break;
        case 2:
          this.ChangeExamTime = true;
          break;
        case 3:
          this.CourseFromAnotherOrientation = true;
          break;
        // case 4:
        //   this.LessonFromAnotherSection = true;
        //   break;
        case 4:
          this.MasterCourseRequest = true;
          break;
        case 5:
          this.NormalTicket = true;
          break;
        default:
          break;
      }
    }
  }
  
}
</script>
