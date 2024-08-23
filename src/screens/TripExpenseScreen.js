import React from 'react';
import {Text, View, TouchableOpacity, Image, FlatList} from 'react-native';
import ScreenWrapper from '../components/screenWrapper';
import BackButton from '../components/backButton';
import {colors} from '../theme';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import EmptyList from '../components/emptyList';
import randomImage from '../assets/images/randomImage';
import ExpenseCard from '../components/expenseCard';
import { useSelector } from 'react-redux';
import { expensesRef } from '../config/firebase';
import { getDocs, query, where } from 'firebase/firestore';

const items = [
  {
    id: 1,
    title: 'ate sandwich',
    amount: 4,
    category: 'food',
  },
  {
    id: 2,
    title: 'bought a jacket',
    amount: 50,
    category: 'shopping',
  },
  {
    id: 3,
    title: 'watch a movie',
    amount: 100,
    category: 'entertainment',
  },
  {
    id: 4,
    title: 'bought a clothes',
    amount: 500,
    category: 'shopping',
  },
];

const TripExpense = (props) => {
  // console.log("props -->", props.route.params);
  const { id, place, country } = props.route.params;
  const navigation = useNavigation();
  const { user } = useSelector(state => state.user);
  const [expenses, setExpenses] = React.useState([]);
  const isFocused = useIsFocused();

  const fetchExpense = async () => {
    const q = query(expensesRef, where("tripId", "==", id));
    const querySnapshot = await getDocs(q);
    let data = [];
    querySnapshot.forEach(doc => {
      // console.log("document :::", doc.data());
      data.push({ ...doc.data(), id: doc.id });
    })
    // console.log("data", data)
    setExpenses(data);
  }

  React.useEffect(() => {
    if(isFocused) {
      fetchExpense();
    }
  }, [isFocused]);

  return (
    <ScreenWrapper className="flex-1">
      <View className="px-4">
        <View className="relative">
          <View className="absolute top-2 left-0 z-10">
            <BackButton />
          </View>
          <View>
            <Text className={`${colors.heading} text-xl font-bold text-center`}>
              {place}
            </Text>
            <Text className={`${colors.heading} text-xs text-center`}>
              {country}
            </Text>
          </View>
        </View>

        <View className="flex-row justify-center items-center rounded-xl mb-4">
          <Image
            source={require('../assets/images/7.png')}
            className="w-80 h-80"
          />
        </View>

        <View className="space-y-4">
          <View className="flex-row justify-between items-center">
            <Text className={`${colors.heading} font-bold text-2xl shadow-sm`}>
              Expenses
            </Text>
            <TouchableOpacity
              onPress={() => navigation.push('AddExpense', { id, place, country })}
              className="bg-white p-2 px-3 border border-gray-200 rounded-full">
              <Text className={`${colors.heading}`}>Add Expense</Text>
            </TouchableOpacity>
          </View>

          <View style={{height: 310}}>
            <FlatList
              data={expenses}
              ListEmptyComponent={
                <EmptyList message="You haven't recorded any expenses yet" />
              }
              keyExtractor={item => item.id}
              showsVerticalScrollIndicator={false}
              className="mx-1"
              renderItem={({item}) => {
                return <ExpenseCard item={item} />;
              }}
            />
          </View>
        </View>
      </View>
    </ScreenWrapper>
  );
};

export default TripExpense;
