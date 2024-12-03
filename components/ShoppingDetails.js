import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import styles from './ShoppingDetailsStyles'; // Import the styles

const ShoppingDetails = ({ route }) => {
  const { watch, currency, exchangeRates } = route.params || {}; // Retrieve watch, currency, and exchange rates

  // If no watch data is passed, display an error message
  if (!watch) {
    return (
      <View style={styles.container}>
        <Text style={styles.notFound}>Watch not found!</Text>
      </View>
    );
  }

  // Function to convert price based on selected currency
  const convertPrice = (price) => {
    if (exchangeRates && currency !== 'USD') {
      // Ensure exchangeRates and currency are defined before using them
      return (price * exchangeRates[currency] || 1).toFixed(2);
    }
    return price.toFixed(2); // If no conversion needed, return the original price
  };

  // Handle adding to cart
  const handleAddToCart = () => {
    Alert.alert('Added to Basket', `${watch.name} has been added to your basket!`);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={watch.image} style={styles.image} />
        <View style={styles.info}>
          <Text style={styles.title}>{watch.name}</Text>
          <Text style={styles.price}>
            {convertPrice(watch.price)} {currency} {/* Display converted price */}
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

      <TouchableOpacity onPress={handleAddToCart} style={styles.addButton}>
        <Text style={styles.addButtonText}>Add to Basket</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ShoppingDetails;
