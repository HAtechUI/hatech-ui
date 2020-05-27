<template>
  <el-dialog
    :title="(config.title || defaultConfig.title)"
    :visible.sync="visible"
    :width="(config.width || defaultConfig.width)"
    :top="(config.top || defaultConfig.top)"
    :modal="(config.modal || defaultConfig.modal)"
    :modal-append-to-body="(config.modalAppEndToBody || defaultConfig.modalAppEndToBody)"
    :appendToBody="(config.appendToBody || defaultConfig.appendToBody)"
    :lockScroll="(config.lockScroll || defaultConfig.lockScroll)"
    :customClass="(config.customClass || defaultConfig.customClass)"
    :closeOnClickModal="(config.closeOnClickModal || defaultConfig.closeOnClickModal)"
    :closeOnPressEscape="(config.closeOnPressEscape || defaultConfig.closeOnPressEscape)"
    :showClose="(config.showClose || defaultConfig.showClose)"
    :center="(config.center || defaultConfig.center)"
    :destoryOnClose="(config.destoryOnClose || defaultConfig.destoryOnClose)"
    @open="onEvent('onOpenDialog', $event)"
    @opened="onEvent('onOpenedDialog', $event)"
    @close="onEvent('onCloseDialog', $event)"
    @closed="onEvent('onClosedDialog', $event)"
  >
    <div class="el-dialog-content-view" v-if="visible">
      <slot name="ha-dialog-content" :visible="visible" :mode="mode"></slot>
    </div>
    <div slot="footer" class="dialog-footer" v-if="(config.buttons || defaultConfig.buttons).length > 0">
      <template v-for="button in (config.buttons || defaultConfig.buttons)">
        <el-button v-if="button.show" v-stop-reclick :key="button.event" @click="onEvent(button.event)" :type="button.type">{{button.name}}
        </el-button>
      </template>
    </div>
  </el-dialog>
</template>

<script>
// ElementUI dialog组件文档: https://element.eleme.cn/#/zh-CN/component/dialog
const defaultConfig = {
  loading: false,
  width: `${window.screen.width * 0.6 < 800 ? 800 : window.screen.width * 0.6}px`,
  fullscreen: true,
  top: '10vh',
  modal: false,
  modalAppendToBody: true,
  appendToBody: false,
  lockScroll: true,
  customClass: '',
  closeOnClickModal: false,
  closeOnPressEscape: false,
  showClose: true,
  center: false,
  destoryOnClose: true,
  buttons: [
    { type: 'danger', event: 'close', name: '取消', show: true },
    { type: 'primary', event: 'onOk', name: '确定', show: true }
  ]
}
export default {
  name: 'HADialog',
  props: {
    title: String,
    config: {
      type: Object,
      default: () => defaultConfig
    },
    mode: {
      type: String,
      default: 'edit'
    }
  },
  data() {
    return {
      visible: false,
      defaultConfig
    }
  },
  computed: {
    useConfig() {
      return { ...defaultConfig, ...this.config }
    }
  },
  methods: {
    onEvent(event, params = {}) {
      this.$emit('onEvent', { event, params })
    },
    show() {
      this.visible = true
    },
    close() {
      this.visible = false
    }
  }
}
</script>
