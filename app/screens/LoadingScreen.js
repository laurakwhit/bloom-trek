import React from 'react';
import { View, Image } from 'react-native';

const LoadingScreen = () => (
  <View style={{ flex: 1 }}>
    <Image source={require('../../assets/splash.png')} />
  </View>
);

export default LoadingScreen;
