import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { auth } from '../firebaseConfig';
import { getFirestore, doc, getDoc, updateDoc } from 'firebase/firestore';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const db = getFirestore();

const AccountScreen = () => {
  const [user, setUser] = useState(null);
  const [userDetails, setUserDetails] = useState({});
  const [location, setLocation] = useState('');
  const [country, setCountry] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [biography, setBiography] = useState('');
  const [isEditing, setIsEditing] = useState(false); // State for editing mode

  useEffect(() => {
    const currentUser = auth.currentUser;
    if (currentUser) {
      setUser(currentUser);
      fetchUserDetails(currentUser.uid);
    }
  }, []);

  const fetchUserDetails = async (userId) => {
    const userDoc = doc(db, "users", userId);
    const userSnapshot = await getDoc(userDoc);
    if (userSnapshot.exists()) {
      const data = userSnapshot.data();
      setUserDetails(data);
      setLocation(data.location || '');
      setCountry(data.country || '');
      setPhoneNumber(data.phoneNumber || '');
      setBiography(data.biography || '');
    }
  };
  const handleUpdate = async () => {
    const currentUser = auth.currentUser;
    if (currentUser) {
      const userDoc = doc(db, "users", currentUser.uid);
      const userSnapshot = await getDoc(userDoc);
  
      if (userSnapshot.exists()) {
        // If user document exists, update it
        await updateDoc(userDoc, {
          location,
          country,
          phoneNumber,
          biography,
        });
        alert("Profile updated successfully!");
      } else {
        // Handle the case where the document doesn't exist
        alert("Profile does not exist. Please register first.");
      }
  
      setIsEditing(false); // Exit editing mode after update
      fetchUserDetails(currentUser.uid); // Refresh user details
    }
  };
  

  const handleLogout = async () => {
    try {
      await auth.signOut();
    } catch (error) {
      console.error("Logout error: ", error);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.profileCard}>
        <MaterialCommunityIcons name="account-circle" size={100} color="#C5A580" />
        <Text style={styles.userName}>Your Profile
        </Text>
        <Text style={styles.userEmail}>{user?.email}</Text>
        
        <View style={styles.detailContainer}>
          <Text style={styles.detailText}>First Name: {userDetails.firstName}</Text>
          <Text style={styles.detailText}>Last Name: {userDetails.lastName}</Text>
        </View>
        <TextInput
          style={styles.input}
          value={location}
          onChangeText={setLocation}
          placeholder="Location"
          placeholderTextColor="gray"
          editable={isEditing}
        />
        <TextInput
          style={styles.input}
          value={country}
          onChangeText={setCountry}
          placeholder="Country"
          placeholderTextColor="gray"
          editable={isEditing}
        />
        <TextInput
          style={styles.input}
          value={phoneNumber}
          onChangeText={setPhoneNumber}
          placeholder="Phone Number"
          placeholderTextColor="gray"
          editable={isEditing}
        />
        <TextInput
          style={styles.input}
          value={biography}
          onChangeText={setBiography}
          placeholder="Biography"
          placeholderTextColor="gray"
          multiline
          numberOfLines={4}
          editable={isEditing}
        />
        
        
        {isEditing ? (
          <TouchableOpacity style={styles.button} onPress={handleUpdate}>
            <Text style={styles.buttonText}>Save Changes</Text>
            </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.button} onPress={() => setIsEditing(true)}>
            <Text style={styles.buttonText}>Edit Profile</Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    backgroundColor: 'black',
    padding: 20,
  },
  profileCard: {
    width: '90%',
    maxWidth: 400,
    padding: 20,
    borderRadius: 10,
    backgroundColor: '#242424', // Beige color for the card
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },

    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5, // Effective shadow for Android
  },
  userName: {
    fontSize: 24,
    color: 'white',
    marginVertical: 10,
  },
  userEmail: {
    fontSize: 18,
    color: 'white',
    marginBottom: 20,
  },
  detailContainer: {
    width: '100%',
    marginBottom: 10,
  },
  detailText: {
    fontSize: 16,
    color: 'white',
    marginBottom: 10,
    textAlign: 'left',
    width: '100%',
  },
  input: {
    backgroundColor: '#2E2E2E', // Dark background for input fields
    color: 'white', // White text for input fields
    marginBottom: 10,
    borderWidth: 1,
    borderColor: 'gray', // Border color for input fields
    padding: 10,
    borderRadius: 5,
    width: '100%', // Full width for input fields
  },
  button: {
    backgroundColor: '#C5A580', // Beige background for buttons
    borderColor: 'white', // White border for buttons
    borderWidth: 2,
    borderRadius: 5,
    paddingVertical: 10,
    marginTop: 10,
    width: '100%', // Full width for buttons
    alignItems: 'center',
  },
  buttonText: {
    color: 'black', // Button text color
    fontSize: 16,
  },
  logoutButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#C5A580',
    borderRadius: 5,
    width: '100%', // Full width for logout button
    alignItems: 'center',
  },
  logoutText: {
    color: 'black', // Text color for the logout button
    fontSize: 16,
  },
});

export default AccountScreen;