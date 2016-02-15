// @flow
import React, {Component} from 'react'
import configureStore from '../../store/configure-store'
import {Provider} from 'react-redux'

import * as favoriteConstants from '../../constants/favorite'
import * as configConstants from '../../constants/config'
import Menubar from '../../menubar'

import type {Folder, GetCurrentStatusRes} from '../../constants/types/flow-types'

const store = configureStore()

export const tests = ['logged-out', 'no-folders', 'public-only', 'private-only', 'all-folders']

type Props = {test: string}

export default class MenubarTest extends Component {
  _publicFolders: Array<Folder>;
  _privateFolders: Array<Folder>;

  props: Props;

  constructor (props: Props) {
    super(props)

    this._publicFolders = [
      'marcopolo,cecileb', 'cecileb', 'chris#public', 'max#public'
    ].map(name => ({name, private: false, notificationsOn: false}))

    this._privateFolders = [
      'akalin,alness,cbostrander,cecileb,chris,chrisnojima,cjb,gabrielh,jinyang,jzila,lord,testasaurusrex,max,oconnor663,patrick,strib,zanderz', 'chris,testasaurusrex,xb', 'strib,testasaurusrex'
    ].map(name => ({name, private: true, notificationsOn: false}))

    this._updateStore(props)
  }

  _updateStore (props: Props) {
    let folders: ?Array<Folder> = null
    switch (props.test) {
      case 'logged-out':
      case 'no-folders':
        folders = []
        break
      case 'public-only':
        folders = this._publicFolders
        break
      case 'private-only':
        folders = this._privateFolders
        break
      case 'all-folders':
        folders = this._privateFolders.concat(this._publicFolders)
        break
    }

    store.dispatch({type: favoriteConstants.favoriteList, payload: {folders}})

    if (props.test !== 'logged-out') {
      const status: GetCurrentStatusRes = {
        configured: true,
        registered: true,
        loggedIn: true,
        user: {
          uid: '-1',
          username: 'testasaurusrex'
        }
      }

      store.dispatch({type: configConstants.statusLoaded, payload: {status}})

      store.dispatch({type: configConstants.startupLoaded, payload: {}})
    }
  }

  componentWillReceiveProps (props: Props) {
    this._updateStore(props)
  }

  render () {
    return <Provider store={store}><div style={{width: 400}}><Menubar favoriteList={() => {}}/></div></Provider>
  }
}
