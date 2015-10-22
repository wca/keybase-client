'use strict'

import * as Constants from '../constants/stateful'

export function set (path, value) {
  return {
    type: Constants.setAction,
    payload: { path, value }
  }
}

export function destroy (path) {
  return {
    type: Constants.destroyAction,
    payload: { path }
  }
}
