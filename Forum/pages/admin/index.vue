<template>
  <div class="default">
    <div class="default__top">
      <TopNavBar class="top-nav" />
    </div>
    <div class="px-5 flex gap-5">
      <div class="tableft">
        <div class="tableft__item category">
          <div class="category__item" @click="changeOption(1)">
            <img src="~/assets/icon/person.svg" alt="" />
            <div class="category__item__info">
              <span class="name">User Manage</span>
            </div>
          </div>
          <div class="category__item" @click="changeOption(2)">
            <img src="~/assets/icon/popular.svg" alt="" />
            <div class="category__item__info">
              <span class="name">Pending Blog</span>
            </div>
          </div>
          <div class="category__item" @click="changeOption(3)">
            <img src="~/assets/icon/popular.svg" alt="" />
            <div class="category__item__info">
              <span class="name">Published Blog</span>
            </div>
          </div>
        </div>
      </div>
      <UserList class="w-full" :users="users" @reload="reload" v-if="manageOption === 1" @changePage="changeUserPage"
        :count="userCount" />
      <BlogList v-if="manageOption === 2" @reload="reload" :news="pendingNews" class="w-full" @changePage="changePendingPage"
       :count="pendingNewsCount" />
      <BlogList v-if="manageOption === 3" @reload="reload" :news="news" class="w-full" @changePage="changeNewsPage"
       :count="newsCount" />
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import UserList from '~/components/Manage/UserList.vue'
import BlogList from '~/components/Manage/BlogList.vue'
// import constant from '~/constant'
export default {
  layout: 'empty',
  components: {
    UserList,
    BlogList,
  },
  data() {
    return {
      title: '',
      content: '',
      pendingNews: [],
      news: [],
      users: [],
      manageOption: 1,
      userCount: Number,
      pendingNewsCount: Number,
      newsCount: Number,
    }
  },
  created() {
    if (
      !localStorage.getItem('accessToken') ||
      localStorage.getItem('accessToken') === 'false'
    )
      this.$router.push('/auth/login')
  },
  mounted() {
    this.$axios
      .get(`/users/?page=1&limit=4`)
      .then((res) => {
        console.log(res)
        this.users = res.data.docs
        this.userCount = res.data.totalDocs
      })
      .catch((err) => {
        console.error(err)
      })

    this.$axios
      .get(`/blogs/awaiting-approval/?page=1&limit=4`)
      .then((res) => {
        console.log(res)
        this.pendingNews = res.data.docs
        this.pendingNewsCount = res.data.totalDocs
      })
      .catch((err) => {
        console.error(err)
      })
    this.$axios
      .get(`/blogs/?page=1&limit=4`, {})
      .then((res) => {
        console.log(res)
        this.news = res.data.docs
        this.newsCount = res.data.totalDocs
      })
      .catch((err) => {
        console.error(err)
      })
  },
  methods: {
    submit() {
      axios({
        method: 'post',
        url: `http://${process.env.BASE_URL}:3000/auth/reset-password`,
        data: {
          title: this.title,
          content: this.content,
          createdAt: Date.now(),
        },
      })
        .then((response) => {
          console.log(response)
          this.$notify({
            title: 'Success',
            text: response.data.message,
            type: 'success',
          })
          return response.data
        })
        .catch((error) => {
          console.error('Login error:', error)
          this.$notify({
            title: 'Error',
            text: error.response.data.message,
            type: 'error',
          })
        })
    },
    changeOption(optionNumber) {
      this.manageOption = optionNumber
    },
    reload() {
      this.$axios
        .get(`/users/?page=1&limit=4`)
        .then((res) => {
          console.log(res)
          this.users = res.data.docs
          this.userCount = res.data.totalDocs
        })
        .catch((err) => {
          console.error(err)
        })

      this.$axios
        .get(`/blogs/awaiting-approval/?page=1&limit=4`)
        .then((res) => {
          console.log(res)
          this.pendingNews = res.data.docs
          this.pendingNewsCount = res.data.totalDocs
        })
        .catch((err) => {
          console.error(err)
        })
      this.$axios
        .get(`/blogs/?page=1&limit=4`, {})
        .then((res) => {
          console.log(res)
          this.news = res.data.docs
          this.newsCount = res.data.totalDocs
        })
        .catch((err) => {
          console.error(err)
        })
    },
    changeUserPage(page, limit) {
      console.log("page: " + page + " limit: " + limit)
      console.log('oke');
      this.$axios.get(`/users/?page=${page}&limit=${limit}`)
        .then(res => {
          this.users = res.data.docs
          this.userCount = res.data.totalDocs
        })
        .catch(err => {
          console.log(err)
        })
    },
    changePendingPage(page, limit) {
      console.log("page: " + page + " limit: " + limit)
      console.log('oke');
      this.$axios.get(`/blogs/awaiting-approval/?page=${page}&limit=${limit}`)
        .then(res => {
          this.pendingNews = res.data.docs
          this.pendingNewsCount = res.data.totalDocs
        })
        .catch(err => {
          console.log(err)
        })
    },
    changeNewsPage(page, limit) {
      console.log("page: " + page + " limit: " + limit)
      console.log('oke');
      this.$axios.get(`/blogs/?page=${page}&limit=${limit}`)
        .then(res => {
          this.news = res.data.docs
          this.newsCount = res.data.totalDocs
        })
        .catch(err => {
          console.log(err)
        })
    },
  },
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

  .footer {}
}

.tableft {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 20px;

  &__item {
    border-radius: 16px;
    background: $dark-3;
    display: flex;
    width: 210px;
    padding: 10px;
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;

    .category {
      &__item {
        display: flex;
        align-items: center;
        width: 100%;
        padding: 6px 5px;
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
            line-height: 18px;
            /* 150% */
          }

          .desc {
            color: #97989d;
            /* Regular 9 */
            font-family: 'Montserrat', sans-serif;
            font-size: 10px;
            font-style: normal;
            font-weight: 400;
            line-height: 14px;
            /* 155.556% */
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
