<template>
    <div class="blog-list text-white font-medium p-5 w-full bg-[#262d34] rounded-[16px]">
        <div class="blog-list-row">
            <div class="image"></div>
            <div class="author">Author</div>
            <div class="title">Title</div>
            <div class="createdAt">Created Time</div>
            <div class="button"></div>
        </div>
        <div v-for="n in news" :key="n._id" class="blog-list-row blog-list-information cursor-pointer" @click="toBlogDetail(n._id)">
            <!-- <BlogCard
              :image-link="n.imageLink"
              :author="n.author"
              :comments="n.comments"
              :dislike="n.dislike"
              :like="n.like"
              :tags="n.tags"
              :title="n.title"
              :time="n.time"
            /> -->
            <div class="image">
                <img :src="n.blogImage[0]?n.blogImage[0]:defaultImage" alt="" >
            </div>
            <div class="author">{{ getName(n.userId?.firstName, n.userId?.lastName) }}</div>
            <div class="title">{{ n.title }}</div>
            <div class="createdAt">{{ formatDay(n.createdAt) }}</div>
            <div class="button">
                <button @click.stop="approve(n._id)" class="w-[100px] mx-2 rounded-lg bg-green-500 px-5 py-2"
                    v-if="n.status === 'pending'">Approve</button>
                <button @click.stop="revert(n._id)" class="w-[100px] mx-2 rounded-lg bg-yellow-500 px-5 py-2"
                    v-if="n.status === 'approved'">Revert</button>
                <button @click.stop="reject(n._id)" class="w-[100px] mx-2 rounded-lg bg-red-500 px-5 py-2">Reject</button>
            </div>
        </div>
        <Pagination :count="count" @changePage="changePage" :recordsPerPage="recordsPerPage"/>
    </div>
</template>

<script>
import { format } from 'date-fns'
import axios from 'axios'
import Pagination from '~/components/Pagination.vue'
import constant from '~/constant'
export default {
    components: {
        Pagination
    },
    props: {
        news: [],
        count: Number,
        recordsPerPage: Number,
    },
    data() {
        return{
            defaultImage: require('~/assets/img/logosgroup.png')
        }
    },
    methods: {
        formatDay(date) {
            console.log(date)
            if (date) {
                const jsDate = new Date(date);

                return format(jsDate, 'dd/MM/yyyy');
            }
            return '';
        },
        approve(id) {
            this.$emit('setLoading')
            const authorization = localStorage.getItem('accessToken')
            console.log(`${constant.base_url}/blogs/${id}/review`)
            axios({
                method: 'patch',
                url: `${constant.base_url}/blogs/${id}/review`,
                headers: {
                    Authorization: authorization
                },
                data: {
                    status: "APPROVED"
                },
            })
                .then(res => {
                    console.log(res)
                    this.$notify({
                        title: 'Thành công',
                        text: 'Duyệt thành công',
                        type: 'success',
                        group: 'foo',
                    })
                    this.$emit('reload')
                })
                .catch(err => {
                    console.log(err)
                    this.$notify({
                        title: 'Thất bại',
                        text: 'Duyệt thất bại: ' + err.response.data.message,
                        type: 'success',
                        group: 'foo',
                    })
                })
                .finally(() => {
                    this.$emit('doneLoading')
                })
        },
        revert(id) {
            this.$emit('setLoading')
            const authorization = localStorage.getItem('accessToken')
            axios({
                method: 'patch',
                url: `${constant.base_url}/blogs/${id}/review`,
                headers: {
                    Authorization: authorization
                },
                data: {
                    status: "PENDING"
                },
            })
                .then(res => {
                    console.log(res)
                    this.$notify({
                        title: 'Thành công',
                        text: 'Đưa về hàng đợi thành công',
                        type: 'success',
                        group: 'foo',
                    })
                    this.$emit('reload')
                })
                .catch(err => {
                    console.log(err)
                    this.$notify({
                        title: 'Thất bại',
                        text: 'Duyệt thất bại: ' + err.response.data.message,
                        type: 'success',
                        group: 'foo',
                    })
                })
                .finally(() => {
                    this.$emit('doneLoading')
                })
        },
        reject(id) {
            this.$emit('setLoading')
            const authorization = localStorage.getItem('accessToken')
            axios({
                method: 'patch',
                url: `${constant.base_url}/blogs/${id}/review`,
                headers: {
                    Authorization: authorization
                },
                data: {
                    status: "REJECTED"
                },
            })
                .then(res => {
                    console.log(res)
                    this.$notify({
                        title: 'Thành công',
                        text: 'Hủy thành công',
                        type: 'success',
                        group: 'foo',
                    })
                    this.$emit('reload')
                })
                .catch(err => {
                    console.log(err)
                    this.$notify({
                        title: 'Thất bại',
                        text: 'Duyệt thất bại: ' + err.response.data.message,
                        type: 'success',
                        group: 'foo',
                    })
                })
                .finally(() => {
                    this.$emit('doneLoading')
                })
        },
        getName(firstName, lastName) {
            if (!firstName) firstName = ""
            if (!lastName) lastName = ""
            return firstName + " " + lastName
        },
        changePage(page, limit) {
            console.log('to blog lít ')
            this.$emit('changePage', page, limit)
        },
        toBlogDetail(id){
            this.$router.push(`/blog/${id}`)
        }
    }
}
</script>

<style lang="scss" scoped>
@import '~/assets/scss/variables.scss';

.blog-list-information:hover {
    background-color: $dark-4;
}

.blog-list {
    display: flex;
    flex-direction: column;
    gap: 20px;

    .blog-list-row {
        display: flex;
        grid-template-columns: repeat(8, minmax(0, 1fr));
        font-size: 12px;
        align-items: center;
        border-radius: 10px;
        min-height: 50px;

        &-cell {
            grid-column: span 1 / span 1;
        }

        .image {
            width: 10%;
            display: flex;
            justify-content: center;

            img {
                padding: 10px;
                width: 80%;
                max-width: 50px;
                aspect-ratio: 1 / 1;
                border-radius: 100%;
            }
        }

        .author {
            width: 20%;
        }

        .title {
            width: 20%;
        }

        .createdAt {
            width: 20%;
        }

        .button {
            width: 30%;
            display: flex;
        }
    }
}
</style>