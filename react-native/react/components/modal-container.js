'use strict'

import React, { Children, Component, PropTypes, StyleSheet, View } from 'react-native'
import { connect } from '../base-redux'

class ModalContainer extends Component {
  render () {
    return (
      <View style={{flex: 1}}>
        {Children.only(this.props.children)}
        {this.props.modals.length ? modals[this.props.modals[this.props.modals.length - 1]] : null}
      </View>
    )
  }
}

ModalContainer.propTypes = {
  children: PropTypes.element.isRequired,
  modals: PropTypes.arrayOf(PropTypes.string).isRequired
}

export default connect(state => ({ modals: state.ui.modals }))(ModalContainer)

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0, right: 0, bottom: 0, left: 0
  }
})

import * as UIConstants from '../constants/ui'
import Alert from './alert'

const modals = {
  [UIConstants.modals.allowNotifications]: (
    <Alert
      title='Keybase notifications'
      body='It’s important that you turn on notifications. Keybase will not love you otherwise.'
      style={styles.overlay}
      buttons={[
        {
          title: 'Allow Notifications',
          default: true,
          action: {}
        },
        {
          title: 'Not now',
          action: {}
        }
      ]}
    />
  )
}
