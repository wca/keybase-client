'use strict'

import * as Constants from '../constants/stateful'

const update = (obj, path, value) => {
  return {
    ...obj,
    [path[0]]: path.length > 1 ? update(obj[path[0]], path.slice(1), value) : value
  }
}

const destroy = (obj, path) => {
  if (path.length > 1) {
    return {
      ...obj,
      [path[0]]: destroy(obj[path[0]], path.slice(1))
    }
  }
  let ret = {}
  for (let k in obj) {
    if (k === path[0]) { continue }
    ret[k] = obj[k]
  }
  return ret
}

export default function (state = {}, action) {
  switch (action.type) {
    case Constants.setAction:
      return update(state, action.payload.path, action.payload.value)
    case Constants.destroyAction:
      return destroy(state, action.payload.path)
    default:
      return state
  }
}
