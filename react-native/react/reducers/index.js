'use strict'

import { combineReducers } from 'redux'
import login from './login'
import login2 from './login2'
import devices from './devices'
import search from './search'
import profile from './profile'
import config from './config'
import stateful from './stateful'

export default combineReducers({
  login,
  login2,
  devices,
  search,
  profile,
  stateful,
  config
})
