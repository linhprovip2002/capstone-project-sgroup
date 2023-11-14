<template>
  <div class="tableft">
    <div class="tableft__item category">
      <div class="category__item" @click="navigate('newest')">
        <img src="~/assets/icon/new-star.svg" alt="" />
        <div class="category__item__info">
          <span class="name">Newest and Recent</span>
          <span class="desc">Find the last udpate</span>
        </div>
      </div>
      <div class="category__item" @click="navigate('popular')">
        <img src="~/assets/icon/popular.svg" alt="" />
        <div class="category__item__info">
          <span class="name">Popular of the day</span>
          <span class="desc">Shots featured today by curators</span>
        </div>
      </div>
    </div>
    
  </div>
</template>

<script>
export default {
  data() {
    return {
      categories:[]
    }
  },
  created() {
    this.fetchCategory()
  },
  methods: {
    fetchCategory() {
      this.$axios.get('/categories')
      .then(res=> {
        this.categories = res.data
      })
      .catch((err) => {
          console.log(err)
        })
    },
    navigate(item) {
      this.$router.push(`/blogs/${item}`)
    }
  }
}
</script>

<style scoped lang="scss">
@import '~/assets/scss/variables.scss';
.tableft {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 20px;

  &__item {
    border-radius: 16px;
    background: $dark-3;
    display: flex;
    width: 300px;
    padding: 10px;
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;

    .category {
      &__item {
        display: flex;
        width: 100%;
        padding: 6px 5px;
        align-items: flex-start;
        gap: 10px;
        border-radius: 6px;
        background: $dark-3;  
        cursor: pointer;

        img {
          display: flex;
          height: 100%;
          object-fit: contain;
          justify-content: center;
          align-items: center;
          padding: 4px;
          gap: 10px;
        }
        &__info {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 2px;
          .name {
            color: $neutral-0;
            font-family: 'Montserrat', sans-serif;
            font-size: 12px;
            font-style: normal;
            font-weight: 600;
            line-height: 18px; /* 150% */
          }
          .desc {
            color: #97989d;
            /* Regular 9 */
            font-family: 'Montserrat', sans-serif;
            font-size: 10px;
            font-style: normal;
            font-weight: 400;
            line-height: 14px; /* 155.556% */
          }
        }
        &:hover {
          background: $dark-4;
        }
      }
    }
  }
}
</style>
