import {Page} from '@core/Page'
import {Excel} from '@/components/excel/Excel'
import {Header} from '@/components/header/Header'
import {Toolbar} from '@/components/toolbar/Toolbar'
import {Formula} from '@/components/formula/Formula'
import {Table} from '@/components/table/Table'
import {createStore} from '@core/createStore'
import {rootReducer} from '@/redux/rootReducer'
import {storage, debounce} from '@core/utils'
import {normalizeInitialState} from '../redux/initialState'

function storageName(param) {
  return 'excel:' + param
}

export class ExcelPage extends Page {
  getRoot() {
    const params = this.params ? this.params : Date.now().toString()
    // const params = this.params
    const state = storage(storageName(params))
    console.log(state)
    const store = createStore(rootReducer, normalizeInitialState(state))

    const stateListener = debounce(state => {
      console.log('App State: ', state)
      storage(storageName(params), state)
    }, 300)

    store.subscribe(stateListener)

    this.excel = new Excel({
      components: [Header, Toolbar, Formula, Table],
      store
    })

    return this.excel.getRoot()
  }
  afterRender() {
    this.excel.init()
  }
  destroy() {
    this.excel.destroy()
  }
}
