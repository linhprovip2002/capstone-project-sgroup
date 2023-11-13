<template>
  <div class="main">
    <div
      v-if="isLoading"
      class="loading w-full h-[100px] flex items-center justify-center"
    >
      <LoadingSpinner />
    </div>
    <div
      v-else
      class="p-10 flex flex-col gap-5 bg-[#fff] rounded-lg justify-center ql-container ql-snow"
    >
      <div class="header border-b-[1px] border-[#000]">
        <p class="text-[32px] font-[600] pb-2">
          {{ blog.title }}
        </p>
        <span class="text-[#050505] text-[12px] font-normal">Asked : {{ blog.createdAt.split('T')[0] }}</span>
        <span class="text-[#050505] text-[12px] font-normal ml-[20px]">Modified: {{ blog.updatedAt.split('T')[0] }}</span>
        <span class="text-[#050505] text-[12px] font-normal ml-[20px]">Author: {{ blog.userId.firstName??'' }} {{ blog.userId.lastName??'' }}</span>
      </div>
      <div class="content ql-editor" v-html="blog.content"></div>
      <div class="h-[1px] w-full bg-gray-300"></div>
      <ReactAndComment
        :like="countLike"
        :dislike="countDisLike"
        :comments="countComment"
      />
      <div class="h-[1px] w-full bg-gray-300"></div>
      <div class="relative z-[1] rounded-lg comment-area">
        <CommentBox @comment="mainComment" />
      </div>
      <div v-for="c in comment" :key="c._id">
        <CommentCard :comment="c.content" :user="c.userId" />
        <!-- <div v-if="c.reply.length>=0" class="reply-comment" >
          <div v-for="reply in c.reply" :key="reply._id" class="reply-comment__container" >
            <CommentCard :comment="reply.content" :user="reply.userId" />
          </div>
        </div> -->
      </div>
    </div>
  </div>
</template>

<script>
import LoadingSpinner from '~/components/Animation/LoadingSpinner.vue'
import CommentCard from '~/components/Card/CommentCard.vue'
import ReactAndComment from '~/components/Blog/ReactAndComment.vue'
import CommentBox from '~/components/Blog/CommentBox.vue'
export default {
  components: {
    CommentCard,
    ReactAndComment,
    LoadingSpinner,
    CommentBox,
  },

  data() {
    return {
      id: '',
      blog: {},
      comment: [],
      isLoading: true,
    }
  },
  computed: {
    countLike() {
      return this.blog.reaction?.filter((e) => {
        return e.reaction === 'like'
      }).length
    },
    countDisLike() {
      return this.blog.reaction?.filter((e) => {
        return e.reaction === 'dislike'
      }).length
    },
    countComment() {
      return this.comment.length
    },
  },
  async created() {
    if (this.$route.params.id) {
      this.id = this.$route.params.id
      await this.fetchBlogDetail()
      this.fetchBlogComment()
    } else this.$router.push('/')
  },
  mounted() {
    window.scrollTo(0, 0)
  },
  methods: {
    async fetchBlogDetail() {
      await this.$axios
        .get(`/blogs/${this.id}`)
        .then((res) => {
          this.blog = res.data
          console.log(this.blog)
        })
        .catch((err) => {
          console.log(err)
        })
      this.isLoading = false
    },
    mainComment(content) {
      console.log('content:', content)
      const contentComment = content
      this.$axios
        .post(
          `/blog/${this.blog._id}/comments/`,
          {
            // Thêm body của request ở đây
            content: contentComment,
          }
        )
        .then((res) => {
          console.log(res)
          this.fetchBlogComment()
        })
        .catch((error) => {
          console.error('Error:', error);
          if (error.response.status === 401) {
            localStorage.removeItem('accessToken')
            localStorage.removeItem('user')
            this.$router.push('/auth/login')
          } else
            this.$notify({
              title: 'Lỗi',
              text: 'Không thể thêm bình luận vào blog này',
              type: 'error',
              group: 'foo',
            })
        })
    },
    async fetchBlogComment() {
      await this.$axios
        .get(`/blog/${this.id}/comments/`)
        .then((res) => {
          this.comment = res.data
        })
        .catch((err) => {
          console.log(err)
        })
      this.isLoading = false
    },
  },
}
</script>
<style lang="scss" scoped>
.main {
  .content {
    &:deep() {
      img {
        width: 200px;
        height: 200px;
        object-fit: contain;
      }
    }
  }
  &:deep() {
    .quill-editor {
      max-height: 300px;
      position: relative;

      img {
        width: 60px;
        height: 60px;
        object-fit: cover;
      }

      .ql-toolbar {
        position: sticky;
        top: 0;
        left: 0;
        z-index: 10;
        background-color: rgb(229 231 235);
      }
    }
  }
}
textarea {
  resize: none;
}
</style>
