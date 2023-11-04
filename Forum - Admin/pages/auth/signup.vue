<template>
    <div class="relative flex justify-center flex-col items-center h-[100vh] bg-[#262D34]">
        <!-- <img src="~/assets/img/Cool-Background-GIF.gif" alt="" class="absolute w-full h-full"> -->
        <div class="absolute w-full h-full bg-[#2C353D]"></div>
        <div class="z-10">
            <form action="" class="flex flex-col form gap-7 py-[60px] justify-center items-center w-[400px] rounded-md bg-[#1E252B] px-10">
                <div class="text-3xl font-bold text-white">Sign up</div>
                <div class="w-full flex flex-col gap-2">
                    <label for="" class="text-sm text-white font-medium">Email</label>
                    <input v-model="username" type="text" class="focus:outline-0 text-white h-[50px] w-full rounded-md pl-5 bg-[#2C353D]" placeholder="Email">
                </div>
                <div class="w-full flex flex-col gap-2">
                    <label for="" class="text-sm text-white font-medium">Password</label>
                    <input v-model="password" type="text" class="focus:outline-0 text-white h-[50px] w-full rounded-md pl-5 bg-[#2C353D]" placeholder="Password">
                </div>
                <div class="w-full flex flex-col gap-2">
                    <label for="" class="text-sm text-white font-medium">Password confirm</label>
                    <input v-model="password_confirm" type="password" class="focus:outline-0 text-white h-[50px] w-full rounded-md pl-5 bg-[#2C353D]" placeholder="Password confirm">
                </div>
                <hr>
                <div class="flex justify-between w-full">
                    <button class="text-sm text-[#FF4B26] font-medium" @click.prevent="toSignin" >Go to sign in</button>
                </div>
                <div class="flex justify-center items-center w-full">
                    <button type="button" @click="submit" class="text-[16px] font-bold text-white bg-[#FF4401] rounded-[25px] py-[8px] px-[40px]">Sign up</button>
                </div>
            </form>

        </div>
    </div>
</template>

<script>
export default {
    layout: 'empty',
    data() {
        return {
            username: '',
            password: '',
            password_confirm:''
        };
    },
    methods: {
        submit() {
            this.$router.push('/auth/login')

        },
        toSignin(){
            this.$router.push('/auth/login')
        },
        toFogotPassword(){
            this.$router.push('/auth/forgot-password');
        }
    }
}
</script>

