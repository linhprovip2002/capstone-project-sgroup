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
        <div class="text-3xl font-bold text-white">Sign in</div>
        <div class="w-full flex flex-col gap-2">
          <label for="" class="text-sm text-white font-medium">Email</label>
          <input
            v-model="login.username"
            type="text"
            class="focus:outline-0 text-white h-[50px] w-full rounded-md pl-5 bg-[#2C353D]"
            placeholder="Email"
          />
        </div>
        <div class="w-full flex flex-col gap-2">
          <label for="" class="text-sm text-white font-medium">Password</label>
          <input
            v-model="login.password"
            type="password"
            class="focus:outline-0 text-white h-[50px] w-full rounded-md pl-5 bg-[#2C353D]"
            placeholder="Password"
          />
        </div>
        <hr />
        <div class="flex justify-between w-full">
          <button class="text-sm text-[#676767]" @click.prevent="toSignup">
            Create new account?
          </button>
          <button
            class="text-sm text-[#FF4B26] font-medium"
            type="button"
            @click.prevent="toFogotPassword"
          >
            Forgot password
          </button>
          <button type="button" @click="checklogin">Check</button>
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
        username: '',
        password: '',
      },
    }
  },
  methods: {
    checklogin() {
      console.log('login:', this.$auth.loggedIn)
      console.log(typeof localStorage.getItem('auth._token.local'))
    },
    // submit() {
    //     this.$router.push('/')
    //     axios({
    //         method: 'post',
    //         url: `${constant.base_url}/auth/login`,
    //         data: {
    //             email: this.username,
    //             password: this.password
    //         }
    //     }).then((response) => {
    //         if (response.data.token) {
    //             localStorage.setItem('accessToken', JSON.stringify(response.data.token));
    //             // Access the token directly from localStorage
    //             const accessToken = JSON.parse(localStorage.getItem('accessToken'));
    //             console.log('Access Token:', accessToken);
    //         }
    //         console.log('Login successfully');
    //         // this.$notify({
    //         //     title: "Welcome Back",
    //         //     text: "Hello " + this.username,
    //         //     type: 'success'
    //         // });
    //         // this.$router.push({path: '/', query: { page: 1, paging: 3 }});
    //         this.$router.push('/');
    //         return response.data;
    //     }).catch((error) => {
    //         console.error('Login error:', error);
    //         // this.$notify({
    //         //     title: "Error",
    //         //     text: error.response.data.message,
    //         //     type: 'error'
    //         // });
    //     });
    // },
    async userLogin() {
      alert('Login ?')
      try {
        const response = await this.$auth.loginWith('local', {
          data: {
            email: this.login.username,
            password: this.login.password,
          },
        })
        console.log(response)
      } catch (err) {
        console.log(err)
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
