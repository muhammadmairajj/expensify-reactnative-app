import React from 'react';
import {FlatList, Image, Text, TouchableOpacity, View} from 'react-native';
import ScreenWrapper from '../components/screenWrapper';
import EmptyList from "../components/emptyList";
import {colors} from '../theme';
import randomImage from "../assets/images/randomImage"
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { signOut } from 'firebase/auth';
import { auth, tripRef } from '../config/firebase';
import { useDispatch, useSelector } from 'react-redux';
import { getDocs, query, where } from 'firebase/firestore';

const items = [
  {
    id: 1,
    place: 'Skardu',
    country: 'Pakistan',
  },
  {
    id: 2,
    place: 'London Eye',
    country: 'England',
  },
  {
    id: 3,
    place: 'Washington DC',
    country: 'America',
  },
  {
    id: 4,
    place: 'New York',
    country: 'America',
  },
];

const HomeScreen = () => {
  const navigation = useNavigation();
  const { user } = useSelector(state => state.user);
  const [trips, setTrips] = React.useState([]);
  const isFocused = useIsFocused();

  const fetchTrip = async () => {
    const q = query(tripRef, where("userId", "==", user.uid));
    const querySnapshot = await getDocs(q);
    let data = [];
    querySnapshot.forEach(doc => {
      // console.log("document :::", doc.data());
      data.push({ ...doc.data(), id: doc.id });
    })
    setTrips(data);
  }

  React.useEffect(() => {
    if(isFocused) {
      fetchTrip();
    }
  }, [isFocused]);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      console.log('Successfully signed out');
    } catch (error) {
      console.error('Sign Out Error:', error);
      Snackbar.show({
        text: `Sign Out Error: ${error.message}`,
        backgroundColor: 'red',
      });
    }
  };
  
  
  // console.log("trips ", trips);
  return (
    <ScreenWrapper className="flex-1">
      <View className="flex-row justify-between items-center p-4">
        <Text className={`${colors.heading} font-bold text-3xl shadow-sm`}>
          Expensify
        </Text>
        <TouchableOpacity onPress={handleSignOut} className="bg-white p-2 px-3 border border-gray-200 rounded-full">
          <Text className={`${colors.heading}`}>Logout</Text>
        </TouchableOpacity>
      </View>

      <View className="flex-row justify-center items-center bg-red-200 rounded-xl mx-4 mb-4">
        <Image
          source={require('../assets/images/banner.png')}
          className="w-60 h-60"
        />
      </View>

      <View className="px-4 space-y-4">
        <View className="flex-row justify-between items-center">
          <Text className={`${colors.heading} font-bold text-2xl shadow-sm`}>
            Recent Trips
          </Text>
          <TouchableOpacity onPress={() => navigation.push('AddTrip')} className="bg-white p-2 px-3 border border-gray-200 rounded-full">
            <Text className={`${colors.heading}`}>Add Trip</Text>
          </TouchableOpacity>
        </View>

        <View style={{ height: 350 }}>
          <FlatList
            data={trips}
            numColumns={2}
            ListEmptyComponent={<EmptyList message="You haven't recorded any trips yet" />}
            keyExtractor={item => item.id}
            showsVerticalScrollIndicator={false}
            columnWrapperStyle={{
              justifyContent: 'space-between',
            }}
            className='mx-1'
            renderItem={({item}) => {
              return (
                <TouchableOpacity onPress={() => navigation.push('TripExpense', { ...item })} className="bg-white p-3 rounded-2xl mb-3 shadow-sm">
                  <View>
                    <Image
                      source={randomImage()}
                      className="w-36 h-36 mb-2"
                    />
                    <Text className={`${colors.heading} font-bold`}>{item.place}</Text>
                    <Text className={`${colors.heading} text-xs`}>{item.country}</Text>
                  </View>
                </TouchableOpacity>
              );
            }}
          />
        </View>
      </View>
    </ScreenWrapper>
  );
};

export default HomeScreen;
