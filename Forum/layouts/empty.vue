<template>
  <div>
    <nuxt></nuxt>
    <notifications group="foo"  />
  </div>
</template>
<script>
export default{
  created() {
    console.log(this.$route);
    if(this.$route.name !=='admin' && localStorage.getItem('accessToken') && localStorage.getItem('accessToken')!=='false')
      this.$router.push('/')
  }
}
</script>
<style scoped></style>
