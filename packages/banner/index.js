/*
 * @Author: liuzhihao
 * @Date: 2020-08-17 16:53:12
 * @LastEditors: liuzhihao
 * @LastEditTime: 2020-08-17 17:01:42
 * @description:
 */
import Banner from './src/main.vue'

Banner.install = function (Vue) {
  Vue.component(Banner.name, Banner)
}

export default Banner
