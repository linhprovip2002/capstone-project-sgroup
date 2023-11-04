<template>
    <div class="flex gap-2 items-center w-[200px] h-full gap-2">
        <img :src="imageLink" class="w-[25px] h-[25px]">
        <div class="flex flex-col gap-0">
            <p class="text-white font-semibold text-sm">{{ tag }}</p>
            <p class="text-[#97989D] font-medium text-xs">{{ description }}</p>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        imageLink: String, // Specify it as a string
        tag: String,
        description: String,
    }
}
</script>
