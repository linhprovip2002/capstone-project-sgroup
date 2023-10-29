<template>
    <div class="relative flex justify-center flex-col items-center h-[100vh] bg-[#262D34]">
        <!-- <img src="~/assets/img/Cool-Background-GIF.gif" alt="" class="absolute w-full h-full"> -->
        <div class="absolute w-full h-full bg-[#2C353D]"></div>
        <div class="z-10">
            <form action="" class="flex flex-col form gap-7 py-[60px] justify-center items-center w-[400px] rounded-md bg-[#1E252B] px-10">
                <div class="text-3xl font-bold text-white">Reset Password</div>
                <div class="w-full flex flex-col gap-2">
                    <label for="" class="text-sm text-white font-medium">Token</label>
                    <input v-model="token" type="text" class="focus:outline-0 text-white h-[50px] w-full rounded-md pl-5 bg-[#2C353D]" placeholder="Token">
                </div>
                <div class="w-full flex flex-col gap-2">
                    <label for="" class="text-sm text-white font-medium">Password</label>
                    <input v-model="password" type="text" class="focus:outline-0 text-white h-[50px] w-full rounded-md pl-5 bg-[#2C353D]" placeholder="New password">
                </div>
                <div class="w-full flex flex-col gap-2">
                    <label for="" class="text-sm text-white font-medium">Password confirm</label>
                    <input v-model="password_confirm" type="password" class="focus:outline-0 text-white h-[50px] w-full rounded-md pl-5 bg-[#2C353D]" placeholder="Password">
                </div>
                <hr>
                <div class="flex justify-between w-full">
                    <nuxt-link to="/auth/login" class="text-sm text-[#FF4B26] font-medium" >Go to sign in</nuxt-link>
                </div>
                <div class="flex justify-center items-center w-full">
                    <button type="button" @click="submit" class="text-[16px] font-bold text-white bg-[#FF4401] rounded-[25px] py-[8px] px-[40px]">Reset</button>
                </div>
            </form>

        </div>
    </div>
</template>
<script>

export default {
    layout: 'empty',
    data(){
        return {
            token: '',
            newPassword: '',
            confirmPassword: ''
        }
    },
    methods: {
        submit(){
            this.$router.push('/auth/login')
            // axios({
            //     method: 'post',
            //     url: `http://${import.meta.env.VITE_APP_BASE_URL}:3000/auth/reset-password`,
            //     data: {
            //         email: this.email,
            //         newPassword: this.newPassword,
            //         passwordResetToken: this.token
            //     }
            // }).then((response) => {
            //     console.log(response);
            //     this.$notify({
            //         title: "Success",
            //         text: response.data.message,
            //         type: 'success'
            //     });
            //     return response.data;
            // }).catch((error) => {
            //     console.error('Login error:', error);
            //     this.$notify({
            //         title: "Error",
            //         text: error.response.data.message,
            //         type: 'error'
            //     });
            // });
        }
    }
}
</script>

