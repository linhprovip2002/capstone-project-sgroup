<template>
    <div class="comment-card text-xl text-[#858EAD] font-medium flex gap-[10px] w-full">
        <div class="w-[40px] h-[40px] overflow-hidden rounded-full ql-snow">
            <img :src="user.profileImage ?? require('~/assets/img/avt.png')" alt="" class="object-cover w-full h-full">
        </div>
        <div class="bg-[#EBEDF0] w-full rounded-lg ql-editor relative ">
            <div class="text-[#000] text-[13px] font-semibold relative author" @click="GoToDetails(user._id)">{{
                user.firstName ?? '' }} {{ user.lastName ?? '' }}</div>
            <p class="text-[#050505] text-[15px] font-normal " v-html="comment"></p>
        </div>
        <div class="reply-comment"></div>
        <!-- <ReactAndComment :like="comment.like" :dislike="comment.dislike" :comments="comment.comments" /> -->
    </div>
</template>
<script>
// import ReactAndComment from '../Blog/ReactAndComment.vue';
export default {
    components: {
        // ReactAndComment
    },
    props: {
        comment: {
            type: String,
            default: ''
        },
        user: {
            type: Object,
            default: () => { }
        }
    },
    methods: {
        GoToDetails(id) {
            this.$router.push(`/user/${id}`)
        },
    }
}
</script>
<style lang="scss" scoped>
.comment-card {
    &:deep() {
        .ql-editor {
            min-height: unset;
            font-size: unset;
        }
    }

    .author {
        display: block;
        height: 0px;
        cursor: pointer;
    }
}
</style>