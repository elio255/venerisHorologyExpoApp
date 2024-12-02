import React from 'react';
import { StatusBar } from 'react-native'; // Import StatusBar
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
    <>
     
      <StatusBar barStyle="light-content" backgroundColor="#121212" />
      <Drawer.Navigator
        drawerContent={(props) => <CustomDrawerContent {...props} user={user} />}
        screenOptions={{
          headerStyle: { backgroundColor: '#1f1f1f' }, // Header background
          headerTintColor: '#C5A580', // Header text color
          drawerStyle: { backgroundColor: '#121212' }, // Drawer background
          drawerLabelStyle: {
            color: '#C5A580', // Drawer label text color
            fontSize: 20,
            paddingBottom: 20,
            marginTop: 20,
            paddingHorizontal: 10,
          },
          drawerActiveBackgroundColor: '#2e2e2e', // Active drawer item background
          drawerActiveTintColor: '#ffffff', // Active drawer item text color
          drawerInactiveTintColor: '#a0a0a0', // Inactive drawer item text color
        }}
      >
        <Drawer.Screen name="Main" component={MainPage} />
        <Drawer.Screen name="Shopping" component={ShoppingStack} />
        <Drawer.Screen name="Contact Us" component={ContactUsPage} />
        {!user ? (
          <Drawer.Screen name="Sign In" component={AuthScreen} />
        ) : (
          <Drawer.Screen name="Profile" component={AccountScreen} />
        )}
      </Drawer.Navigator>
    </>
  );
}
