import React from 'react';
import { StatusBar } from 'react-native'; // Import StatusBar
import { createDrawerNavigator } from '@react-navigation/drawer';
import MainPage from './MainPage';
import ShoppingPage from './ShoppingPage';
import ContactUsPage from './ContactUsPage';
import CustomDrawerContent from './CustomDrawerContent';

const Drawer = createDrawerNavigator();

export default function MyDrawer() {
  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#1f1f1f" />

      <Drawer.Navigator
        useLegacyImplementation
        drawerContent={(props) => <CustomDrawerContent {...props} />}
        screenOptions={{
          headerStyle: { backgroundColor: '#1f1f1f' }, 
          headerTintColor: '#C5A580', 
          drawerStyle: { backgroundColor: '#121212' }, 
          drawerLabelStyle: {
            color: '#C5A580',
            fontSize: 20,
            paddingBottom:20,
            marginTop: 20, // Adjust as needed for spacing
            paddingHorizontal: 10, // Optional: Ensure alignment horizontally
           },
          drawerActiveBackgroundColor: '#2e2e2e', 
          drawerActiveTintColor: '#ffffff', 
          drawerInactiveTintColor: '#a0a0a0', 
        }}
      >
        <Drawer.Screen name="Main" component={MainPage} />
        <Drawer.Screen name="Shopping" component={ShoppingPage} />
        <Drawer.Screen name="Contact Us" component={ContactUsPage} />
      </Drawer.Navigator>
    </>
  );
}
