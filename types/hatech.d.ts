import Vue from 'vue'

import { HaTable } from './table'
import { HaReport } from './report'
import { HaForm } from './form'
import { HaDialog } from './dialog'
import { HaFormDialog } from './formDialog'
import { HaTree } from './tree'

export function install (vue: typeof Vue, options: Object): void

export class Table extends HaTable {}
export class Report extends HaReport {}
export class Form extends HaForm {}
export class Dialog extends HaDialog {}
export class FormDialog extends HaFormDialog {}
export class Tree extends HaTree {}
