import React from 'react'
import { Image, StyleSheet } from 'react-native'

export default function Logo() {
  return (
    <Image
      source={require('../../assets/logoNoBG.png')}
      style={{ width: 250, height: 250, marginTop: 50 }}
    />
  );
}

const styles = StyleSheet.create({
  image: {
    width: 110,
    height: 110,
    marginBottom: 8,
  },
})