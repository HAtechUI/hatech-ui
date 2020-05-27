import Dialog from './src/main.vue'

Dialog.install = function(vue) {
  Vue.component(Dialog.name, Dialog)
}

export default Dialog