<template>
  <div>
    <nuxt></nuxt>
    <notifications group="foo"  />
  </div>
</template>
<script>
export default{
  created() {
    if( localStorage.getItem('accessToken') && localStorage.getItem('accessToken')!=='false')
      this.$router.push('/')
  }
}
</script>
<style scoped></style>
