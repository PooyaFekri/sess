<template>
  <div>
    <v-card v-for="i in 10" :key=i flat class="d-flex tableRow my-2 mx-2">
        <v-card flat width="5%" tile class="row-content text-center transparent">
          <v-card-text>1</v-card-text>
        </v-card>
        <v-card flat width="15%" tile class="row-content text-center transparent">
          <v-card-text>نوع فرایند</v-card-text>
        </v-card>
        <v-card flat width="20%" tile class="row-content text-center transparent">
          <v-card-text>2021/11/1</v-card-text>
        </v-card>
        <v-card flat width="30%" tile class="row-content text-center transparent">
          <v-card-text>20 کاراکتر اول توضیحات تیکت</v-card-text>
        </v-card>
        <v-card flat width="15%" tile class="row-content text-center transparent">
          <v-card-text>خاتمه یافته</v-card-text>
        </v-card>
        <v-card flat width="15%" tile class="text-center transparent">
          <v-card-text>مشاهده</v-card-text>
        </v-card>
    </v-card>
  </div>
</template>

<script>
export default {
    
}
</script>
<style scoped>
.tableRow {
  background-color: white;
}

.row-content {
  border-left: 2px solid #DCE4EB !important;
}
</style>
