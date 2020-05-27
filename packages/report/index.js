import Report from './src/main.vue'

Report.install = function(Vue) {
  Vue.component(Report.name, Report)
}

export default Report