<template>
  <div class="top-nav">
    <div class="top-nav__logo">
      <img src="~assets/img/logosgroup.png" alt="">
      <div class="name-web">S-Forum</div>
    </div>
    <div class="top-nav__main">
      <div class="top-nav__main__left">
        <div class="top-nav__main__menu">
          <div 
            class="menu__item"
            :class="{'isActive':currentTab=='home'}"
            @click="currentTab='home'"
          >
          <img src="~/assets/icon/home.svg" alt="">
          </div>
          <div 
            class="menu__item"
            :class="{'isActive':currentTab=='calendar'}"
            @click="currentTab='calendar'"
          >
          <img src="~/assets/icon/calendar.svg" alt="">
          </div>
          <!-- <div 
          v-for="item in listTab"
          :key="item.id"
            class="menu__item"
            :class="{'isActive':currentTab==item.id}"
            @click="currentTab=item.id"
          >
          <img :src="`_nuxt/assets/icon/${item.id}.svg`" alt="">
          </div> -->
        </div>
        <div class="top-nav__main__search">
          <input id=""  type="text"  name="" placeholder="Type here to search...">
          <img src="~assets/icon/search.svg" alt="">
        </div>
      </div>
      <div class="top-nav__main__right">
        <div class="notification">
          <img src="~assets/icon/bell.svg" alt="">
        </div>
        <div class="account">
          <img src="~assets/img/avt.png" alt="">
          <span class="name">SGroup Member</span>
          <div class="icon-drop-down">
            <img src="~assets/icon/drop-down-icon.svg" alt="">
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
      currentTab: 'home',
      listTab:[
        {
          id:'home',
          icon:'home'
        },
        {
          id:'calendar',
          icon:'calendar'
        },
      ]
    }
  },
  methods: {
    
  }
}
</script>

<style lang="scss" scoped>
@import '~assets/scss/variables.scss';
.top-nav {
  display: inline-flex;
  padding: 20px 22px;
  flex-direction: row;
  align-items: start;
  gap: 84px;
  background: $dark-3;
  height: 100%;
  width: 100%;

  &__logo {
    height: 100%;
    display: flex;
    align-items: center;
    gap: 10px;

    img {
      height: 100%;
      object-fit: contain;
    }
    .name-web {
      color: $orange;
      font-family: Source Sans Pro;
      font-size: 26px;
      font-style: normal;
      font-weight: 700;
      line-height: 38px; /* 146.154% */
    }
  }
  &__main {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 50px;
    height: 100%;
    width: 100%;
    flex: 1;
    &__left {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      flex: 1 0 0 ;
      gap: 17px;
    }
    &__menu {
      display: flex;
      align-items: flex-start;
      gap: 20px;
      cursor: pointer;
      
      .menu__item {
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 10px;
        border-radius: 8px;

        &.isActive {
          background: $orange;
        }
        img {
          display: flex;
          align-items: flex-start;
          gap: 10px;
        }
      }
    }
    &__search {
      position: relative;
      flex: 1;
      max-width: 500px;
      
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
          color: #858EAD;
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
        right: 20px;
        transform: translateY(-50%);
      }
    }
    &__right {
      height: 100%;
      display: flex;
      align-items: center;

      gap: 25px;
      .notification {
        display: flex;
        width: 20px;
        height: 20px;
        justify-content: center;
        align-items: center;
        img {
          width: 100%;
          height: 100%;
          object-fit: contain;
          cursor: pointer;
        }
      }
      .account {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100%;
        gap: 10px;
        padding-right: 10px;
        position: relative;
        cursor: pointer;
        img {
          height: 100%;
          object-fit: contain;
        }
        .name {
          color: #F7F7F7;
          font-family: Source Sans Pro;
          font-size: 16px;
          font-style: normal;
          font-weight: 700;
          line-height: 24px; /* 150% */
        }
        .icon-drop-down {
          position: absolute;
          right: -10px;
          top: 50%;
          transform: translateY(-50%);
        }
      }
    }
  }
}
</style>
