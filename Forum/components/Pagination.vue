<template>
  <paginate-component
    :page-count="pageCount"
    :page-range="3"
    :margin-pages="2"
    :click-handler="clickCallback"
    :prev-text="'Prev'"
    :next-text="'Next'"
    :container-class="paginationContainerClass"
    :page-class="computedPageClass"
  ></paginate-component>
</template>

<script>
import Vue from 'vue'
import PaginateComponent from 'vuejs-paginate'

Vue.component('paginate-component', PaginateComponent)

export default {
<<<<<<< HEAD
  props: {
    count: Number,
    recordsPerPage: {
        type: Number,
        default: 4
    }
  },
  data() {
    return {
      activePage: 1,
      paginationContainerClass: 'pagination',
      pageItemClass: 'page-item',
    }
  },
  computed: {
    pageCount() {
      return Math.ceil(this.count / this.recordsPerPage)
    },
    computedPageClass() {
      return `${this.pageItemClass} ${
        this.activePage === this.currentPage ? 'active' : ''
      }`
=======
    props: {
        count: Number,
        recordsPerPage: Number,
    },
    data() {
        return {
            activePage: 1,
            paginationContainerClass: 'pagination',
            pageItemClass: 'page-item',
        };
>>>>>>> 20e24a03122a761b41da29679d758f7ee8e26e94
    },
  },
  methods: {
    clickCallback(pageNum) {
      console.log(pageNum)
      this.activePage = pageNum
      this.$emit('changePage', this.activePage, this.recordsPerPage)
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
