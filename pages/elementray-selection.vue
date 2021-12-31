<template>
  <div justify-center>
    <div v-if="role == 'student'">
      <v-row justify="center" class="mt-1">
        <v-col cols="11">
          <SelectedCoursesList />
        </v-col>
      </v-row>
      <v-row justify="center" class="mt-1">
        <v-col cols="11">
          <CourseListTable />
        </v-col>
      </v-row>
    </div>

    <div v-if="role=='educationAssistants'">
      <v-row justify="center" class="mt-1">
        <v-col cols="11">
          <AssistantBackelorCoursesList />
        </v-col>
      </v-row>
      <v-row justify="center" class="mt-1">
        <v-col cols="11">
          <AssistantMasterCoursesList />
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script>
import CourseListTable from '@/components/CourseListTable.vue'
import SelectedCoursesList from '@/components/SelectedCoursesList.vue'
import AssistantBackelorCoursesList from '@/components/AssistantBachelorCoursesList.vue'
import AssistantMasterCoursesList from '@/components/AssistantMasterCoursesList.vue'

export default {
  components: {
    SelectedCoursesList,
    CourseListTable,
    AssistantBackelorCoursesList,
    AssistantMasterCoursesList,
  },
  data() {
    return {
      CapacityIncrease: false,
      ChangeClassTime: false,
      ChangeExamTime: false,
      CourseFromAnotherOrientation: false,
      LessonFromAnotherSection: false,
      MasterCourseRequest: false,
      NormalTicket: false,
    }
  },

  computed: {
    user() {
      return this.$store.getters['auth/user']
    },

    role() {
      return this.user.role.name_role
    },
  },

  mounted() {
    console.log(this.$store.getters['auth/user'])
  },
  methods: {},
}
</script>
