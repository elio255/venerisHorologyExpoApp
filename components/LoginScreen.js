// LoginScreen.js
import React, { useState } from 'react';
import { loginUser } from './AuthService'; // Ensure the path is correct
import { View, TextInput, Text, StyleSheet, TouchableOpacity } from 'react-native';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async () => {
    setError('');
    if (!email || !password) {
      setError('Please provide both email and password to login.');
      return;
    }

    try {
      await loginUser(email, password);
      navigation.navigate('Main'); // Navigate to the Main screen after successful login
    } catch (error) {
      setError(error.message); // Handle any login error
    }
  };

  return (
    <View style={styles.container}>
       

        {/* Register Button for Navigation */}
        <TouchableOpacity 
          style={styles.button} 
          onPress={() => navigation.navigate('Login')} // Adjust this if needed
        >
          <Text style={styles.buttonText}>Register</Text>
        </TouchableOpacity>
      <Text style={{ marginTop: -40, marginBottom: 20, textAlign: 'center', fontSize: 20, color: 'white' }}>
        Login
      </Text>
      <View style={styles.card}>
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
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <Text onPress={() => navigation.navigate('Register')} style={styles.toggleText}>
          Don't have an account? Register
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
    margin: 0,
  },
  card: {
    width: '90%',
    maxWidth: 400,
    padding: 20,
    borderRadius: 10,
    backgroundColor: '#C5A580',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  input: {
    backgroundColor: '#2E2E2E',
    color: 'white',
    marginBottom: 10,
    borderWidth: 1,
    borderColor: 'gray',
    padding: 10,
    borderRadius: 5,
  },
  button: {
    backgroundColor: 'black',
    borderRadius: 15,
    padding: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
  toggleText: {
    color: 'white',
    marginTop: 10,
    textAlign: 'center',
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginTop: 10,
  },
});

export default LoginScreen;