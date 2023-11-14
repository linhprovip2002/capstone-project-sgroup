<template>
  <div class="flex-col relative flex justify-end">
    <TextEditor :content="content" @textChange="updateContent" />
    <div
      class="send p-2 flex justify-end bg-[#EBEDF0] border-[1px] border-[#ccc] border-t-0"
      @click="send"
    >
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
  props: {
    idComment: {
      type: String,
      default: '',
    },
  },
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
      this.$emit('comment', this.idComment ,this.content)
      this.content = ''
    },
  },
}
</script>

<style lang="scss" scoped></style>
