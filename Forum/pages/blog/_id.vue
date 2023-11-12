<template>
  <div class="main">
    <LoadingSpinner v-if="isLoading" />
    <div
      v-else
      class="p-10 flex flex-col gap-5 bg-gray-200 rounded-lg justify-center"
    >
      <div class="text-[32px] font-semibold border-b-[1px] border-[#000] pb-2">
        {{ blog.title }}
      </div>
      <div class="content" v-html="blog.content"></div>
      <div class="h-[1px] w-full bg-gray-300"></div>
      <ReactAndComment :like="countLike" />
      <div class="h-[1px] w-full bg-gray-300"></div>
      <div class="relative bg-white rounded-lg">
        <textarea
          name=""
          id=""
          cols="30"
          rows="5"
          class="w-full px-5 pt-5 pb-6 focus:outline-none rounded-lg"
          placeholder="Bình luận"
        ></textarea>
        <div class="py-2 px-5 flex justify-end">
          <img src="~/assets/icon/send.svg" class="w-10 h-10 right-4" />
        </div>
      </div>
      <div v-for="c in blog.comments" :key="c">
        <CommentCard :comment="c.content" :user="c.userId" />
      </div>
    </div>
  </div>
</template>

<script>
import LoadingSpinner from '~/components/Animation/LoadingSpinner.vue'
import CommentCard from '~/components/Card/CommentCard.vue'
import ReactAndComment from '~/components/Blog/ReactAndComment.vue'
export default {
  components: {
    CommentCard,
    ReactAndComment,
    LoadingSpinner,
  },

  data() {
    return {
      id: '',
      blog: {},
      isLoading: true,
    }
  },
  computed: {
    countLike() {
      return 2
    },
  },
  created() {
    if (this.$route.params.id) {
      this.id = this.$route.params.id
      this.fetchBlogDetail()
    } else this.$router.push('/')
  },
  mounted() {},
  methods: {
    async fetchBlogDetail() {
      const authorization = localStorage.getItem('accessToken')
      await this.$axios
        .get(`/blogs/${this.id}`, {
          headers: {
            Authorization: authorization,
          },
        })
        .then((res) => {
          this.blog = res.data
          console.log(this.blog)
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
.content {
  &:deep() {
    img {
      width: 100px;
      height: 100px;
      object-fit: contain;
    }
  }
}
</style>
