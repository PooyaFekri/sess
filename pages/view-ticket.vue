<template>
  <div>
    <ViewTicket />
    <ChooseTicket />
    <div v-if="selected==1">
      <CreateTicket :selected_ticket_name=selected />
    </div>
    <div v-else>
      <CreateTicket :selected_ticket_name="111" />
    </div>
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
