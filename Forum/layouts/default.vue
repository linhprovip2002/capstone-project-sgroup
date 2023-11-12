<template>
  <div class="default">
    <div class="default__top">
      <TopNavBar class="top-nav" />
    </div>
    <div class="default__body">
      <TabLeft class="default__body__tableft" />
      <nuxt class="default__body__container" />
      <TabRight class="default__body__tabright" />
    </div>
    <div class="default__bottom">
      <FooterBar class="footer" />
    </div>
    <notifications group="foo" />
  </div>
</template>

<script>
export default {
  created() {
    if(!localStorage.getItem('accessToken') ||localStorage.getItem('accessToken')==='false' )
      this.$router.push('/auth/login')
      this.fetchInfoUser()
  },
  methods: {
    fetchInfoUser() {
      console.log('Fetch user');
        const authorization = localStorage.getItem('accessToken')
        this.$axios.get('/users/me', {
          headers: {
            Authorization: authorization
          },
        }).then(res => {
          localStorage.setItem('user', JSON.stringify(res.data))
        }).catch(err => {
          console.log(err);
        })
        
      },
  }
}
</script>

<style lang="scss" scoped>
@import '~/assets/scss/variables.scss';
.default {
  display: flex;
  flex-direction: column;
  background-color: #f3f6ff;
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

  &__tableft {
    height: 100%;
    max-width: 239px;
  }
  &__tabright {
    height: 100%;
    max-width: 239px;
  }
  &__body {
    display: inline-flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 20px;
    width: 100%;
    padding: 0 20px;

    &__container {
      width: 100%;
    }
  }
  .footer {
  }
}
</style>
