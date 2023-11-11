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
        <div class="text-3xl font-bold text-white">Sign up</div>
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
        <div class="w-full flex flex-col gap-2">
          <label for="" class="text-sm text-white font-medium">Password</label>
          <input
            v-model="password"
            type="password"
            class="focus:outline-0 text-white h-[50px] w-full rounded-md pl-5 bg-[#2C353D]"
            placeholder="Password"
          />
        </div>
        <div class="w-full flex flex-col gap-2">
          <label for="" class="text-sm text-white font-medium"
            >Password confirm</label
          >
          <input
            v-model="password_confirm"
            type="password"
            class="focus:outline-0 text-white h-[50px] w-full rounded-md pl-5 bg-[#2C353D]"
            placeholder="Password confirm"
            :class="{ invalid: !validateMatchPassword }"
          />
        </div>
        <hr />
        <div class="flex justify-between w-full">
          <button
            class="text-sm text-[#FF4B26] font-medium"
            @click.prevent="toSignin"
          >
            Go to sign in
          </button>
        </div>
        <div class="flex justify-center items-center w-full">
          <button
            type="button"
            @click="submit"
            class="text-[16px] font-bold text-white bg-[#FF4401] rounded-[25px] py-[8px] px-[40px]"
          >
            Sign up
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import constant from '~/constant'
export default {
  layout: 'empty',
  data() {
    return {
      email: '',
      password: '',
      password_confirm: '',
    }
  },
  computed: {
    validateEmail() {
      const regex =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      if (this.email) return this.email.toLowerCase().match(regex)
      else return true
    },
    validateMatchPassword() {
      if (this.password_confirm) return this.password_confirm === this.password
      else return true
    },
  },
  methods: {
    submit() {
      console.log(constant.base_url)
      axios({
        mode: 'no-cors',
        method: 'post',
        url: `${constant.base_url}/auth/register`,
        data: {
          email: this.email,
          password: this.password,
        },
      })
        .then((response) => {
          console.log(response)
          this.$notify({
            title: 'Success',
            text: response.data.message,
            type: 'success',
          })
          this.$router.push('/auth/login')
        })
        .catch((error) => {
          console.error('Login error:', error)
          this.$notify({
            title: 'Error',
            text: error.response.data.message,
            type: 'error',
          })
        })
    },
    toSignin() {
      this.$router.push('/auth/login')
    },
    toFogotPassword() {
      this.$router.push('/auth/forgot-password')
    },
  },
}
</script>
