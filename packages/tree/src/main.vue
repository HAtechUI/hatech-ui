<template>
  <el-tree
    ref="tree"
    :data="data"
    :empty-text="config.emptyText || defaultConfig.emptyText"
    :node-key="config.nodeKey || defaultConfig.nodeKey"
    :props="config.props || defaultConfig.props"
    :render-after-expand="config.renderAfterExpand || defaultConfig.renderAfterExpand"
    :load="config.load || defaultConfig.load"
    :render-content="typeof config.renderContent === 'boolean' ? config.renderContent : defaultConfig.renderContent"
    :highlight-current="typeof config.highlightCurrent === 'boolean' ? config.highlightCurrent : defaultConfig.highlightCurrent"
    :default-expand-all="typeof config.defaultExpandAll === 'boolean' ? config.defaultExpandAll : defaultConfig.defaultExpandAll"
    :expand-on-click-node="typeof config.expandOnClickNode === 'boolean' ? config.expandOnClickNode : defaultConfig.expandOnClickNode"
    :check-on-click-node="typeof config.checkOnClickNode === 'boolean' ? config.checkOnClickNode : defaultConfig.checkOnClickNode"
    :auto-expand-parent="typeof config.autoExpandParent === 'boolean' ? config.autoExpandParent : defaultConfig.autoExpandParent"
    :default-expanded-keys="config.defaultExpandedKeys || defaultConfig.defaultExpandedKeys"
    :show-checkbox="typeof config.showCheckbox === 'boolean' ? config.showCheckbox : defaultConfig.showCheckbox"
    :check-strictly="typeof config.checkStrictly === 'boolean' ? config.checkStrictly : defaultConfig.checkStrictly"
    :default-checked-keys="config.defaultCheckedKeys || defaultConfig.defaultCheckedKeys"
    :current-node-key="config.currentNodeKey || defaultConfig.currentNodeKey"
    :filter-node-method="config.filterNodeMethod || defaultConfig.filterNodeMethod"
    :accordion="typeof config.accordion === 'boolean' ? config.accordion : defaultConfig.accordion"
    :indent="config.indent || defaultConfig.indent"
    :icon-class="config.iconClass || defaultConfig.iconClass"
    :lazy="typeof config.lazy === 'boolean' ? config.lazy : defaultConfig.lazy"
    :draggable="typeof config.draggable === 'boolean' ? config.draggable : defaultConfig.draggable"
    :allow-drag="config.allowDrag || defaultConfig.allowDrag"
    :allow-drop="config.allowDrop || defaultConfig.allowDrop"
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
    @node-drop="(draggingNode, dropNode, dropType, ev) => onEvent('node-drop', [ draggingNode, dropNode, dropType, ev ])"
  >
    <template slot-scope="{ node }">
      <span class="span-ellipsis" :title="node.label" v-text="node.label"></span>
    </template>
  </el-tree>
</template>

<script>
const defaultConfig = {
  emptyText: "没有数据",
  nodeKey: "id",
  props: {
    label: "name",
    children: "children",
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
};

export default {
  name: "HatechTree",
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
      defaultConfig,
      tree: {}
    };
  },
  mounted() {
    this.tree = this.$refs.tree;
  },
  methods: {
    onEvent(event, params) {
      this.$emit("onEvent", {
        event: event,
        params,
        tree: this.$refs.tree,
        config: { ...this.defaultConfig, ...this.config },
        data: this.data
      });
    }
  }
};
</script>

<style scoped>
.span-ellipsis {
  width: 100%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
</style>
