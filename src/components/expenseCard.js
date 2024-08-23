import React from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import randomImage from '../assets/images/randomImage';
import {categoryBG, colors} from '../theme';

const ExpenseCard = ({item}) => {
  console.log("item", item)
  return (
    <View style={{ backgroundColor: categoryBG[item.category] }} className="flex-row justify-between items-center p-3 px-5 mb-3 rounded-2xl">
      <View>
        <Text className={`${colors.heading} font-bold`}>{item.title}</Text>
        <Text className={`${colors.heading} text-xs`}>{item.category}</Text>
      </View>
      <View>
        <Text className={`${colors.heading} font-bold`}>${item.amount}</Text>
      </View>
    </View>
  );
};

export default ExpenseCard;
