<template>
  <section>
    <client-only>
      <quill-editor
        ref="editor"
        v-model.lazy="editedContent"
        :options="editorOption"
        class="editor--border relative custom-scroll"
        @change="debounceTextChange"
      />
    </client-only>
  </section>
</template>

<script>
import { debounce } from 'vue-debounce'
// const cloudinary = require('cloudinary').v2;
require('dotenv').config()
const UploadImage = require('../../api/uploadImage.js')
// import { v2 as cloudinary } from 'cloudinary';
// const streamifier = require('streamifier');

// cloudinary.config({
//     cloud_name: 'dvznvebzi',
//     api_key: '965548286235395',
//     api_secret: 'Wqbt7VvnH7bPQTWd_cPRD5K1kgE'
// });

export default {
  props: {
    content: {
      type: String,
      default: () => '',
    },
  },
  data() {
    return {
      editedContent: this.content,
      editorOption: {
        theme: 'snow',
        modules: {
          toolbar: {
            container: [
              ['bold', 'italic', 'underline', 'strike', 'code'],
              ['blockquote', 'code-block'],
              [{ header: [1, 2, 3, 4, 5, 6, false] }],
              [{ list: 'ordered' }, { list: 'bullet' }],
              [{ script: 'sub' }, { script: 'super' }],
              [{ indent: '-1' }, { indent: '+1' }],
              [{ size: ['small', false, 'large', 'huge'] }],
              [{ color: [] }, { background: [] }],
              [{ align: [] }],
              ['clean'],
              ['link', 'image', 'video'],
            ],

            handlers: {
              image: this.uploadImage,
            },
          },
        },
      },
    }
  },
  watch: {
    content() {
      this.editedContent = this.content
    }
  },
  methods: {
    debounceTextChange: debounce(function () {
      // don't use arrow function
      this.$emit('textChange', this.editedContent)
    }, 0),

    uploadImage() {
      let fileInput = this.$el.querySelector('input.ql-image[type=file]')

      if (fileInput == null) {
        fileInput = document.createElement('input')
        fileInput.setAttribute('type', 'file')
        fileInput.setAttribute(
          'accept',
          'image/png, image/gif, image/jpeg, image/bmp, image/x-icon'
        )
        fileInput.classList.add('ql-image')

        fileInput.addEventListener('change', async () => {
          if (fileInput.files != null && fileInput.files[0] != null) {
            const file = fileInput.files[0]

            try {
              const res = await UploadImage(file)
              console.log(res)
              // const url = await cloudinary.image(`${res}`, {height: 250, width: 250, crop: "fill"})
              const url = `<img src="${res}" alt="photo">`
              this.editedContent += url
              this.$emit('addImage', res)
            } catch (err) {
              console.error(err)
            }
          }
        })

        const container = this.$el.querySelector('.ql-toolbar.ql-snow')
        container.appendChild(fileInput)
      }

      fileInput.click()
    },
  },
  
}
</script>

<style lang="scss" scoped>
.quill-editor {
  overflow-y: auto;
  &:deep() {
    .ql-container {
      border-radius: 0;
      background: #fff;
    }
  }
  .ql-toolbar {
    position: sticky;
    top: 0;
    left: 0;
    background-color: #fff;
    z-index: 10;
  }

  .ql-editor {
    min-height: 300px;
    font-family: Roboto;
    font-size: 1rem;
  }
}

.editor--border {
  // border: 1px solid #ccc;
}
</style>
