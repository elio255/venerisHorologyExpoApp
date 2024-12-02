// Navigation.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AuthScreen from './AuthScreen'; // Ensure the path is correct
import LoginScreen from './LoginScreen'; // Ensure the path is correct
import MainScreen from './MainPage'; // The main application screen

const Stack = createStackNavigator();

export default function Navigation() {
  return (
    <Stack.Navigator  // Keep HomePage here
      screenOptions={{
        headerStyle: { backgroundColor: '#121212' },
        headerTintColor: '#C5A580',
      }}
    >
     
        <Stack.Screen name="Register" component={AuthScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Main" component={MainScreen} />

    </Stack.Navigator>

  );
}
