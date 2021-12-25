<template>
  <div justify-center>
    <ChooseTicket @ticket-selected="ticketHandler" />
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


    <v-row justify="center" class="mt-1">
      <v-col cols="10">
        <Table title="فرآیندها" />
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  components: true,
  data (){
    return {
      CapacityIncrease:false,
      ChangeClassTime:false,
      ChangeExamTime:false,
      CourseFromAnotherOrientation:false,
      LessonFromAnotherSection:false,
      MasterCourseRequest:false,
      NormalTicket:false
    }
  },
  mounted() {
    console.log(this.$store.getters['auth/user']);
  },
  methods:{
    ticketHandler(event){
      console.log(event);
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
        case 4:
          this.LessonFromAnotherSection = true;
          break;
        case 5:
          this.MasterCourseRequest = true;
          break;
        case 6:
          this.NormalTicket = true;
          break;
        default:
          break;
      }
    }
  }
  
}
</script>
