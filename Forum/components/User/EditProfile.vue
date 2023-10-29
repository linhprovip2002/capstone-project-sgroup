<template>
  <div class="main">
    <div class="container p-8 rounded border border-gray-200 bg-[#2C353D]">
      <h1 class="font-medium text-3xl text-[#FF571A]">Edit Profile User</h1>
      <form>
        <div class="item">
          <div>
            <label for="name">Name</label>
            <input
                id="name"
              v-model="firstname"
              type="text"
              name="name"
              class="bg-gray-100 border border-gray-200 rounded py-1 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-full"
              placeholder="Enter your name"
            />
          </div>
        </div>
        <div class="button-group space-x-4 mt-8">
          <button
            type="submit"
            class="save py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600 active:bg-blue-700 disabled:opacity-50"
          >
            Save
          </button>
          <button
            class="cancel py-2 px-4 bg-white border border-gray-200 text-gray-600 rounded hover:bg-gray-100 active:bg-gray-200 disabled:opacity-50"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    firstName: {
      type: String,
      default: 'lkjlaskgj',
    },
    lastName: {
      type: String,
      default: '',
    },
    gender: {
      type: Boolean,
      default: true,
    },
    dayOfBirth: {
      type: String,
      default: '1/1/2023',
    },
    phone: {
      type: Number,
      default: 0,
    },
    avatar: {
      type: String,
      default: require('~/assets/img/avt.png'),
    },
  },
}
</script>
<style lang="scss" scoped>
@import '~/assets/scss/variables.scss';
.main {
  position: fixed;
  inset: 0;
  background: rgba(71, 79, 98, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
  .container {
    max-width: 600px;
    h1 {
      margin-bottom: 40px;
      text-align: center;
    }
    .item {
      label {
        display: flex;
        color: $orange;
        margin-bottom: 8px;
      }
      input {
        outline: none;
      }
    }
    .button-group {
      display: flex;
      width: 100%;
      justify-content: center;
      align-items: center;
      .save {
        background: $orange;
      }

      .cancel {
        background: $gray;
      }
    }
  }
}
</style>
