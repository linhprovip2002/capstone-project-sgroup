<template>
  <div
    class="container relative p-5 flex flex-col gap-5 bg-gray-200 rounded-lg justify-center pt-100"
    @click.stop
  >
    <h2 class="text-[20px] text-center font-semibold">Tạo Blog</h2>
    <div class="flex gap-20">
      <div class="w-[100px] h-[100px]">
        <label class="text-sm font-medium mb-6" for="">Thumbnail</label>
        <div class="image-preview">
          <img :src="previewImage" class="rounded-full" />
          <div class="image-layout"></div>
          <input
            id="fileInput"
            type="file"
            accept="image/jpeg"
            @change="handleImageUpload"
            class=""
          />
        </div>
      </div>
      <div class="w-full">
        <div class="flex flex-col gap-1 flex-start">
          <label class="text-sm font-medium" for="">Tiêu đề</label>
          <input
            type="text"
            v-model="title"
            class="outline-none bg-gray-200 border-2 border-gray-300 text-sm p-2 rounded-sm text-gray-800"
            placeholder="Tiêu đề"
          />
        </div>
        <div class="flex flex-col gap-1">
          <label class="text-sm font-medium" for="">Gắn thẻ</label>
          <select
            v-model="selectedCategory"
            id="categoryDropdown"
            class="outline-none bg-gray-200 border-2 border-gray-300 text-sm p-2 rounded-sm text-gray-800"
          >
            <option value="" selected disabled>Select a category</option>
            <option
              v-for="category in categories"
              :key="category._id"
              :value="category._id"
            >
              {{ category.name }}
            </option>
          </select>
        </div>
      </div>
    </div>
    <button class="absolute right-4 top-4" @click="cancel">
      <img
        src="~/assets/icon/close-gray.svg"
        alt=""
        class="w-[30px] h-[30px] hover:bg-gray-300 rounded-full p-1"
      />
    </button>
    <TextEditor @textChange="updateContent" />
    <button
      type="button"
      class="bg-gray-800 p-2 text-white w-[200px] rounded-lg m-auto"
      @click.stop="submit"
    >
      {{ textSubmit }}
    </button>
  </div>
</template>

<script>
import TextEditor from '../../components/Blog/TextEditor.vue'
const UploadImage = require('../../api/uploadImage.js')
export default {
  components: {
    TextEditor,
  },
  layout: 'topandfooter',
  props: {
    textSubmit: {
      type: String,
      default:'Đăng bài'
    }
  },
  data() {
    return {
      title: '',
      content: '',
      blogImage: [],
      categories: [],
      selectedCategory: '',
      previewImage: require('~/assets/img/logosgroup.png'),
    }
  },
  created() {
    this.$emit('setLoading')
    this.$axios.get('/categories').then((res) => {
      console.log(res.data)
      this.categories = res.data
      this.$emit('doneLoading')
    })
  },
  methods: {
    submit() {
      const authorization = localStorage.getItem('accessToken')
      console.log(this.selectedCategory)
      this.$axios
        .post(
          '/blogs',
          {
            title: this.title,
            content: this.content,
            category: this.selectedCategory,
            blogImages: this.blogImage,
          },
          {
            headers: {
              Authorization: authorization,
            },
          }
        )
        .then((res) => {
          console.log(res)
          this.$notify({
            title: 'Thành công',
            text: 'Đăng bài thành công',
            type: 'success',
            group: 'foo',
          })
        })
        .catch((error) => {
          if (!error.response?.data?.error.startsWith('Blog'))
            this.$notify({
              title: 'Thất bại',
              text: 'Kích cỡ file quá lớn, không thể tải lên',
              type: 'error',
              group: 'foo',
            })
          else if (error.response?.data?.error.startsWith('Blog'))
            this.$notify({
              title: 'Thất bại',
              text: 'Vui lòng chọn category',
              type: 'error',
              group: 'foo',
            })
          else
            this.$notify({
              title: 'Thất bại',
              text: 'Không thể tạo bài post',
              type: 'error',
              group: 'foo',
            })
        })
      this.$emit('save')

    },
    cancel() {
      this.$emit('cancel')
    },
    updateContent(updatedContent) {
      this.content = updatedContent
    },
    updateImage(imageLink) {
      this.blogImage.push(imageLink)
    },
    async handleImageUpload(event) {
      const selectedImage = event.target.files[0]
      console.log('Selected Image:', selectedImage)
      const res = await UploadImage(selectedImage)
      console.log(res)
      this.blogImage[0] = res
      // const url = await cloudinary.image(`${res}`, {height: 250, width: 250, crop: "fill"})
      this.previewImage = res
    },
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
  .image-preview {
    position: relative;
    // overflow: hidden;
    cursor: pointer;
    width: 100px;
    height: 100px;
    display: flex;
    justify-content: center;
    align-items: center;

    img {
      width: 80px;
      height: 80px;
      object-fit: cover;
    }

    input {
      position: absolute;
      top: 0;
      left: 0;
      width: 100px;
      height: 100px;
      opacity: 0;
      cursor: pointer;
    }

    .image-layout {
      position: absolute;
      width: 100px;
      height: 100px;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: rgba(0, 0, 0, 0.4);
      opacity: 0; /* initially hidden */
      transition: opacity 0.3s;
      &:hover {
        opacity: 1;
      }
    }
  }
}
</style>
