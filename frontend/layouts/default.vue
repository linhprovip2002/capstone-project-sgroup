<template>
    <div class="default">
        <h2>xinchoa</h2>
        <nuxt class="body"/>
    </div>
  </template>
  
  <script>
  import { mapActions, mapGetters } from 'vuex'
//   import TabLeft from '~/components/TabLeft.vue'
//   import TopNavBar from '~/components/TopNavBar.vue'
  
  export default {
    components: {
      TabLeft,
      TopNavBar,
    },  
    data() {
      return {
        statusTabLeft: 'openTabLeft',
      }
    },
    methods: {
    },
  }
  </script>
  
  <style lang="scss" scoped>
  .default {
    display: flex;
    flex-direction: row;
    background-color: $background-color;
    height: 100vh;
    overflow: hidden;
    &__body {
      display: flex;
      flex-direction: column; 
      width: calc(100% - 239px);
      height: 100%;
      // gap: 20px;
      &.closeTabLeft {
        width: calc(100% - 55px);
      }
      &__tableft {
        height: 100%;
        max-width: 239px;
      }
  
      .body {
        // flex-basis: calc(100% - 250px);
  
        &.closeTabLeft {
          flex-basis: auto;
        }
      }
    }
  }
  </style>
  