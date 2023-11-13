<template>
    <div>
        <div>
            <EditRole v-if="isEditProfile" :user="currentUser" @cancel="cancelSave" @save="save" @reload="reload"/>
        </div>
        <div class="user-list text-white font-medium p-5 w-full bg-[#262d34] rounded-[16px]">
            <div class="font-semibold user-list-row">
                <div class="user-list-row-cell avatar"></div>
                <div class="user-list-row-cell first-name">Name</div>
                <div class="user-list-row-cell gender">Gender</div>
                <div class="user-list-row-cell phone">Phone</div>
                <div class="user-list-row-cell email">Email</div>
                <div class="user-list-row-cell birthday">Birthday</div>
                <!-- <div class="user-list-row-cell role">Role</div> -->
                <div class="user-list-row-cell status">Status</div>
                <div class="tooltip"></div>
            </div>
            <div v-for="user in users" class="user-list-row user-list-information" :key="user._id">
                <div class="avatar">
                    <img :src="user.profileImage" class="p-2 rounded-full">
                </div>
                <div class="user-list-row-cell first-name">{{ getName(user.firstName, user.lastName) }}</div>
                <div class="user-list-row-cell gender">{{ user.gender?'Male':'Female' }}</div>
                <div class="user-list-row-cell phone">{{ user.phone }}</div>
                <div class="user-list-row-cell email">{{ user.email }}</div>
                <div class="user-list-row-cell birthday">{{ formatBirthday(user.dayOfBirth) }}</div>
                <!-- <div class="user-list-row-cell role">{{ user.roleName }}</div> -->
                <div class="user-list-row-cell status">{{ user.isActive }}</div>
                <div class="tooltip relative">
                    <img src="~/assets/icon/more.svg" @mouseenter="displayTooltip(user._id)" class="cursor-pointer" />
                    <div :id="'action-' + user._id" class="hidden absolute top-1 right-0 z-10"
                        @mouseleave="closeAllPopup()">
                        <div class="px-1 py-1 bg-white rounded-lg">
                            <button
                                class=" hover:bg-gray-500 hover:text-white text-gray-900 group flex rounded-md items-center w-full px-2 py-2 text-sm"
                                @click="showPopup(user)">
                                <svg xmlns="http://www.w3.org/2000/svg" class=" w-5 h-5 mr-2 text-violet-400" fill="none"
                                    viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z">
                                    </path>
                                </svg>
                                Edit
                            </button>
                            <button
                                class=" hover:bg-red-400 hover:text-white text-gray-900 group flex rounded-md items-center w-full px-2 py-2 text-sm"
                                @click="onDelete(user._id)">
                                <svg xmlns="http://www.w3.org/2000/svg" class=" w-5 h-5 mr-2 text-violet-400" fill="none"
                                    viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16">
                                    </path>
                                </svg>
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="w-full h-[1px] bg-gray-500"></div>
            <Pagination :count="count" @changePage="changePage" :recordsPerPage="recordsPerPage"/>
        </div>
    </div>
</template>


<script>
import axios from 'axios'
import { format } from 'date-fns'
import EditRole from '../User/EditRole.vue'
import constant from '~/constant'
import Pagination from '~/components/Pagination.vue'

export default {
    components: {
        EditRole,
        Pagination
    },
    props: {
        users: Array,
        count: Number,
        recordsPerPage: Number
    },
    data() {
        return {
            // users: [],
            currentUser: {
                type: Object,
                default: () => { }
            },
            isEditProfile: false,
        }
    },
    methods: {
        closeAllPopup() {
            this.users.forEach(p => {
                document.querySelector('#action-' + p._id).classList.add('hidden')
            }
            );
        },
        closeAllPopupExceptIndex(index) {
            this.users.forEach(p => {
                if (p._id !== index)
                    document.querySelector('#action-' + p._id).classList.add('hidden')
            }
            );
        },
        displayTooltip(id) {
            this.closeAllPopupExceptIndex(id)
            const popup = document.querySelector("#action-" + id)
            popup.classList.toggle('hidden')
        },
        cancelSave() {
            this.isEditProfile = false
        },
        save(userProp) {
            alert('Luu thanh cong:', JSON.stringify(userProp))
            console.log(userProp);
            this.isEditProfile = false;
        },
        showPopup(user) {
            this.currentUser = user;
            this.isEditProfile = true;
        },
        onDelete(id) {
            const authorization = localStorage.getItem('accessToken')
            axios({
                method: 'delete',
                url: `${constant.base_url}/users/${id}`,
                headers: {
                    Authorization: authorization
                }
            })
            .then(res => {
                this.reload()
            })
        },
        formatBirthday(date) {
            console.log(date)
            if(date){
                const jsDate = new Date(date);
    
                return format(jsDate, 'dd/MM/yyyy');
            }
            return '';
        },
        reload(){
            this.$emit('reload')
        },
        getName(firstName, lastName){
            if(!firstName) firstName = ""
            if(!lastName) lastName = ""
            return firstName + " " + lastName
        },
        changePage(page, limit){
            console.log('to user lít ')
            this.$emit('changePage', page, limit)
        }
    },

}
</script>
<style lang="scss" scoped>
@import '~/assets/scss/variables.scss';

.user-list-information:hover {
    background-color: $dark-4;
}

.user-list {
    display: flex;
    flex-direction: column;
    gap: 20px;

    .user-list-row {
        display: flex;
        grid-template-columns: repeat(8, minmax(0, 1fr));
        font-size: 12px;
        align-items: center;
        border-radius: 10px;
        min-height: 50px;

        &-cell {
            grid-column: span 1 / span 1;
        }

        .avatar {
            width: 10%;
            display: flex;
            justify-content: center;

            img {
                width: 50px;
            }
        }

        .first-name {
            width: 20%;
        }

        .last-name {
            width: 20%;
        }

        .gender {
            width: 8%;
        }

        .phone {
            width: 10%;
        }

        .email {
            width: 23%;
        }

        .birthday {
            width: 10%;
        }

        .role {
            width: 10%;
        }

        .status {
            width: 15%;
        }

        .tooltip {
            width: 2%;
            display: flex;
            justify-content: center;
        }
    }
}</style>
