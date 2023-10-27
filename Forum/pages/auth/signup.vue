<template>
    <div class="relative flex justify-center flex-col items-center h-[100vh] bg-[#1E252B]">
        <!-- <img src="~/assets/img/Cool-Background-GIF.gif" alt="" class="absolute w-full h-full"> -->
        <div class="absolute w-full h-full bg-[#26262626]"></div>
        <div class=" z-20">
            <form action="" class="flex flex-col gap-5 justify-center items-center w-[400px] rounded-md bg-[#262D34] px-10 py-8">
                <div class="text-3xl font-bold text-white">Sign up</div>
                <div class="w-full">
                    <label for="" class="text-white font-medium">Username or Email</label>
                    <input v-model="username" type="text" class="text-md focus:outline-0 text-white h-[50px] w-full rounded-md pl-5 bg-[#2C353D]" placeholder="Username or Email">
                </div>
                <div class="w-full">
                    <label for="" class="text-white font-medium">Password</label>
                    <input v-model="password" type="password" class="text-md focus:outline-0 text-white h-[50px] w-full rounded-md pl-5 bg-[#2C353D]" placeholder="Password">
                </div>
                <div class="w-full">
                    <label for="" class="text-white font-medium">Confirm Password</label>
                    <input v-model="confirmPassword" type="password" class="text-md focus:outline-0 text-white h-[50px] w-full rounded-md pl-5 bg-[#2C353D]" placeholder="Confirm Password">
                </div>
                <div class="mt-4 flex justify-between w-full items-center">
                    <div class="text-3xl text-white font-bold">Register</div>
                    <button @click.prevent="submit">
                        <img src="~/assets/icon/button.svg">
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
// import axios from 'axios';

export default {
    layout: 'empty',
    data() {
        return {
            username: "",
            password: "",
            confirmPassword: ""
        };
    },
    methods: {
        submit() {
            // axios({
            //     method: 'post',
            //     url: `http://${import.meta.env.VITE_APP_BASE_URL}:3000/auth/register`,
            //     data: {
            //         username: this.username,
            //         name: this.username,
            //         password: this.password,
            //         age: this.age,
            //         email: this.email,
            //         gender: this.gender
            //     }
            // }).then((response) => {
            //     if (response.data.token) {
            //         localStorage.setItem('accessToken', JSON.stringify(response.data.token));
            //         // Access the token directly from localStorage
            //         const accessToken = JSON.parse(localStorage.getItem('accessToken'));
            //         console.log('Access Token:', accessToken);
            //     }
            //     console.log('Signup successfully');
            //     this.$notify({
            //         title: "Welcome",
            //         text: "Hello " + this.username,
            //         type: 'success'
            //     });
            //     return response.data;
            // }).catch((error) => {
            //     console.error('Signup error:', error);
            //     this.$notify({
            //         title: "Error",
            //         text: error.response.data.message,
            //         type: 'error'
            //     });
            // });
        },
        toLogin(){
            console.log(this.$route)
            this.$router.push({ path: '/auth/login' })
        }
    }
}
</script>

