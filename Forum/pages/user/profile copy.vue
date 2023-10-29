<template>
    <div class="bg-[#1E252B] min-h-screen">
      <div id="content" class="p-5 flex gap-5 justify-center">
        <!-- <div id="left-side">
            <div class="bg-[#262D34] rounded-lg p-4 flex flex-col gap-2 w-[200px]">
                <div v-for="item in card" :key="item.tag">
                    <TagCard 
                    :tag="item.tag"
                    :description="item.description"
                    :image-link="item.imageLink"
                    />
                </div>
            </div>
        </div> -->

        <div id="main-content">
            <div v-for="n in news" :key="n.author">
              <BlogCard 
                :image-link=n.imageLink
                :author=n.author
                :comments=n.comments
                :dislike=n.dislike
                :like=n.like
                :tags=n.tags
                :title=n.title
                :time=n.time
              />
            </div>
        </div>

        <!-- <div id="right-side">
            <div class="bg-[#262D34] rounded-lg p-4 flex flex-col gap-2 w-full">
                <div v-for="item in meetings" :key="item.tag">
                    <MeetingCard
                    :title="item.title"
                    :imageLink="item.imageLink"
                    :address="item.address"
                    :tags="item.tags"
                    />
                </div>
            </div>
        </div> -->
      </div>
    </div>
  </template>
  
<script>
  // import TagCard from '@/components/Card/TagCard.vue';
  // import MeetingCard from '@/components/Card/MeetingCard.vue';
  import BlogCard from '~/components/Card/BlogCard.vue';
  
  export default {
    components: {
    // TagCard,
    // MeetingCard,
    BlogCard
},
    data() {
      return {
        card: [
          {
            imageLink: require('~/assets/img/nodejs.png'),
            tag: "Tech",
            description: "Tech for sp"
          },
          {
            imageLink: require('~/assets/img/nodejs.png'),
            tag: "Tec",
            description: "Tech for sp"
          },
          {
            imageLink: require('~/assets/img/nodejs.png'),
            tag: "ech",
            description: "Tech for sp"
          },
          {
            imageLink: require('~/assets/img/nodejs.png'),
            tag: "Tch",
            description: "Tech for sp"
          },
        ],
        meetings: [
          {
            imageLink: require('~/assets/img/nodejs.png'),
            title: 'UIHUT',
            address: 'PK, HA, DN',
            tags:[
                'Remote',
                'Parttime',
                'Worldwide'
            ]
          },
        ],
        news: [
          {
            imageLink: require('~/assets/img/nodejs.png'),
            title: 'Blockchain developer best practices',
            author: 'Pavel Gvay',
            tags:[
                'finance',
                'bitcoin',
                'crypto'
            ],
            time: '2/2/2022',
            like: '1000',
            dislike: '100',
            comments: '200'
          },
          {
            imageLink: require('~/assets/img/nodejs.png'),
            title: 'Blockchain developer best practices',
            author: 'Pavel Gvay',
            tags:[
                'seo',
                'blogging',
                'traffic'
            ],
            time: '2/2/2022',
            like: '2000',
            dislike: '200',
            comments: '400'
          },
        ],
      };
    }
  }
  </script>
  