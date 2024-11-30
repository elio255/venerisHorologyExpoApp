import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import styles from './ShoppingDetailsStyles'; // Import the styles

const ShoppingDetails = ({ route }) => {
  const { watch } = route.params || {}; // Safely retrieve the watch object

  if (!watch) {
    return (
      <View style={styles.container}>
        <Text style={styles.notFound}>Watch not found!</Text>
      </View>
    );
  }

  const handleAddToCart = () => {
    Alert.alert('Added to Basket', `${watch.name} has been added to your basket!`);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={watch.image} style={styles.image} />
        <View style={styles.info}>
          <Text style={styles.title}>{watch.name}</Text>
          <Text style={styles.price}>{`$${watch.price.toFixed(2)}`}</Text>
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
