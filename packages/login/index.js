/*
 * @Author: liuzhihao
 * @Date: 2020-08-17 16:53:12
 * @LastEditors: liuzhihao
 * @LastEditTime: 2020-08-17 17:01:42
 * @description:
 */
import Login from './src/main.vue'

Login.install = function (Vue) {
  Vue.component(Login.name, Login)
}

export default Login
