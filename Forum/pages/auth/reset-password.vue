<template>
    <div class="relative flex justify-center flex-col items-center h-[100vh] bg-[#1E252B]">
        <!-- <img src="~/assets/img/Cool-Background-GIF.gif" alt="" class="absolute w-full h-full"> -->
        <div class="absolute w-full h-full bg-[#26262626]"></div>
        <div class="z-20">
            <form action="" class="flex flex-col gap-5 justify-center items-center w-[400px] rounded-md bg-[#262D34] px-10 py-8">
                <div class="text-2xl font-bold text-white">Enter your new password</div>
                <input v-model="email" type="text" class="text-white h-[50px] w-full rounded-md pl-5 bg-[#2C353D]" placeholder="Email address">
                <input v-model="token" type="text" class="text-white h-[50px] w-full rounded-md pl-5 bg-[#2C353D]" placeholder="Token">
                <input v-model="newPassword" type="password" class="text-white h-[50px] w-full rounded-md pl-5 bg-[#2C353D]" placeholder="New password">
                <input v-model="confirmPassword" type="password" class="text-white h-[50px] w-full rounded-md pl-5 bg-[#2C353D]" placeholder="Confirm password">
                <div class="flex justify-between w-full items-center">
                    <div class="text-2xl font-bold text-white">Submit</div>
                    <button @click.prevent="submit">
                        <svg xmlns="http://www.w3.org/2000/svg" width="102" height="103" viewBox="0 0 102 103" fill="none">
                            <g filter="url(#filter0_d_3_32)">
                                <circle cx="51.5" cy="41.5" r="25.5" fill="#FF4B26"/>
                            </g>
                            <path d="M44 41H58" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M51 34L58 41L51 48" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            <defs>
                                <filter id="filter0_d_3_32" x="0" y="0" width="103" height="103" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                                <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                                <feOffset dy="10"/>
                                <feGaussianBlur stdDeviation="13"/>
                                <feColorMatrix type="matrix" values="0 0 0 0 0.905882 0 0 0 0 0.376471 0 0 0 0 0.278431 0 0 0 0.47 0"/>
                                <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_3_32"/>
                                <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_3_32" result="shape"/>
                                </filter>
                            </defs>
                        </svg>
                    </button>
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
            email: '',
            token: '',
            newPassword: '',
            confirmPassword: ''
        }
    },
    methods: {
        submit(){
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

