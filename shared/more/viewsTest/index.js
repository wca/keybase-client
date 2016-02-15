import React, {Component} from 'react'
import Render from './index.render'
import {globalColors} from '../../styles/style-guide'

export default class ViewsTest extends Component {
  render () {
    return <Render/>
  }

  static parseRoute () {
    return {
      componentAtTop: {title: 'Views Test'}
    }
  }
}
