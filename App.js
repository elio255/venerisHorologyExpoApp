// App.js
import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import MyDrawer from './components/MyDrawer';
import { auth } from './firebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';

const App = () => {
  const [user, setUser] = useState(null); // State to manage user

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser); // Updates user state based on authentication
    });

    return () => unsubscribe(); // Cleanup subscription on unmount
  }, []);

  return (
    <NavigationContainer>
      <MyDrawer user={user} /> {/* Pass user state to MyDrawer */}
    </NavigationContainer>
  );
};

export default App;