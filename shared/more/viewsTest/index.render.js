// @flow
import React, {Component} from 'react'
import {globalStyles, globalColorsDZ2} from '../../styles/style-guide'
import {Text} from '../../common-adapters'
import ReactDOM from 'react-dom'
import fs from 'fs'
import resolveRoot from '../../../desktop/resolve-root'

import {remote} from 'electron'

import MenubarTest, {tests as menubarTests} from '../../test/views/menubar'

const componentsToTest = [[MenubarTest, menubarTests]]

export default class ViewTestRunner extends Component {
  state: {
    activeComponentIndex: number,
    activeTestIndex: number
  };

  window: any;

  constructor (props: {}) {
    super(props)

    this.window = remote.getCurrentWindow()

    this.state = {
      activeComponentIndex: 0,
      activeTestIndex: 0
    }
  }

  _clientRectToRect (r: any): any {
    return {x: r.left, y: r.top, width: Math.floor(r.width), height: r.height}
  }

  _nextTest () {
    if (this.state.activeTestIndex + 1 < componentsToTest[this.state.activeComponentIndex][1].length) {
      this.setState({activeTestIndex: this.state.activeTestIndex + 1})
    } else if (this.state.activeComponentIndex + 1 < componentsToTest.length) {
      this.setState({
        activeComponentIndex: this.state.activeComponentIndex,
        activeTestIndex: 0
      })
    }
  }

  _captureComponent () {
    const node = ReactDOM.findDOMNode(this.refs.test).children[0]
    const rect = this._clientRectToRect(node.getBoundingClientRect())
    const [Component, tests] = componentsToTest[this.state.activeComponentIndex]
    const test = tests[this.state.activeTestIndex]

    setTimeout(() => {
      this.window.capturePage(rect, img => {
        const name = `testOutputs/rendered/component-${Component.name}-${test}.png`
        fs.writeFile(`${resolveRoot(name)}`, img.toPng())
        this._nextTest()
      })
    }, 500)
  }

  shouldComponentUpdate (nextProps: any, nextState: any): boolean {
    return nextState.activeTestIndex !== this.state.activeTestIndex || nextState.activeComponentIndex !== this.state.activeComponentIndex
  }

  componentDidMount () {
    this._captureComponent()
  }

  componentDidUpdate () {
    this._captureComponent()
  }

  render () {
    const [Component, tests] = componentsToTest[this.state.activeComponentIndex]
    const test = tests[this.state.activeTestIndex]

    return <Component ref='test' test={test}/>
  }
}
