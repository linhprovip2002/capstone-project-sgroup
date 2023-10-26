<template>
    <div class="tab-left" :class="[{ closeTabLeft: !isShowTabLeft }]">
      <div class="tab-left__container" :class="[{ closeTabLeft: !isShowTabLeft }]">
        <div class="tab-left__container__title" :class="[{ closeTabLeft: !isShowTabLeft }]">
          <span>S-Forum</span>
        </div>
        <ul class="tab-left__container__list" :class="[{ closeTabLeft: !isShowTabLeft }]">
          <li class="tab-left__container__list__item">
            <div
              class="tab-left__container__list__item__header"
              :class="[{ isActive: current_page == 'CUSTOMER' }]"
              @click="
                isShowDetailNavCustomer = !isShowDetailNavCustomer
              "
            >
              <div class="header-left">
                <span v-show="isShowTabLeft">Manage Customer</span>
              </div>
              <div
                :class="[
                  `header-right-${isShowDetailNavCustomer ? 'open' : 'close'}`,
                ]"
              >
              </div>
            </div>
            <ul
              v-if="isShowDetailNavCustomer"
              class="tab-left__container__list__item__sub-header"
            >
              <li
                class="tab-left__container__list__item__sub-header__item"
                :class="[{ isActiveSub: current_sub_page == 'LISTCUSTOMER' }]"
                @click="changeRoute('/customer/listcustomer')"
              >
                <span>List Customer</span>
              </li>
              <li
                class="tab-left__container__list__item__sub-header__item tab-chat"
                @click="changeRoute('/customer/chat')"
                :class="[{ isActiveSub: current_sub_page == 'CHAT' }]"
              >
                <span>Conversation</span>
                <div class="tab-chat__count">
                  <span v-if="getCountUnreadAllConversation">{{
                    getCountUnreadAllConversation
                  }}</span>
                </div>
              </li>
              <li
                class="tab-left__container__list__item__sub-header__item"
                :class="[
                  { isActiveSub: current_sub_page == 'WORKINGCONSTRUCTION' },
                ]"
                @click="changeRoute('/customer/workingconstruction')"
              >
                <span> Working Construction</span>
              </li>
            </ul>
          </li>
          <li class="tab-left__container__list__item">
            <div
              class="tab-left__container__list__item__header"
              :class="[{ isActive: current_page == 'PROJECT' }]"
              @click="
                isShowDetailNavConstruction = !isShowDetailNavConstruction
              "
            >
              <div class="header-left">
                <span v-show="isShowTabLeft">Project</span>
              </div>
              <div
                class="header-right"
                :class="[
                  `header-right-${isShowDetailNavConstruction ? 'open' : 'close'}`,
                ]"
              >
              </div>
            </div>
            <ul
              v-if="isShowDetailNavConstruction"
              class="tab-left__container__list__item__sub-header"
            >
              <li
                class="tab-left__container__list__item__sub-header__item"
                @click="changeRoute('/construction')"
                :class="[
                    { isActiveSub: current_sub_page == 'CONSTRUCTION' },
                ]"
              >
                <span> Construction </span>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  </template>
  
  <script>
  import { mapGetters } from 'vuex'
  import { commonMixins } from '~/mixins/commonMixins'
  
  export default {
    mixins: [commonMixins],
    data() {
      return {
        REFLECT_ROUTE: {
          project: ['construction'],
          customer: ['chat', 'listcustomer', 'workingconstruction'],
        },
        REFLECT_SUB_ROUTE: {
          chat: '/customer/chat',
          listcustomer: '/customer/listcustomer',
          workingconstruction: '/customer/workingconstruction',
          construction: '/construction',
        },
        current_page: '',
        current_sub_page: '',
        isShowTabLeft: true,
        isShowDetailNavConstruction: false,
        isShowDetailNavCustomer: false,
      }
    },
    computed: {
      ...mapGetters({
        getCountUnreadAllConversation:
          'conversation/getCountUnreadAllConversation',
      }),
    },
    watch: {
      '$route.fullPath': {
        handler() {
          this.checkCurrentRoute()
        },
        deep: true,
      },
    },
    created() {
      this.$nuxt.$emit('toggle-tableft', this.isShowTabLeft)
      this.checkCurrentRoute()
      this.$nuxt.$on('toggle-tableft', (value) => {
        this.isShowTabLeft = value
      })
    },
  
    methods: {
      toggleTabLeft() {
        this.isShowTabLeft = !this.isShowTabLeft
        console.log('toggle')
        this.$nuxt.$emit('toggle-tableft', this.isShowTabLeft)
      },
      checkCurrentRoute() {
        let checkHasFitRoute = false
        for (const [key, value] of Object.entries(this.REFLECT_ROUTE)) {
          // console.log('routeeee', this.$route)
          value.forEach((item) => {
            if (this.$route.fullPath.includes(item)) {
              this.current_page = key.toString().toLocaleUpperCase()
            }
          })
        }
        for (const [key, value] of Object.entries(this.REFLECT_SUB_ROUTE)) {
          if (this.$route.fullPath.includes(value)) {
            this.current_sub_page = key.toString().toLocaleUpperCase()
            checkHasFitRoute = true
          }
        }
        if (!checkHasFitRoute) {
          this.current_page = ''
          this.current_sub_page = ''
        }
        console.log(this.current_sub_page);
      },
      changeRoute(value) {
        this.$router.push(
          this.localePath({
            path: value,
          })
        )
      },
    },
  }
  </script>
  
  <style lang="scss" scoped>
  .tab-left {
    background: $neutral-100;
    box-shadow: 0px 16px 72px 0px rgba(71, 79, 98, 0.07);
    width: 239px;
    height: 100%;
    border-radius: 0px 8px 8px 0px;
    padding-top: 40px;
    position: relative;
    &__icon-collapse {
      position: absolute;
      bottom: 24px;
      right: -16px;
      cursor: pointer;
      transition: all .2s;
      &.closeTabLeft {
        transform: rotate(180deg);
      }
    }
    &.closeTabLeft {
      flex-basis: 0;
      min-width: 122px;
      padding: 0;
    }
  
    &__container {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 20px;
      &.closeTabLeft {
        padding: 40px 25px;
      }
      &__title {
        padding: 0 24px;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 4px;
        width: max-content;
        span {
          @include text-style(20px, -0.4, 900, $neutral-800, 0);
          font-family: Visby Round CF !important;
          letter-spacing: -0.4px;
        }
        &.closeTabLeft {
          width: 100%;
          justify-content: center;
          span {
            display: none;
          }
        }
      }
  
      &__list {
        padding-left: 24px;
        padding-right: 6px;
        &__item {
          margin-bottom: 4px;
          position: relative;
  
          &:hover {
            .card-info {
              transition: all 0.6s ease;
              transform: translateX(0px);
            }
          }
  
          &__header {
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: space-between;
            padding: 12px;
            border-radius: 8px;
            max-height: 48px;
  
            &:hover {
              cursor: pointer;
              background-color: $hightlight-row-color;
            }
  
            &.isActive {
              background-image: $gradient-hover;
  
              .header-left {
                span {
                  @include text-style(16px, 24px, 400, $neutral-100, 0);
                  @include truncate(1);
                }
              }
            }
  
            .header-left {
              display: flex;
              flex-direction: row;
              align-items: center;
              span {
                @include text-style(16px, 28px, 400, $text-light-icon-secondary-2, 0);
                @include truncate(1);
              }
  
              img {
                width: 20px;
                height: 20px;
                margin-right: 10px;
              }
            }
  
            .header-right {
              img {
                width: 25px;
                height: 25px;
              }
  
              &-open {
                transform: rotate(180deg);
              }
  
              &-close {
              }
            }
          }
  
          &__sub-header {
            &__item {
              padding: 12px 28px 12px 28px;
              border-radius: 8px;
              @include text-style(16px, 24px, 400, $text-light-secondary2, 0);
              display: flex;
              align-items: center;
              span {
                max-width: 100%;
                @include truncate(1);
              }
              img {
                width: 20px;
                height: 20px;
                margin-right: 10px;
              }
              &.tab-chat {
                display: flex;
                align-items: center;
                .tab-chat__count {
                  span {
                    display: inline-block;
                    background-color: $danger-800;
                    font-size: 13px;
                    line-height: 15px;
                    color: $neutral-0;
                    padding: 3px;
                    border-radius: 30%;
                    margin-right: 10px;
                  }
                }
              }
              &.isActiveSub {
                  background-clip: text;
                  -webkit-background-clip: text;
                  -webkit-text-fill-color: transparent;
                  color: transparent;
                  background-image: $gradient-hover;
                
              }
              &:hover {
                background-color: $neutral-300;
                cursor: pointer;
              }
            }
          }
  
          .card-info {
            width: 250px;
            position: absolute;
            top: 0px;
            left: 0px;
            z-index: 999;
            transition: all 0.6s ease;
            transform: translateX(-250px);
  
            &__container {
              position: relative;
              &__header {
                padding: 8px 24px 8px 24px;
                background-color: $neutral-0;
                display: flex;
                justify-content: center;
                white-space: nowrap;
                box-shadow: $elevation1;
                border-top-right-radius: 12px;
  
                &.isActive {
                  background-color: $primary-700;
  
                  span {
                    @include text-style(16px, 28px, 500, $neutral-0, 0);
                  }
                  &:hover {
                    background-color: $primary-700;
                  }
                }
                span {
                  @include text-style(16px, 28px, 500, $neutral-700, 0);
                  text-align: right;
                }
                &:hover {
                  background-color: $neutral-300;
                }
              }
  
              &__list {
                position: absolute;
                top: 44px;
                right: 0px;
                margin-left: 66px;
                width: calc(100% - 66px);
                &__item {
                  display: flex;
                  justify-content: center;
                  padding: 8px;
                  cursor: pointer;
                  background-color: $neutral-0;
                  @include text-style(14px, 28px, 400, $neutral-700, 0);
                  box-shadow: $elevation1;
  
                  &__count {
                    span {
                      display: inline-block;
                      background-color: $danger-800;
                      font-size: 13px;
                      line-height: 15px;
                      color: $neutral-0;
                      padding: 3px;
                      border-radius: 30%;
                      margin-right: 10px;
                    }
                  }
  
                  &:last-child {
                    border-bottom-right-radius: 12px;
                    border-bottom-left-radius: 12px;
                  }
  
                  &.isActiveSub {
                    background-color: $neutral-200;
                    span {
                      background-clip: text;
                      -webkit-background-clip: text;
                      -webkit-text-fill-color: transparent;
                      color: transparent;
                      background-image: $gradient-hover;
                    }
                  }
  
                  &:hover {
                    background-color: $neutral-300;
                  }
                }
              }
            }
          }
        }
        &.closeTabLeft {
          width: 100%;
          padding: 0;
        }
      }
    }
  }
  </style>
  