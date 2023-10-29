<template>
  <div class="main">
    <div class="container">
      <div class="w-full px-4">
        <div class="search flex bg-[#262D34] gap-5 w-full p-5 my-5 rounded-lg">
          <input
            id=""
            type="text"
            name=""
            placeholder="Type here to search..."
          />
          <img src="~assets/icon/search.svg" alt="" />
        </div>
        <div id="main-content">
          <div v-for="n in news" :key="n.id" class="blog" >
            <BlogCard
              :image-link="n.imageLink"
              :author="n.author"
              :comments="n.comments"
              :dislike="n.dislike"
              :like="n.like"
              :tags="n.tags"
              :title="n.title"
              :time="n.time"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BlogCard from '~/components/Card/BlogCard.vue'
export default {
  name: 'IndexPage',
  components: {
    BlogCard,
  },
  data() {
    return {
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
    }
  },
}
</script>
<style lang="scss" scoped>
@import '~/assets/scss/variables.scss';
.container {
  display: flex;
  width: 100%;
  .blog {
    width: 100%;
  }
  
  .search {
      position: relative;
      flex: 1;
      width: 100%;

      input {
        display: flex;
        width: 100%;
        padding: 9px 20px;
        padding-right: 40px;
        flex-direction: column;
        align-items: flex-start;
        gap: 10px;
        border-radius: 10px;
        outline: none;
        color: #ccc;
        /* Regular 14 */
        font-family: Source Sans Pro;
        font-size: 14px;
        font-style: normal;
        font-weight: 400;
        line-height: 22px; /* 157.143% */
        background: $dark-4;
        ::placeholder {
          color: #858ead;
        }
      }

      img {
        position: absolute;
        display: flex;
        width: 20px;
        height: 20px;
        padding: 0px 0.5px 0.5px 1px;
        justify-content: center;
        align-items: center;
        top: 50%;
        right: 40px;
        transform: translateY(-50%);
      }
    }
}
</style>
