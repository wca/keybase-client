'use strict'

import React, { Text, StyleSheet, View } from 'react-native'
import Button from '../common-adapters/button'

export default class Alert {
  render () {
    return (
      <View style={[styles.backdrop, this.props.style]}>
        <View style={styles.alert}>
          <View style={styles.icon}/>
          <Text style={styles.heading}>{this.props.title}</Text>
          <Text style={styles.body}>{this.props.body}</Text>
          <View style={styles.buttons}>
            {this.props.buttons.map((button, i) => (
              <Button key={i} style={[styles.button, button.default && styles.defaultButton]}><Text style={styles.buttonText}>{button.title}</Text></Button>
            ))}
          </View>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  backdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    alignItems: 'stretch',
    justifyContent: 'center'
  },
  alert: {
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    marginHorizontal: 30
  },
  icon: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: 'black',
    alignSelf: 'center'
  },
  heading: {
    fontSize: 20,
    marginVertical: 12,
    textAlign: 'center'
  },
  body: {
    textAlign: 'center'
  },
  buttons: {
    flex: 1,
    marginTop: 5,
    marginHorizontal: 20,
    alignItems: 'stretch'
  },
  button: {
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#dfdfdf',
    marginVertical: 10,
    alignItems: 'center'
  },
  defaultButton: {
    backgroundColor: 'black'
  },
  buttonText: {
    fontSize: 20,
    color: 'white'
  }
})
