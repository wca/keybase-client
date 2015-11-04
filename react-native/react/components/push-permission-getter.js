'use strict'

import React, { Component } from 'react-native'
import { connect } from '../base-redux'
import PushPermissionGetterRender from './.push-permission-getter-render'

class PushPermissionGetter extends Component {
  render () { return <PushPermissionGetterRender/> }
}

PushPermissionGetter.propTypes = {
  dispatch: React.PropTypes.func.isRequired,
  pushPermission: React.PropTypes.object
}

export default connect(state => ({
  pushPermission: state.config.pushPermission
}))(PushPermissionGetter)
