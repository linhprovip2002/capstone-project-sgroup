<template>
    <div class="top-nav">
      <div class="top-nav__container">
        <!-- <div class="top-nav__container__left">
          <div class="top-nav__container__left__icon-logo">
            <img
              :src="isShowTabLeft ? '/icons/logo.svg' : '/icons/icon-logo.svg'"
              alt="Logo VJ Technologies"
            />
          </div>
          <div
            class="top-nav__container__left__icon-collapse"
            :class="[`${isShowTabLeft ? 'open' : 'close'}`]"
            @click="toggleTabLeft()"
          >
            <img src="~/assets/icons/icon-collapse.svg" alt="" />
          </div>
        </div> -->
        <div class="top-nav__container__right">
          <div
            v-if="
              $auth.user.active_status != 'ACCEPT' &&
              $auth.user.active_status != 'WAITING'
            "
            class="top-nav__container__right__requestActive"
            @click="requestActive"
          >
            Request Active
          </div>
          <div
            class="top-nav__container__right__icon-notification"
            v-click-outside="closeNotificationOutside"
          >
            <img
              src="~/assets/icons/icon-bell.svg"
              class="icon-bell"
              alt="icon notification"
              @click="isShowNotification = !isShowNotification"
            />
  
            <span class="top-nav__container__right__icon-notification__count">{{
              getCountUnread
            }}</span>
  
            <div
              class="notification"
              :class="[`${isShowNotification ? 'open' : 'close'}`]"
            >
              <div class="notification__header">
                <span> Thông báo </span>
              </div>
              <ul class="notification__list">
                <li
                  v-for="notification in getListNotifications"
                  :key="notification.id"
                  class="notification__list__item"
                  :class="[{ itemNotSeen: !notification.read }]"
                  @click="markReadByID(notification)"
                >
                  <div class="notification__list__item__avatar">
                    <img src="~/assets/images/meo-con.jpg" alt="" />
                  </div>
                  <div class="notification__list__item__body">
                    <div class="notification__list__item__body__content-time">
                      <div class="content">
                        <span>
                          {{ $t(`status.${notification.notification_action}`) }}
                        </span>
                      </div>
                      <span v-display-time="notification.created_at" class="time">
                        {{ formattedTime }}
                      </span>
                    </div>
                    <div v-if="!notification.read" class="statusNotSeen"></div>
                  </div>
                </li>
  
                <client-only>
                  <infinite-loading
                    :distance="100"
                    @infinite="fetchNotification"
                    ref="infinite-loading"
                  >
                    <div slot="no-results" class="d-none opacity-0"></div>
                    <div slot="no-more" class="d-none opacity-0"></div>
                  </infinite-loading>
                </client-only>
              </ul>
              <div class="notification__bottom">
                <span @click="markReadAll"> Đánh dấu là xem tất cả </span>
              </div>
            </div>
          </div>
          <div
            class="top-nav__container__right__icon-user"
            v-click-outside="closeOptionOutside"
          >
            <img
              class="icon-user"
              :src="$auth.user.avatar ?? '/images/image-nonUser.jpg'"
              alt="icon user"
              @click="isShowOptionUser = !isShowOptionUser"
            />
  
            <div
              class="account"
              :class="[`${isShowOptionUser ? 'open' : 'close'}`]"
            >
              <ul class="account__list">
                <li
                  class="account__list__item"
                  @click="
                    $router.push('/user/infor')
                    closeOptionOutside()
                  "
                >
                  Account
                </li>
                <li
                  class="account__list__item"
                  @click="$router.push('/password/change-password')"
                >
                  Change password
                </li>
                <li class="account__list__item" @click="onLogout()">Logout</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>

<script>
export default {
  data() {
    return {
      isShowTabLeft: true,
      isShowOptionUser: false,
      isShowNotification: false,
      isSeen: true,
      formattedTime: '',
    }
  },
  computed: {
  },
  created() {
    this.$nuxt.$emit('toggle-tableft', this.isShowTabLeft)
  },

  methods: {
    toggleTabLeft() {
      this.isShowTabLeft = !this.isShowTabLeft
      console.log('toggle')
      this.$nuxt.$emit('toggle-tableft', this.isShowTabLeft)
    },
    closeOptionOutside() {
      if (this.isShowOptionUser) {
        this.isShowOptionUser = false
      }
    },
    closeNotificationOutside() {
      if (this.isShowNotification) {
        this.isShowNotification = false
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.top-nav {
  display: block;
  height: 60px;
  background: $neutral-100;
  box-shadow: 0px 16px 72px 0px rgba(71, 79, 98, 0.07);
  padding: 18px 24px;
  &__container {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
    &__left {
      display: flex;
      align-items: center;

      &__icon-collapse {
        margin-left: 23px;
        cursor: pointer;
        transform: rotate(0deg);

        &.close {
          margin-left: 6px;
          transform: rotate(-180deg);
        }
      }
    }

    &__right {
      display: flex;
      align-items: center;
      justify-content: center;
      &__requestActive {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100%;
        margin-right: 10px;
        padding-left: 5px;
        padding-right: 5px;
        background-color: $secondary-500;
        border-radius: 6px;
        @include text-style(14px, 18px, 400, $neutral-0, 0);
        &:hover {
          cursor: pointer;
          background-color: $secondary-400;
        }
      }

      &__icon-notification {
        margin-right: 20px;
        position: relative;

        .icon-bell {
          cursor: pointer;
        }

        &__count {
          position: absolute;
          background-color: $danger-700;
          border-radius: 50%;
          top: -6px;
          right: -3px;
          padding: 0px 4px;
          @include text-style(10px, 15px, 400, $text-primary1, 0);
        }

        .notification {
          position: absolute;
          top: 45px;
          right: 0px;
          background-color: $neutral-0;
          box-shadow: 0px -16px 24px rgba(71, 79, 98, 0.12),
            0px 16px 24px rgba(71, 79, 98, 0.12);
          border-radius: 16px;
          width: 320px;
          z-index: 10000;

          &.open {
            opacity: 1;
            visibility: visible;
            transition: all 0.3s ease;
          }

          &.close {
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s ease;
          }

          &__header {
            display: flex;
            justify-content: center;
            margin-top: 13px;
            margin-bottom: 13px;
            width: 100%;

            // border-bottom: $neutral-300;
            span {
              text-align: center;
              @include text-style(16px, 150%, 500, $primary-800, 0);
            }
          }

          &__list {
            border-top: 1px solid $neutral-300;
            border-bottom: 1px solid $neutral-300;
            max-height: 530px;
            overflow-y: auto;
            overflow-x: hidden;
            @include custom-scrollbar();

            &__item {
              display: flex;
              flex-direction: row;
              padding: 18px;
              box-sizing: border-box;
              border: 1px solid transparent;
              &.itemNotSeen {
                background-color: $neutral-300;
              }

              &:hover {
                cursor: pointer;
                background-color: $neutral-300;
                border: 1px solid $neutral-0;
              }

              &__avatar {
                width: 40px;
                height: 40px;
                margin-right: 14px;

                img {
                  border-radius: 50%;
                  max-width: 100%;
                  max-height: 100%;
                }
              }

              &__body {
                display: flex;
                flex-direction: row;
                align-items: flex-end;
                justify-content: space-between;
                width: 100%;

                &__content-time {
                  .content {
                    @include text-style(14px, 21px, 400, $text-primary, 0);
                  }

                  .time {
                    @include text-style(10px, 15px, 400, $neutral-600, 0.5px);
                  }
                }

                .statusNotSeen {
                  width: 10px;
                  height: 10px;
                  min-width: 10px;
                  min-height: 10px;
                  border-radius: 50%;
                  background-color: $primary-700;
                }
              }
            }
          }

          &__bottom {
            display: flex;
            align-items: center;
            justify-content: center;
            padding-top: 5px;
            padding-bottom: 5px;
            span {
              @include text-style(14px, 150%, 400, $primary-800, 0);
              &:hover {
                text-decoration: underline;
                cursor: pointer;
              }
            }
          }
        }
      }

      &__icon-user {
        cursor: pointer;
        position: relative;
        width: 24px;
        height: 24px;
        .icon-user {
          height: 100%;
          width: 100%;
          max-width: 100%;
          max-height: 100%;
          object-fit: cover;
          border-radius: 50%;
        }

        .account {
          position: absolute;
          top: 54px;
          right: 0px;
          width: 150px;
          border-radius: 16px;
          background-color: $neutral-0;
          box-shadow: 0px 16px 24px rgba(71, 79, 98, 0.12);
          z-index: 999;

          &.open {
            opacity: 1;
            visibility: visible;
            transition: all 0.3s ease;
          }

          &.close {
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s ease;
          }

          &__list {
            &__item {
              display: flex;
              justify-content: center;
              @include text-style(14px, 21px, 500, $neutral-600, 0px);
              border-bottom: 1px solid $neutral-300;
              padding-top: 10px;
              padding-bottom: 10px;

              &:hover {
                color: $primary-800;
              }

              &:last-child {
                border: none;
              }
            }
          }
        }
      }
    }
  }
}
</style>