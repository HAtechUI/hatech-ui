<template>
  <el-tree
    ref="tree"
    :data="data"
    :empty-text="config.emptyText || localConfig.emptyText"
    :node-key="config.nodeKey || localConfig.nodeKey"
    :props="config.props || localConfig.props"
    :render-after-expand="config.renderAfterExpand || localConfig.renderAfterExpand"
    :load="config.load || localConfig.load"
    :render-content="config.renderContent || localConfig.renderContent"
    :highlight-current="config.highlightCurrent || localConfig.highlightCurrent"
    :default-expand-all="config.defaultExpandAll || localConfig.defaultExpandAll"
    :expand-on-click-node="config.expandOnClickNode || localConfig.expandOnClickNode"
    :check-on-click-node="config.checkOnClickNode || localConfig.checkOnClickNode"
    :auto-expand-parent="config.autoExpandParent || localConfig.autoExpandParent"
    :default-expanded-keys="config.defaultExpandedKeys || localConfig.defaultExpandedKeys"
    :show-checkbox="config.showCheckbox || localConfig.showCheckbox"
    :check-strictly="config.checkStrictly || localConfig.checkStrictly"
    :default-checked-keys="config.defaultCheckedKeys || localConfig.defaultCheckedKeys"
    :current-node-key="config.currentNodeKey || localConfig.currentNodeKey"
    :filter-node-method="config.filterNodeMethod || localConfig.filterNodeMethod"
    :accordion="config.accordion || localConfig.accordion"
    :indent="config.indent || localConfig.indent"
    :icon-class="config.iconClass || localConfig.iconClass"
    :lazy="config.lazy || localConfig.lazy"
    :draggable="config.draggable || localConfig.draggable"
    :allow-drag="config.allowDrag || localConfig.allowDrag"
    :allow-drop="config.allowDrop || localConfig.allowDrop"
    @node-click="onEvent('node-click', $event)"
    @node-contextmenu="onEvent('node-contextmenu', $event)"
    @check-change="onEvent('check-change', $event)"
    @check="onEvent('check', $event)"
    @current-change="onEvent('current-change', $event)"
    @node-expand="onEvent('node-expand', $event)"
    @node-collapse="onEvent('node-collapse', $event)"
    @node-drag-start="onEvent('node-drag-start', $event)"
    @node-drag-enter="onEvent('node-drag-enter', $event)"
    @node-drag-leave="onEvent('node-drag-leave', $event)"
    @node-drag-over="onEvent('node-drag-over', $event)"
    @node-drag-end="onEvent('node-drag-end', $event)"
    @node-drop="(draggingNode, dropNode, dropType, ev) => {
      let params = [
        draggingNode,
        dropNode,
        dropType,
        ev
      ]
      onEvent('node-drop', params)
      }"
  >
    <template slot-scope="{ node }">
      <span class="span-ellipsis" :title="node.label" v-text="node.label"></span>
    </template>
  </el-tree>
</template>

<script>
const defaultConfig = {
  emptyText: '没有数据',
  nodeKey: 'id',
  props: {
    label: 'name',
    children: 'children',
    disabled: false,
    isLeaf: false
  },
  // 是否在点击节点的时候展开或者收缩节点， 默认值为 true，如果为 false，则只有点箭头图标的时候才会展开或者收缩节点。
  expandOnClickNode: false,
  renderAfterExpand: true,
  highlightCurrent: true,
  defaultExpandAll: true,
  defaultOnClickNode: true,
  checkOnClickNode: false,
  autoExpandParent: true,
  defaultExpandKeys: [],
  showChceckbox: false,
  checkStrictly: false,
  accordion: false,
  indent: 16,
  lazy: false,
  draggable: false
}

export default {
  name: 'HATree',
  props: {
    data: {
      type: Array,
      default: () => []
    },
    config: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      localConfig: defaultConfig,
      tree: {}
    }
  },
  mounted() {
    this.tree = this.$refs.tree
  },
  methods: {
    onEvent(event, params) {
      this.$emit('onEvent', {
        event: event,
        params,
        tree: this.$refs.tree,
        config: { ...this.localConfig, ...this.config },
        data: this.data
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.span-ellipsis {
  width: 100%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
</style>
