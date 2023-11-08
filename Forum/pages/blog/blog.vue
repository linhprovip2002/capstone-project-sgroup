<template>
    <div class="p-5 flex flex-col gap-5 bg-gray-200 rounded-lg justify-center">
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
import constant from '~/constant';
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
                url: `http://${constant.base_url}/blogs/`,
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
        }
    }
}
</script>

