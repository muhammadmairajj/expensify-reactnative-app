import React from 'react';
import {Image, Text, TextInput, TouchableOpacity, View} from 'react-native';
import ScreenWrapper from '../components/screenWrapper';
import BackButton from '../components/backButton';

import {colors} from '../theme';
import {useNavigation} from '@react-navigation/native';
import Snackbar from 'react-native-snackbar';
import {auth, db} from '../config/firebase';
import {createUserWithEmailAndPassword} from 'firebase/auth';
import {addDoc, collection} from 'firebase/firestore';
import {useDispatch, useSelector} from 'react-redux';
import {setUserLoading} from '../redux/slices/userSlice';
import Loading from '../components/loading';

const SignUpScreen = () => {
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const navigation = useNavigation();
  const {userLoading} = useSelector(state => state.user);
  const dispatch = useDispatch();

  const handleSubmit = async () => {
    if (email && password) {
      try {
        // Create user with email and password
        dispatch(setUserLoading(true));
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password,
        );
        const user = userCredential.user;

        // Store user data in Firestore
        await addDoc(collection(db, 'users'), {
          uid: user.uid,
          email: user.email,
          name: name,
        });

        // // Redirect or show success message
        // navigation.navigate('Home');
        dispatch(setUserLoading(false));
      } catch (error) {
        dispatch(setUserLoading(false));
        Snackbar.show({
          text: `Error: ${error.message}`,
          backgroundColor: 'red',
        });
      }
    } else {
      Snackbar.show({
        text: 'Name, Email, and Password are required!',
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
                Sign Up
              </Text>
            </View>
          </View>

          <View className="flex-row justify-center my-2 mt-2">
            <Image
              source={require('../assets/images/signup.png')}
              className="w-72 h-72"
            />
          </View>
          <View className="space-y-2 mx-2">
            <Text className={`${colors.heading} text-lg font-bold`}>Name</Text>
            <TextInput
              value={name}
              onChangeText={value => setName(value)}
              className="bg-white rounded-full mb-2 p-2"
            />
            <Text className={`${colors.heading} text-lg font-bold`}>Email</Text>
            <TextInput
              value={email}
              onChangeText={value => setEmail(value)}
              className="bg-white rounded-full mb-2 p-2"
            />
            <Text className={`${colors.heading} text-lg font-bold`}>
              Password
            </Text>
            <TextInput
              value={password}
              onChangeText={value => setPassword(value)}
              className="bg-white rounded-full mb-2 p-2"
              secureTextEntry
            />
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
                Sign Up
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </ScreenWrapper>
  );
};

export default SignUpScreen;
