import React from 'react';
import { StatusBar } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import CustomDrawerContent from './CustomDrawerContent'; 
import ShoppingStack from './ShoppingStack';
import AuthScreen from './AuthScreen';
import AccountScreen from './AccountScreen'; 
import ContactUsPage from './ContactUsPage'; 
import MainPage from './MainPage';
import ShoppingPage from './ShoppingPage';
import detailsStack from './detailsStack';
const Drawer = createDrawerNavigator();

export default function MyDrawer({ user }) {
  return (
    <>
     
      <StatusBar barStyle="light-content" backgroundColor="#121212" />
      <Drawer.Navigator
        drawerContent={(props) => <CustomDrawerContent {...props} user={user} />}
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
        <Drawer.Screen name="Main" component={ShoppingStack} />
        <Drawer.Screen name="Shopping" component={detailsStack} />
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
