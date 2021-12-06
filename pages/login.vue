<template class="as">
  <div>
    <div class="center_logo">
      <div class="logo">
        <img
          class="logo-image logo-big img-responsive"
          src="https://shirazu.ac.ir/shirazu-3-theme/images/logo-rtl.png"
          alt="دانشگاه شیراز"
        />
      </div>
    </div>
    <v-container class="grey lighten-5">
      <LoginCard />
    </v-container>
  </div>
</template>

<script>
import LoginCard from "@/components/LoginCard.vue";
export default {
  components: { LoginCard },
  setup() {},
};
</script>

<style>
body {
  background-image: url("https://shirazu.ac.ir/documents/12058/832593/Shiraz%20University%20%284%29-1.jpg?version=1.0&t=1632826589272&imagePreview=1");
  /* background-position: center; */
  background-repeat: no-repeat;
  background-size: cover;
  height: 100%;
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
