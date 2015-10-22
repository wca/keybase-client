'use strict'

import React, { Navigator } from 'react-native'
import Stateful from './Stateful'

export default class Nav extends Stateful {
  getInitialLocalState () {
    return { stack: this.props.initialComponent ? [{
      component: this.props.initialComponent
    }] : [] }
  }

  getChildContext () {
    return { navigator: this }
  }

  render () {
    return <Navigator
      ref='navigator'
      initialRouteStack={this.localState.stack}
      renderScene={(route, navigator) => {
        return <route.component
          stateKey={navigator.getCurrentRoutes().indexOf(route)}
          initialState={route.initialState}
          nav={{
            push: (component) => this.push(component)
          }}
        />
      }}
    />
  }

  save () {
    this.localState.set('stack', this.refs.navigator.getCurrentRoutes())
  }

  push (component) {
    this.refs.navigator.push({ component })
    this.save()
  }

  popToTop () {
    this.refs.navigator.popToTop()
    this.save()
  }
}

Nav.childContextTypes = {
  navigator: React.PropTypes.object.isRequired
}
