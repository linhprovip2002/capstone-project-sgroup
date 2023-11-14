<template>
  <div class="tableft">
    <div class="tableft__item category">
      <h2>Categories</h2>
      <div class="category__container max-h-[420px] overflow-auto custom-scroll mb-[20px]">
        <div
          v-for="item in categories"
          :key="item._id"
          class="category__item"
          @click="goToCategory(item.slug)"
        >
          <img src="~/assets/icon/category.svg" alt="" />
          <div class="category__item__info">
            <span class="name">{{ item.name }}</span>
            <span class="desc">{{ item.description }}</span>
          </div>
        </div>
      </div>
      <!-- <p
        class="text-[14px] text-[#fff] font-[400] pt-[10px] mb-[20px] w-full text-center cursor-pointer"
        @click="modeShow()"
      >
        {{ isShowFull ? 'Ẩn bớt' : 'Xem thêm ...' }}
      </p> -->
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      categories: [],
      filterCategories: [],
      isShowFull: false,
    }
  },
  async created() {
    await this.fetchCategory()
  },
  methods: {
    async fetchCategory() {
      await this.$axios
        .get('/categories')
        .then((res) => {
          this.categories = res.data
          this.filterCategories = this.categories.slice(0, 6)
        })
        .catch((err) => {
          console.log(err)
        })
    },
    modeShow() {
      if (this.isShowFull) this.filterCategories = this.categories.slice(0, 6)
      else this.filterCategories = this.categories

      this.isShowFull = !this.isShowFull
    },
    goToCategory(slug) {
      this.$router.push(`/categories/${slug}`)
    }
  },
}
</script>

<style scoped lang="scss">
@import '~/assets/scss/variables.scss';
.tableft {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 20px;
  max-height: 100%;

  &__item {
    border-radius: 16px;
    background: $dark-3;
    display: flex;
    width: 300px;
    padding: 10px;
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
    h2 {
      padding-left: 10px;
      color: #f7f7f7;
      /* SemiBold 16 */
      font-family: 'Montserrat', sans-serif;
      font-size: 16px;
      font-style: normal;
      font-weight: 600;
      line-height: 24px; /* 150% */
    }
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
