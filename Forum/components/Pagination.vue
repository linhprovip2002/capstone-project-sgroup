<template>
    <paginate-component :page-count="pageCount" :page-range="3" :margin-pages="2" :click-handler="clickCallback"
        :prev-text="'Prev'" :next-text="'Next'" :container-class="paginationContainerClass"
        :page-class="computedPageClass"></paginate-component>
</template>
    
<script>
import Vue from 'vue';
import PaginateComponent from 'vuejs-paginate';

Vue.component('paginate-component', PaginateComponent);

export default {
    props: {
        count: Number,
    },
    data() {
        return {
            activePage: 1,
            recordsPerPage: 4,
            paginationContainerClass: 'pagination',
            pageItemClass: 'page-item',
        };
    },
    methods: {
        clickCallback(pageNum) {
            console.log(pageNum);
            this.activePage = pageNum;
            this.$emit('changePage', this.activePage, this.recordsPerPage)
        },
    },
    computed: {
        paginatedData() {
            const startIndex = (this.currentPage - 1) * this.recordsPerPage;
            const endIndex = startIndex + this.recordsPerPage;
            return this.allData.slice(startIndex, endIndex);
        },
        pageCount() {
            return Math.ceil(this.count / this.recordsPerPage);
        },
        computedPageClass() {
            return `${this.pageItemClass} ${this.activePage === this.currentPage ? 'active' : ''}`;
        },
    },
}
</script>
    
  
<style lang="css">
.pagination {
    display: flex;
    width: 100%;
    gap: 20px;
    justify-content: center;
    font-size: 14px;
}

.page-item {
    cursor: pointer;
}

.page-item.active {
    text-decoration: underline;
    /* Apply underline for the active page */
}
</style>
  