<template>
  <div class="container relative p-5 flex flex-col gap-5 bg-gray-200 rounded-lg justify-center pt-10" @click.stop>
    <h2 class="text-[20px] text-center font-semibold">Tạo Blog</h2>
    <button class="absolute right-4 top-4" @click="cancel">
      <img src="~/assets/icon/close-gray.svg" alt="" class="w-[30px] h-[30px] hover:bg-gray-300 rounded-full p-1" />
    </button>
    <div class="flex flex-col gap-1">
      <label class="text-sm font-medium" for="">Tiêu đề</label>
      <input type="text" v-model="title" class="outline-none bg-gray-200 border-2 border-gray-300 text-sm p-2 rounded-sm text-gray-800"
        placeholder="Tiêu đề" />
    </div>
    <div class="flex flex-col gap-1">
      <label class="text-sm font-medium" for="">Gắn thẻ</label>
      <input type="text" class="outline-none bg-gray-200 border-2 border-gray-300 text-sm p-2 rounded-sm text-gray-800"
        placeholder="Gắn thẻ" />
    </div>
    <TextEditor @textChange="updateContent" @addImage="updateImage"/>
    <button class="bg-gray-800 p-2 text-white w-[200px] rounded-lg m-auto" @click="submit">
      Xuất bản
    </button>
  </div>
</template>

<script>
import TextEditor from '../../components/Blog/TextEditor.vue'
export default {
  layout: 'topandfooter',
  components: {
    TextEditor,
  },
  data() {
    return {
      title: '',
      content: '',
      blogImage: []
    }
  },
  methods: {
    submit() {
      const authorization = localStorage.getItem('accessToken')
      this.$axios.post('/blogs', {
        headers: {
          Authorization: authorization
        },
        title: this.title,
        content: this.content,
        blogImage: this.blogImage
      }).then(res => {
        console.log(res)
      }).catch(err => {
        console.log(err);
      })
    },
    cancel() {
      this.$emit('cancel')
    },
    updateContent(updatedContent){
      this.content = updatedContent
    },
    updateImage(imageLink){
      this.blogImage.push(imageLink)
    }
  },
}
</script>

<style lang="scss" scoped>
.container {
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
</style>
