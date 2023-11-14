<template>
    <div class="flex justify-between">
        <div class="flex justify-between gap-5">
            <div class="flex justify-between items-center gap-1">
                <div class="text-gray-500">{{ like }}</div>
                <button><img src="~/assets/icon/liked.svg" alt="" class="w-5 h-5"></button>
            </div>
            <div class="flex justify-between items-center gap-1">
                <div class="text-gray-500">{{ dislike }}</div>
                <button><img src="~/assets/icon/disliked.svg" alt="" class="w-5 h-5"></button>
            </div>
        </div>
        <div>
            <div class="text-gray-500">{{comments}} Comments</div>
        </div>
    </div>
</template>

<script>
export default{
    props: {
        like: Number,
        dislike: Number,
        comments: Number,
    }
}
</script>