<!--
 * @Author: liuzhihao
 * @Date: 2020-08-17 11:00:11
 * @LastEditors: liuzhihao
 * @LastEditTime: 2020-08-19 16:41:20
 * @description: 
-->
<template>
  <div id="login">
    <hatech-banner :config="config.show">
      <template v-slot:p1
                v-if="config.textObj&&config.textObj.p1">{{config.textObj.p1}}</template>
      <template v-slot:p2
                v-if="config.textObj&&config.textObj.p2">{{config.textObj.p2}}</template>
      <template v-slot:p3
                v-if="config.textObj&&config.textObj.p3">{{config.textObj.p3}}</template>
    </hatech-banner>
    <div class="login-container"
         :style="config.containerStyle">
      <div class="top">
        <slot name="top-logo">
          <img src="./img/login-top-logo.png"
               alt="">
        </slot>
      </div>
      <div class="center">
        <div class="content"
             :style="config.loginStyle">
          <slot name="login-form"></slot>
        </div>
      </div>
      <div class="footer">
        <slot name="footer">
          <p>Copyright &copy; <span v-text="year"></span>北京同创永益科技发展有限公司 &nbsp;&nbsp; <a href="http://www.beian.miit.gov.cn"
               rel="noopener noreferrer"
               target="_blank">京ICP 备 19017828 号</a></p>
          <p>同创永益是面向未来的组织韧性服务提供商、专注于提供业务连续性及灾备管理相关产品、解决方案及服务的高新技术企业</p>
        </slot>
      </div>
    </div>
  </div>

</template>

<script>
/**
 * 登录页面组件
 * @param {Object} config 组件配置
 * @param {Object} config.containerStyle 组件css样式
 * @param {Object} config.loginStyle 组件登录面板css样式
 * @param {Object} config.show 组件登录面板banner显示隐藏
 * @param {Object} config.textObj banner组件显示内容
 * @slot top-logo 左上角Logo图标插槽
 * @slot login-form 登录输入面板插槽
 * @slot footer 页脚插槽
 */

import HatechBanner from '../../banner/src/main'
export default {
  name: 'HatechLogin',
  components: { HatechBanner },
  data () {
    return {
      year: new Date().getFullYear(),
    }
  },
  props: {
    config: {
      type: Object,
      default: () => ({})
    }
  },
  created () {
    //判断退出到登录页面banner是否显示
    if (sessionStorage.getItem('_quit__Show') === 'false') {
      this.config.show = false;
    } else {
      this.config.show = true;
    }
  },
  methods: {
    dealBannerShow (show) {
      sessionStorage.setItem('_quit__Show', show)
    }
  },
  mounted () {
    //banner第一渲染后 将配置中的值存储在sessionStorage中
    this.dealBannerShow(this.config.quitShow);
  },
  destroyed () {

  }
}
</script>
<style lang="scss" scoped>
@import './css/style.scss';
</style>
