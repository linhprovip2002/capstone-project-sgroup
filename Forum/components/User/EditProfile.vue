<!-- eslint-disable vue/no-mutating-props -->
<template>
  <div class="main" @click="cancel">
    <div
      class="container relative p-8 py-12 rounded-[10px] border border-[#1E252B] bg-[#2C353D]"
      @click.stop
    >
      <h1 class="font-medium text-3xl text-[#FF571A]">Edit Profile User</h1>
      <img
        src="~/assets/icon/close.svg"
        class="w-[30px] h-[30px] absolute right-8 top-8 cursor-pointer"
        @click.stop="cancel"
      />
      <form>
        <div class="form">
          <div class="name-avt flex gap-[30px]">
            <div class="name flex-[2]">
              <div class="mb-[20px]">
                <label class="label" for="name">First Name</label>
                <input
                  id="name"
                  v-model="userProfile.firstName"
                  type="text"
                  name="name"
                  class="bg-gray-100 border border-gray-200 rounded py-1 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-full"
                  placeholder="Enter your first name"
                />
              </div>
              <div class="mb-[20px]">
                <label class="label" for="name">Last Name</label>
                <input
                  id="name"
                  v-model="userProfile.lastName"
                  type="text"
                  name="lastName"
                  class="bg-gray-100 border border-gray-200 rounded py-1 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-full"
                  placeholder="Enter your last name"
                />
              </div>
            </div>
            <div
              class="avt flex flex-col gap-[20px] justify-center items-center flex-1"
            >
              <span class="text-[#333] font-[500] text-[#fff] text-[16px]"
                >Ảnh đại diện</span
              >
              <div class="avt-preview relative">
                <img
                  :src="previewImage"
                  class="rounded-full w-[100px] h-[100px]"
                />
                <label
                  for="fileInput"
                  class="absolute top-0 left-0 w-[100px] h-[100px] rounded-full bg-[#5f6c8580] flex justify-center items-center cursor-pointer"
                >
                  <img
                    src="~/assets/icon/upload.svg"
                    class="w-[30px] h-[30px]"
                    alt="Upload"
                  />
                </label>
              </div>
              <input
                id="fileInput"
                class="hidden"
                type="file"
                accept="image/jpeg"
                @change="handleImageUpload"
              />
            </div>
          </div>
          <div class="mb-[20px]">
            <label class="label" for="name">Birthday</label>
            <input
              id="year"
              v-model="formattedDate"
              type="date"
              name="phone"
              class="bg-gray-100 border border-gray-200 rounded py-1 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-full"
              placeholder="Enter year"
            />
          </div>
          <div class="mb-[20px]">
            <label class="label" for="name">Phone number</label>
            <input
              id="phone"
              v-model="userProfile.phone"
              type="text"
              name="phone"
              class="bg-gray-100 border border-gray-200 rounded py-1 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-full"
              placeholder="Enter your phone number"
            />
          </div>
          <div class="flex items-center gap-[60px]">
            <label for="name">Gender: </label>
            <div class="radio-group flex items-center gap-[30px]">
              <div
                class="item-radio flex items-center gap-[8px] cursor-pointer"
              >
                <input
                  id="male"
                  v-model="userProfile.gender"
                  class="cursor-pointer"
                  value="true"
                  type="radio"
                />
                <label class="mb-0 cursor-pointer" for="male">Male</label>
              </div>
              <div
                class="item-radio flex items-center gap-[8px] cursor-pointer"
              >
                <input
                  id="female"
                  v-model="userProfile.gender"
                  class="cursor-pointer"
                  value="false"
                  type="radio"
                />
                <label class="mb-0 cursor-pointer" for="female">Female</label>
              </div>
            </div>
          </div>
          <div class="button-group space-x-4 mt-8">
            <button
              class="cancel py-2 px-4 bg-white border border-gray-200 text-gray-600 rounded hover:bg-gray-100 active:bg-gray-200 disabled:opacity-50"
              type="button"
              @click.stop="cancel"
            >
              Cancel
            </button>
            <button
              type="button"
              class="save py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600 active:bg-blue-700 disabled:opacity-50"
              @click.stop="save"
            >
              Save
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>
<script>
import UploadImage from '~/api/uploadImage.js'
export default {
  props: {
    user: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      userProfile: {},
      previewImage: '',
    }
  },
  computed: {
    formattedDate: {
      get() {
        const date = new Date(this.userProfile.dayOfBirth)
        const day = String(date.getDate()).padStart(2, '0')
        const month = String(date.getMonth() + 1).padStart(2, '0')
        const year = date.getFullYear()
        return `${year}-${month}-${day}`
      },
      set(value) {
        this.userProfile.dayOfBirth = value
      },
    },
  },
  created() {
    this.userProfile = JSON.parse(JSON.stringify(this.user))
    this.previewImage = this.userProfile?.profileImage ?? ''
  },
  methods: {
    save() {
      this.$axios
        .put(`/users/${this.userProfile._id}`, {
          firstName: this.userProfile.firstName,
          lastName: this.userProfile.lastName,
          gender: this.userProfile.gender,
          dayOfBirth: this.formattedDate,
          phone: this.userProfile.phone,
          profileImage: this.userProfile.profileImage,
        })
        .then((res) => {
          console.log(res)
          this.$notify({
            title: 'Thành công',
            text: 'Cập nhật thành công',
            type: 'success',
            group: 'foo',
          })
        })
        .catch((err) => {
          console.log(err)
          this.$notify({
            title: 'Lỗi',
            text: err.response.data.message[0].message,
            type: 'error',
            group: 'foo',
          })
        })
      this.$emit('fetchInfoUser', this.userProfile)
    },
    cancel() {
      this.$emit('cancel')
    },
    fetchInfoUser() {
      console.log('Fetch user')
      const authorization = localStorage.getItem('accessToken')
      this.$axios
        .get('/users/me', {
          headers: {
            Authorization: authorization,
          },
        })
        .then((res) => {
          localStorage.setItem('user', JSON.stringify(res.data))
          console.log(res.data)
          console.log(JSON.stringify(this.userProfile))
          this.userProfile = res.data
          console.log(JSON.stringify(this.userProfile))
        })
        .catch((err) => {
          console.log(err)
        })
    },
    async handleImageUpload(event) {
      const selectedImage = event.target.files[0]
      console.log('Selected Image:', selectedImage)
      const res = await UploadImage(selectedImage)
      this.userProfile.profileImage = res
      // const url = await cloudinary.image(`${res}`, {height: 250, width: 250, crop: "fill"})
      this.previewImage = res
    },
  },
}
</script>
<style lang="scss" scoped>
@import '~/assets/scss/variables.scss';

.main {
  position: fixed;
  inset: 0;
  background: rgba(71, 79, 98, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;

  .container {
    max-width: 600px;

    h1 {
      margin-bottom: 40px;
      text-align: center;
    }

    .form {
      label {
        color: #fff;
        font-weight: 600;
      }

      .label {
        display: flex;
        margin-bottom: 8px;
        font-size: 14px;
      }
      input {
        outline: none;
      }
    }

    .button-group {
      display: flex;
      width: 100%;
      justify-content: center;
      align-items: center;

      .save {
        background: $orange;
      }

      .cancel {
        background: $gray;
      }
    }
  }
}
</style>
