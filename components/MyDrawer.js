// MyDrawer.js
import React from 'react';

import { createDrawerNavigator } from '@react-navigation/drawer';
import MainPage from './MainPage'; // Your main page component
import ContactUsPage from './ContactUsPage'; // Your contact page component
import CustomDrawerContent from './CustomDrawerContent';
import ShoppingStack from './ShoppingStack'; // Assuming you have this stack set up
import AuthScreen from './AuthScreen'; // Importing AuthScreen for sign-in
import AccountScreen from './AccountScreen'; // Create this screen for user account details

const Drawer = createDrawerNavigator();

export default function MyDrawer({ user }) {

  return (

    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} user={user} />} // Pass user info to the custom content
      screenOptions={{
        headerStyle: { backgroundColor: '#1f1f1f' },
        headerTintColor: '#C5A580',
        drawerStyle: { backgroundColor: '#121212' },
        drawerLabelStyle: {
          color: '#C5A580',
          fontSize: 20,
          paddingBottom: 20,
          marginTop: 20,
          paddingHorizontal: 10,
        },
        drawerActiveBackgroundColor: '#2e2e2e',
        drawerActiveTintColor: '#ffffff',
        drawerInactiveTintColor: '#a0a0a0',
      }}
    >
      <Drawer.Screen name="Main" component={MainPage} />
      <Drawer.Screen name="Shopping" component={ShoppingStack} />
      <Drawer.Screen name="Contact Us" component={ContactUsPage} />
      {!user ? (
        <Drawer.Screen name="Sign In" component={AuthScreen} />
      ) : (
        <Drawer.Screen name="Profile" component={AccountScreen} /> // Show Profile when logged in
      )}
    </Drawer.Navigator>

  );


}
