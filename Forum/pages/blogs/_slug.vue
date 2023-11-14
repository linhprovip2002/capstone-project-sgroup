<template>
  <div class="main relative">
    <div v-if="isCreatingPost" class="post-creator" @click="cancel">
      <div class="post-creator__container custom-scroll" @click.stop>
        <PostCreator
          class="post-creator__container custom-scroll"
          @cancel="cancel"
          @setLoading="isLoading = true"
          @doneLoading="isLoading = false"
        />
      </div>
    </div>
    <div class="container">
      <div class="w-full px-4 flex flex-col items-center">
        <div
          class="flex bg-[#262D34] gap-5 w-full px-5 items-center h-[80px] rounded-md mb-5"
        >
          <div class="search flex gap-5 w-full p-5 my-5 rounded-lg">
            <input
              id=""
              v-model="searchValue"
              type="text"
              name=""
              class="text-white"
              placeholder="Type title blog to search..."
              @keydown.enter="searchBlog"
            />
            <img
              src="~assets/icon/search.svg"
              class="cursor-pointer"
              alt=""
              @click="searchBlog"
            />
          </div>
          <button
            class="text-white py-2 px-6 rounded-[10px] bg-[#FF571A]"
            @click="isCreatingPost = true"
          >
            Create Post
          </button>
        </div>
        <div class="info-category w-full pb-[20px]">
          <h2 class="text-[#f7f7f7] text-[18px] font-[500]">
            {{ categoryInfo.name }}
          </h2>
          <p class="text-[#f7f7f7] text-[14px]">
            {{ categoryInfo.description }}
          </p>
        </div>
        <div
          v-if="isLoading"
          class="loading w-full h-[100px] flex items-center justify-center"
        >
          <LoadingSpinner />
        </div>
        <div v-else class="main-content w-full">
          <div
            v-for="n in news"
            :key="n._id"
            class="blog"
            @click="GoToDetails(n._id)"
          >
            <BlogCard
              :image-link="n.blogImage ?? null"
              :author="`${n.userId?.firstName ?? ''} ${
                n.userId?.lastName ?? ''
              }`"
              :comments="n.comments"
              :like="
                n.reaction?.filter((e) => {
                  return e.reaction === 'like'
                }).length
              "
              :dislike="
                n.reaction?.filter((e) => {
                  return e.reaction === 'dislike'
                }).length
              "
              :title="n.title"
              :time="n.createdAt"
              :category="n.category?.name ?? ''"
            />
          </div>
          <div
            v-if="totalBlogs === 0"
            class="empty-data flex flex-col gap-[20px] items-center"
          >
            <img
              src="~/assets/icon/warning.svg"
              class="w-[100px] h-[100px]"
              alt=""
            />
            <p class="text-white">Không có dữ liệu</p>
          </div>
        </div>
        <Pagination
          v-show="!isLoading && totalBlogs != 0"
          class="bg-[#fafcfe] px-[40px] py-2 rounded-[10px]"
          :count="totalBlogs"
          :records-per-page="recordsPerPage"
          @changePage="changePage"
        />
      </div>
    </div>
    <modal-alert
      v-if="alert.isShowModal"
      :width="480"
      v-bind="alert"
      @close="onCloseModal"
    />
  </div>
</template>

<script>
import BlogCard from '~/components/Card/BlogCard.vue'
import PostCreator from '~/components/Blog/PostCreator.vue'
import ModalAlert from '~/components/Modal/ModalAlert.vue'
import LoadingSpinner from '~/components/Animation/LoadingSpinner.vue'

export default {
  name: 'IndexPage',
  components: {
    BlogCard,
    PostCreator,
    ModalAlert,
    LoadingSpinner,
  },
  data() {
    return {
      news: [],
      listBlog:[],
      isLoading: true,
      searchValue: '',
      categoryInfo: {},
      isCreatingPost: false,
      totalBlogs: 0,
      recordsPerPage: 4,
      alert: {
        isShowModal: false,
        title: '',
        type: 'failed',
        content: '',
        buttonCancelContent: '',
        buttonOkContent: '',
        typeSubmit: '',
      },
      slug: '',
    }
  },
  async created() {
    if (this.$route.params.slug) {
      this.slug = this.$route.params.slug
      await this.getListBlog()
      this.isLoading = false
    } else this.$router.push('/')
  },
  methods: {
    ScrollToTop() {
      this.$scrollToTop()
    },
    cancel() {
      this.isCreatingPost = false
    },
    GoToDetails(id) {
      this.$router.push(`/blog/${id}`)
    },
    async getListBlog() {
      await this.$axios
        .get(`/blogs/${this.slug}`)
        .then((res) => {
          const data = res.data
          this.categoryInfo = {
            _id: data._id,
            name: data.name,
            description: data.description,
            slug: data.slug,
          }
          this.news = data.docs
          this.listBlog = this.news
          this.news = this.news.slice(0,this.recordsPerPage)
          console.log('news:',this.news);
          this.totalBlogs = this.listBlog.length
        })
        .catch((err) => {
          if (err.response.data.status === 401)
            this.alert = {
              ...this.alert,
              ...{
                isShowModal: true,
                title: 'Lỗi',
                buttonOkContent: 'Đăng nhập lại',
                content: 'Hết phiên đăng nhập, vui lòng đăng nhập lại',
                type: 'failed',
                typeSubmit: 'loginagain',
              },
            }
          else
            this.alert = {
              ...this.alert,
              ...{
                isShowModal: true,
                title: 'Lỗi',
                buttonOkContent: 'Đóng',
                content: err.response.data.error,
                type: 'failed',
              },
            }
        })
    },
    changePage(page, limit) {
      this.news = this.listBlog.slice(limit*(page-1),limit*(page-1)+this.recordsPerPage)
    },
    modifyListBlog() {
      this.news.forEach((e) => {
        let listImage
        const imageRegex =
          /<img.*?src=['"](https?:\/\/.*?\.(?:png|jpg|jpeg|gif))['"].*?>/g
        let match

        while ((match = imageRegex.exec(e.content)) !== null) {
          listImage.push(match[1])
        }
        e.listImages = listImage
        e.blogImage = e.listImages[0]
      })
      console.log('News:', this.news)
    },
    onCloseModal(typeSubmit) {
      switch (typeSubmit) {
        case 'loginagain':
          localStorage.setItem('accessToken', 'false')
          localStorage.setItem('user', 'false')
          this.$router.push('/auth/login')
          this.resetAlert()
          break
        default:
          this.resetAlert()
          break
      }
    },
    resetAlert() {
      this.alert = {
        isShowModal: false,
        title: '',
        type: 'failed',
        content: '',
        buttonCancelContent: '',
        buttonOkContent: '',
        typeSubmit: '',
      }
    },
    async searchBlog() {
      this.isLoading = true
      await this.$axios
        .get(`/blogs?page=1&limit=${this.recordsPerPage}`, {
          params: {
            title: this.searchValue.trim(),
          },
        })
        .then((res) => {
          console.log(res)
          this.news = res.data.docs
          this.totalBlogs = res.data.totalDocs
          this.isLoading = false
        })
        .catch((err) => {
          if (err.response.data.status === 401)
            this.alert = {
              ...this.alert,
              ...{
                isShowModal: true,
                title: 'Lỗi',
                buttonOkContent: 'Đăng nhập lại',
                content: 'Hết phiên đăng nhập, vui lòng đăng nhập lại',
                type: 'failed',
                typeSubmit: 'loginagain',
              },
            }
          else
            this.alert = {
              ...this.alert,
              ...{
                isShowModal: true,
                title: 'Lỗi',
                buttonOkContent: 'Đóng',
                content: err.response.data.error,
                type: 'failed',
              },
            }
        })
    },
  },
}
</script>
<style lang="scss" scoped>
@import '~/assets/scss/variables.scss';
.main {
  .post-creator {
    position: fixed;
    inset: 0;
    background: rgba(71, 79, 98, 0.8);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 30;
    padding: 20px 0;
    &__container {
      height: 100%;
      overflow-y: auto;
      width: 100%;
    }
    &__form {
      width: 100%;
      max-width: 800px;
      padding: 40px 20px;
      border-radius: 10px;
      margin: auto;
      // height: 100%;
    }
  }
  .container {
    display: flex;
    width: 100%;
    max-width: 750px;
    margin: auto;
    height: 100%;
    .blog {
      width: 100%;
    }

    .search {
      position: relative;
      flex: 1;
      width: 100%;

      input {
        display: flex;
        width: 100%;
        padding: 9px 20px;
        padding-right: 40px;
        flex-direction: column;
        align-items: flex-start;
        gap: 10px;
        border-radius: 10px;
        outline: none;
        color: #fff;
        /* Regular 14 */
        font-family: 'Montserrat', sans-serif;
        font-size: 12px;
        font-style: normal;
        font-weight: 400;
        line-height: 22px; /* 157.143% */
        background: $dark-4;
        ::placeholder {
          color: #858ead;
        }
      }

      img {
        position: absolute;
        display: flex;
        width: 20px;
        height: 20px;
        padding: 0px 0.5px 0.5px 1px;
        justify-content: center;
        align-items: center;
        top: 50%;
        right: 40px;
        transform: translateY(-50%);
      }
    }
  }
  .main-content {
    height: calc(100% - 100px);
    display: flex;
    flex-direction: column;
    align-items: center;
  }
}
</style>
