'use strict'
// Tab Nav Reducer.
// This expands the router to work on multiple tabs.
// The router works just as before except this layer
// sits on top and dispatches messages to the correct tab's router.

import Immutable from 'immutable'
import routerReducer, { createRouterState } from './router'
import * as TabConstants from '../constants/tabs'
import * as actionTypes from '../constants/tabbed-router-action-types'

// TODO(mm) add type annotations
const initialState = Immutable.fromJS({
  // a map from tab name to router obj
  tabs: TabConstants.tabOrder.reduce((acc, tab) => {
    acc[tab] = emptyRouterState
    return acc
  }),
  activeTab: TabConstants.more
})

export default function (state = initialState, action) {
  switch (action.type) {
    case actionTypes.SWITCH_TAB:
      return state.set('activeTab', action.tabName)
    default:
      return state.updateIn(['tabs', state.get('activeTab')], (routerState) => routerReducer(routerState, action))
  }
}
