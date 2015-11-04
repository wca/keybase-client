'use strict'

import { combineReducers } from 'redux'
import login from './login'
import login2 from './login2'
import devices from './devices'
import search from './search'
import profile from './profile'
import config from './config'
import tabbedRouter from './tabbed-router.js'
import ui from './ui'

export default function (state, action) {
  return combineReducers({
    login,
    login2,
    devices,
    tabbedRouter,
    search,
    profile,
    config,
    ui
  })(state, action)
}
