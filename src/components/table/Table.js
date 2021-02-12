import {$} from '../../core/dom';
import {ExcelComponent} from '../../core/ExcelComponent';
import {createTable} from './table.template';

export class Table extends ExcelComponent {
  constructor($root, options) {
    super($root, {
      listeners: ['mousedown', 'mousemove']
    })
  }
  static className = 'excel__table'
  toHTML() {
    return createTable(100)
  }
  onMousedown(event) {
    if (event.target.dataset.resize) {
      const $resizer = $(event.target)
      const $parent = $resizer.closest('[data-type = "resizable"]')
      const coords = $parent.getCoord()
      const index = $parent.data.col
      const type = $resizer.$el.dataset.resize
      $resizer.css({opacity: 1})
      let value

      const cells = this.$root.findAll(`[data-col = "${index}"]`)

      document.onmousemove = e =>{
        if (type === 'col') {
          const delta = Math.floor(e.pageX - coords.right)
          value = Math.floor(coords.width + delta)
          $resizer.css({right: -delta + 'px', bottom: '-5000px'})
        } else {
          const delta = Math.floor(e.pageY - coords.bottom)
          value = (coords.height + delta)
          $resizer.css({bottom: -delta + 'px', right: '-5000px'})
        }
      }
      document.onmouseup = () => {
        document.onmousemove = null
        document.onmouseup = null
        if (type === 'col') {
          $parent.css({width: value + 'px'})
          cells.forEach(item => {
            item = $(item)
            item.css({width: value + 'px'})
          })
          $resizer.css({opacity: 0, bottom: 0, right: 0})
        } else if (type === 'row') {
          $parent.css({height: value + 'px'})
          $resizer.css({opacity: 0, bottom: 0, right: 0})
        }
      }
    }
  }
  onMousemove() {
  }
  onMouseup() {
  }
}
