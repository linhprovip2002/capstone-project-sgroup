<template>
    <div class="default">
        <div class="default__top">
          <TopNavBar class="top-nav"/>
        </div>
        <div class="default__body">
          <nuxt class="default__body__container w-full"/>
        </div>
    </div>
  </template>
  
<script>

</script>

  <style lang="scss" scoped>
  @import '~/assets/scss/variables.scss';
  .default {
    display: flex;
    flex-direction: column;
    background-color: #F3F6FF;
    min-height: 100vh;
    height: 100%;
    overflow: hidden;
    gap: 20px;
    position: relative;
    height: 100vh;
    overflow: auto;
    background: $dark-2;

    &__top {
      height: 80px;
      position: sticky;
      width: 100%;
      left: 0;
      top: 0;
      z-index: 10;
    }
    &__body {
      display: inline-flex;
      align-items: flex-start;
      justify-content: center;
      gap: 20px;
      width: 100%;
      padding: 0 20px;
        

    }
  }
  </style>
  