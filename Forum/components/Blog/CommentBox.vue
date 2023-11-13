<template>
  <div class="flex-col relative flex justify-end">
    <TextEditor :content="content" @textChange="updateContent" />
    <div @click="send" class="send p-2 bg-white flex justify-end">
      <img
        src="~/assets/icon/send.svg"
        class="w-6 h-6 mr-[10px] cursor-pointer"
      />
    </div>
  </div>
</template>
<script>
import TextEditor from '../../components/Blog/TextEditor.vue'
export default {
  components: { TextEditor },

  data() {
    return {
      content: '',
    }
  },
  methods: {
    updateContent(value) {
      this.content = value
    },
    send() {
      this.$emit('comment',this.content)
      this.content=''
    }
  },
}
</script>

<style lang="scss" scoped></style>
