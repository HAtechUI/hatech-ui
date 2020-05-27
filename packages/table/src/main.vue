<!--
 * @Author: Wuhao
 * @Email: kiwh77@126.com
 * @Date: 2019-09-24 09:23:20
 * @LastEditTime: 2020-05-18 14:43:30
 -->
<template>
  <!-- 列表 -->
  <el-table
    :stripe="config.stripe || localConfig.stripe"
    :border="config.border || localConfig.border"
    :resizable="config.resizable || localConfig.resizable"
    :size="config.size || localConfig.size"
    :height="config.height || localConfig.height"
    :maxHeight="config.maxHeight || localConfig.maxHeight"
    :fit="config.fit || localConfig.fit"
    :show-header="config.showHeader || localConfig.showHeader"
    :highlight-current-row="config.highlightCurrentRow || localConfig.highlightCurrentRow"
    :row-class-name="config.rowClassName || localConfig.rowClassName"
    :row-style="config.rowStyle || localConfig.rowStyle"
    :cell-class-name="config.rowClassName || localConfig.rowClassName"
    :cell-style="config.cellStyle || localConfig.cellStyle"
    :header-row-class-name="config.headerRowClassName || localConfig.headerRowClassName"
    :header-row-style="config.headerRowStyle || localConfig.headerRowStyle"
    :header-cell-class-name="config.headerCellClassName || localConfig.headerCellClassName"
    :header-cell-style="config.headerCellStyle || localConfig.headerCellStyle"
    :row-key="config.rowKey || localConfig.rowKey"
    :current-row-key="config.currentRowKey || localConfig.currentRowKey"
    :empty-text="config.emptyText || localConfig.emptyText"
    :default-expand-all="config.defaultExpandAll || localConfig.defaultExpandAll"
    :tooltip-effect="config.tooltipEffect || localConfig.tooltipEffect"
    :show-summary="config.showSummary || localConfig.showSummary"
    :sum-text="config.sumText || localConfig.sumText"
    :summary-method="config.summaryMethod || localConfig.summaryMethod"
    :span-method="config.spanMethod || localConfig.spanMethod"
    :select-on-indeterminate="config.selectOnIndeterminate || localConfig.selectOnIndeterminate"
    :indent="config.indent || localConfig.indent"
    :lazy="config.lazy || localConfig.lazy"
    :load="config.load || localConfig.load"
    :tree-props="config.treeProps || localConfig.treeProps"
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
    @expand-change="eventEmit('expand-change', $event)">
    <!-- 多选 -->
    <el-table-column
      v-if="table.isSelectionShow"
      :selectable="table.selectable"
      type="selection"
      align="center"
      width="40"
    ></el-table-column>

    <!-- 表格编号设置 -->
    <el-table-column
      label="编号"
      v-if="table.isIndexShow"
      type="index"
      align="center"
      width="50"
    ></el-table-column>

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
      :filter-placement="column.filterPlacement">
      <!--TODO:根据列表type展示相关内容-->
      <!-- slot，返回scope和column参数 -->
      <div class="td-cell" slot-scope="scope" v-if="column.type === 'slot'">
        <slot :name="'table-column-' + column.prop" :scope="scope" :column="column"></slot>
      </div>
      <!-- 默认 -->
      <div v-else slot-scope="scope">
        <div class="td-cell"
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
      min-width="80">
      <template slot-scope="scope">
        <span
          v-for="option in (table.cellOptions || []).filter(o => o.show && (o.formatter ? o.formatter(scope.row, o) : true))"
          :key="option.code"
          v-loading="option.loading"
          @click.stop="onEvent(option, scope.row)"
          class="cell-option-item"
          :title="option.name"
          :name="option.name">
          {{option.name}}
        </span>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
const defaultConfig = {
  showHeader: true,
  border: true,
  size: 'small',
  stripe: false,
  fit: true,
  highlightCurrentRow: true,
  defaultExpandAll: false,
  defaultSort: 'ascending',
  tooltipEffect: 'light',
  showSummary: false,
  sumText: '合计',
  selectOnIndeterminate: true,
  indent: 16
}

export default {
  name: 'ha-element-table',
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
      localConfig: defaultConfig
    };
  },
  mounted() {
    this.tableInstance = this.$refs.table;
  },
  methods: {
    // 表格事件
    eventEmit(eventName, params) {
      this.$emit('onTableEvent', { event: eventName, params });
    },
    // 操作列业务事件
    onEvent(option, row) {
      this.$store.commit('saveOperationId', option.id)
      this.$emit('onEvent', { event: option.event, option, params: row });
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
