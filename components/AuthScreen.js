import React, { useState } from 'react';
import { registerUser } from './AuthService'; // Ensure the path is correct
import { View, TextInput, Text, StyleSheet, TouchableOpacity } from 'react-native';

const AuthScreen = ({ navigation }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRegistering, setIsRegistering] = useState(true);
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    setError('');
    if (isRegistering) {
      // Validate registration fields
      if (!firstName || !lastName || !phoneNumber || !email || !password) {
        setError('Please fill in all fields to register.');
        return;
      }

      // Validate phone number
      const phoneRegex = /^[0-9]+$/;
      if (!phoneRegex.test(phoneNumber)) {
        setError('Phone number must contain only numbers.');
        return;
      }
    } else {
      // Validate login fields
      if (!email || !password) {
        setError('Please provide both email and password to login.');
        return;
      }
    }

    try {
      if (isRegistering) {
        await registerUser(firstName, lastName, phoneNumber, email, password);
      } else {
        await loginUser(email, password);
      }
      navigation.navigate('Main'); // Navigate to Main page or home screen
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={{ marginTop: -40, marginBottom: 20, textAlign: 'center', fontSize: 20, color: 'white' }}>
        Please Enter your Info
      </Text>
      <View style={styles.card}>
        {isRegistering && (
          <>
            <TextInput
              placeholder="First Name"
              value={firstName}
              onChangeText={setFirstName}
              style={styles.input}
              placeholderTextColor="lightgray"
            />
            <TextInput
              placeholder="Last Name"
              value={lastName}
              onChangeText={setLastName}
              style={styles.input}
              placeholderTextColor="lightgray"
            />
            <TextInput
              placeholder="Phone Number"
              value={phoneNumber}
              onChangeText={setPhoneNumber}
              style={styles.input}
              placeholderTextColor="lightgray"
            />
          </>
        )}
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          style={styles.input}
          placeholderTextColor="lightgray"
        />
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          style={styles.input}
          placeholderTextColor="lightgray"
        />
        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>{isRegistering ? "Register" : "Login"}</Text>
        </TouchableOpacity>
        <Text onPress={() => setIsRegistering(!isRegistering)} style={styles.toggleText}>
          {isRegistering ? "Already have an account? Login" : "Don't have an account? Register"}
        </Text>
        {error && <Text style={styles.errorText}>{error}</Text>}
      </View>
      </View>
    
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#242424',
    padding: 0,
    margin: 0, // Background color for the entire screen
  },
  card: {
    width: '90%',
    maxWidth: 400,
    maxHeight: 800,
    padding: 20,
    borderRadius: 10,
    backgroundColor: '#C5A580', // Beige color for the card
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5, // Effective shadow for Android
  },
  button: {
    backgroundColor: 'black',
    color: 'white',
    borderRadius: 15,
    borderColor: 'black',
    borderWidth: 2,
    textAlign: 'center',
  },
  buttonText: {
    color: 'black', // Text color for the button
    fontSize: 16,
    textAlign: 'center'
  },
  input: {
    backgroundColor: '#2E2E2E', // Black background for input fields
    color: 'white', // White text color for input
    marginBottom: 10,
    borderWidth: 1,
    borderColor: 'gray', // Color of the input border
    padding: 10,
    borderRadius: 5, // Rounded corners for input fields
  },
  toggleText: {
    color: 'white', // Color for the toggle text
    marginTop: 10,
    textAlign: 'center', // Center the toggle text
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginTop: 10,
  },
});

export default AuthScreen;