<template>
    <div>
        <div class="user-list text-white font-medium px-5 w-full">
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
    gap: 10px;
    .user-list-row{
        display: flex;
        grid-template-columns: repeat(8, minmax(0, 1fr));
        gap: 10px;
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
                height: 50px;
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
            width: 25%;
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
    }
}
</style>

<script>
export default{
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
            ]
        }
    }
}
</script>