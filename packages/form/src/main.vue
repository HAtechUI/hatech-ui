<template>
  <div>
    <el-form
      ref="form"
      @submit.native.prevent
      auto-complete="off"
      :model="form.data"
      :inline="typeof config.inline === 'boolean' ? config.inline : defaultConfig.inline"
      :hideRequiredAsterisk="typeof config.hideRequiredAsterisk === 'boolean' ? config.hideRequiredAsterisk : defaultConfig.hideRequiredAsterisk"
      :showMessage="typeof config.showMessage === 'boolean' ? config.showMessage : defaultConfig.showMessage"
      :inlineMessage="typeof config.inlineMessage === 'boolean' ? config.inlineMessage : defaultConfig.inlineMessage"
      :statusIcon="typeof config.statusIcon === 'boolean' ? config.statusIcon : defaultConfig.statusIcon"
      :validateOnRuleChange="typeof config.validateOnRuleChange === 'boolean' ? config.validateOnRuleChange : defaultConfig.validateOnRuleChange"
      :disabled="typeof config.disabled === 'boolean' ? config.disabled : defaultConfig.disabled"
      :rules="mode === 'edit' ? (form.rules || {}) : {}"
      :label-width="config.labelWidth || 'auto'"
    >
      <el-row :gutter="24">
        <template v-for="item in form.items">
          <el-col
            :key="item.prop"
            :span="item.span || '24'"
            v-if="item.formatter?item.formatter(form.data,form.items,item):item.show"
          >
            <!-- 文本输入框 -->
            <el-form-item
              v-if="item.type === 'input'"
              :rules="item.rules"
              :prop="item.prop"
              :label="item.label"
              class="el-dialog-content-form-item"
            >
              <el-input
                :ref="item.prop"
                :type="item.props.type || 'text'"
                v-if="mode === 'edit'"
                :clearable="item.prop.clearable || true"
                @input="e => form.data[item.prop] = filterInput(e)"
                v-model.trim="form.data[item.prop]"
                :maxlength="item.props.maxlength"
                :minlength="item.props.minlength"
                :show-word-limit="item.props.showWordLimit || false"
                :placeholder="item.props.placeholder"
                :disabled="item.props.disabled || false"
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
                show-password
                auto-complete="new-password"
                :ref="item.prop"
                v-if="mode === 'edit'"
                v-model.trim="form.data[item.prop]"
                :placeholder="item.props.placeholder"
                :clearable="item.prop.clearable || true"
              ></el-input>
              <div v-else-if="mode === 'show'">
                <span>{{showPwd ? (form.data[item.props && item.props.showProp ? item.props.showProp : item.prop]) : '******'}}</span>
                <i class="el-icon-view" @click="showPwd = !showPwd" style="marginLeft:10px"></i>
              </div>
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
                :clearable="item.prop.clearable || true"
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
              <el-checkbox-group
                :ref="item.prop"
                v-model="form.data[item.prop]"
                :min="item.props.min"
                :max="item.props.max"
                :disalbed="mode === 'show'"
              >
                <el-checkbox
                  v-for="(option, index) in item.props.options"
                  :key="index"
                  :label="option.value ? option.value : option.label"
                  :disabled="!!item.props.disabled"
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
                :clearable="item.props.clearable"
                :popper-append-to-body="false"
                :disabled="!!item.props.disabled || !!item.props.loading"
                @change="item.props.event ? onEvent(item.props.event, $event): ()=>{}"
              >
                <el-option
                  v-for="(option, index) in (item.props.options || [])"
                  :key="index"
                  :value="option.value"
                  :label="option.name"
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
                clearable
                :emitPath="item.props.emitPath"
                :placeholder="item.props.placeholder"
                :show-all-levels="item.props.showAllLevels || false"
                :props="item.props.props"
                v-model="form.data[item.prop]"
                :disabled="!!item.props.disabled || !!item.props.loading"
                @change="item.props.event && onEvent(item.props.event, $event)"
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
  </div>
</template>

<script>
// ElementUI dialog组件文档: https://element.eleme.cn/#/zh-CN/component/dialog
const defaultConfig = {
  width: `${
    window.screen.width * 0.5 < 800 ? 800 : window.screen.width * 0.5
  }px`,
  labelWidth: "160px",
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
  name: "HatechForm",
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
      showPwd: true,
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
    // 过滤空格
    filterInput(data) {
      return data.replace(/\s+/g, "");
    }
  }
};
</script>
