<template>
  <div class="flex bg-[#262D34] gap-5 w-full p-5 my-5 rounded-lg cursor-pointer">
    <img :src="imageLink" alt="" class="w-[80px] h-[80px]" />
    <div class="flex flex-col justify-between w-full h-full gap-2">
      <div id="title" class="flex justify-between">
        <p class="text-white font-medium text-sm">{{ title }}</p>
        <img src="~/assets/icon/heart.svg" alt="" />
      </div>
      <div class="flex gap-2">
        <div v-for="tag in tags" :key="tag.title" class="flex">
          <SmallTagCard :tag="tag" />
        </div>
      </div>
      <div class="flex justify-between items-center">
        <p class="text-white text-sm font-semibold">{{ author }}</p>
        <div class="flex gap-5">
          <p class="text-[#C5D0E6] text-[10px]">{{ like }} Likes</p>
          <p class="text-[#C5D0E6] text-[10px]">{{ dislike }} Dislikes</p>
          <p class="text-[#C5D0E6] text-[10px]">{{ comments }} Comments</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SmallTagCard from './SmallTagCard.vue'

export default {
  components: {
    SmallTagCard,
  },
  props: {
    imageLink: {
        type: String,
        default:''
    },
    title: {
        type:String,
        default:''
    },
    author: {
        type: String,
        default:''
    },
    tags: {
      type: Array,
      default: () => [],
    },
    time: String,
    like: {
        type:Number,
        default:0
    },
    dislike: {
        type:Number,
        default:0
    },
    comments: {
        type:Number,
        default:0
    },
  },
}
</script>
