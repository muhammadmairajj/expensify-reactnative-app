import React from 'react'
import { Image, Text, View } from 'react-native'

const EmptyList = ({ message }) => {
  return (
    <View className="flex justify-center items-center m-5 space-y-3">
        <Image className="w-36 h-36 shadow" source={require('../assets/images/empty.png')} />
        <Text className="font-bold text-gray-400">{message || 'Data not found'}</Text>
    </View>
  )
}

export default EmptyList