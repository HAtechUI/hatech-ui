<template>
  <el-dialog
    :title="config.title || defaultConfig.title"
    :visible.sync="visible"
    :width="config.width || defaultConfig.width"
    :top="config.top || defaultConfig.top"
    :modal="config.modal || defaultConfig.modal"
    :modal-append-to-body="config.modalAppEndToBody || defaultConfig.modalAppEndToBody"
    :appendToBody="typeof config.appendToBody === 'boolean' ? config.appendToBody : defaultConfig.appendToBody"
    :lockScroll="typeof config.lockScroll === 'boolean' ? config.lockScroll : defaultConfig.lockScroll"
    :customClass="config.customClass || defaultConfig.customClass"
    :closeOnClickModal="typeof config.closeOnClickModal === 'boolean' ? config.closeOnClickModal : defaultConfig.closeOnClickModal"
    :closeOnPressEscape="typeof config.closeOnPressEscape === 'boolean' ? config.closeOnPressEscape : defaultConfig.closeOnPressEscape"
    :showClose="typeof config.showClose === 'boolean' ? config.showClose : defaultConfig.showClose"
    :center="typeof config.center === 'boolean' ? config.center : defaultConfig.center"
    :destoryOnClose="typeof config.destoryOnClose === 'boolean' ? config.destoryOnClose : defaultConfig.destoryOnClose"
    @open="onEvent('onOpenDialog', $event)"
    @opened="onEvent('onOpenedDialog', $event)"
    @close="onEvent('onCloseDialog', $event)"
    @closed="onEvent('onClosedDialog', $event)"
  >
    <div class="el-dialog-content-view" v-loading="loading" v-if="visible">
      <slot name="before-forms"></slot>
      <el-form
        v-if="visible"
        ref="form"
        auto-complete="off"
        :model="form.data"
        :rules="mode === 'edit' ? (form.rules || {}) : {}"
        @submit.native.prevent
        :label-width="config.labelWidth || 'auto'"
      >
        <el-row :gutter="24">
          <template v-for="item in form.items">
            <el-col
              :key="item.prop"
              :span="item.span || 24"
              v-if="item.formatter ? item.formatter(form.data, form.items, item) : item.show"
            >
              <!-- 文本输入框 -->
              <el-form-item
                v-if="item.type === 'input'"
                :rules="item.rules"
                :prop="item.prop"
                :label="item.label"
                :class="item.props.showWordLimit ? 'has-right-padding el-dialog-content-form-item':'el-dialog-content-form-item'"
              >
                <el-input
                  :ref="item.prop"
                  :title="form.data[item.prop]"
                  :type="item.props.type || 'text'"
                  v-if="mode === 'edit'"
                  @input="e => form.data[item.prop] = filterInput(e)"
                  v-model.trim="form.data[item.prop]"
                  :rows="item.props.rows || 5"
                  :maxlength="item.props.maxlength"
                  :minlength="item.props.minlength"
                  :show-word-limit="item.props.showWordLimit || false"
                  :placeholder="item.props.placeholder"
                  :disabled="item.props.disabled || false"
                  :readonly="item.props.readonly || false"
                ></el-input>
                <div v-else-if="mode === 'show'">{{form.data[item.prop]}}</div>
              </el-form-item>
              <!-- 标签头部 -->
              <el-form-item
                v-if="item.type === 'div'"
                :rules="item.rules"
                :label="item.label"
                class="el-dialog-content-form-item"
              ></el-form-item>
              <!-- 密码框 -->
              <el-form-item
                v-if="item.type === 'inputpwd'"
                :rules="item.rules"
                :prop="item.prop"
                :label="item.label"
                class="el-dialog-content-form-item"
              >
                <el-input
                  :type="showPwd ? 'text':'password'"
                  auto-complete="new-password"
                  :ref="item.prop"
                  v-if="mode === 'edit'"
                  v-model.trim="form.data[item.prop]"
                  :placeholder="item.props.placeholder"
                ></el-input>
                <div v-else-if="mode === 'show'">
                  <span>{{showPwd ? (form.data[item.props && item.props.showProp ? item.props.showProp : item.prop]) : '******'}}</span>
                </div>
                <svg-icon
                  v-show="showPwd"
                  icon-class="yincang"
                  @click="changeShowPwd(item.prop)"
                  style="marginLeft:10px"
                ></svg-icon>
                <svg-icon
                  v-show="!showPwd"
                  icon-class="xianshi"
                  @click="changeShowPwd(item.prop)"
                  style="marginLeft:10px"
                ></svg-icon>
              </el-form-item>
              <!-- number -->
              <el-form-item
                v-else-if="item.type === 'inputnumber'"
                :rules="item.rules"
                :prop="item.prop"
                :label="item.label"
                class="el-dialog-content-form-item"
              >
                <el-input-number
                  :ref="item.prop"
                  v-if="mode === 'edit'"
                  v-model.trim="form.data[item.prop]"
                  :max="item.props.max"
                  :min="item.props.min"
                  :placeholder="item.props.placeholder"
                  :disabled="item.props.disabled"
                ></el-input-number>
                <div
                  v-else-if="mode === 'show'"
                >{{form.data[item.props && item.props.showProp ? item.props.showProp : item.prop]}}</div>
              </el-form-item>
              <!-- 多行文本输入框 -->
              <el-form-item
                v-else-if="item.type === 'textarea'"
                :rules="item.rules"
                :prop="item.prop"
                :label="item.label"
                class="el-dialog-content-form-item"
              >
                <el-input
                  type="textarea"
                  v-if="mode === 'edit'"
                  v-model.trim="form.data[item.prop]"
                  :ref="item.prop"
                  :maxlength="item.props.maxlength"
                  :minlength="item.props.minlength"
                  :show-word-limit="item.props.showWordLimit || false"
                  :rows="item.props.rows"
                  :disabled="item.props.disabled || false"
                  :placeholder="item.props.placeholder"
                ></el-input>
                <div
                  v-else-if="mode === 'show'"
                >{{form.data[item.props && item.props.showProp ? item.props.showProp : item.prop]}}</div>
              </el-form-item>
              <!-- 单选 -->
              <el-form-item
                v-else-if="item.type === 'radio'"
                :rules="item.rules"
                :prop="item.prop"
                :label="item.label"
                class="el-dialog-content-form-item"
              >
                <el-radio-group v-model="form.data[item.prop]" :ref="item.prop">
                  <el-radio
                    v-for="(option, index) in item.props.options"
                    :key="index"
                    :label="option.label"
                    :value="option.value"
                    :name="option.label"
                    :disabled="mode === 'show'"
                  ></el-radio>
                </el-radio-group>
              </el-form-item>
              <!-- 多选 -->
              <el-form-item
                v-else-if="item.type === 'checkbox'"
                :rules="item.rules"
                :prop="item.prop"
                :label="item.label"
                class="el-dialog-content-form-item"
              >
                <el-checkbox
                  v-if="item.checkAllItem"
                  :indeterminate="item.isIndeterminate"
                  v-model="item.checkAll"
                  @change="item.props.checkAllEvent && onEvent(item.props.checkAllEvent, $event)"
                >全选</el-checkbox>
                <el-checkbox-group
                  :ref="item.prop"
                  v-model="form.data[item.prop]"
                  :min="item.props.min"
                  :max="item.props.max"
                  :disalbed="mode === 'show'"
                  @change="item.props.checkedEvent && onEvent(item.props.checkedEvent, $event)"
                >
                  <el-checkbox
                    v-for="(option, index) in item.props.options"
                    :key="index"
                    :label="option.value ? option.value : option.label"
                    :disabled="!!item.props.disabled"
                    :title="option.label"
                  >{{option.label}}</el-checkbox>
                </el-checkbox-group>
              </el-form-item>
              <!-- 下拉选择框 -->
              <el-form-item
                v-else-if="item.type === 'select'"
                :rules="item.rules"
                :prop="item.prop"
                :label="item.label"
                class="el-dialog-content-form-item"
              >
                <el-select
                  :ref="item.prop"
                  v-loading="!!item.props.loading"
                  element-loading-spinner="el-icon-loading"
                  v-if="mode === 'edit'"
                  v-model="form.data[item.prop]"
                  :placeholder="item.props.placeholder"
                  :multiple="item.props.multiple"
                  :clearable="item.props.clearable"
                  :title="(item.props.options.length > 0 && item.props.options.find(v => v.value === form.data[item.prop])) ? item.props.options.find(v => v.value === form.data[item.prop]).name : ''"
                  :disabled="!!item.props.disabled || !!item.props.loading"
                  @change="item.props.event ? onEvent(item.props.event, $event): ()=>{}"
                  @visible-change="item.props.event && onEvent(item.props.event, $event)"
                  :popper-append-to-body="false"
                >
                  <el-option
                    v-for="(option, index) in (item.props.options || [])"
                    :key="index"
                    :value="option.value"
                    :label="option.name"
                    :title="option.name"
                  >{{option.name}}</el-option>
                </el-select>
                <div
                  v-else-if="mode === 'show'"
                >{{ ((item.props.options || []).find(option => option.value === form.data[item.prop]) || {}).name || form.data[ item.props && item.props.showProp ? item.props.showProp : item.prop] }}</div>
              </el-form-item>
              <!-- 日期时间选择 -->
              <el-form-item
                v-else-if="item.type === 'date'"
                :rules="item.rules"
                :prop="item.prop"
                :label="item.label"
                class="el-dialog-content-form-item"
              >
                <el-date-picker
                  :ref="item.prop"
                  v-if="mode === 'edit'"
                  :format="item.props.format || 'yyyy-MM-dd HH:mm:ss'"
                  :type="item.props.type || 'date'"
                  v-model="form.data[item.prop]"
                  :placeholder="item.props.placeholder"
                  :default-time="item.props.defaultTime"
                  :disabled="!!item.props.disabled"
                ></el-date-picker>
                <div
                  v-else-if="mode === 'show'"
                >{{form.data[item.props && item.props.showProp ? item.props.showProp : item.prop]}}</div>
              </el-form-item>
              <!-- 时间范围选择 -->
              <el-form-item
                v-else-if="item.type === 'datetimerange'"
                :rules="item.rules"
                :prop="item.prop"
                :label="item.label"
                class="el-dialog-content-form-item"
              >
                <el-date-picker
                  v-if="mode === 'edit'"
                  v-model="form.data[item.prop]"
                  type="datetimerange"
                  :readonly="item.props && item.props.readonly || false"
                  :disabled="!!item.disabled "
                  :editable="item.props && item.props.editable || true"
                  :clearable="item.props && item.props.clearable || true"
                  :size="item.props && item.props.size"
                  :start-placeholder="item.props && item.props.startPlaceholder"
                  :end-placeholder="item.props && item.props.endPlaceholder"
                  :time-arrow-control="item.props && item.props.time || true"
                  :format="item.props && item.props.format || 'yyyy-MM-dd HH:mm:ss'"
                  :align="item.props && item.props.align || 'left'"
                  :popper-class="item.props && item.props.popper"
                  :picker-options="item.props && item.props.picker"
                  :range-separator="item.props && item.props.range || '至'"
                  :default-value="item.props && item.props.defaultValue"
                  :default-time="item.props && item.props.defaultTime"
                  :value-format="item.props && item.props.valueFormat || 'yyyy-MM-dd HH:mm:ss'"
                  :name="item.props && item.props.name"
                  :prefix-icon="item.props && item.props.prefixIcon || 'el-icon-date'"
                  :clear-icon="item.props && item.props.clear || 'el-icon-circle-close'"
                  @change="item.props.event && onEvent(item.props.event, $event)"
                ></el-date-picker>
                <div
                  v-else-if="mode === 'show'"
                >{{form.data[item.props && item.props.showProp ? item.props.showProp : item.prop]}}</div>
              </el-form-item>
              <!-- 级联选择 -->
              <el-form-item
                v-else-if="item.type === 'cascader'"
                :rules="item.rules"
                :prop="item.prop"
                :label="item.label"
                class="el-dialog-content-form-item"
              >
                <el-cascader
                  :ref="item.prop"
                  v-if="mode === 'edit'"
                  v-loading="!!item.props.loading"
                  element-loading-spinner="el-icon-loading"
                  :options="item.props.options"
                  :clearable="item.props.clearable"
                  :emitPath="item.props.emitPath"
                  :placeholder="item.props.placeholder"
                  :show-all-levels="item.props.showAllLevels || false"
                  :props="item.props.props"
                  v-model="form.data[item.prop]"
                  :disabled="!!item.props.disabled || !!item.props.loading"
                  @change="item.props.event && onEvent(item.props.event, $event)"
                  @visible-change="item.props.operateEvent && onEvent(item.props.operateEvent, $event)"
                >
                  <template slot-scope="{ node }">
                    <div class="cascader-node" :title="node.label" v-text="node.label"></div>
                  </template>
                </el-cascader>
                <div
                  v-else-if="mode === 'show'"
                >{{form.data[item.props && item.props.showProp ? item.props.showProp : item.prop]}}</div>
              </el-form-item>
              <!-- 自定义HTML内容 -->
              <el-form-item
                v-else-if="item.type === 'html'"
                :rules="item.rules"
                :prop="item.prop"
                :label="item.label"
                class="el-dialog-content-form-item"
              >
                <div v-html="item.formatter && item.formatter(form.data, mode)" />
              </el-form-item>
              <!-- 文字展示 -->
              <el-form-item
                v-else-if="item.type === 'text'"
                :rules="item.rules"
                :prop="item.prop"
                :label="item.label"
                class="el-dialog-content-form-item"
              >{{item.formatter ? item.formatter(form.data, mode) : form.data[item.props && item.props.showProp ? item.props.showProp : item.prop] }}</el-form-item>
              <!-- 自定义插槽 -->
              <el-form-item
                v-else-if="item.type === 'slot'"
                :rules="item.rules"
                :prop="item.prop"
                :label="item.label"
                class="el-dialog-content-form-item"
              >
                <slot :name="item.props.slot" :item="item" :data="form.data" v-if="mode === 'edit'"></slot>
                <div
                  v-else-if="mode === 'show'"
                >{{form.data[item.props && item.props.showProp ? item.props.showProp : item.prop]}}</div>
              </el-form-item>
            </el-col>
          </template>
        </el-row>
      </el-form>
    </div>
    <slot name="custom"></slot>
    <div slot="footer" class="dialog-footer" v-if="config.buttons && config.buttons.length > 0">
      <template v-for="button in config.buttons">
        <el-button
          v-if="button.show"
          :key="button.event"
          @click="onEvent(button.event)"
          :type="button.type"
          v-stop-reclick
          :disabled="!!loading"
        >{{button.name}}</el-button>
      </template>
    </div>
  </el-dialog>
</template>

<script>
// ElementUI dialog组件文档: https://element.eleme.cn/#/zh-CN/component/dialog
const defaultConfig = {
  width: `${
    window.screen.width * 0.5 < 800 ? 800 : window.screen.width * 0.5
  }px`,
  labelWidth: "20%",
  fullscreen: true,
  top: "10vh",
  modal: false,
  modalAppendToBody: true,
  appendToBody: false,
  lockScroll: true,
  customClass: "",
  closeOnClickModal: false,
  closeOnPressEscape: false,
  showClose: true,
  center: false,
  destoryOnClose: true
};
export default {
  name: "HatechFormDialog",
  props: {
    loading: {
      type: Boolean,
      default: false
    },
    config: {
      type: Object,
      default: () => defaultConfig
    },
    form: {
      type: Object,
      default: () => ({
        items: [],
        rules: {}
      })
    },
    mode: {
      type: String,
      default: "edit"
    }
  },
  data() {
    return {
      visible: false,
      showPwd: false,
      defaultConfig
    };
  },
  methods: {
    onEvent(event, params = {}) {
      this.$emit("onEvent", {
        event,
        params: {
          form: this.$refs.form,
          refs: this.$refs,
          data: this.form.data,
          params
        }
      });
    },
    formRef() {
      return this.$refs.form;
    },
    show() {
      this.visible = true;
    },
    close() {
      this.visible = false;
    },
    changeShowPwd(refName) {
      this.showPwd = !this.showPwd;
      setTimeout(() => {
        this.changeCursorPosition(refName);
      }, 0);
    },
    // 光标控制
    changeCursorPosition(refName) {
      let dom = this.$refs[refName] && this.$refs[refName][0].$refs.input;
      // 获取光标的位置
      let startPos = this.$utils.dom.getCursortPosition(dom);
      // 设置光标位置
      this.$utils.dom.setCaretPosition(dom, startPos);
    },
    // 过滤空格
    filterInput(data) {
      return data.replace(/\s+/g, "");
    }
  }
};
</script>

