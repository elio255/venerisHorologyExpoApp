import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ShoppingPage from './ShoppingPage';
import ShoppingDetails from './ShoppingDetails';
import HomePage from './MainPage'; // Import HomePage

const Stack = createStackNavigator();

export default function ShoppingStack() {
  return (
    <Stack.Navigator  // Keep HomePage here
      screenOptions={{
        headerStyle: { backgroundColor: '#121212' },
        headerTintColor: '#C5A580',
      }}
    >
     
      <Stack.Screen name="ShoppingPage" component={ShoppingPage} options={{ headerShown: false }} />
      <Stack.Screen name="ShoppingDetails" component={ShoppingDetails} options={{ title: '' }} />
    </Stack.Navigator>
  );
}
