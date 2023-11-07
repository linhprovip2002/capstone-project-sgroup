<template>
    <div>
        <div>
            <EditProfile 
                v-if="isEditProfile"  
                :user="currentUser" 
                @cancel="cancelSave"  
                @save="save"
            />
        </div>
        <div class="user-list text-white font-medium p-5 w-full bg-[#262d34] rounded-[16px]">
            <div class="font-semibold user-list-row">
                <div class="user-list-row-cell avatar"></div>
                <div class="user-list-row-cell first-name">First Name</div>
                <div class="user-list-row-cell last-name">Last Name</div>
                <div class="user-list-row-cell gender">Gender</div>
                <div class="user-list-row-cell phone">Phone</div>
                <div class="user-list-row-cell email">Email</div>
                <div class="user-list-row-cell birthday">Birthday</div>
                <div class="user-list-row-cell role">Role</div>
                <div class="user-list-row-cell status">Status</div>
                <div class="tooltip"></div>
            </div>
            <div v-for="user in users" class="user-list-row user-list-information" :key="user.lastName">
                <div class="avatar">
                    <img :src="user.avatar">
                </div>
                <div class="user-list-row-cell first-name">{{user.firstName}}</div>
                <div class="user-list-row-cell last-name">{{user.lastName}}</div>
                <div class="user-list-row-cell gender" >{{user.gender}}</div>
                <div class="user-list-row-cell phone">{{user.phone}}</div>
                <div class="user-list-row-cell email">{{user.email}}</div>
                <div class="user-list-row-cell birthday">{{user.dayOfBirth}}</div>
                <div class="user-list-row-cell role">{{user.role}}</div>
                <div class="user-list-row-cell status">{{user.status}}</div>
                <div class="tooltip relative">
                    <img
                        src="~/assets/icon/more.svg"
                        @mouseenter="displayTooltip(user.id)"
                        
                        class="cursor-pointer"
                    />
                    <div :id="'action-' + user.id" class="hidden absolute top-1 right-0 z-10" @mouseleave="closeAllPopup()">
                        <div class="px-1 py-1 bg-white rounded-lg">
                            <button class=" hover:bg-gray-500 hover:text-white text-gray-900 group flex rounded-md items-center w-full px-2 py-2 text-sm" @click="showPopup(user)">
                                <svg xmlns="http://www.w3.org/2000/svg" class=" w-5 h-5 mr-2 text-violet-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>
                                Edit 
                            </button>
                            <button class=" hover:bg-red-400 hover:text-white text-gray-900 group flex rounded-md items-center w-full px-2 py-2 text-sm" @click="onDelete(user.id)">
                                <svg xmlns="http://www.w3.org/2000/svg" class=" w-5 h-5 mr-2 text-violet-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg> 
                                Delete 
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
@import '~/assets/scss/variables.scss';
.user-list-information:hover{
    background-color: rgb(80, 80, 80);
}
.user-list{
    display: flex;
    flex-direction: column;
    gap: 20px;
    .user-list-row{
        display: flex;
        grid-template-columns: repeat(8, minmax(0, 1fr));
        gap: 15px;
        font-size: 12px;
        align-items: center;
        border-radius: 10px;
        &-cell {
            grid-column: span 1 / span 1;
        }
        .avatar{
            width: 6%;
            display: flex;
            justify-content: center;
            img{
                width: 50px;
            }
        }
        .first-name{
            width: 13%;
        }
        .last-name{
            width: 13%;
        }
        .gender{
            width: 8%;
        }
        .phone{
            width: 10%;
        }
        .email{
            width: 23%;
        }
        .birthday{
            width: 10%;
        }
        .role{
            width: 5%;
        }
        .status{
            width: 10%;
        }
        .tooltip{
            width: 2%;
            display: flex;
            justify-content: center;
        }
    }
}
</style>

<script>
import Vue from 'vue'
import { VTooltip, VPopover, VClosePopover } from 'v-tooltip'
import EditProfile from '../User/EditProfile.vue'

Vue.directive('tooltip', VTooltip)
Vue.directive('close-popover', VClosePopover)
Vue.component('v-popover', VPopover)
export default{
    components: {
        EditProfile
    },
    data(){
        return{
            users: [
                {
                    id: 'user1',
                    firstName: 'SGroup',
                    lastName: 'Member',
                    gender: true,
                    dayOfBirth: '2022-2-10',
                    phone: '766748566',
                    email: 'toan1772@gmail.com',
                    role: 'User',
                    status: 'Online',
                    avatar: require('~/assets/img/avt.png'),
                },
                {
                    id: 'user2',
                    firstName: 'SGroup',
                    lastName: 'Member',
                    gender: true,
                    dayOfBirth: '2022-2-10',
                    phone: '766748566',
                    email: 'toan1772@gmail.com',
                    role: 'User',
                    status: 'Online',
                    avatar: require('~/assets/img/avt.png'),
                },
                {
                    id: 'user3',
                    firstName: 'SGroup',
                    lastName: 'Member',
                    gender: true,
                    dayOfBirth: '2022-2-10',
                    phone: '766748566',
                    email: 'toan1772@gmail.com',
                    role: 'User',
                    status: 'Online',
                    avatar: require('~/assets/img/avt.png'),
                },
            ],
            currentUser: {
                type: Object,
                default: () => {}
            },
            isEditProfile: false,
        }
    },
    methods: {
        closeAllPopup() {
            this.users.forEach(p => {
                document.querySelector('#action-'+p.id).classList.add('hidden')
            }
            );
        },
        closeAllPopupExceptIndex(index) {
            this.users.forEach(p => {
                if(p.id !== index)
                document.querySelector('#action-'+p.id).classList.add('hidden')
            }
            );
        },
        displayTooltip(id){
            this.closeAllPopupExceptIndex(id)
            const popup = document.querySelector("#action-" + id)
            popup.classList.toggle('hidden')
        },
        cancelSave() {
            this.isEditProfile = false
        },
        save(userProp) {
            alert('Luu thanh cong:',JSON.stringify(userProp))
            console.log(userProp);
            this.isEditProfile = false;
        },
        showPopup(user){
            this.currentUser = user;
            this.isEditProfile = true;
        },
        onDelete(id){
            
        }
    }
    
}
</script>