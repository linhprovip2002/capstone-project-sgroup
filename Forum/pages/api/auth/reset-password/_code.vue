<template>
  <div
    class="relative flex justify-center flex-col items-center h-[100vh] bg-[#262D34]"
  >
    <!-- <img src="~/assets/img/Cool-Background-GIF.gif" alt="" class="absolute w-full h-full"> -->
    <div class="absolute w-full h-full bg-[#2C353D]"></div>
    <div class="z-10">
      <form
        action=""
        class="flex flex-col form gap-7 py-[60px] justify-center items-center w-[400px] rounded-md bg-[#1E252B] px-10"
      >
        <div class="text-3xl font-bold text-white">Reset Password</div>
        <div class="w-full flex flex-col gap-2">
          <label for="" class="text-sm text-white font-medium">Token</label>
          <input
            disabled
            v-model="token"
            type="text"
            class="focus:outline-0 text-white h-[50px] w-full rounded-md pl-5 bg-[#2C353D]"
            placeholder="Token"
          />
        </div>
        <div class="w-full relative flex flex-col gap-2">
          <label for="" class="text-sm text-white font-medium">Password</label>
          <input
            v-model="newPassword"
            :type="isShowPassword ? 'text' : 'password'"
            class="focus:outline-0 text-white h-[50px] w-full rounded-md pl-5 bg-[#2C353D]"
            placeholder="New password"
          />
          <img
            v-if="isShowPassword"
            src="~assets/icon/eye.svg"
            class="absolute w-[20px] h-[16px] right-[10px] bottom-[17px] cursor-pointer"
            alt=""
            @click="toggleShowPassword()"
          />
          <img
            v-else
            src="~assets/icon/eye-slash.svg"
            class="absolute w-[20px] h-[16px] right-[10px] bottom-[17px] cursor-pointer"
            alt=""
            @click="toggleShowPassword()"
          />
        </div>
        <div class="w-full relative flex flex-col gap-2">
          <label for="" class="text-sm text-white font-medium"
            >Password confirm</label
          >
          <input
            v-model="confirmPassword"
            :type="isShowPasswordConfirm ? 'text' : 'password'"
            class="focus:outline-0 text-white h-[50px] w-full rounded-md pl-5 bg-[#2C353D]"
            placeholder="Password confirm"
            :class="{ invalid: !validateMatchPassword }"
          />
          <img
            v-if="isShowPasswordConfirm"
            src="~assets/icon/eye.svg"
            class="absolute w-[20px] h-[16px] right-[10px] bottom-[17px] cursor-pointer"
            alt=""
            @click="toggleShowPasswordConfirm()"
          />
          <img
            v-else
            src="~assets/icon/eye-slash.svg"
            class="absolute w-[20px] h-[16px] right-[10px] bottom-[17px] cursor-pointer"
            alt=""
            @click="toggleShowPasswordConfirm()"
          />
        </div>
        <hr />
        <div class="flex justify-between w-full">
          <nuxt-link to="/auth/login" class="text-sm text-[#FF4B26] font-medium"
            >Go to sign in</nuxt-link
          >
        </div>
        <div class="flex justify-center items-center w-full">
          <button
            type="button"
            @click="submit"
            class="text-[16px] font-bold text-white bg-[#FF4401] rounded-[25px] py-[8px] px-[40px]"
          >
            Reset
          </button>
        </div>
      </form>
    </div>
    <modal-alert
      v-if="alert.isShowModal"
      v-bind="alert"
      @close="onCloseModal"
    />
  </div>
</template>
<script>
import ModalAlert from '~/components/Modal/ModalAlert.vue'

export default {
  comments: { ModalAlert },
  layout: 'empty',
  data() {
    return {
      isShowPassword: false,
      isShowPasswordConfirm: false,
      token: '',
      newPassword: '',
      confirmPassword: '',
      alert: {
        isShowModal: false,
        title: 'Xác nhận',
        type: 'failed',
        content: 'Cần được xác nhận',
        buttonCancelContent: '',
        buttonOkContent: 'Ok',
        typeSubmit: '',
      },
    }
  },

  computed: {
    validateMatchPassword() {
      if (this.confirmPassword) return this.confirmPassword === this.newPassword
      else return true
    },
    checkData() {
      return this.newPassword && this.confirmPassword
    },
  },
  created() {
    // console.log(this.$route.params.code);
    if (this.$route.params.code) {
      this.token = this.$route.params.code
    } else this.$router.push('/auth/login')
  },

  methods: {
    submit() {
        if(!this.checkData || !this.validateMatchPassword) {
            if (!this.checkData) {
          this.$notify({
            title: 'Lỗi',
            text: 'Vui lòng điền đầy đủ thông tin',
            type: 'error',
            group: 'foo',
          })
        } else {
          this.$notify({
            group: 'foo',
            title: 'Lỗi',
            text: 'Password confirm không khớp',
            type: 'error',
          })
        }
        }
        else {
            this.$axios.post(`/auth/reset-password/${this.token}`, {
                password: this.newPassword,
        }).then(res => {
          this.alert = {... this.alert,
            ...{
              isShowModal : true,
              title: 'Thành công',
              content:'Bạn đã đổi mật khẩu thành công, hãy đăng nhập để sử dụng trang web',
              type:'success',
              buttonOkContent:'Đến sign in',
              typeSubmit:'gotologin'
          }}
        }).catch((res) => {
          this.alert = {... this.alert,
            ...{
              isShowModal : true,
              title: 'Thất bại',
              content: res.response.data.message[0].message,
              type:'failed',
              buttonOkContent:'Đóng'
          }}
        })
        }
    },
    onCloseModal(typeSubmit) {
      switch (typeSubmit) {
        case 'gotologin':
          this.$router.push('/auth/login')
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
    toggleShowPassword() {
      this.isShowPassword = !this.isShowPassword
    },
    toggleShowPasswordConfirm() {
      this.isShowPasswordConfirm = !this.isShowPasswordConfirm
    },
  },
}
</script>
