export class ActiveRoute {
  static get path() {
    return window.location.hash.slice(1)
  }
  static get param() {
    return ActiveRoute.path.split('/')[1]
  }
  static navigate(where) {
    window.location.hash = where
  }
}
