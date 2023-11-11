<template>
  <div
    class="relative flex justify-center flex-col items-center h-[100vh] bg-[#262D34]"
  >
    <div class="absolute w-full h-full bg-[#2C353D]"></div>
    <div class="z-10">
      <form
        action=""
        class="flex flex-col form gap-7 py-[60px] justify-center items-center w-[400px] rounded-md bg-[#1E252B] px-10"
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
            class="text-sm text-[#676767]"
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
  </div>
</template>

<script>
// import axios from 'axios'
// import constant from '~/constant';
// import { routerKey } from 'vue-router';

export default {
  layout: 'empty',
  data() {
    return {
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
  },
  methods: {
    toggleShowPassword() {
      this.isShowPassword = !this.isShowPassword
    },
    async userLogin() {
      if (!this.validateEmail) {
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
              email: this.login.email,
              password: this.login.password,
            })
            .then((res) => {
              localStorage.setItem(
                'accessToken',
                `Bearer ${res.data.token}`
              )
              this.$router.push('/')
            })
            .catch((err) => {
              console.log('Lỗi:', err.response)
              this.$notify({
                group: 'foo',
                title:'Lỗi',
                text:err.response.data.error,
                type: 'error'
              })
            })
        } catch (err) {
          console.log('Lỗi nè ông già');
        }
    },
    toSignup() {
      this.$router.push('/auth/signup')
    },
    toFogotPassword() {
      this.$router.push('/auth/forgot-password')
    },
  },
}
</script>

<style lang="scss" scoped>
@import '~assets/scss/variables.scss';
</style>
