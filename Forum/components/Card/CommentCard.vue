<template>
    <div class="text-xl text-[#858EAD] font-medium flex gap-5">
        <div>
            <img src="~/assets/img/avatar.jpg" alt="" class="w-10 h-10 rounded-full">
        </div>
        <div class="px-5 py-3 bg-white w-full rounded-lg">
            {{ comment }} 
        </div>
    </div>
</template>
<script>
export default{
    props: {
        comment: String
    }
}
</script>