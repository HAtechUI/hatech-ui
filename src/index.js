import HatechTable from '../packages/table'
import HatechReport from '../packages/report'
import HatechDialog from '../packages/dialog'
import HatechForm from '../packages/form'
import HatechFormDialog from '../packages/formDialog'
import HatechTree from '../packages/tree'

const components = [
  HatechTable,
  HatechReport,
  HatechDialog,
  HatechForm,
  HatechFormDialog,
  HatechTree
]

const install = function (Vue, opt = {}) {
  
  components.forEach(component => Vue.component(component.name, component))

}

export default {
  version: '0.1.0',
  install,
  HatechTable,
  HatechReport,
  HatechDialog,
  HatechForm,
  HatechFormDialog,
  HatechTree
}