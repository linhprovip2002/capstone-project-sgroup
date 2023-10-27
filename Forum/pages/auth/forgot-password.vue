<template>
    <div class="flex justify-center flex-col items-center h-[100vh] bg-[#1E252B]">
        <!-- <img src="~/assets/img/Cool-Background-GIF.gif" alt="" class="absolute w-full h-full"> -->
        <div class="absolute w-full h-full bg-[#26262626]"></div>
        <form action="" class="relative flex flex-col form gap-5 justify-center items-center w-[400px] rounded-md bg-[#262D34] px-10 py-8">
            <div class="text-2xl font-bold text-white">Forgot Password?</div>
            <div class="w-full">
                <label for="text-white font-medium">Email</label>
                <input type="text" class="focus:outline-0 text-white text-md h-[50px] w-full rounded-md pl-5 bg-[#2C353D]" placeholder="Email address">
            </div>
            <div class="flex items-center w-full justify-between">
                <div class="text-2xl font-bold text-white" type="submit">Send code</div>
                <button @click.prevent="submitEmail">
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
</template>



<script>
// import axios from 'axios';

export default {
    layout: 'empty',
    data(){
    },
    methods: {
        submitEmail(){
            // axios({
            //     method: 'post',
            //     url: `${import.meta.env.VITE_APP_BASE_URL}/auth/forgot-password`,
            //     data: {
            //         mailTo: this.email
            //     }
            // }).then((response) => {
            //     console.log(response);
            //     this.$notify({
            //         title: "Success",
            //         text: response.data.message,
            //         type: 'success'
            //     });
            //     //this.$router.push('/admin/user.vue')
            //     this.$emit('toResetPassword');
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

