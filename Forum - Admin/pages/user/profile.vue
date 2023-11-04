<template>
  <div>
    <main class="profile-page overflow-hidden rounded-lg">
      <section class="relative block" style="height: 500px">
        <div
          class="absolute top-0 w-full h-full bg-center bg-cover"
          style="
            background-image: url('https://images.unsplash.com/photo-1499336315816-097655dcfbda?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=crop&amp;w=2710&amp;q=80');
          "
        >
          <span
            id="blackOverlay"
            class="w-full h-full absolute opacity-50 bg-black"
            >dhfdhdfjfdj</span
          >
        </div>
        <div
          class="top-auto bottom-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden"
          style="height: 70px"
        >
        </div>
      </section>
      <section class="relative py-16 bg-[#2C353D]">
        <div class="container mx-auto">
          <div
            class="relative flex flex-col min-w-0 break-words bg-[#2C353D] w-full mb-6 shadow-xl rounded-lg -mt-64"
          >
            <div class="px-6">
              <div class="flex flex-wrap justify-between w-full">
                <div class="w-[200px] px-4 flex justify-center">
                  <div class="relative">
                    <img
                      alt="..."
                      :src="user.avatar"
                      class="shadow-xl rounded-full h-[150px] border-none absolute -m-16 -ml-20 lg:-ml-16"
                      style="max-width: 150px"
                    />
                  </div>
                </div>
                <div
                  class="info_user w-full md:ml-0 lg:ml-[255px] lg:order-3 lg:text-right lg:self-center"
                >
                  <div
                    class="pt-4 px-3 sm:mt-0 flex justify-between gap-[40px]"
                  >
                    <div class="text-left">
                      <span
                        class="text-4xl font-semibold leading-normal mb-2 text-[#fafcfe] mb-2"
                      >
                        {{ user.firstName }} {{ user.lastName }}
                      </span>
                      <div
                        class="text-sm leading-normal mt-0 mb-2 text-[#fafcfe] font-bold uppercase"
                      >
                        Gender: {{ user.gender ? 'Male' : 'Female' }}
                      </div>
                      <div
                        class="text-sm leading-normal mt-0 mb-2 text-[#fafcfe] font-bold uppercase"
                      >
                        Birthday: {{ user.dayOfBirth }}
                      </div>
                      <div
                        class="text-sm leading-normal mt-0 mb-2 text-[#fafcfe] font-bold uppercase"
                      >
                        Phone number: {{ user.phone }}
                      </div>
                    </div>
                    <div class="button flex items-center">
                      <button
                        class="bg-[#FF571A] active:bg-pink-600 uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1"
                        type="button"
                        style="transition: all 0.15s ease 0s"
                        @click="EditProfile"
                      >
                        Edit profile
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div class="mt-8 pb-10 pt-6 border-t border-gray-300 text-center">
                <div class="w-full w-4/12 px-4 lg:order-1">
                  <div class="flex justify-center py-4 lg:pt-4 pt-8">
                    <div class="mr-4 p-3 text-center"></div>
                    <div class="mr-4 p-3 text-center">
                      <span
                        class="text-xl font-bold block uppercase tracking-wide text-[#fafcfe]"
                        >{{ countPost }}</span
                      ><span class="text-sm text-[#fafcfe]">Post</span>
                    </div>
                    <div class="lg:mr-4 p-3 text-center">
                      <span
                        class="text-xl font-bold block uppercase tracking-wide text-[#fafcfe]"
                        >{{ countLikes }}</span
                      ><span class="text-sm text-[#fafcfe]">Likes</span>
                    </div>
                  </div>
                </div>
                <div class="flex flex-wrap justify-center">
                  <div class="w-full lg:w-9/12 px-4">
                    <div id="main-content">
                      <div v-for="n in filternews" :key="n.id">
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
                    <span
                      v-if="!compareLength"
                      class="font-normal text-[#FF571A] cursor-pointer"
                      @click="showMore"
                      >Show more
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  <EditProfile 
    v-if="isEditProfile"
    :user = "user"
    @save="save"
    @cancel="cancelSave"
  />

  </div>
</template>
<script>
import EditProfile from '~/components/User/EditProfile.vue'
import BlogCard from '~/components/Card/BlogCard.vue'
export default {
  name: 'Profile',
  components: {
    BlogCard,
    EditProfile,
  },
  layout: 'topandfooter',
  data() {
    return {
      user: {
        id: 'user1',
        firstName: 'SGroup',
        lastName: 'Member',
        gender: true,
        dayOfBirth: '2022-2-10',
        phone: '766748566',
        avatar: require('~/assets/img/avt.png'),
      },
      news: [
        {
          id: 'bai1',
          imageLink: require('~/assets/img/logosgroup.png'),
          title: 'The new company in Danang',
          author: 'SGroup Member',
          tags: ['finance', 'ecommerce'],
          time: '2/2/2022',
          like: 1000,
          dislike: 65,
          comments: 657,
        },
        {
          id: 'bai3',
          imageLink: require('~/assets/img/image_post.jpg'),
          title: 'Blockchain developer best practices',
          author: 'SGroup Member',
          tags: ['seo', 'blogging', 'traffic'],
          time: '2/2/2022',
          like: 2000,
          dislike: 11,
          comments: 992,
        },
        {
          id: 'bai2',
          imageLink: require('~/assets/img/nodejs.png'),
          title: 'Blockchain developer best practices',
          author: 'SGroup Member',
          tags: ['seo', 'blogging', 'traffic'],
          time: '2/2/2022',
          like: 2000,
          dislike: 11,
          comments: 992,
        },
      ],
      filternews: [],
      isEditProfile:false,
    }
  },
  computed: {
    countPost() {
      return this.news.length
    },
    countLikes() {
      let total = 0
      this.news.forEach((e) => {
        total += e.like
      })
      return total
    },
    compareLength() {
      return this.filternews.length === this.news.length
    },
  },
  beforeMount() {
    this.filternews = this.news.slice(0, 2)
  },
  methods: {
    showMore() {
      this.filternews = this.news
    },
    EditProfile() {
      this.isEditProfile = true
    },
    cancelSave() {
      this.isEditProfile = false
    },
    save(userProp) {
     alert('Luu thanh cong:',JSON.stringify(userProp))
     console.log(userProp);
      this.isEditProfile = false
    }
  },
}
</script>

<style lang="scss" scoped>
.relative {
  img {
    width: 150px;
    height: 150px;
    object-fit: cover;
  }
}
@media screen and (max-width: 1024px) {
  .info_user {
    margin-top: 80px;
  }
}
</style>
