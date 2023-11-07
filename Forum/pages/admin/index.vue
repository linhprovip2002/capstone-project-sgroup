<template>
    <div class="default">
        <div class="default__top">
            <TopNavBar class="top-nav" />
        </div>
        <div class="px-5 flex gap-5">
            <div class="tableft">
                <div class="tableft__item category">
                    <div class="category__item" @click="changeOption(1)">
                        <img src="~/assets/icon/person.svg" alt="" />
                        <div class="category__item__info">
                            <span class="name">User Manage</span>
                        </div>
                    </div>
                    <div class="category__item" @click="changeOption(2)">
                        <img src="~/assets/icon/popular.svg" alt="" />
                        <div class="category__item__info">
                            <span class="name">Blog Manage</span>
                        </div>
                    </div>
                </div>
            </div>
            <UserList 
                class="w-full"
                v-if="manageOption === 1"
            />
            <BlogList
                :news="news"
                v-if="manageOption === 2"
                class="w-full"
            />
        </div>
    </div>
  </template>
  
<script>
  import axios from 'axios'
  import UserList from '~/components/Manage/UserList.vue'
  import BlogList from '~/components/Manage/BlogList.vue'
  export default {
    layout: 'empty',
    components: {
      UserList,
      BlogList
    },
    data() {
        return {
            title: '',
            content: '',
            news: [
                {
                    id: 'bai1',
                    imageLink: require('~/assets/img/logosgroup.png'),
                    title: 'The new company in Danang',
                    author: 'SGroup Member',
                    tags: ['finance', 'ecommerce'],
                    time: '2/2/2022',
                    like: 1000,
                    dislike: 33,
                    comments: 9,
                },
                {
                    id: 'bai6',
                    imageLink: require('~/assets/img/nodejs.png'),
                    title: 'Blockchain developer best practices',
                    author: 'SGroup Member',
                    tags: ['seo', 'blogging', 'traffic'],
                    time: '2/2/2022',
                    like: 330,
                    dislike: 1,
                    comments: 124,
                },
                {
                    id: 'bai2',
                    imageLink: require('~/assets/img/logosgroup.png'),
                    title: 'The new company in Danang',
                    author: 'SGroup Member',
                    tags: ['finance', 'ecommerce'],
                    time: '2/2/2022',
                    like: 1000,
                    dislike: 0,
                    comments: 6,
                },
                {
                    id: 'bai3',
                    imageLink: 'https://blogs.iadb.org/caribbean-dev-trends/wp-content/uploads/sites/34/2017/12/Blockchain1.jpg',
                    title: 'Blockchain developer best practices',
                    author: 'SGroup Member',
                    tags: ['seo', 'blogging', 'traffic'],
                    time: '2/2/2022',
                    like: 2000,
                    dislike: 7,
                    comments: 34,
                },
                {
                    id: 'bai4',
                    imageLink: require('~/assets/img/nodejs.png'),
                    title: 'Nodejs power - excellent ',
                    author: 'Segio Ramous',
                    tags: ['Vue', 'Nuxt'],
                    time: '2/2/2022',
                    like: 70,
                    dislike: 10,
                    comments: 21,
                },
                {
                    id: 'bai5',
                    imageLink: 'data:image/png;base64,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',
                    title: 'Newbie in HTML',
                    author: 'SGroup Member',
                    tags: ['seo', 'blogging', 'traffic'],
                    time: '2/2/2022',
                    like: 2000,
                    dislike: 8,
                    comments: 201,
                },
            ],
            manageOption: 1
        }
    },
    methods: {
        submit() {
            axios({
                method: 'post',
                url: `http://${process.env.BASE_URL}:3000/auth/reset-password`,
                data: {
                    title: this.title,
                    content: this.content,
                    createdAt: Date.now()
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
        changeOption(optionNumber){
            this.manageOption = optionNumber;
        }
    }
  }

  </script>
  
  <style lang="scss" scoped>
  @import '~/assets/scss/variables.scss';
  
  .default {
    display: flex;
    flex-direction: column;
    background-color: #F3F6FF;
    min-height: 100vh;
    height: 100%;
    overflow: hidden;
    gap: 20px;
    position: relative;
    height: 100vh;
    overflow: auto;
    background: $dark-2;
  
    &__top {
        height: 80px;
        position: sticky;
        width: 100%;
        left: 0;
        top: 0;
        z-index: 10;
    }
  
    &__tableft {
        height: 100%;
        max-width: 239px;
    }
  
    &__tabright {
        height: 100%;
        max-width: 239px;
    }
  
    &__body {
        display: inline-flex;
        align-items: flex-start;
        justify-content: space-between;
        gap: 20px;
        width: 100%;
        padding: 0 20px;
  
        &__container {
            width: 100%;
        }
    }
  
    .footer {}
  }
  .tableft {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 20px;
  
  &__item {
    border-radius: 16px;
    background: $dark-3;
    display: flex;
    width: 210px;
    padding: 10px;
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
  
    .category {
      &__item {
        display: flex;
        align-items: center;
        width: 100%;
        padding: 6px 5px;
        gap: 10px;
        border-radius: 6px;
        background: $dark-3;  
        cursor: pointer;
  
        img {
          display: flex;
          height: 100%;
          object-fit: contain;
          justify-content: center;
          align-items: center;
          padding: 4px;
          gap: 10px;
        }
        &__info {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 2px;
          .name {
            color: $neutral-0;
            font-family: 'Montserrat', sans-serif;
            font-size: 12px;
            font-style: normal;
            font-weight: 600;
            line-height: 18px; /* 150% */
          }
          .desc {
            color: #97989d;
            /* Regular 9 */
            font-family: 'Montserrat', sans-serif;
            font-size: 10px;
            font-style: normal;
            font-weight: 400;
            line-height: 14px; /* 155.556% */
          }
        }
        &:hover {
          background: $dark-4;
        }
      }
    }
  }
  }
  </style>
  
  
  