import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import LoginScreen from '../screens/LoginScreen';
import AddTripScreen from '../screens/AddTripScreen';
import AddExpenseScreen from '../screens/AddExpenseScreen';
import TripExpense from '../screens/TripExpenseScreen';
import WelcomeScreen from '../screens/WelcomeScreen';
import SignUpScreen from '../screens/SignUpScreen';
import { useDispatch, useSelector } from 'react-redux';
import { auth } from '../config/firebase';
import { addUser } from '../redux/slices/userSlice';
import { onAuthStateChanged } from 'firebase/auth';

const Stack = createNativeStackNavigator();

function AppNavigation() {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

   onAuthStateChanged(auth, (u) => {
      // console.log('got User:', u);
      dispatch(addUser(u));
    });

    if (user) {
      return (
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Home">
            <Stack.Screen
              options={{headerShown: false}}
              name="Home"
              component={HomeScreen}
            />
            <Stack.Screen
              options={{headerShown: false}}
              name="AddTrip"
              component={AddTripScreen}
            />
            <Stack.Screen
              options={{headerShown: false}}
              name="AddExpense"
              component={AddExpenseScreen}
            />
            <Stack.Screen
              options={{headerShown: false}}
              name="TripExpense"
              component={TripExpense}
            />
          </Stack.Navigator>
        </NavigationContainer>
      );
    } else {
      return (
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Welcome">
            <Stack.Screen
              options={{headerShown: false}}
              name="Welcome"
              component={WelcomeScreen}
            />
            <Stack.Screen
              options={{headerShown: false, presentation: 'modal'}}
              name="Login"
              component={LoginScreen}
            />
            <Stack.Screen
              options={{headerShown: false, presentation: 'modal'}}
              name="SignUp"
              component={SignUpScreen}
            />
          </Stack.Navigator>
        </NavigationContainer>
      );
    }
}

export default AppNavigation;
