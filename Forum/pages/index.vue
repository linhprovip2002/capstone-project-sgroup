<template>
  <div class="main relative">
    <div v-if="isCreatingPost" class="post-creator" @click="cancel">
      <div class="post-creator__container custom-scroll" @click.stop>
        <PostCreator
          @cancel="cancel"
          class="post-creator__container custom-scroll"
        />
      </div>
    </div>
    <div class="container">
      <div class="w-full px-4">
        <div
          class="flex bg-[#262D34] gap-5 w-full px-5 items-center h-[80px] rounded-md mb-5"
        >
          <div class="search flex gap-5 w-full p-5 my-5 rounded-lg">
            <input
              id=""
              type="text"
              name=""
              placeholder="Type here to search..."
            />
            <img src="~assets/icon/search.svg" alt="" />
          </div>
          <button
            class="text-white py-2 px-6 rounded-[10px] bg-[#FF571A]"
            @click="isCreatingPost = true"
          >
            Create Post
          </button>
        </div>
        <div id="main-content">
          <div v-for="n in news" :key="n._id" class="blog">
            <BlogCard
              :image-link="n.blogImage ?? null"
              :author="n.userId"
              :comments="n.comments"
              :like="
                n.reaction.map((e) => {
                  return e.reaction === 'like'
                }).length
              "
              :title="n.title"
              :time="n.createdAt"
            />
          </div>
        </div>
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

export default {
  name: 'IndexPage',
  components: {
    BlogCard,
    PostCreator,
    ModalAlert,
  },
  data() {
    return {
      news: [],
      isCreatingPost: false,
      alert: {
        isShowModal: false,
        title: '',
        type: 'failed',
        content: '',
        buttonCancelContent: '',
        buttonOkContent: '',
        typeSubmit: '',
      },
    }
  },
  async created() {
    await this.getListBlog()
    // await this.modifyListBlog()
  },
  methods: {
    cancel() {
      this.isCreatingPost = false
    },
    async getListBlog() {
      const authorization = localStorage.getItem('accessToken')
      await this.$axios
        .get('/blogs', {
          headers: {
            Authorization: authorization,
          },
        })
        .then((res) => {
          console.log(res)
          this.news = res.data
        })
        .catch((err) => {
          if (err.response.data.code === 'ERR-401')
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
    z-index: 10;
    padding: 20px 0;
    &__container {
      height: 100%;
      overflow-y: auto;
      width: 100%;
      max-width: 700px;
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
        color: #ccc;
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
}
</style>
