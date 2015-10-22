'use strict'

import React, { Component, Text, View } from 'react-native'
import { connect } from 'react-redux/native'
import { StateStore } from '../stateful'
import { getConfig } from '../actions/config'
import TopNav from './TopNav'

class Splash extends Component {
  componentWillMount () {
    this.context.store.dispatch(getConfig())
  }

  render () {
    return (this.props.configLoaded
      ? (<TopNav stateKey='root'/>)
      : (<View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <Text>Loading...</Text>
        </View>)
    )
  }
}

Splash.contextTypes = {
  store: React.PropTypes.object.isRequired
}

export default connect(store => ({ configLoaded: store.config.loaded }))(Splash)
