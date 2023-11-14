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
      class="detail-box p-10 flex flex-col gap-5 bg-[#fff] justify-center ql-container ql-snow rounded-[10px]"
    >
      <div class="header border-b-[1px] border-[#ccc]">
        <p class="text-[32px] font-[600] pb-2">
          {{ blog.title }}
        </p>
        <div class="flex gap-[10px] flex-wrap">
          <div class="flex gap-[6px] flex-nowrap header-desc">
            <span class="text-gray-500 text-[12px] font-normal">Asked</span>
            <span class="text-[#050505] text-[12px] font-normal">
            {{ blog.createdAt.split('T')[0]}} at {{ blog.createdAt.split('T')[1].split('.')[0]}}</span>
          </div>
          <div class="flex gap-[6px] flex-nowrap">
            <span class="text-gray-500 text-[12px] font-normal">Modified</span>
            <span class="text-[#050505] text-[12px] font-normal">
              {{ blog.updatedAt.split('T')[0]}} at {{ blog.updatedAt.split('T')[1].split('.')[0]}} 
            </span>
          </div>
          <div class="flex gap-[6px] flex-nowrap">
            <span class="text-gray-500 text-[12px] font-normal">Author : </span>
            <span class="text-[#050505] text-[12px] font-normal cursor-pointer" @click="GoToDetails(blog.userId._id)">{{ blog.userId.firstName ?? '' }}
            {{ blog.userId.lastName ?? '' }}</span>
          </div>
        </div>
      </div>
      <div class="content ql-editor" v-html="blog.content"></div>
      <div class="h-[1px] w-full bg-gray-300"></div>
      <div class="flex flex-col gap-[20px]">
        <div class="flex gap-5">
          <div class="flex justify-between items-center gap-1">
            <div class="text-gray-500">{{ countLike }}</div>
            <button>
              <img
                :src="
                  yourReaction === 'like'
                    ? require('~/assets/icon/like.svg')
                    : require('~/assets/icon/not-like.svg')
                "
                alt=""
                class="w-5 h-5"
                @click="postReaction('like')"
              />
            </button>
          </div>
          <div class="flex justify-between items-center gap-1">
            <div class="text-gray-500">{{ countDisLike }}</div>
            <button>
              <img
                :src="
                  yourReaction === 'dislike'
                    ? require('~/assets/icon/dislike.svg')
                    : require('~/assets/icon/not-dislike.svg')
                "
                alt=""
                class="w-5 h-5"
                @click="postReaction('dislike')"
              />
            </button>
          </div>
        </div>
        <div>
          <div class="text-[#333] text-[16px]">{{ countComment }} Comments</div>
        </div>
      </div>
      <div class="h-[1px] w-full bg-gray-300 reply-area"></div>
      <div
        v-for="(c,index) in comment"
        :key="c._id"
        class="pb-[40px] border-b-[1px] border-[#e3e6e8]"
      >
        <CommentCard :comment="c.content" :user="c.userId" />
        <div
          v-if="c.reply.length > 0"
          class="reply-comment mt-[12px] pl-[45px] flex flex-col gap-[10px]"
        >
          <div
            v-for="reply in c.reply"
            :key="reply._id"
            class="reply-comment__container flex"
          >
            <img src="~/assets/icon/reply-gray.svg" class="w-8 h-8" alt="" />
            <CommentCard :comment="reply.content" :user="reply.userId" />
          </div>
        </div>
        <div
          class="flex items-center mx-[6px] cursor-pointer ml-[45px] gap-[10px] my-[10px]"
          @click="toggleShowReplyComment(index)"
        >
          <img
            src="~/assets/icon/reply.svg"
            class="w-8 h-8 rounded-[50px]"
            alt=""
          />
          <span
            class="text-[#050505] text-[14px] font-normal pr-[12px] text-[#FF571A]">
            <!-- {{ listReplyBox[index].isShow?'Hủy viết phản hồi':'' }} -->
            Viết phản hồi</span
          >
        </div>

        <div
          
          class="comment-card text-xl font-medium flex gap-[10px] w-full pl-[62px]"

        >
          <div class="w-[80px] h-[40px] overflow-hidden rounded-full ql-snow">
            <img
              :src="you.profileImage ?? require('~/assets/img/avt.png')"
              alt=""
              class="object-cover w-full h-full"
            />
          </div>
          <ReplyBox
            class="reply-editor"
            :id-comment="c._id"
            @comment="replyComment"
          />
        </div>
      </div>
      <div class="relative z-[1] rounded-lg comment-area">
        <h3 class="text-[18px] text-[#1B1F27] font-[400] pt-[20px] mb-[20px]">
          Viết bình luận của bạn
        </h3>
        <CommentBox @comment="mainComment" />
      </div>
    </div>
  </div>
</template>

<script>
import LoadingSpinner from '~/components/Animation/LoadingSpinner.vue'
import CommentCard from '~/components/Card/CommentCard.vue'
import CommentBox from '~/components/Blog/CommentBox.vue'
import ReplyBox from '~/components/Blog/ReplyBox.vue'
export default {
  components: {
    CommentCard,
    LoadingSpinner,
    CommentBox,
    ReplyBox,
  },

  data() {
    return {
      id: '',
      blog: {},
      comment: [],
      isLoading: true,
      you: {},
      yourReaction: '',
      listReplyBox:[]
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
      let count = 0
      this.comment.forEach((e) => {
        count += e.reply.length + 1
      })
      return count
    },
  },
  async created() {
    if (this.$route.params.id) {
      this.id = this.$route.params.id
      await this.fetchBlogDetail()
      await this.fetchBlogComment()
      await this.getYourInfo()
      await this.checkYourReaction()
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
        .post(`/blog/${this.blog._id}/comments/`, {
          // Thêm body của request ở đây
          content: contentComment,
        })
        .then((res) => {
          console.log(res)
          this.fetchBlogComment()
        })
        .catch((error) => {
          console.error('Error:', error)
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
          this.comment.forEach(e=> {this.listReplyBox.isShow=false})
          console.log(this.listReplyBox);
        })
        .catch((err) => {
          console.log(err)
        })
      this.isLoading = false
    },
    replyComment(idComment, content) {
      const contentComment = content
      if(content.trim())
      this.$axios
        .patch(`/blog/comments/${idComment}/reply/`, {
          // Thêm body của request ở đây
          content: contentComment,
        })
        .then((res) => {
          console.log(res)
          this.fetchBlogComment()
        })
        .catch((error) => {
          console.error('Error:', error)
          if (error.response?.status === 401) {
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
    getYourInfo() {
      this.you = JSON.parse(localStorage.getItem('user'))
      console.log(typeof this.you._id)
    },
    checkYourReaction() {
      this.blog.reaction.forEach((e) => {
        if (e.userId === this.you._id) this.yourReaction = e.reaction
      })
      console.log('your reaction:', this.yourReaction)
    },
    postReaction(item) {
      this.$axios
        .patch(`/blogs/${this.blog._id}`, {
          // Thêm body của request ở đây
          reaction: item,
        })
        .then(async (res) => {
          await this.fetchBlogDetail()
          if (this.yourReaction === item) this.yourReaction = ''
          else this.yourReaction = item
        })
        .catch((error) => {
          console.error('Error:', error)
          if (error.response.status === 401) {
            localStorage.removeItem('accessToken')
            localStorage.removeItem('user')
            this.$router.push('/auth/login')
          } else
            this.$notify({
              title: 'Lỗi',
              text: 'Không thể vote bình luận vào blog này',
              type: 'error',
              group: 'foo',
            })
        })
    },
    toggleShowReplyComment(index) {
      this.listReplyBox[index].isShowReply = !this.listReplyBox[index].isShowReply
      console.log('Toggle:',index,this.listReplyBox[index].isShowReply);
    },
    GoToDetails(id) {
      this.$router.push(`/user/${id}`)
    },
  },
}
</script>
<style lang="scss" scoped>
.main {
  .header {
    span {
      text-wrap: nowrap;
    }
  }

  .detail-box {
    border-radius: 10px;
  }

  .content {
    min-height: unset;
    border-bottom: 1px solid #ccc;
    &:deep() {
      img {
        max-width: 100%;
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
  .reply-editor {
    &:deep() {
      .quill-editor {
        max-height: 230px !important;
      }
      .ql-toolbar {
        max-height: 100px;
        overflow: auto;
      }
      .ql-editor {
        min-height: unset;
      }
    }
  }
}
textarea {
  resize: none;
}
</style>
