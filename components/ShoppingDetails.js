import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { db } from '../firebaseConfig'; // Adjust the import path based on your project structure
import { doc, setDoc,getDoc,updateDoc, increment } from 'firebase/firestore'; // Import Firestore functions
import styles from './ShoppingDetailsStyles'; 
import { auth } from '../firebaseConfig';
import { useNavigation } from '@react-navigation/native';
const ShoppingDetails = ({ route }) => {
  const { watch, currency, exchangeRates } = route.params || {}; 
  const navigation = useNavigation();

  if (!watch) {
    return (
      <View style={styles.container}>
        <Text style={styles.notFound}>Watch not found!</Text>
      </View>
    );
  }

  const convertPrice = (price) => {
    if (exchangeRates && currency !== 'USD') {
      return (price * exchangeRates[currency] || 1).toFixed(2);
    }
    return price.toFixed(2); 
  };
  const handleAddToCart = async (watch) => {
    const user = auth.currentUser;
  
    if (!user) {
      Alert.alert("Not Authenticated", "Please log in to add items to your cart.");
      return;
    }
  
    if (!watch || !watch.id) {
      Alert.alert("Error", "Watch data is not available.");
      return;
    }
  
    try {
      // Create a unique ID for the cart item
      const cartItemId = `${user.uid}_${watch.id}`;
      const cartItemRef = doc(db, 'carts', cartItemId);
  
      // Check if the item already exists in the cart
      const cartItemDoc = await getDoc(cartItemRef);
  
      if (cartItemDoc.exists()) {
        // If the item exists, create a new document with the same data
        await setDoc(doc(db, 'carts', `${user.uid}_${watch.id}_${Date.now()}`), {
          userId: user.uid,
          watchId: watch.id,
          name: watch.name,
          price: watch.price,
          currency: currency,
          attributes: watch.attributes,
          image: watch.image,
          quantity: 1,
          addedAt: new Date(),
        });
      } else {
        // If the item doesn't exist, create a new document
        await setDoc(cartItemRef, {
          userId: user.uid,
          watchId: watch.id,
          name: watch.name,
          price: watch.price,
          currency: currency,
          attributes: watch.attributes,
          image: watch.image,
          quantity: 1,
          addedAt: new Date(),
        });
      }
  
      Alert.alert('Success', `${watch.name} has been added to your cart!`);
    } catch (error) {
      console.error("Error adding watch to cart:", error);
      Alert.alert('Error', error.message || 'Failed to add item to your cart. Please try again.');
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={watch.image} style={styles.image} />
        <View style={styles.info}>
          <Text style={styles.title}>{watch.name}</Text>
          <Text style={styles.price}>
            {convertPrice(watch.price)} {currency} 
          </Text>
          <Text style={styles.description}>{watch.description}</Text>
        </View>
      </View>

      <View style={styles.attributes}>
        <Text style={styles.attributeText}>
          <Text style={styles.attributeLabel}>Category: </Text>
          {watch.attributes?.category}
        </Text>
        <Text style={styles.attributeText}>
          <Text style={styles.attributeLabel}>More Info: </Text>
          {watch.attributes?.moreText}
        </Text>
        <Text style={styles.attributeText}>
          <Text style={styles.attributeLabel}>Type: </Text>
          {watch.attributes?.type}
        </Text>
        <Text style={styles.attributeText}>
          <Text style={styles.attributeLabel}>Metal: </Text>
          {watch.attributes?.metal}
        </Text>
        <Text style={styles.attributeText}>
          <Text style={styles.attributeLabel}>Diamond: </Text>
          {watch.attributes?.diamond}
        </Text>
      </View>

      <TouchableOpacity onPress={() => handleAddToCart(watch)} style={styles.addButton}>
    <Text style={styles.addButtonText}>Add to Basket</Text>
</TouchableOpacity>

 
      <TouchableOpacity 
        onPress={() => navigation.navigate('Cart')} // Navigate to Cart
        style={styles.cartButton}
      >
        <Text style={styles.cartButtonText}>View Cart</Text>
      </TouchableOpacity>
      </View>
  )
  };

export default ShoppingDetails;
