<!--
 * @Author: Wuhao
 * @Email: kiwh77@126.com
 * @Date: 2019-09-24 09:23:20
 * @LastEditTime: 2020-05-18 14:43:30
 -->
<template>
  <!-- 列表 -->
  <el-table
    :stripe="typeof config.stripe === 'boolean' ? config.stripe : defaultConfig.stripe"
    :border="typeof config.border === 'boolean' ? config.border : defaultConfig.border"
    :resizable="config.resizable || defaultConfig.resizable"
    :size="config.size || defaultConfig.size"
    :height="config.height || defaultConfig.height"
    :maxHeight="config.maxHeight || defaultConfig.maxHeight"
    :fit="typeof config.fit === 'boolean' ? config.fit : defaultConfig.fit"
    :show-header="typeof config.showHeader === 'boolean' ? config.showHeader : defaultConfig.showHeader"
    :highlight-current-row="typeof config.highlightCurrentRow === 'boolean' ? config.highlightCurrentRow : defaultConfig.highlightCurrentRow"
    :row-class-name="config.rowClassName || defaultConfig.rowClassName"
    :row-style="config.rowStyle || defaultConfig.rowStyle"
    :cell-class-name="config.rowClassName || defaultConfig.rowClassName"
    :cell-style="config.cellStyle || defaultConfig.cellStyle"
    :header-row-class-name="config.headerRowClassName || defaultConfig.headerRowClassName"
    :header-row-style="config.headerRowStyle || defaultConfig.headerRowStyle"
    :header-cell-class-name="config.headerCellClassName || defaultConfig.headerCellClassName"
    :header-cell-style="config.headerCellStyle || defaultConfig.headerCellStyle"
    :row-key="config.rowKey || defaultConfig.rowKey"
    :current-row-key="config.currentRowKey || defaultConfig.currentRowKey"
    :empty-text="config.emptyText || defaultConfig.emptyText"
    :default-expand-all="typeof config.defaultExpandAll === 'boolean' ? config.defaultExpandAll : defaultConfig.defaultExpandAll"
    :tooltip-effect="config.tooltipEffect || defaultConfig.tooltipEffect"
    :show-summary="typeof config.showSummary === 'boolean' ? config.showSummary : defaultConfig.showSummary"
    :sum-text="config.sumText || defaultConfig.sumText"
    :summary-method="config.summaryMethod || defaultConfig.summaryMethod"
    :span-method="config.spanMethod || defaultConfig.spanMethod"
    :select-on-indeterminate="typeof config.selectOnIndeterminate === 'boolean' ? config.selectOnIndeterminate : defaultConfig.selectOnIndeterminate"
    :indent="config.indent || defaultConfig.indent"
    :lazy="typeof config.lazy === 'boolean' ? config.lazy : defaultConfig.lazy"
    :load="config.load || defaultConfig.load"
    :tree-props="config.treeProps || defaultConfig.treeProps"
    :data="data || []"
    ref="table"
    @select="eventEmit('select', $event)"
    @select-all="eventEmit('select-all', $event)"
    @selection-change="eventEmit('selection-change', $event)"
    @cell-mouse-enter="eventEmit('cell-mouse-enter', $event)"
    @cell-mouse-leave="eventEmit('cell-mouse-leave', $event)"
    @cell-click="eventEmit('cell-click', $event)"
    @cell-dblclick="eventEmit('cell-dblclick', $event)"
    @row-click="eventEmit('row-click', $event)"
    @row-contextmenu="eventEmit('row-contextmenu', $event)"
    @row-dblclick="eventEmit('row-dblclick', $event)"
    @header-click="eventEmit('header-click', $event)"
    @header-contextmenu="eventEmit('header-contextmenu', $event)"
    @sort-change="eventEmit('sort-change', $event)"
    @filter-change="eventEmit('filter-change', $event)"
    @current-change="eventEmit('current-change', $event)"
    @header-dragend="eventEmit('header-dragend', $event)"
    @expand-change="eventEmit('expand-change', $event)"
  >
    <!-- 多选 -->
    <el-table-column
      v-if="table.isSelectionShow"
      :selectable="table.selectable"
      type="selection"
      align="center"
      width="40"
    ></el-table-column>

    <!-- 表格编号设置 -->
    <el-table-column label="编号" v-if="table.isIndexShow" type="index" align="center" width="50"></el-table-column>

    <!-- 列配置 -->
    <el-table-column
      v-for="(column, key) in ((table.columns || []).filter(column => column.show))"
      :key="key"
      :prop="column.prop"
      :label="column.label"
      :width="column.width"
      :fixed="column.fixed"
      :minWidth="column.minWidth"
      :column-key="column.columnKey"
      :label-class-name="column.labelClassName"
      :show-overflow-tooltip="column.showOverflowTooltip || true"
      :align="column.align || 'center'"
      :header-align="column.headerAlign || 'center'"
      :sortable="column.sortable === false ? false : true"
      :sort-method="column.sortMethod"
      :sort-by="column.sortBy"
      :sort-orders="column.sortOrders"
      :resizable="column.resizable"
      :class-name="column.className"
      :selectable="column.selectable"
      :reserve-selection="column.reserveSelection"
      :filters="column.filters"
      :filter-placement="column.filterPlacement"
    >
      <!--TODO:根据列表type展示相关内容-->
      <!-- slot，返回scope和column参数 -->
      <div class="td-cell" slot-scope="scope" v-if="column.type === 'slot'">
        <slot :name="'table-column-' + column.prop" :scope="scope" :column="column"></slot>
      </div>
      <!-- 默认 -->
      <div v-else slot-scope="scope">
        <div
          class="td-cell"
          v-html="column.formatter ? column.formatter(scope.row, scope.column, scope.row[column.prop], scope.$index) : scope.row[column.prop]"
        />
      </div>
    </el-table-column>

    <!-- 操作列 -->
    <el-table-column
      v-if="table.cellOptionsShow"
      label="操作"
      align="center"
      :width="table.cellOptionsWidth"
      min-width="80"
    >
      <template slot-scope="scope">
        <span
          v-for="option in (table.cellOptions || []).filter(o => o.show && (o.formatter ? o.formatter(scope.row, o) : true))"
          :key="option.code"
          v-loading="option.loading"
          @click.stop="onEvent(option, scope.row)"
          class="cell-option-item"
          :title="option.name"
          :name="option.name"
        >{{option.name}}</span>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
const defaultConfig = {
  showHeader: true,
  border: true,
  size: "small",
  stripe: false,
  fit: true,
  highlightCurrentRow: true,
  defaultExpandAll: false,
  defaultSort: "ascending",
  tooltipEffect: "light",
  showSummary: false,
  sumText: "合计",
  selectOnIndeterminate: true,
  indent: 16
};

export default {
  name: "HatechTable",
  props: {
    data: {
      tyep: Array,
      default: () => []
    },
    table: {
      type: Object,
      default: () => ({})
    },
    config: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      tableInstance: undefined,
      defaultConfig
    };
  },
  mounted() {
    this.tableInstance = this.$refs.table;
  },
  methods: {
    // 表格事件
    eventEmit(eventName, params) {
      this.$emit("onTableEvent", { event: eventName, params });
    },
    // 操作列业务事件
    onEvent(option, row) {
      this.$emit("onEvent", { event: option.event, option, params: row });
    }
  }
};
</script>

<style scoped>
.td-cell {
  overflow: hidden;
  text-overflow: ellipsis;
}
.cell-option-item {
  cursor: pointer;
  padding: 0 6px;
  word-break: keep-all;
}
.cell-option-item:disabled {
  color: grey;
}
</style>
