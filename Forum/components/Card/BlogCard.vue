<template>
  <div class="flex bg-[#262D34] gap-5 w-full p-5 mb-5 rounded-lg cursor-pointer">
    <img :src="imageLink[0]??'https://sgroupvn.org/_nuxt/img/logo-sgroup-symbol.ae66e60.png'" alt="" class="w-[80px] h-[80px] rounded-lg" />
    <div class="flex flex-col w-full justify-center h-[80px] gap-[14px]">
      <div id="title" class="flex justify-between">        
        <p class="text-white font-medium text-[16px]">{{ title }}</p>
        <p class="text-[#C5D0E6] text-[10px]">Author: {{ author }}</p>
      </div>
      
      <div class="flex justify-between items-center">
        <div class="flex justify-center gap-2">
          <span class="text-[#C5D0E6] text-[10px] leading-[20px]">Category:</span>
        <SmallTagCard :tag="category" v-if="category" />
      </div>
        <div class="flex gap-5">
          <p class="text-[#C5D0E6] text-[10px]">{{ like }} Likes</p>
          <p class="text-[#C5D0E6] text-[10px]">{{ dislike }} Dislikes</p>
          <p class="text-[#C5D0E6] text-[10px]">{{ time.split('T')[0] }}</p>
          <!-- <p class="text-[#C5D0E6] text-[10px]">{{ comments }} Comments</p> -->
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
      type: Array,
      default: () => []
    },
    title: {
      type: String,
      default: ''
    },
    author: {
      type: String,
      default: ''
    },
    tags: {
      type: Array,
      default: () => [],
    },
    time: String,
    like: {
      type: Number,
      default: 0
    },
    dislike: {
      type: Number,
      default: 0
    },
    comments: {
      type: Number,
      default: 0
    },
    category: {
      type: String,
      default: ''
    }
  },
}
</script>
