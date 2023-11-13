<template>
    <div>
      <nuxt></nuxt>
      <notifications group="foo"  />
    </div>
  </template>
  <script>
  export default{
    middleware:'middleware-admin'
  }
  </script>
  <style scoped></style>