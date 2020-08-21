# hatech-ui

Hatech 同创永益前端基于组件UI库

* `Table`
  ```
    <hatech-table></hatech-table>
  ```
* `Tree`
   ```
    <hatech-tree></hatech-tree>
  ```
* `Form`
  ```
    <hatech-form></hatech-form>
  ```
* `Dialog`
  ```
    <hatech-dialog></hatech-dialog>
  ```
* `FormDialog`
  ```
    <hatech-form-dialog></hatech-form-dialog>
  ```
* `Report`
  ```
    <hatech-report></hatech-report>
  ```
* `Login`
  ```html
    <hatech-login></hatech-login>
  ```
  ```js
    @param {Object} config 组件配置 可选
    @param {Object} config.containerStyle 组件css样式
    @param {Object} config.loginStyle 组件登录面板css样式
    @param {Object} config.show 组件登录面板banner显示隐藏
    @param {Object} config.textObj banner组件显示内容
    @slot {Any} top-logo 左上角Logo图标插槽
    @slot {Any} login-form 登录输入面板插槽
    @slot {Any} footer 页脚插槽
  ```
* `banner`
  ```html
    <hatech-banner></hatech-banner>
  ```
  ```js
    @slot {String} p1 第一行内容插槽
    @slot {String} p2 第一行内容插槽
    @slot {String} p3 第一行内容插槽
  ```