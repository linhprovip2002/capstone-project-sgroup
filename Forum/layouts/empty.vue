<template>
  <div>
    <nuxt></nuxt>
    <notifications group="foo"  />
  </div>
</template>
<script>
export default{
  middleware:'middleware-guest'
}
</script>
<style scoped></style>
