<template>
    <div class="bg-[#2C353D] rounded-lg px-2 py-1 text-[8px] text-[#858EAD] font-medium">
       {{ tag }} 
    </div>
</template>
<script>
export default{
    props: {
        tag: String
    }
}
</script>