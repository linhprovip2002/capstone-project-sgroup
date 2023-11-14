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
  props: {
    count: Number,
    recordsPerPage: {
      type: Number,
      default: 4,
    },
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

<style lang="scss">
.pagination {
  display: flex;
  width: 100%;
  gap: 20px;
  justify-content: center;
  font-size: 14px;
  a {
    padding: 6px 12px;
  }
}

.page-item {
  cursor: pointer;
  border-radius: 6px;
  &:hover {
    background: #333;
    color: #fff;
  }
}

.page-item.active {
  background: #333;
  color: #fff;
}
</style>
