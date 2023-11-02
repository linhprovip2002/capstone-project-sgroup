<template>
    <div class="relative p-5 flex flex-col gap-5 bg-gray-200 rounded-lg justify-center">
        <button class="flex justify-end" @click="cancel">
            <img src="~/assets/icon/x.svg" alt="" class="w-[30px] h-[30px] bg-gray-300 rounded-full p-1">
        </button>
        <div class="flex flex-col gap-1">
            <label class="text-sm font-medium" for="">Tiêu đề</label>
            <input type="text" class="bg-gray-200 border-2 border-gray-300 text-sm p-2 rounded-sm text-gray-800" placeholder="Tiêu đề">
        </div>
        <div class="flex flex-col gap-1">
            <label class="text-sm font-medium" for="">Gắn thẻ</label>
            <input type="text" class="bg-gray-200 border-2 border-gray-300 text-sm p-2 rounded-sm text-gray-800" placeholder="Gắn thẻ">
        </div>
        <TextEditor v-model="content" />
        <button class="bg-gray-800 p-2 text-white w-[200px] rounded-lg m-auto" @click="submit">Xuất bản</button>
    </div>
</template>

<script>
import axios from 'axios'
import TextEditor from '../../components/Blog/TextEditor.vue';
export default {
    layout: 'topandfooter',
    components: {
        TextEditor,
    },
    data() {
        return {
            title: '',
            content: '',
        }
    },
    methods: {
        submit(){
            axios({
                method: 'post',
                url: `http://${process.env.BASE_URL}:3000/auth/reset-password`,
                data: {
                    title: this.title,
                    content: this.content,
                }
            }).then((response) => {
                console.log(response);
                this.$notify({
                    title: "Success",
                    text: response.data.message,
                    type: 'success'
                });
                return response.data;
            }).catch((error) => {
                console.error('Login error:', error);
                this.$notify({
                    title: "Error",
                    text: error.response.data.message,
                    type: 'error'
                });
            });
        },
        cancel(){
            this.$emit('cancel');
        }
    }
}
</script>

