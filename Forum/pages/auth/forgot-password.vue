<template>
    <div class="relative flex justify-center flex-col items-center h-[100vh] bg-[#262D34]">
        <!-- <img src="~/assets/img/Cool-Background-GIF.gif" alt="" class="absolute w-full h-full"> -->
        <div class="absolute w-full h-full bg-[#2C353D]"></div>
        <div class="z-10">
            <form action="" class="flex flex-col form gap-7 py-[60px] justify-center items-center w-[400px] rounded-md bg-[#1E252B] px-10">
                <div class="text-3xl font-bold text-white">Forgot password</div>
                <div class="w-full flex flex-col gap-2">
                    <label for="" class="text-sm text-white font-medium">Email</label>
                    <input v-model="email" type="text" class="focus:outline-0 text-white h-[50px] w-full rounded-md pl-5 bg-[#2C353D]" placeholder="Email">
                </div>
                <hr>
                <div class="flex justify-between w-full">
                    <nuxt-link to="/auth/login" class="text-sm text-[#FF4B26] font-medium">Back to login</nuxt-link>
                </div>
                <div class="flex justify-center items-center w-full">
                    <button class="text-[16px] font-bold text-white bg-[#FF4401] rounded-[25px] py-[8px] px-[40px]" type="button" @click.prevent="SendCode">Send code</button>
                </div>
            </form>

        </div>
    </div>
</template>

<script>
// import axios from 'axios';
// import { routerKey } from 'vue-router';

export default {
    layout: 'empty',
    data() {
        return {
            email: "",
        };
    },
    methods: {
        SendCode() {
            this.$router.push('/auth/reset-password')
        }
    }
}
</script>

