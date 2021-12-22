<template>
  <v-card height="30em" class="table-card">
    <v-card-title dense class="justify-center table-card-title" primary-title>
      {{ title }}
    </v-card-title>
    <div class="rows overflow-y-auto">
      <TableRow />
    </div>
  </v-card>

</template>

<script>
import TableRow from '@/components/TableRow.vue'
export default {
  components: {TableRow},
  props: ['title'],
}
</script>

<style scoped>
.table-card {
  background-color: #dce4eb;
}

.table-card-title {
  background-color: #618aab;
}

.rows{
    height: 26em;
    overflow-y: auto;
}
</style>
