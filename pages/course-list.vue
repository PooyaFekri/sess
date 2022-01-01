<template>
  <div justify-center>
    <div v-if="role == 'educationAssistants'">
      <v-row justify="center" class="mt-1">
        <v-col cols="11">
          <AssistantCourses />
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script>
import AssistantCourses from '~/components/AssistantCourses.vue'

export default {
  components: {
    AssistantCourses
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
