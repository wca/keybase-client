'use strict'
/* @flow */

import React, { AppRegistry, Component } from 'react-native'
import { Provider } from 'react-redux/native'
import ModalContainer from './components/modal-container'
import configureStore from './store/configure-store'
import Nav from './nav'
import PushPermissionGetter from './components/push-permission-getter'

const store = configureStore()

class Keybase extends Component {
  constructor () {
    super()
  }

  render () {
    // TODO(mm): maybe not pass store into Nav?
    return (
      <Provider store={store}>
        <PushPermissionGetter/>
        {() => (
          <ModalContainer>
            <Nav store={store}/>
          </ModalContainer>
        )}
      </Provider>
    )
  }
}

AppRegistry.registerComponent('Keybase', () => Keybase)

import * as UIConstants from './constants/ui'
import { showModal } from './actions/ui'

setTimeout(() => {
  store.dispatch(showModal(UIConstants.modals.allowNotifications))
}, 500)
