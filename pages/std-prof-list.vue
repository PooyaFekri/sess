<template>
  <div justify-center>
    <div v-if="role == 'educationAssistants'">
      <v-row justify="center" class="mt-1">
        <v-col cols="11">
          <AssistantProfOrStdList :type="'std'" :title="'لیست دانشجویان'" />
        </v-col>
      </v-row>
    </div>
    <div v-if="role == 'educationAssistants'">
      <v-row justify="center" class="mt-1">
        <v-col cols="11">
          <AssistantProfOrStdList :type="'prof'" :title="'لیست اساتید'" />
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script>
import AssistantProfOrStdList from '~/components/AssistantProfOrStdList.vue'

export default {
  components: {
    AssistantProfOrStdList,
  },
  data() {
    return {
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

  async mounted() {
    await this.$store.dispatch('assistant/getProfs')
    await this.$store.dispatch('assistant/getStudents')
  },
  methods: {},
}
</script>
