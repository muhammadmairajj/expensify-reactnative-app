import React from 'react';
import {Image, View, Text, TouchableOpacity} from 'react-native';
import ScreenWrapper from '../components/screenWrapper';
import {colors} from '../theme';
import {useNavigation} from '@react-navigation/native';
import {
  statusCodes,
  isErrorWithCode,
  GoogleSignin,
} from '@react-native-google-signin/google-signin';
import {GoogleAuthProvider, signInWithCredential} from 'firebase/auth';
import {auth} from '../config/firebase';

GoogleSignin.configure({
  webClientId:
    '469080333727-ttj8obv7dsn68a18n11iee7ceg61i0mm.apps.googleusercontent.com',
});

const WelcomeScreen = () => {
  const navigation = useNavigation();

  const signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const {idToken} = await GoogleSignin.signIn();
      console.log('idToken', idToken);
      const googleCredentials = GoogleAuthProvider.credential(idToken);
      await signInWithCredential(auth, googleCredentials);
    } catch (error) {
        console.log("error -> ", error.message);
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (f.e. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
      } else {
        // some other error happened
      }
    }
  };
  return (
    <ScreenWrapper>
      <View className="flex justify-around h-full">
        <View className="flex-row justify-center mt-10">
          <Image
            source={require('../assets/images/Welcome.png')}
            className="w-96 h-96 shadow-sm"
          />
        </View>

        <View className="mx-5 mb-20">
          <Text
            className={`${colors.heading} mb-10 text-4xl font-bold text-center`}>
            Expensify
          </Text>

          <TouchableOpacity
            onPress={() => navigation.navigate('Login')}
            className="shadow p-3 rounded-full mb-5"
            style={{backgroundColor: colors.button_2}}>
            <Text className="text-center text-white text-lg font-bold">
              Sign In
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate('SignUp')}
            className="shadow p-3 rounded-full mb-5"
            style={{backgroundColor: colors.button_2}}>
            <Text className="text-center text-white text-lg font-bold">
              Sign Up
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => signIn()}
            className="shadow p-3 rounded-full bg-white">
            <View className="flex-row justify-center items-center space-x-3">
              <Image
                source={require('../assets/images/googleIcon.png')}
                className="w-8 h-8"
              />
              <Text className="text-center text-gray-600 text-lg font-bold">
                Sign In with Google
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </ScreenWrapper>
  );
};

export default WelcomeScreen;
