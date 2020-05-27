import Tree from './src/main.vue'

Tree.install = function(Vue) {
  Vue.component(Tree.name, Tree)
}

export default Tree