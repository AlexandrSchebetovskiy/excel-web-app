import {$} from '@core/dom'
import {ExcelComponent} from '@core/ExcelComponent'
import {shouldResize} from './table.functions'
import {resizeHandler} from './table.resize'
import {isCell} from './table.functions'
import {createTable} from './table.template'
import {TableSelection} from './TableSelection'
import {matrix} from './table.functions'
import {nextSelector} from './table.functions'

export class Table extends ExcelComponent {
  static rowNumber = 100
  constructor($root, options) {
    super($root, {
      name: 'Table',
      listeners: ['mousedown', 'keydown'],
      ...options
    })
  }
  static className = 'excel__table'
  toHTML() {
    return createTable(Table.rowNumber)
  }
  prepare() {
    this.selection = new TableSelection()
  }
  init() {
    super.init()
    const cell = this.$root.find('[data-id="1:1"]')
    this.selection.select(cell)
    this.emitter.subscribe('it is working', text => {
      this.selection.current.text(text)
      console.log('table from formula', text)
    })
  }
  onMousedown(event) {
    if (shouldResize(event)) {
      resizeHandler(this.$root, event)
    } else if (isCell(event)) {
      const $target = $(event.target)
      if (event.shiftKey) {
        const cells = matrix($target, this.selection.current)
            .map(id => this.$root.find(`[data-id="${id}"]`))
        this.selection.selectGroup(cells)
      } else {
        this.selection.select($target)
      }
    }
  }
  onKeydown(event) {
    const keys = ['Enter',
      'Tab',
      'ArrowLeft',
      'ArrowRight',
      'ArrowUp',
      'ArrowDown'
    ]
    const {key} = event
    if (keys.includes(key) && !event.shiftKey) {
      event.preventDefault()
      const id = this.selection.current.id(true)
      console.log(id)
      const $next = this.$root.find(nextSelector(key, id))
      console.log($next);
      this.selection.select($next)
    }
  }
}


