<template>
  <div class="flex justify-between">
    <div class="flex justify-between gap-5">
      <div class="flex justify-between items-center gap-1">
        <div class="text-gray-500">{{ like }}</div>
        <button>
          <img
            :src="
              yourReaction === 'like'
                ? require('~/assets/icon/like.svg')
                : require('~/assets/icon/not-like.svg')
            "
            alt=""
            class="w-5 h-5"
          />
        </button>
      </div>
      <div class="flex justify-between items-center gap-1">
        <div class="text-gray-500">{{ dislike }}</div>
        <button>
          <img
            :src="
              yourReaction === 'dislike'
                ? require('~/assets/icon/dislike.svg')
                : require('~/assets/icon/not-dislike.svg')
            "
            alt=""
            class="w-5 h-5"
          />
        </button>
      </div>
    </div>
    <div>
      <div class="text-gray-500">{{ comments }} Comments</div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    like: {
      type: Number,
      default: 0,
    },
    dislike: {
      type: Number,
      default: 0,
    },
    comments: {
      type: Number,
      default: 0,
    },
    yourReaction: {
      type: String,
      default: '',
    },
  },
  watch: {
    yourReaction() {
        console.log('Có thay đổi:',this.yourReaction);
    }
  },
  created() {
    console.log('Check thử nè:',this.yourReaction);
  },
  
}
</script>
