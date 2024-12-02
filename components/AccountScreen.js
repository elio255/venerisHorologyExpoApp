import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { auth } from '../firebaseConfig';
import { getFirestore, doc, getDoc, updateDoc } from 'firebase/firestore';
import * as Location from 'expo-location'; 
import { MaterialCommunityIcons } from '@expo/vector-icons';

const db = getFirestore();

const AccountScreen = () => {
  const [user, setUser] = useState(null);
  const [userDetails, setUserDetails] = useState({});
  const [location, setLocation] = useState('');
  const [country, setCountry] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [biography, setBiography] = useState('');
  const [buildingFloor, setBuildingFloor] = useState('');
  const [isEditing, setIsEditing] = useState(false); 

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
      setBuildingFloor(data.buildingFloor || ''); 
    }
  };

  const handleUpdate = async () => {
    const currentUser = auth.currentUser;
    if (currentUser) {
      const userDoc = doc(db, "users", currentUser.uid);
      const userSnapshot = await getDoc(userDoc);
  
      if (userSnapshot.exists()) {
        await updateDoc(userDoc, {
          location,
          country,
          phoneNumber,
          biography,
          buildingFloor, 
        });
        Alert.alert("Profile updated successfully!");
      } else {
        Alert.alert("Profile does not exist. Please register first.");
      }

      setIsEditing(false);
      fetchUserDetails(currentUser.uid); 
    }
  };

  const handleLogout = async () => {
    try {
      await auth.signOut();
    } catch (error) {
      console.error("Logout error: ", error);
    }
  };

  const getCurrentLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission to access location was denied');
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    const { latitude, longitude } = location.coords;

    let reverseGeocode = await Location.reverseGeocodeAsync({
      latitude,
      longitude,
    });
    
    if (reverseGeocode.length > 0) {
      const locationDetails = reverseGeocode[0];
      setLocation(`${locationDetails.city || ''}, ${locationDetails.region || ''}`); 
      setCountry(locationDetails.country || '');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.profileCard}>
        <MaterialCommunityIcons name="account-circle" size={100} color="#C5A580" />
        <Text style={styles.userName}>Your Profile</Text>
        <Text style={styles.userEmail}>{user?.email}</Text>
        
        <View style={styles.detailContainer}>
          <Text style={styles.detailText}>First Name: {userDetails.firstName}</Text>
          <Text style={styles.detailText}>Last Name: {userDetails.lastName}</Text>
        </View>
        
        <TextInput
          style={styles.input}
          value={country}
          onChangeText={setCountry}
          placeholder="Country"
          placeholderTextColor="gray"
          editable={isEditing} 
        />
        <View style={styles.locationContainer}>
          
  <TextInput
    style={styles.input}
    value={location}
    onChangeText={setLocation}
    placeholder="Location"
    placeholderTextColor="gray"
    editable={isEditing}
  />
  {isEditing && (
    <TouchableOpacity onPress={getCurrentLocation} style={styles.locationIcon}>
      <MaterialCommunityIcons name="map-marker" size={25} color="#C5A580" style={styles.iconStyle} /> 
    </TouchableOpacity>
  )}
</View>
        
      
        
        <TextInput
          style={styles.input}
          value={buildingFloor}
          onChangeText={setBuildingFloor}
          placeholder="Address (Building/Floor)"
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
    backgroundColor: '#242424',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5, 
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
    backgroundColor: '#2E2E2E',
    color: 'white',
    marginBottom: 10,
    borderWidth: 1,
    borderColor: 'gray',
    padding: 10,
    borderRadius: 5,
    width: '100%',
  },
  iconStyle: {
  
    position: 'absolute',
    right: 10, 
    marginTop:-65,    
    zIndex: 1,
    paddingLeft:0,
  },
  locationContainer: {
    flexDirection: 'row',       
    alignItems: 'center',      
    marginBottom: 10,
    position: 'relative',      
},
locationIcon: {
    position: 'absolute',       
    right: 0,               
},

  button: {
    backgroundColor: '#C5A580',
    borderColor: 'white',
    borderWidth: 2,
    borderRadius: 5,
    paddingVertical: 10,
    marginTop: 10,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: 'black', 
    fontSize: 16,
  },
  logoutButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#C5A580',
    borderRadius: 5,
    width: '100%', 
    alignItems: 'center',
  },
  logoutText: {
    color: 'black', 
    fontSize: 16,
  },
});

export default AccountScreen;