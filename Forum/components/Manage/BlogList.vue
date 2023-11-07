<template>
    <div>
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
</template>

<script>
import BlogCard from '../Card/BlogCard.vue';
export default{
    props: {
        news: [],
    },
    components: {
        BlogCard
    }
}
</script>