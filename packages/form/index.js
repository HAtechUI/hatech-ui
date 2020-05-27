import Form from './src/main.vue'

Form.install = function(Vue) {
  Vue.component(Form.name, Form)
}

export default Form