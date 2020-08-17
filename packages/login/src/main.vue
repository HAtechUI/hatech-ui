<!--
 * @Author: liuzhihao
 * @Date: 2020-08-17 16:26:11
 * @LastEditors: liuzhihao
 * @LastEditTime: 2020-08-17 17:06:49
 * @description: 
-->
<template>
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
        <a href="http://www.beian.miit.gov.cn"
           rel="noopener noreferrer"
           target="_blank">京ICP 备 19017828 号</a>
        <p>Copyright &copy; {{new Date().getFullYear()}}北京同创永益科技发展有限公司</p>
      </slot>
    </div>

  </div>
</template>

<script>


export default {
  name: 'Login',
  components: {},
  data () {
    return {

    }
  },
  props: {
    config: {
      type: Object,
      default: () => ({})
    }
  },
  created () {

  },
  mounted () {

  },
  destroyed () {

  },
  methods: {

  }
}
</script>
<style lang="scss" scoped>
.login-container {
  min-height: 100%;
  width: 100%;
  background-image: url('./img/login-bg.jpg');
  background-size: 100% 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
  .top {
    height: 55px;
    top: 50px;
    left: 50px;
    position: absolute;
  }
  .center {
    max-width: 500px;
    min-width: 350px;
    height: 80%;
    position: absolute;
    left: 0;
    bottom: 0;
    margin: auto;
    justify-content: center; //子元素水平居中
    align-items: center; //子元素垂直居中
    display: -webkit-box;
    display: -moz-box;
    display: -webkit-flex;
    display: -moz-flex;
    display: -ms-flexbox;
    display: flex;
    div.content {
      width: 100%;
      background: rgba(26, 47, 138, 0.6);
      padding: 30px;
    }
  }
  .footer {
    position: absolute;
    text-align: center;
    color: white;
    line-height: 40px;
    bottom: 0;
    left: 0;
    a,
    a:hover {
      color: white;
      text-decoration: none;
    }
  }
}
</style>
