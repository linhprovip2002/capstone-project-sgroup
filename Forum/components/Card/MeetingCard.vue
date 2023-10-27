<template>
    <div class="flex gap-2 items-center w-full h-full gap-3">
        <div class="p-1 flex flex-col items-center bg-[#2C353D] rounded-sm h-full justify-center">
            <p class="text-sm font-semibold text-blue-400">Feb</p>
            <p class="text-md font-bold text-white">7</p>
        </div>
        <div class="flex flex-col gap-1">
            <p class="text-white font-semibold text-sm">{{ title }}</p>
            <div class="flex items-center gap-2">
                <img :src="imageLink" alt="" class="w-4 h-4">
                <div class="text-[#97989D] text-[10px] font-semibold">{{ address }}</div>
            </div>
            <div class="flex gap-2">
                <div v-for="tag in tags" :key="tag.title" class="flex">
                    <SmallTagCard :tag="tag" />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import SmallTagCard from './SmallTagCard.vue';

export default {
    components: {
        SmallTagCard,
    },
    props: {
        title: String,
        imageLink: String,
        address: String,
        tags: {
            type: Array,
            default: () => []
        },
    }
}
</script>
