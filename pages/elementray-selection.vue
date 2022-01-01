<template>
  <div justify-center>
    <div v-if="role == 'student'">
      <v-row justify="center" class="mt-1">
        <v-col cols="11">
          <StdSelectedCoursesList />
        </v-col>
      </v-row>
      <v-row justify="center" class="mt-1">
        <v-col cols="11">
          <StdCourseListTable />
        </v-col>
      </v-row>
    </div>

    <div v-if="role == 'educationAssistants'">
      <v-row justify="center" class="mt-1">
        <v-col cols="11">
          <AssistantCoursesList
            :type="'bachelor'"
            :title="'لیست دروس کارشناسی'"
          />
        </v-col>
      </v-row>
      <v-row justify="center" class="mt-1">
        <v-col cols="11">
          <AssistantCoursesList
            :title="'لیست دروس کارشناسی ارشد'"
            :type="'master'"
          />
        </v-col>
      </v-row>
    </div>

    <div v-if="role == 'professor'">
      <v-row justify="center" class="mt-1">
        <v-col cols="11">
          <ProElementrySelectionCourses
            :type="'bachelor'"
            :title="'لیست دروس کارشناسی'"
          />
        </v-col>
      </v-row>
      <v-row justify="center" class="mt-1">
        <v-col cols="11">
          <ProElementrySelectionCourses
            :title="'لیست دروس کارشناسی ارشد'"
            :type="'master'"
          />
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script>
import StdCourseListTable from '~/components/StdCourseListTable.vue'
import StdSelectedCoursesList from '~/components/StdSelectedCoursesList.vue'
import AssistantCoursesList from '~/components/AssistantCoursesList.vue'
import ProElementrySelectionCourses from '~/components/ProElementrySelectionCourses.vue'
export default {
  components: {
    StdCourseListTable,
    AssistantCoursesList,
    StdSelectedCoursesList,
    ProElementrySelectionCourses,
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
