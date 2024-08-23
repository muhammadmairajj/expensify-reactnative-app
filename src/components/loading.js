import React from 'react';
import { ActivityIndicator, View } from 'react-native';
import { colors } from '../theme';

function Loading() {
    return (
        <View className="flex-row justify-center py-8">
            <ActivityIndicator size="large" color={colors.button_2} />
        </View>
    )
}

export default Loading;