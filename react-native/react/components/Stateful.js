'use strict'

import React, { Component } from 'react-native'
import { StateStore } from '../stateful'

export default class Stateful extends Component {
  constructor (props, context, ...rest) {
    super(props, context, ...rest)
    if (!props.stateKey) {
      throw new Error('Every Stateful component needs a "stateKey" prop to identify it. The value must be unique among sibling components.')
    }
    if (context.stateStore) {
      this.stateStore = context.stateStore.calve(props.stateKey, this.getInitialLocalState())
    } else {
      this.stateStore = new StateStore(context.store, props.stateKey, this.getInitialLocalState())
    }
    this.updateLocalState()
  }

  shouldComponentUpdate () {
    if (Object.getPrototypeOf(this.localState) !== this.stateStore.state) {
      this.updateLocalState()
      return true
    }
    return false
  }

  getChildContext () {
    return { stateStore: this.stateStore }
  }

  componentWillUnmount () {
    this.stateStore.destroy()
  }

  getInitialLocalState () {
    return undefined
  }

  updateLocalState () {
    this.localState = Object.create(this.stateStore.state || null, {
      set: {
        value: (...args) => {
          if (this.stateStore.set(...args)) {
            this.shouldComponentUpdate() && this.forceUpdate()
          }
        }
      }
    })
  }
}

const stateStoreContext = {
  stateStore: React.PropTypes.object
}

Stateful.contextTypes = {
  ...stateStoreContext,
  store: React.PropTypes.object.isRequired
}

Stateful.childContextTypes = stateStoreContext
