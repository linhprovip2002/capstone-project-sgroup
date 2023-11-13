<template>
    <div class="text-xl text-[#858EAD] font-medium flex gap-[10px]">
        <div>
            <img src="~/assets/img/avt.png" alt="" class="w-[40px] h-[40px] object-contain rounded-full">
        </div>
        <div class="px-4 py-2 text-[16px] bg-[#EBEDF0] w-full rounded-lg">
            <p class="text-[#000] text-[13px] font-semibold" >{{ user.firstName??'' }} {{ user.lastName??'' }}</p> 
            <p class="text-[#050505] text-[15px] font-normal" v-html="comment" ></p> 
        </div>
        <!-- <ReactAndComment :like="comment.like" :dislike="comment.dislike" :comments="comment.comments" /> -->
    </div>
</template>
<script>
// import ReactAndComment from '../Blog/ReactAndComment.vue';
export default{
    components: {
        // ReactAndComment
    },
    props: {
        comment: {
            type: String,
            default:''
        },
        user: {
            type: Object,
            default: ()=> {}
        }
    },
    mounted(){
    }
}
</script>