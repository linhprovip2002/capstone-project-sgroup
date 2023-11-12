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
        <div class="text-3xl font-bold text-white">Forgot password</div>
        <div class="w-full flex flex-col gap-2">
          <label for="" class="text-sm text-white font-medium">Email</label>
          <input
            v-model="email"
            type="text"
            class="focus:outline-0 text-white h-[50px] w-full rounded-md pl-5 bg-[#2C353D]"
            placeholder="Email"
            :class="{ invalid: !validateEmail }"
          />
        </div>
        <hr />
        <div class="flex justify-between w-full">
          <nuxt-link to="/auth/login" class="text-sm text-[#FF4B26] font-medium"
            >Back to login</nuxt-link
          >
        </div>
        <div class="flex justify-center items-center w-full">
          <button
            class="text-[16px] font-bold text-white bg-[#FF4401] rounded-[25px] py-[8px] px-[40px]"
            type="button"
            @click.prevent="SendCode"
          >
            Send code
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
    components:{ModalAlert},
  layout: 'empty',
  data() {
    return {
      email: '',
      alert : {
        isShowModal: false,
        title: '',
        type: 'failed',
        content: '',
        buttonCancelContent: '',
        buttonOkContent: '',
        typeSubmit: '',
      }
    }
  },
  computed: {
    validateEmail() {
      const regex =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      if (this.email) return this.email.toLowerCase().match(regex)
      else return true
    },
  },
  methods: {
    SendCode() {
      if (!this.email || !this.validateEmail) {
        if (!this.email) {
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
            text: 'Vui lòng điền đúng định dạng email',
            type: 'error',
          })
        }
      } else {
        this.$axios
          .post(`/auth/forgot-password`, {
            email: this.email.toLowerCase().trim(),
          })
          .then((res) => {
            this.alert = {
              ...this.alert,
              ...{
                isShowModal: true,
                title: 'Thành công',
                content:
                  `Chúng tôi đã gửi đến email của bạn - ${this.email.toLowerCase()}, vui lòng kiểm tra email và làm theo hướng dẫn`,
                type: 'success',
                buttonOkContent: 'Đến sign in',
                typeSubmit: 'gotologin',
              },
            }
          })
          .catch((res) => {
            this.alert = {
              ...this.alert,
              ...{
                isShowModal: true,
                title: 'Thất bại',
                content: res.response.data.error,
                type: 'failed',
                buttonOkContent: 'Đóng',
              },
            }
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
