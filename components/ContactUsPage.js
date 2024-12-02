import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ImageBackground, Alert, Linking } from 'react-native';
import * as SMS from 'expo-sms'; // Import SMS module
import { MaterialCommunityIcons } from '@expo/vector-icons'; // Import Icons

// Correct the import path for styles
import styles from './ContactUsPageStyle'; // Import styles from the new file
import ContactUsImage from './images/ContactUsImage.png';

const ContactUs = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  // Function to handle form submission
  const handleSubmit = () => {
    // Check if all fields are filled out
    if (!name || !email || !message) {
      Alert.alert('Validation Error', 'Please fill in all fields.');
      return;
    }

    // Validate email format using regular expression
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailRegex.test(email)) {
      Alert.alert('Invalid Email', 'Please enter a valid email address.');
      return;
    }

    // Clear the textboxes after submission
    setName('');
    setEmail('');
    setMessage('');

    Alert.alert('Success', 'Your message has been submitted!');
  };

  // Function to send an SMS
  const sendSMS = async () => {
    const { result } = await SMS.sendSMSAsync(
      ['+96176647838'], // Phone number(s) where message will be sent (in international format)
      message // The message text
    );

    if (result === SMS.SMSStatus.Sent) {
      Alert.alert('Message sent!', `Your message "${message}" was sent successfully.`);
    } else {
      Alert.alert('Error', 'Failed to send the message.');
    }
  };

  // Function to open the store location in Google Maps
  const openStoreLocation = () => {
    const latitude = 34.256352;  // Batroun, Lebanon Latitude
    const longitude = 35.660412; // Batroun, Lebanon Longitude
    const url = `https://www.google.com/maps?q=${latitude},${longitude}`;

    // Check if the device can open the URL
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
        
        {/* Name Input */}
        <TextInput
          style={styles.input}
          placeholder="Your Name"
          placeholderTextColor="#bbb"
          value={name}
          onChangeText={setName}
        />
        
        {/* Email Input */}
        <TextInput
          style={styles.input}
          placeholder="Your Email Address"
          placeholderTextColor="#bbb"
          value={email}
          onChangeText={setEmail}
        />
        
        {/* Message Input */}
        <TextInput
          style={styles.textarea}
          placeholder="Your Message"
          placeholderTextColor="#bbb"
          value={message}
          onChangeText={setMessage}
          multiline
          numberOfLines={4}
        />
        
        {/* Submit Button */}
        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
      </View>

      {/* Store Location Section */}
      <View style={styles.locationBox}>
      <Text style={styles.locationTitle}>Store Location:</Text>
        <Text style={styles.locationText}>Veneris Horology , Batroun, Lebanon</Text>
        <Text style={styles.locationText}>Street: Sea side road </Text>
        <Text style={styles.locationText}>Building: Tahan Store </Text>
        <Text style={styles.locationText}>Telephone: +961 12 345678</Text>
        <Text style={styles.locationText}>FAX: 012 345 678</Text>

        <View style={styles.locationButtonsContainer}>
          {/* View on Google Maps Button */}
          <TouchableOpacity style={styles.viewButton} onPress={openStoreLocation}>
            <Text style={styles.viewButtonText}>View on Google Maps</Text>
          </TouchableOpacity>

          {/* Send SMS Button */}
          <TouchableOpacity style={styles.smsButton} onPress={sendSMS}>
            <MaterialCommunityIcons name="message" size={25} color="#C5A580" />
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};



export default ContactUs;
