import Table from './src/main.vue'

Table.install = function(Vue) {
  Vue.component(Table.name, Table)
}

export default Table