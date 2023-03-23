import React from 'react'
import { TouchableOpacity, Image, StyleSheet } from 'react-native'
import { getStatusBarHeight } from 'react-native-status-bar-height'

export default function ChCenter() {
    return (
        <Image
          style={styles.image}
          source={require('../Images/chennelingCenter.png')}
        />
    )
  }
  
  const styles = StyleSheet.create({
    container: {
      position: 'absolute',
      top: 10 + getStatusBarHeight(),
      left: 4,
    },
    image: {
      width: 90,
      height: 90,
    },
  })