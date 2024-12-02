import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import MyDrawer from './components/MyDrawer';
import { auth } from './firebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';
import { CurrencyProvider } from './components/CurrencyContext';

const App = () => {
  const [user, setUser] = useState(null); 

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser); 
    });

    return () => unsubscribe(); 
  }, []);

  return (
    <CurrencyProvider>
    <NavigationContainer>
      <MyDrawer user={user} /> 
    </NavigationContainer>
    </CurrencyProvider>
  );
};

export default App;