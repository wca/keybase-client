'use strict'

import React, { Navigator } from 'react-native'
import { connect } from 'react-redux/native'
import Stateful from './Stateful'

class Nav extends Stateful {
  render () {
    return <Navigator
      initialRouteStack={this.localState.stack || []}
      renderScene={(route, navigator) => {
        return <route.component
          stateKey={navigator.getCurrentRoutes().indexOf(route)}
          initialState={route.initialState}
          nav={{
            push: (component, initialState) => {
              navigator.push({component, initialState})
            }
          }}
        />
      }}
    />
  }
}

export default connect(state => ({ ui: state.ui }))(Nav)
