<!--
 * @Author: Wuhao
 * @Email: kiwh77@126.com
 * @Date: 2019-09-29 10:44:39
 * @LastEditTime: 2019-09-29 16:48:53
 -->
<template>
  <el-pagination
    :small="useConfig.small"
    :background="useConfig.background"
    :page-size="pageInfo.limit"
    :total="pageInfo.total"
    :current-page="pageInfo.page"
    :pager-count="useConfig.pagerCount"
    :layout="useConfig.layout"
    :page-sizes="useConfig.pageSizes"
    :prev-text="useConfig.prevText"
    :next-text="useConfig.nextText"
    :disabled="useConfig.disabled"
    :hide-on-single-page="useConfig.hideOnSinglePage"
    @size-change="onEvent('onSizeChange', $event)"
    @current-change="onEvent('onPageChange', $event)"
    @prev-click="onEvent('onPageChange', $event)"
    @next-click="onEvent('onPageChange', $event)"
  />
</template>

<script>
const defaultConfig = {
  small: false,
  background: true,
  pagerCount: 9,
  layout: 'total, sizes, prev, pager, next, jumper',
  pageSizes: [10, 20, 50, 100, 200],
  hideOnSinglePage: false
}
export default {
  name: "HatechPagination",
  props: {
    config: {
      type: Object,
      default: () => defaultConfig
    },
    pageInfo: {
      type: Object,
      default: () => ({
        total: 0,
        limit: 10,
        page: 1
      })
    }
  },
  computed: {
    useConfig() {
      return { ...defaultConfig, ...this.config }
    },
    usePageInfo() {
      return this.pageInfo
    }
  },
  methods: {
    onEvent(event, ...avgs) {
      const pageInfo = this[event](...avgs)
      this.$emit('onEvent', pageInfo)
    },
    onSizeChange(limit) {
      return { ...this.pageInfo, limit }
    },
    onPageChange(page) {
      return { ...this.pageInfo, page }
    }
  }
}
</script>

