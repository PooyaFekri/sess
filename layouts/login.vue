<template>
  <v-app>
    <div class="main overflow-y-hidden">
      <div class="center_logo">
        <div class="logo">
          <img
            class="logo-image logo-big img-responsive"
            src="../static/logo-rtl.png"
            alt="دانشگاه شیراز"
          />
        </div>
      </div>
      <Nuxt />
    </div>
  </v-app>
</template>
<script>
export default {
  created() {},
}
</script>

<style scoped>
.main {
  background-image: url('@/static/loginBackGround2.jpg');
  /* background-position: center; */
  background-repeat: no-repeat;
  background-size: cover;
  height: 100vh;
}
.center_logo {
  text-align: center;
}
.logo {
  border-bottom-right-radius: 15px;
  border-bottom-left-radius: 15px;
  border: solid 2px #fff;
  border-top: 0;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
  display: inline-block;
  line-height: 1;
  vertical-align: middle;
}
</style>
