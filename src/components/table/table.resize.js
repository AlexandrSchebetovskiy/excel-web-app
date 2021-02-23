import {$} from '@core/dom'
export function resizeHandler($root, event) {
  const $resizer = $(event.target)
  const $parent = $resizer.closest('[data-type = "resizable"]')
  const coords = $parent.getCoord()
  const index = $parent.data.col
  const type = $resizer.$el.dataset.resize
  $resizer.css({opacity: 1})
  let value

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
      $root.findAll(`[data-col = "${index}"]`)
          .forEach(item => {
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
