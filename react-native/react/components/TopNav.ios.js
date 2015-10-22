'use strict'

import React, { TabBarIOS } from 'react-native'
import Stateful from './Stateful'
import tabs from '../tabs'
import Nav from './Nav'

export default class TopNav extends Stateful {
  constructor (...args) {
    super(...args)
    this.tabs = []
  }

  getInitialLocalState () {
    return { activeTab: 4, tabs: [] }
  }

  render () {
    return (<TabBarIOS>
      {tabs.map((tab, i) => (<TabBarIOS.Item
        key={i}
        title={tab.title}
        systemIcon={tab.systemIcon}
        selected={i === this.localState.activeTab}
        onPress={() => {
          if (this.localState.activeTab === i) {
            const tab = this.tabs[i]
            tab.popToTop && tab.popToTop()
            return
          }
          this.localState.set('activeTab', i)
        }}
      ><Nav
        ref={tab => this.tabs[i] = tab}
        stateKey={['tabs', i]}
        initialComponent={tab.rootComponent}
      /></TabBarIOS.Item>))}
    </TabBarIOS>)
  }
}
