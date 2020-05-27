import Table from '../packages/table'
import Report from '../packages/report'
import Dialog from '../packages/dialog'
import Form from '../packages/form'
import FormDialog from '../packages/formDialog'
import Tree from '../packages/tree'

const components = [
  Table,
  Report,
  Dialog,
  Form,
  FormDialog,
  Tree
]

const install = function (Vue, opt = {}) {
  
  components.forEach(component => Vue.component(component.name, component))

}

export default {
  version: '0.1.0',
  install,
  Table,
  Report,
  Dialog,
  Form,
  FormDialog,
  Tree
}