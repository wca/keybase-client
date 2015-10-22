'use strict'

import * as Actions from './actions/stateful'

const ensureArray = v => Array.isArray(v) ? v : [v]

export class StateStore {
  constructor (store, path, initialState) {
    this.store = store
    this.path = ensureArray(path)
    if (initialState && !this.state) {
      this.set(null, initialState)
    }
  }

  get state () {
    let ret = this.store.getState().stateful
    for (let pathComponent of this.path) {
      if (!ret) { break }
      ret = ret[pathComponent]
    }
    return ret
  }

  set (key, value) {
    const state = this.state
    if (state && value === state[key]) {
      return false
    }
    this.store.dispatch(Actions.set(key != null ? this.path.concat([key]) : this.path, value))
    return true
  }

  calve (key, initialState) {
    return new StateStore(this.store, this.path.concat(ensureArray(key)), initialState)
  }

  destroy () {
    this.store.dispatch(Actions.destroy(this.path))
  }

}
