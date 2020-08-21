<!--
 * @Author: liuzhihao
 * @Date: 2020-08-18 17:35:26
 * @LastEditors: liuzhihao
 * @LastEditTime: 2020-08-19 16:25:18
 * @description: 
-->
<template>
  <div id="banner"
       v-if="show">
    <div id="banner-text">
      <p>
        <slot name="p1">万物存在于连续性之上，而连续的事物本身即是美</slot>
      </p>
      <p><span id="en-text">
          <slot name="p2">Everything exists because of continuity, and this continuity itself is beautiful</slot>
        </span></p>
      <p id="right-text">
        <slot name="p3">向一切美的创造者致敬</slot>
      </p>
    </div>
    <canvas id="canvas"></canvas>
  </div>
</template>
<script>
/**
 * banner组件
 * @slot p1 第一行内容插槽
 * @slot p2 第一行内容插槽
 * @slot p3 第一行内容插槽
 **/
import draw from './js/banner'
import debounce from './js/debounce'
export default {
  name: 'HatechBanner',
  components: {},
  data () {
    return {
      show: this.config,
      fn: '',
      mouseDownFn: '',
    }
  },
  props: {
    config: {
      type: Boolean,
      default: true
    }
  },
  created () {
  },
  methods: {
    //处理右下角文字与内容对齐函数
    dealText () {
      if (this.show) {
        this.$nextTick(() => {
          let width = document.getElementById('en-text').offsetWidth;
          let left = document.getElementById('en-text').offsetLeft;
          //右下角文字定位
          document.getElementById('right-text').style.left = `${width + left - document.getElementById('right-text').offsetWidth}px`
        })
      }

    },
    handleResize (event) {
      //防抖处理
      return debounce(() => {
        this.dealText()
      }, 500)
    },
    //鼠标左键点击事件防抖处理
    onMoueDown () {
      return debounce((e) => {
        if (e.button === 0) {
          this.show = false;
          this.dealText();
        }
      }, 500)

    },
  },
  mounted () {
    if (this.show) {
      //画背景
      draw();
      //定位文字
      this.dealText();
      //接收经过防抖处理的宽度变化函数
      this.fn = this.handleResize();
      //接收经过防抖处理的鼠标点击事件回调
      this.mouseDownFn = this.onMoueDown();
      //监听屏幕宽度变化
      window.addEventListener('resize', this.fn)
      //监听鼠标点击事件
      window.addEventListener('mousedown', this.mouseDownFn, false)
      // 通过hook监听组件销毁钩子函数，并取消监听事件
      this.$once('hook:beforeDestroy', () => {
        window.removeEventListener('resize', this.fn)
        window.removeEventListener('mousedown', this.mouseDownFn)
      })

    }
  },
}
</script>
<style lang="scss" scoped>
#banner {
  width: 100%;
  height: 100%;
  position: relative;
}

#banner > #banner-text {
  width: 100%;
  position: absolute;
  z-index: 10000;
  color: white;
  height: 180px;
  top: 50%;
  margin-top: -125px;
  #en-text {
    display: inline-block;
  }
  #right-text {
    display: inline-block;
    position: relative;
  }
}

#banner > #banner-text > p {
  width: 100%;
  font-size: 2rem;
  text-align: center;
}

#banner > #banner-text > p:nth-child(1) {
  font-size: 2.7rem;
  margin: 1em 0;
}

#banner > #banner-text > p:nth-child(3) {
  position: relative;
  width: auto;
  font-size: 1.6rem;
  text-align: right;
  margin-right: 20%;
  margin-top: 70px;
}

#banner > #banner-text > p:nth-child(3):before {
  position: absolute;
  content: "";
  background: white;
  height: 1px;
  width: 60px;
  margin-top: 18px;
  margin-left: -80px;
}

#banner > #canvas {
  width: 100%;
  height: 100%;
  display: block;
  background: #000;
}
</style>