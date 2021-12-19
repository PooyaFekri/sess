<template>
  <div>
    <ViewTicket />
    <ChooseTicket />
    <!--<div v-if="selected==1">
      <LessonFromAnotherSection />
    </div>
    <div v-else>
      <LessonFromAnotherSection />
    </div>-->
    <CapacityIncrease class="pa-5"/>
    <ChangeClassTime class="pa-5"/>
    <ChangeExamTime class="pa-5"/>
    <CourseFromAnotherOrientation class="pa-5"/>
    <LessonFromAnotherSection class="pa-5"/>
    <MasterCourseRequest class="pa-5"/>
    <NormalTicket class="pa-5"/>

  </div>
</template>

<script>

export default {
  components: true,
  data (){
    return {
      selected:17
    }
  }
}
</script>

<style></style>
