import React from 'react';
import { StatusBar } from 'react-native'; // Import StatusBar
import { createDrawerNavigator } from '@react-navigation/drawer';
import CustomDrawerContent from './CustomDrawerContent'; // Custom drawer content
import ShoppingStack from './ShoppingStack'; // ShoppingStack
import AuthScreen from './AuthScreen'; // Sign-in screen
import AccountScreen from './AccountScreen'; // Profile screen for user account
import ContactUsPage from './ContactUsPage'; // Contact Us page
import MainPage from './MainPage';
import ShoppingPage from './ShoppingPage';
const Drawer = createDrawerNavigator();

export default function MyDrawer({ user }) {
  return (
    <>
      {/* Configure the status bar */}
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
        <Drawer.Screen name="Main" component={ShoppingStack} />
        <Drawer.Screen name="Shopping" component={ShoppingPage} />
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
