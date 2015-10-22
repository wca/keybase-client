'use strict'

import React, { Component, Text, View } from 'react-native'
import { connect } from 'react-redux/native'
import { getConfig } from '../actions/config'
import TopNav from './TopNav'

class Splash extends Component {
  componentWillMount () {
    this.props.dispatch(getConfig())
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

export default connect(store => ({ configLoaded: store.config.loaded }))(Splash)
