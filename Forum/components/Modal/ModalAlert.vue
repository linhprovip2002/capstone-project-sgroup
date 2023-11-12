<template>
    <div class="modal-mask" @click="$emit('close', null)">
    <div class="modal-container-x modal-container">
      <div ref="wrapper-modal" class="wrapper-modal">
        <div class="modal-alert" @click.stop>
      <div
        v-if="isShowLogo"
        class="modal-alert__logo"
        @click="$router.push('/auth/login')"
      >
        <img class="w-[40px] h-[40px]" src="~/assets/img/logosgroup.png" />
      </div>
      <div class="modal-alert__content">
        <h2 class="title" :class="type">{{ title }}</h2>
        <div class="content">
          {{ content }}
        </div>
      </div>
      <div class="modal-alert__tool">
        
        <button
          v-if="!!buttonCancelContent"
          class="cancel py-2 px-4 bg-white border border-gray-200 text-gray-600 rounded hover:bg-gray-100 active:bg-gray-200 disabled:opacity-50 btn-tool"
          type="button"
          @click.stop="$emit('close', null)"
        >
          {{ buttonCancelContent }}
        </button>
        <button
          v-if="!!buttonOkContent"
          type="button"
          class="save py-2 px-4 bg-[#FF4401] text-white rounded hover:bg-[#FF571A] disabled:opacity-50 btn-tool"
          @click.stop="$emit('close', typeSubmit)"
        >
          {{ buttonOkContent }}
        </button>

      </div>
    </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      default: 'confirm',
      validator: (v) => ['confirm', 'success', 'failed'].includes(v),
    },
    title: {
      type: String,
      default: '',
      required: true,
    },
    content: {
      type: String,
      default: '',
      required: true,
    },
    isShowLogo: {
      type: Boolean,
      default: false,
    },
    buttonOkContent: {
      type: String,
      default: 'Ok',
    },
    buttonCancelContent: {
      type: String,
      default: 'Cancel',
    },
    typeSubmit: {
      type: String,
      default: '',
    },
  },
}
</script>

<style lang="scss" scoped>
@import '~assets/scss/variables.scss';
.modal-mask {
  position: fixed;
  z-index: 1000;
  top: 0;
  left: 0;
  width: 100%;
  height: calc(100vh);
  display: flex;
  justify-content: center;
  align-items: flex-start;
  background: linear-gradient(
    0deg,
    rgba(95, 108, 133, 0.5),
    rgba(95, 108, 133, 0.5)
  );
}

.modal-alert {
  display: inline-flex;
  padding: 40px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  max-width: 480px;
  gap: 32px;
  border-radius: 40px;
  background: #fafcfe;
  /* Shadow/5 */
  box-shadow: 0px 16px 72px 0px rgba(71, 79, 98, 0.07);
  &__logo {
    display: flex;
    justify-content: center;
  }
  &__content {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    align-self: stretch;

    h2 {
      text-align: center;
      font-size: 28px;
      font-weight: 700;
      color: $color-success-700;
      &.success {
        color: $success-700;
      }

      &.failed {
        color: $danger-700;
      }

      &.confirm {
        color: $text-light-icon-secondary-1;
      }
    }
    .content {
      text-align: center;
      font-size: 14px;
      font-weight: 400;
      color: #707eae;
    }
  }

  &__tool {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 24px;
    min-width: 300px;

    .btn-tool {
      display: flex;
      padding: 10px 24px;
      height: 41px;
      justify-content: center;
      align-items: center;
      gap: 4px;
      flex: 1;
    }
  }
}
.modal-container-x {
  width: calc(100vw - 40px);
  height: 100%;
  transition: all 0.3s ease;
  // display: grid;
  // grid-template-columns: repeat(12, minmax(0, 1fr));
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1.25rem;
  margin-right: 20px;
  margin-left: 20px;
  justify-items: center;
}

</style>
<style lang="scss" scoped>
@for $width from 450 through 610 {
  .w-#{$width} {
    width: #{$width}px;
  }
}
</style>
