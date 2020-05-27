import Vue from 'vue'

import { HATable } from './table'
import { HAReport } from './report'
import { HAForm } from './form'
import { HADialog } from './dialog'
import { HAFormDialog } from './formDialog'
import { HATree } from './tree'

export function install (vue: typeof Vue, options: Object): void

export class Table extends HATable {}
export class Report extends HAReport {}
export class Form extends HAForm {}
export class Dialog extends HADialog {}
export class FormDialog extends HAFormDialog {}
export class Tree extends HATree {}
