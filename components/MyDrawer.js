import React from 'react';
import { StatusBar } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import MainPage from './MainPage';
import ContactUsPage from './ContactUsPage';
import CustomDrawerContent from './CustomDrawerContent';
import ShoppingStack from './ShoppingStack';
const Drawer = createDrawerNavigator();

export default function MyDrawer() {
  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#1f1f1f" />

      <Drawer.Navigator
        useLegacyImplementation
        drawerContent={(props) => <CustomDrawerContent {...props} />} // Use the drawerContent prop for customization
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
        {/* Only Drawer.Screen elements are allowed here */}
        <Drawer.Screen name="Main" component={MainPage} />
        <Drawer.Screen name="Shopping" component={ShoppingStack} />
        <Drawer.Screen name="Contact Us" component={ContactUsPage} />
      </Drawer.Navigator>
    </>
  );
}
