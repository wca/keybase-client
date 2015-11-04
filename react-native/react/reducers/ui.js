'use strict'

import * as UIConstants from '../constants/ui'

type UIState = {
  modals: Array<Object> // TODO
}

const initialState: UIState = {
  modals: []
}

export default function (state: UIState = initialState, action: any) {
  switch (action.type) {
    case UIConstants.actions.showModal:
      return {
        ...state,
        modals: [...state.modals, action.modal]
      }
    default:
      return state
  }
}
