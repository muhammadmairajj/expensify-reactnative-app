import React from 'react';
import {Image, Text, TextInput, TouchableOpacity, View} from 'react-native';
import ScreenWrapper from '../components/screenWrapper';
import BackButton from '../components/backButton';

import {colors} from '../theme';
import {useNavigation} from '@react-navigation/native';
import Snackbar from 'react-native-snackbar';
import {auth} from '../config/firebase';
import {signInWithEmailAndPassword} from 'firebase/auth';
import {useDispatch, useSelector} from 'react-redux';
import Loading from '../components/loading';
import {addUser, setUserLoading} from '../redux/slices/userSlice';

const LoginScreen = () => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const navigation = useNavigation();

  const {userLoading} = useSelector(state => state.user);
  const dispatch = useDispatch();

  const handleSubmit = async () => {
    if (email && password) {
      try {
        dispatch(setUserLoading(true));
        await signInWithEmailAndPassword(auth, email, password);
       
        dispatch(setUserLoading(false));
      } catch (error) {
        dispatch(setUserLoading(false));
        // Handle authentication errors
        Snackbar.show({
          text: `Error: ${error.message}`,
          backgroundColor: 'red',
        });
      } 
    } else {
      Snackbar.show({
        text: 'Email and Password are required!',
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
                Sign In
              </Text>
            </View>
          </View>

          <View className="flex-row justify-center my-3 mt-5">
            <Image
              source={require('../assets/images/login.png')}
              className="w-80 h-80"
            />
          </View>
          <View className="space-y-2 mx-2">
            <Text className={`${colors.heading} text-lg font-bold`}>Email</Text>
            <TextInput
              value={email}
              onChangeText={value => setEmail(value)}
              className="bg-white rounded-full mb-3 p-3"
            />
            <Text className={`${colors.heading} text-lg font-bold`}>
              Password
            </Text>
            <TextInput
              value={password}
              onChangeText={value => setPassword(value)}
              className="bg-white rounded-full mb-3 p-3"
              secureTextEntry
            />
            <TouchableOpacity className="flex-row justify-end">
              <Text>Forget Password?</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View>
          {userLoading ? (
            <Loading />
          ) : (
            <TouchableOpacity
              style={{backgroundColor: colors.button_2}}
              onPress={handleSubmit}
              className="my-6 rounded-full p-3 shadow-sm mx-2">
              <Text className="text-white text-center text-lg font-bold">
                Sign In
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </ScreenWrapper>
  );
};

export default LoginScreen;
