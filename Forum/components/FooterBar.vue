<template>
  <div class="main px-4 divide-y dark:bg-gray-800 dark:text-gray-100">
    <div
      class="container flex flex-col justify-between py-10 mx-auto space-y-8 lg:flex-row lg:space-y-0"
    >
      <div
        class="grid grid-cols-2 text-sm gap-x-3 gap-y-8 w-full sm:grid-cols-4"
      >
        <div class="col-span-2 flex flex-col justify-center items-center">
          <a
            rel="noopener noreferrer"
            class="flex justify-center space-x-3 lg:justify-start gap-[14px] mb-[20px]"
          >
            <div
              class="flex items-center justify-center w-12 h-12 rounded-full dark:bg-violet-400"
            >
              <img src="~/assets/img/logosgroup.png" />
            </div>
          </a>
          <h3 class="uppercase text-center text-[#FF571A]">Sgroup</h3>
          <h3 class="uppercase text-center text-[#FF571A]">
            Think different - Make different
          </h3>
        </div>
        <div class="space-y-3">
          <h3 class="uppercase text-[#F4F6F8]">Specialization</h3>
          <ul class="space-y-1 text-[#F4F6F8]">
            <li class="py-[4px]">
              <a rel="noopener noreferrer" href="#">Programming </a>
            </li>
            <li class="py-[4px]">
              <a rel="noopener noreferrer" href="#">Online marketing</a>
            </li>
            <li class="py-[4px]">
              <a rel="noopener noreferrer" href="#">Design </a>
            </li>
          </ul>
        </div>
        <div class="space-y-3">
          <h3 class="uppercase text-[#F4F6F8]">Social Media</h3>
          <ul class="space-y-1 text-[#F4F6F8]">
            <li>
              <a
                rel="noopener noreferrer"
                href="https://www.facebook.com/sgroupvn.org"
                title="Facebook"
                target="_blank"
                class="flex items-center p-1"
              >
			  <img src="~assets/icon/facebook.svg" class="w-[20px] h-[20px]" alt="">

                <span class="ml-[8px]">Facebook</span>
              </a>
            </li>
            <li>
              <a
                rel="noopener noreferrer"
                href="https://www.linkedin.com/company/sgroupvn"
                target="_blank"
                title="Linkedin"
                class="flex items-center p-1"
              >
                <img
                  src="~assets/icon/linkedin.svg"
                  class="w-[20px] h-[20px]"
                  alt=""
                />
                <span class="ml-[8px]">Linkedin</span>
              </a>
            </li>
            <li>
              <a
                rel="noopener noreferrer"
                href="https://sgroupvn.org/"
                target="_blank"
                title="Website"
                class="flex items-center p-1"
              >
                <img
                  src="~assets/icon/website.svg"
                  class="w-[20px] h-[20px]"
                  alt=""
                />
                <span class="ml-[8px]">Website</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="py-6 text-sm text-center text-[#f4f6f8]">
      © 2023. Sgroup Member.
    </div>
  </div>
</template>
<script></script>
<style lang="scss" scoped>
@import '~/assets/scss/variables.scss';
.main {
  background: $dark-3;

  .container {
    .name {
      color: $orange;
      font-size: 26px;
      font-style: normal;
      font-weight: 700;
      line-height: 38px;
      color: $orange;
      font-family: 'Montserrat', sans-serif;
    }
  }
}
</style>
