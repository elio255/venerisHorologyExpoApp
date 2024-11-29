import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import MainPage from './MainPage';
import ShoppingPage from './ShoppingPage';
import ContactUsPage from './ContactUsPage';
import CustomDrawerContent from './CustomDrawerContent';

const Drawer = createDrawerNavigator();

export default function MyDrawer() {
  return (
    <Drawer.Navigator
      useLegacyImplementation
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen name="Main" component={MainPage} />
      <Drawer.Screen name="Shopping" component={ShoppingPage} />
      <Drawer.Screen name="Contact Us" component={ContactUsPage} />
    </Drawer.Navigator>
  );
}
