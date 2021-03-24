<template>
  <div>
    测试组件
  </div>
</template>

<script>
  export default {
    name: "test",
    data() {
      return {
        a: 1,
      }
    },
    methods: {
      copy() {
        console.log('1')
        this.$router.replace({name: this.$route.name});
      }

    },
    mounted() {

    },
    created() {
      this.copy()
    },
  }
</script>

<style scoped>

</style>
