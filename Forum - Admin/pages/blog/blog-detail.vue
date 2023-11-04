<template>
    <div class="p-10 flex flex-col gap-5 bg-gray-200 rounded-lg justify-center">
        <div class="text-6xl font-bold">{{ title }}</div>
        <div v-html="content"></div>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    layout: 'topandfooter',
    data() {
        return {
            title: 'New Company Rising',
            content: '<p><sub>sdlaknflnsdfklndfs</sub></p><p class="ql-align-center ql-indent-5"><strong>oeinlkfnsldnf</strong></p><p>onsdlnlkv lknsd</p><p class="ql-align-right">k ldks l f;fsld alkf fds</p><blockquote>kna sd;lnlkf;lskndflnla;nd;lfnlsnldkfnldsn;lf</blockquote><pre class="ql-syntax" spellcheck="false">ksnknklnvlks</pre><h1><span style="background-color: rgb(230, 0, 0);">sdfsadfsdfee</span></h1><p><br></p><p><span style="color: rgb(230, 0, 0);">iugklnononoin</span></p><p><br></p><p><img src="https://res.cloudinary.com/dvznvebzi/image/upload/v1698921611/signed_upload_demo_form/sfazz0jx6lzurhoym1rw.png" height="250" width="250"></p>'.replace(/"/g, "'"),
        }
    },
    mounted(){
        axios({
                method: 'get',
                url: `http://${process.env.BASE_URL}:3000/auth/reset-password`,
            }).then((response) => {
                console.log(response);
                this.$notify({
                    title: "Success",
                    text: response.data.message,
                    type: 'success'
                });
                const data = response.data;
                this.content = data.content;
                this.title = data.title;
            }).catch((error) => {
                console.error('Login error:', error);
                this.$notify({
                    title: "Error",
                    text: error.response.data.message,
                    type: 'error'
                });
            });
    }
}
</script>

