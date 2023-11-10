<template>
    <div class="text-xl text-[#858EAD] font-medium flex gap-5">
        <div>
            <img src="~/assets/img/avatar.jpg" alt="" class="w-10 h-10 rounded-full">
        </div>
        <div class="px-5 py-3 text-[16px] bg-white w-full rounded-lg">
            <p>{{ user }}</p> 
            <p>{{ comment }}</p> 
        </div>
        <ReactAndComment :like="comment.like" :dislike="comment.dislike" :comments="comment.comments" />
    </div>
</template>
<script>
import axios from 'axios';
import ReactAndComment from '../Blog/ReactAndComment.vue';
export default{
    components: {
        ReactAndComment
    },
    props: {
        comment: String,
        user: String
    },
    mounted(){
        axios({
            method: 'get',
            url: ''
        })
    }
}
</script>