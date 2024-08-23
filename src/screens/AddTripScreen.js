import React from 'react';
import {Image, Text, TextInput, TouchableOpacity, View} from 'react-native';
import ScreenWrapper from '../components/screenWrapper';
import BackButton from '../components/backButton';

import {colors} from '../theme';
import {useNavigation} from '@react-navigation/native';
import Loading from '../components/loading';
import Snackbar from 'react-native-snackbar';
import {addDoc} from 'firebase/firestore';
import {tripRef} from '../config/firebase';
import {useSelector} from 'react-redux';

const AddTripScreen = () => {
  const [place, setPlace] = React.useState('');
  const [country, setCountry] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const navigation = useNavigation();
  const {user} = useSelector(state => state.user);

  const handleAddTrip = async e => {
    if (place && country) {
      // console.log({ place, country });
      try {
        setLoading(true);
        let doc = await addDoc(tripRef, {
          place,
          country,
          userId: user.uid,
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
    } else {
      Snackbar.show({
        text: 'Place and Country are required!',
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
                Add Trip
              </Text>
            </View>
          </View>

          <View className="flex-row justify-center my-3 mt-5">
            <Image
              source={require('../assets/images/4.png')}
              className="w-72 h-72"
            />
          </View>
          <View className="space-y-2 mx-2">
            <Text className={`${colors.heading} text-lg font-bold`}>
              Where on Earth?
            </Text>
            <TextInput
              value={place}
              onChangeText={value => setPlace(value)}
              className="bg-white rounded-full mb-3 p-3"
            />
            <Text className={`${colors.heading} text-lg font-bold`}>
              Which Country?
            </Text>
            <TextInput
              value={country}
              onChangeText={value => setCountry(value)}
              className="bg-white rounded-full mb-3 p-3"
            />
          </View>
        </View>

        <View>
          {loading ? (
            <Loading />
          ) : (
            <TouchableOpacity
              style={{backgroundColor: colors.button_2}}
              onPress={handleAddTrip}
              className="my-6 rounded-full p-3 shadow-sm mx-2">
              <Text className="text-white text-center text-lg font-bold">
                Add Trip
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </ScreenWrapper>
  );
};

export default AddTripScreen;
