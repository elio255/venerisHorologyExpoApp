import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import MyDrawer from './components/MyDrawer';
import ShoppingStack from './components/ShoppingStack';

export default function App() {
  const [isShopping, setIsShopping] = useState(false);

  return (
    <NavigationContainer>
      {isShopping ? (
        <ShoppingStack /> // Render ShoppingStack conditionally
      ) : (
        <MyDrawer /> // Render Drawer when not in shopping mode
      )}
    </NavigationContainer>
  );
}
