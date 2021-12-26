<template>
  <div>
    hello
  </div>

</template>

<script>
export default {
  props: {
      ticket: Object,
      visible: Boolean,
  },

  data () {
      return {
        comments: ['مرحله 1', 'مرحله 2', 'مرحله 3', 'مرحله 4'],
        // comments: ['step 1', 'step 2', 'step 3'],
        
      }
  },

  computed: {
    show: {
      get() {
        return this.visible;
      }, 
      set(value) {
        if (!value){
          this.$emit('close');
        }
      }
    },
  },

  async mounted() {
    await console.log(this.ticket);
  },

  methods: {

  }
  
};
</script>

<style scoped>


</style>