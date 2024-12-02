import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ImageBackground, Alert, Linking } from 'react-native';
import * as SMS from 'expo-sms'; 
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import styles from './ContactUsPageStyle'; 
import ContactUsImage from './images/ContactUsImage.png';

const ContactUs = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = () => {
    if (!name || !email || !message) {
      Alert.alert('Validation Error', 'Please fill in all fields.');
      return;
    }

    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailRegex.test(email)) {
      Alert.alert('Invalid Email', 'Please enter a valid email address.');
      return;
    }

    setName('');
    setEmail('');
    setMessage('');

    Alert.alert('Success', 'Your message has been submitted!');
  };

  const sendSMS = async () => {
    const { result } = await SMS.sendSMSAsync(
      ['+96176647838'], 
      message 
    );

    if (result === SMS.SMSStatus.Sent) {
      Alert.alert('Message sent!', `Your message "${message}" was sent successfully.`);
    } else {
      Alert.alert('Error', 'Failed to send the message.');
    }
  };

  const openStoreLocation = () => {
    const latitude = 34.256352;  
    const longitude = 35.660412;
    const url = `https://www.google.com/maps?q=${latitude},${longitude}`;

   
    Linking.canOpenURL(url)
      .then((supported) => {
        if (supported) {
          Linking.openURL(url);
        } else {
          Alert.alert('Error', 'Google Maps is not available on this device.');
        }
      })
      .catch((err) => {
        console.error('An error occurred while opening Google Maps:', err);
        Alert.alert('Error', 'An error occurred while opening the location.');
      });
  };

  return (
    <ImageBackground 
      source={ContactUsImage} 
      style={styles.background}
    >
      <View style={styles.container}>
        <Text style={styles.title}>Contact Us</Text>
        
       
        <TextInput
          style={styles.input}
          placeholder="Your Name"
          placeholderTextColor="#bbb"
          value={name}
          onChangeText={setName}
        />
        
       
        <TextInput
          style={styles.input}
          placeholder="Your Email Address"
          placeholderTextColor="#bbb"
          value={email}
          onChangeText={setEmail}
        />
        
   
        <TextInput
          style={styles.textarea}
          placeholder="Your Message"
          placeholderTextColor="#bbb"
          value={message}
          onChangeText={setMessage}
          multiline
          numberOfLines={4}
        />
    
        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.locationBox}>
      <Text style={styles.locationTitle}>Store Location:</Text>
        <Text style={styles.locationText}>Veneris Horology , Batroun, Lebanon</Text>
        <Text style={styles.locationText}>Street: Sea side road </Text>
        <Text style={styles.locationText}>Building: Tahan Store </Text>
        <Text style={styles.locationText}>Telephone: +961 12 345678</Text>
        <Text style={styles.locationText}>FAX: 012 345 678</Text>

        <View style={styles.locationButtonsContainer}>
         
          <TouchableOpacity style={styles.viewButton} onPress={openStoreLocation}>
            <Text style={styles.viewButtonText}>View on Google Maps</Text>
          </TouchableOpacity>

        
          <TouchableOpacity style={styles.smsButton} onPress={sendSMS}>
            <MaterialCommunityIcons name="message" size={25} color="#C5A580" />
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};



export default ContactUs;
