'use strict'
/* @flow */

import React, { AppRegistry, Component } from 'react-native'
import { Provider } from 'react-redux/native'
import configureStore from './store/configure-store'
import Splash from './components/Splash'

const store = configureStore()

class Keybase extends Component {
  render () {
    return (
      <Provider store={store}>
        {() => <Splash style={{flex: 1}}/>}
      </Provider>
    )
  }
}

AppRegistry.registerComponent('Keybase', () => Keybase)
