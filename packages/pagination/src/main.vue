<!--
 * @Author: Wuhao
 * @Email: kiwh77@126.com
 * @Date: 2019-09-29 10:44:39
 * @LastEditTime: 2019-09-29 16:48:53
 -->
<template>
  <el-pagination
    :small="typeof config.small === 'boolean' ? config.small : defaultConfig.small"
    :background="typeof config.background === 'boolean' ? config.background : defaultConfig.background"
    :page-size="pageInfo.limit"
    :total="pageInfo.total"
    :current-page="pageInfo.page"
    :pager-count="config.pagerCount || defaultConfig.pagerCount"
    :layout="config.layout || defaultConfig.layout"
    :page-sizes="config.pageSizes || defaultConfig.pageSizes"
    :prev-text="config.prevText || defaultConfig.prevText"
    :next-text="config.nextText || defaultConfig.nextText"
    :disabled="typeof config.disabled === 'boolean' ? config.disabled : defaultConfig.disabled"
    :hide-on-single-page="typeof config.hideOnSinglePage === 'boolean' ? config.hideOnSinglePage : defaultConfig.hideOnSinglePage"
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
  layout: "total, sizes, prev, pager, next, jumper",
  pageSizes: [10, 20, 50, 100, 200],
  hideOnSinglePage: false
};
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
  data() {
    return {
      defaultConfig
    };
  },
  methods: {
    onEvent(event, ...avgs) {
      const pageInfo = this[event](...avgs);
      this.$emit("onEvent", pageInfo);
    },
    onSizeChange(limit) {
      return { ...this.pageInfo, limit };
    },
    onPageChange(page) {
      return { ...this.pageInfo, page };
    }
  }
};
</script>

