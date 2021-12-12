<template>
  <v-app>
    <v-dialog
        width="700"
      >
      <template v-slot:activator="{ on, attrs }">
          <v-btn
            color="red lighten-2"
            dark
            v-bind="attrs"
            v-on="on"
          >
            Click Me
          </v-btn>
      </template>
      <v-card>
        <v-toolbar color="#3F505E">
          <v-toolbar-title color="#FFF">نوع تیکت 2</v-toolbar-title>
        </v-toolbar>
                        
      </v-card>
    </v-dialog>
  </v-app>
</template>

<script>
export default {

};
</script>

<style scoped>

</style>