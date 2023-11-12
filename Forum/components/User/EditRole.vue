<!-- eslint-disable vue/no-mutating-props -->
<template>
    <div class="main" @click="cancel">
        <div class="container relative p-8 py-12 rounded border border-[#1E252B] bg-[#2C353D]" @click.stop>
            <h1 class="font-medium text-3xl text-[#FF571A]">Edit Status</h1>
            <img src="~/assets/icon/close.svg" class="w-[30px] h-[30px] absolute right-8 top-8 cursor-pointer"
                @click="cancel" />
            <form>
                <div class="flex justify-center w-full">
                    <div class="w-full">
                        <div class="form">
                            <div class="w-full flex flex-col items-center">
                                <!-- <label class="label" for="name">Status</label> -->
                                <select class="p-2 rounded-sm" v-model="selectedStatus" @change="handleChange">
                                    <option value="ACTIVE">Active</option>
                                    <option value="BANNER">Banner</option>
                                    <option value="BLOCKPOSTING">Block Posting</option>
                                    <option value="DELETE">Delete</option>
                                    <option value="BLOCKCOMMENT">Block Comment</option>
                                    <!-- Add more roles as needed -->
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="button-group space-x-4 mt-8">
                    <button type="button"
                        class="save py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600 active:bg-blue-700 disabled:opacity-50"
                        @click="save">
                        Save
                    </button>
                    <button
                        class="cancel py-2 px-4 bg-white border border-gray-200 text-gray-600 rounded hover:bg-gray-100 active:bg-gray-200 disabled:opacity-50"
                        @click="cancel">
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>
<script>
import axios from 'axios'
import constant from '~/constant'
export default {
    props: {
        user: {
            type: Object,
            default: () => { },
        },
    },
    data() {
        return {
            userProfile: {},
            selectedRole: '',
            selectedStatus: '',
        }
    },
    created() {
        this.userProfile = JSON.parse(JSON.stringify(this.user))
        this.selectedRole = this.userProfile.roleName
        this.selectedStatus = this.userProfile.isActive.toUpperCase()
    },
    methods: {
        save() {
            const authorization = localStorage.getItem('accessToken')
            console.log(authorization)
            // update status
            axios({
                method: 'post',
                url: `${constant.base_url}/users/${this.userProfile._id}/changeStatus`,
                headers: {
                    Authorization: authorization
                },
                data: {
                    isActive: this.selectedStatus.toLowerCase()
                }
            })
                .then(res => {
                    console.log(res)
                    this.$notify({
                        title: 'Success',
                        text: res.data.message,
                        type: 'success',
                    })
                    this.$emit('reload')
                })
                .catch(err => {
                    console.error(err)
                    this.$notify({
                        title: 'Error',
                        text: err.data.message,
                        type: 'error',
                    })
                })
        },
        cancel() {
            this.$emit('cancel')
        },
        handleChange() {
            console.log(this.selectedRole)
            console.log(this.selectedStatus.toUpperCase())
        }
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

        .form {
            label {
                color: $orange;
            }

            .label {
                display: flex;
                margin-bottom: 8px;
                font-size: 14px;
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
  