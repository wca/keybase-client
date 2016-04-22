// @flow
import React, {Component} from 'react'
import {TouchableWithoutFeedback} from 'react-native'
import {globalStyles, globalColors} from '../styles/style-guide'
import Box from './box'
import Text from './text'
import Icon from './icon'

import type {Props, ItemProps, TabBarButtonProps, AvatarButtonProps, IconButtonProps} from './tab-bar'

class TabBarItem extends Component {
  props: ItemProps;

  render () {
    return this.props.children
  }
}

type SimpleTabBarButtonProps = {
  selected: boolean,
  label: string,
  tabWidth?: ?number,
  style?: Object
}

class SimpleTabBarButton extends Component<void, SimpleTabBarButtonProps, void> {
  render () {
    const tabWidth = this.props.tabWidth || 93
    return (
      <Box style={{...stylesTab, width: tabWidth}}>
        <Text type='BodySemibold' style={{...stylesLabel, color: this.props.selected ? globalColors.black75 : globalColors.black60}}>
          {this.props.label.toUpperCase()}
        </Text>
        {this.props.selected && <Box style={stylesSelectedUnderline}/>}
        {!this.props.selected && this.props.underlined && <Box style={stylesUnselectedUnderline}/>}
      </Box>
    )
  }
}

export class TabBarButton extends Component<void, TabBarButtonProps, void> {
  render () {
    const backgroundColor = this.props.selected ? globalColors.darkBlue4 : globalColors.midnightBlue
    const badgeNumber = this.props.badgeNumber || 0

    return (
      <Box style={{...globalStyles.flexBoxColumn, backgroundColor, ...stylesTabBarButtonIcon, ...this.props.style}}>
        {this.props.source.type === 'icon'
          ? <Icon type={this.props.source.icon} style={{height: 27, width: 27, color: this.props.selected ? globalColors.blue3 : globalColors.blue3_40}}/>
          : this.props.source.avatar}
        {badgeNumber > 0 &&
          <Box style={{...styleBadgeOuter, borderColor: backgroundColor, backgroundColor}}>
            <Box style={styleBadge}>
              <Text style={{flex: 0}} type='BadgeNumber'>{badgeNumber}</Text>
            </Box>
          </Box>}
      </Box>
    )
  }
}

const styleBadgeOuter = {
  borderColor: globalColors.midnightBlue,
  borderWidth: 2,
  borderRadius: 10,
  position: 'absolute',
  top: 10,
  left: 40
}

const styleBadge = {
  ...globalStyles.flexBoxRow,
  backgroundColor: globalColors.orange,
  borderColor: globalColors.orange,
  borderWidth: 2,
  paddingLeft: 2,
  paddingRight: 2,
  borderRadius: 10,
  flex: 0
}

export const IconButton = ({selected, icon, badgeNumber}: IconButtonProps) => <TabBarButton source={{type: 'icon', icon}} selected={selected} badgeNumber={badgeNumber}/>
export const AvatarButton = ({selected, avatar, badgeNumber}: AvatarButtonProps) => <TabBarButton source={{type: 'avatar', avatar}} selected={selected} badgeNumber={badgeNumber}/>

class TabBar extends Component {
  props: Props;
  static Item: Class<TabBarItem>;

  _labels (): Array<React$Element> {
    return (this.props.children || []).map((item, i) => (
      <TouchableWithoutFeedback key={item.props.label || i} onPress={item.props.onPress}>
        {item.props.tabBarButton || <SimpleTabBarButton label={item.props.label} selected={item.props.selected} underlined={this.props.underlined}/>}
      </TouchableWithoutFeedback>
    ))
  }

  _content (): any {
    return (this.props.children || []).find(i => i.props.selected)
  }

  render () {
    const tabBarButtons = (
      <Box style={{...globalStyles.flexBoxRow, ...this.props.tabBarStyle}}>
        {this._labels()}
      </Box>
    )

    return (
      <Box style={{...stylesContainer, ...this.props.style}}>
        {!this.props.tabBarOnBottom && tabBarButtons}
        {this._content()}
        {this.props.tabBarOnBottom && tabBarButtons}
      </Box>
    )
  }
}

TabBar.Item = TabBarItem

const stylesContainer = {
  ...globalStyles.flexBoxColumn
}

const stylesTab = {
  ...globalStyles.flexBoxColumn,
  alignItems: 'center',
  justifyContent: 'flex-end'
}

const stylesTabBarButtonIcon = {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  paddingRight: 22,
  paddingLeft: 22
}

const stylesLabel = {
  fontSize: 14,
  lineHeight: 20,
  marginTop: 5,
  marginBottom: 5
}

const stylesSelectedUnderline = {
  height: 3,
  backgroundColor: globalColors.blue,
  alignSelf: 'stretch'
}

const stylesUnselectedUnderline = {
  height: 2,
  marginTop: 1,
  backgroundColor: globalColors.black10,
  alignSelf: 'stretch'
}

export default TabBar
