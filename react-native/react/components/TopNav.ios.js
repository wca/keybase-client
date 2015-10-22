'use strict'

import React, { TabBarIOS } from 'react-native'
import Stateful from './Stateful'
import tabs from '../tabs'
import Nav from './Nav'

export default class TopNav extends Stateful {
  getInitialLocalState () {
    return { tabs: [] }
  }

  render () {
    return (<TabBarIOS>
      {tabs.map((tab, i) => (<TabBarIOS.Item
        key={i}
        title={tab.title}
        systemIcon={tab.systemIcon}
        selected={i === this.localState.activeTab}
        onPress={() => this.localState.set('activeTab', i)}
      ><Nav
        stateKey={['tabs', i]}
        initialComponent={tab.component}
      /></TabBarIOS.Item>))}
    </TabBarIOS>)
  }
}
