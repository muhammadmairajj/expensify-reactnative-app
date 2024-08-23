import React from 'react';
import {Platform, StatusBar, View} from 'react-native';

const ScreenWrapper = ({children}) => {
  let statusBarHeight = StatusBar.currentHeight ? StatusBar.currentHeight : Platform.OS === "ios" ? 30 : 0;
 
  return <View style={{paddingTop: statusBarHeight}}>{children}</View>;
};

export default ScreenWrapper;