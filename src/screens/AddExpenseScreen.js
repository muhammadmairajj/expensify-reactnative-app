import React from 'react';
import { Image, Text, TextInput, TouchableOpacity, View } from 'react-native';
import ScreenWrapper from '../components/screenWrapper';
import BackButton from '../components/backButton';

import { colors } from '../theme';
import { useNavigation } from '@react-navigation/native';
import { categories } from '../constants/categories';
import Loading from '../components/loading';
import Snackbar from 'react-native-snackbar';
import { addDoc } from 'firebase/firestore';
import { expensesRef } from '../config/firebase';
import { useSelector } from 'react-redux';

const AddExpenseScreen = (props) => {
  const { id } = props.route.params;
  const [title, setTitle] = React.useState('');
  const [amount, setAmount] = React.useState(0);
  const [category, setCategory] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const navigation = useNavigation();
  const {user} = useSelector(state => state.user);

  const handleAddExpense = async (e) => {
    if (title && amount && category) {
      // console.log({ title, amount, category });
      try {
        setLoading(true);
        let doc = await addDoc(expensesRef, {
          title,
          amount,
          category,
          tripId: id,
        });
        setLoading(false);
        // navigation.navigate('Home');
        if (doc && doc.id) {
          navigation.goBack();
        }
      } catch (error) {
        setLoading(false);
        // Handle authentication errors
        Snackbar.show({
          text: `Error: ${error.message}`,
          backgroundColor: 'red',
        });
      }
    }
     else {
      Snackbar.show({
        text: 'Title, Amount and Category are required!',
        backgroundColor: 'red',
      });
    }
  };

  return (
    <ScreenWrapper>
      <View className="flex justify-between h-full mx-4">
        <View>
          <View className="relative">
            <View className="absolute top-0 left-0 z-10">
              <BackButton />
            </View>
            <View>
              <Text
                className={`${colors.heading} text-xl font-bold text-center`}>
                Add Expense
              </Text>
            </View>
          </View>

          <View className="flex-row justify-center my-2 mt-4">
            <Image
              source={require('../assets/images/expenseBanner.png')}
              className="w-72 h-72"
            />
          </View>
          <View className="space-y-2 mx-2">
            <Text className={`${colors.heading} text-lg font-bold`}>
              For What?
            </Text>
            <TextInput
              value={title}
              onChangeText={value => setTitle(value)}
              className="bg-white rounded-full mb-2 p-2"
            />
            <Text className={`${colors.heading} text-lg font-bold`}>
              How Much?
            </Text>
            <TextInput
              value={amount}
              onChangeText={value => setAmount(value)}
              className="bg-white rounded-full mb-2 p-2"
            />
          </View>
          <View className="mx-2 space-y-2">
            <Text className={`${colors.heading} text-lg font-bold`}>Category</Text>
            <View className="flex-row flex-wrap items-center">
              {categories.map(cat => {
                let bgColor = "bg-white";
                if (cat.value == category) bgColor = 'bg-red-200'
                return (
                  <TouchableOpacity onPress={() => setCategory(cat.value)} key={cat.value} className={`mb-2 mr-2 rounded-full ${bgColor} px-3 p-2`}>
                    <Text>{cat.title}</Text>
                  </TouchableOpacity>
                )
              })}
            </View>
          </View>
        </View>

        <View>
        {loading ? (
            <Loading />
          ) : (
            <TouchableOpacity
            style={{ backgroundColor: colors.button_2 }}
            onPress={handleAddExpense}
            className="my-6 rounded-full p-3 shadow-sm mx-2">
            <Text className="text-white text-center text-lg font-bold">
              Add Expense
            </Text>
          </TouchableOpacity>
          )}
         
        </View>
      </View>
    </ScreenWrapper>
  );
};

export default AddExpenseScreen;
