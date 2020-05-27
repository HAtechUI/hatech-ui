import FormDialog from './src/main.vue'

FormDialog.install = function(Vue) {
  Vue.component(FormDialog.name, FormDialog)
}

export default FormDialog