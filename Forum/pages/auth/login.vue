<template>
  <div
    class="relative flex justify-center flex-col items-center h-[100vh] bg-[#262D34]"
  >
    <div class="absolute w-full h-full bg-[#2C353D]"></div>
    <div class="z-10">
      <form
        action=""
        class="flex flex-col form gap-7 py-[60px] justify-center items-center w-[400px] rounded-md bg-[#1E252B] px-10"
        @keydown.enter="userLogin"
      >
        <div class="text-3xl font-bold text-white">Sign in</div>
        <div class="w-full flex flex-col gap-2">
          <label for="" class="text-sm text-white font-medium">Email</label>
          <input
            v-model="login.email"
            type="text"
            class="focus:outline-0 text-white h-[50px] w-full rounded-md pl-5 bg-[#2C353D]"
            placeholder="Email"
            :class="{ invalid: !validateEmail }"
            required
          />
        </div>
        <div class="w-full relative flex flex-col gap-2">
          <label for="" class="text-sm text-white font-medium">Password</label>
          <input
            v-model="login.password"
            :type="isShowPassword ? 'text' : 'password'"
            class="focus:outline-0 text-white h-[50px] w-full rounded-md pl-5 pr-8 bg-[#2C353D]"
            placeholder="Password"
            required
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
        <hr />
        <div class="flex justify-between w-full">
          <button
            class="text-sm text-white"
            type="button"
            @click.prevent="toSignup"
          >
            Create new account?
          </button>
          <button
            class="text-sm text-[#FF4B26] font-medium"
            type="button"
            @click.prevent="toFogotPassword"
          >
            Forgot password
          </button>
        </div>
        <div class="flex justify-center items-center w-full">
          <button
            type="button"
            class="text-[16px] font-bold text-white bg-[#FF4401] rounded-[25px] py-[8px] px-[40px]"
            @click="userLogin()"
          >
            Sign In
          </button>
        </div>
      </form>
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
import ModalAlert from '~/components/Modal/ModalAlert.vue'
export default {
  components: { ModalAlert },
  layout: 'empty',
  data() {
    return {
      alert: {
        isShowModal: false,
        title: 'Xác nhận',
        type: 'confirm',
        content: 'Cần được xác nhận',
        buttonCancelContent: '',
        buttonOkContent: 'Ok',
        typeSubmit: '',
      },
      login: {
        email: '',
        password: '',
      },
      isShowPassword: false,
    }
  },
  computed: {
    validateEmail() {
      const regex =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      if (this.login.email) return this.login.email.toLowerCase().match(regex)
      else return true
    },
    checkData() {
      return this.login.email && this.login.password
    },
  },
  methods: {
    toggleShowPassword() {
      this.isShowPassword = !this.isShowPassword
    },

    async userLogin() {
      if (!this.validateEmail || !this.checkData) {
        if (!this.validateEmail)
          this.$notify({
            group: 'foo',
            title: 'Lỗi',
            text: 'Vui lòng điền email đúng định dạng',
            type: 'error',
          })
        else
          this.$notify({
            group: 'foo',
            title: 'Lỗi',
            text: 'Vui lòng điền đầy đủ thông tin',
            type: 'error',
          })
      } else
        try {
          await this.$axios
            .post('/auth/login', {
              email: this.login.email.toLowerCase().trim(),
              password: this.login.password,
            })
            .then(async (res) => {
              const token = `Bearer ${res.data.token}`
              await this.$axios
                .get('/users/me', {
                  headers: {
                    Authorization: token,
                  },
                })
                .then((res) => {
                  localStorage.setItem('user', JSON.stringify(res.data))
                })
                .catch((err) => {
                  console.log(err)
                })
                
              localStorage.setItem('accessToken', token)
              this.$router.push('/')
            })
            .catch((err) => {
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
        } catch (err) {
          console.log('Lỗi nè ông già')
        }
    },
    toSignup() {
      this.$router.push('/auth/signup')
    },
    toFogotPassword() {
      this.$router.push('/auth/forgot-password')
    },
    onCloseModal(typeSubmit) {
      switch (typeSubmit) {
        case '':
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
@import '~assets/scss/variables.scss';
</style>
