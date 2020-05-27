import Vue from 'vue'

import { HatechTable } from './table'
import { HatechReport } from './report'
import { HatechForm } from './form'
import { HatechDialog } from './dialog'
import { HatechFormDialog } from './formDialog'
import { HatechTree } from './tree'

export function install (vue: typeof Vue, options: Object): void

export class Table extends HatechTable {}
export class Report extends HatechReport {}
export class Form extends HatechForm {}
export class Dialog extends HatechDialog {}
export class FormDialog extends HatechFormDialog {}
export class Tree extends HatechTree {}
