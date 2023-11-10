<template>
    <div class="p-10 flex flex-col gap-5 bg-gray-200 rounded-lg justify-center">
        <div class="text-6xl font-bold">{{ title }}</div>
        <div v-html="content"></div>
        <div class="h-[1px] w-full bg-gray-300"></div>
        <ReactAndComment :like="blog.like" :dislike="blog.dislike"  />
        <div class="h-[1px] w-full bg-gray-300"></div>
        <div class="relative bg-white rounded-lg">
            <textarea name="" id="" cols="30" rows="5" class="w-full px-5 pt-5 pb-6 focus:outline-none rounded-lg" placeholder="Bình luận"></textarea>
            <div class="py-2 px-5 flex justify-end">
                <img src="~/assets/icon/send.svg" alt="" class="w-10 h-10 right-4">
            </div>
        </div>
        <div v-for="c in blog.comments" :key="c">
            <CommentCard 
                :comment="c.content"
                :user="c.userId"
            />
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import CommentCard from '~/components/Card/CommentCard.vue';
import ReactAndComment from '~/components/Blog/ReactAndComment.vue';
export default {
    components: {
        CommentCard,
        ReactAndComment
    },
    data() {
        return {
            title: 'New Company Rising',
            content: '<p><sub>sdlaknflnsdfklndfs</sub></p><p class="ql-align-center ql-indent-5"><strong>oeinlkfnsldnf</strong></p><p>onsdlnlkv lknsd</p><p class="ql-align-right">k ldks l f;fsld alkf fds</p><blockquote>kna sd;lnlkf;lskndflnla;nd;lfnlsnldkfnldsn;lf</blockquote><pre class="ql-syntax" spellcheck="false">ksnknklnvlks</pre><h1><span style="background-color: rgb(230, 0, 0);">sdfsadfsdfee</span></h1><p><br></p><p><span style="color: rgb(230, 0, 0);">iugklnononoin</span></p><p><br></p><p><img src="https://res.cloudinary.com/dvznvebzi/image/upload/v1698921611/signed_upload_demo_form/sfazz0jx6lzurhoym1rw.png" height="250" width="250"></p>'.replace(/"/g, "'"),
            blog: {
                like: 20,
                dislike: 30,
                comments: [
                    {
                        userId: "1",
                        content: 'Great',
                    },
                    {
                        userId: "2",
                        content: 'Wow',
                        
                    },
                    {
                        userId: "3",
                        content: 'Wtf',
                    }
                    
                ]
            }
        }
    },
    props: {
        // blog: {
        //     type: Object,
        //     default: () => {}
        // }
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

