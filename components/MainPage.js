import React, { useState, useEffect } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';  // Import navigation hook
import { useCurrency } from './CurrencyContext';  // Import currency context
import BestSeller1 from './images/bstblack-removebg.png';
import BestSeller2 from './images/bstGold-removebg.png';
import BestSeller3 from './images/bstFem-removebg.png';

const bestSellersData = [
  { 
    id: 1, 
    name: 'Heritage HO1980', 
    price: 299.99, 
    description: 'A classic design with a modern touch.',
    image: BestSeller1,
    attributes: {
      category: 'Luxury',
      moreText: 'Elegant design suitable for all occasions.',
      type: 'Analog',
      metal: 'Stainless Steel',
      diamond: 'Yes',
    }
  },
  { 
    id: 2, 
    name: 'Horology 1818', 
    price: 199.99, 
    description: 'Timeless elegance for every occasion.',
    image: BestSeller2,
    attributes: {
      category: 'Formal',
      moreText: 'A sophisticated watch for the modern gentleman.',
      type: 'Quartz',
      metal: 'Gold Plated',
      diamond: 'No',
    }
  },
  {
    id: 3, 
    name: 'Lumina 2001', 
    price: 399.99, 
    description: 'A bold statement piece for the innovative individual.',
    image: BestSeller3,
    attributes: {
      category: 'Casual',
      moreText: 'Round smartwatch with multiple features.',
      type: 'Smart',
      metal: 'Aluminum',
      diamond: 'No',
    }
  }
];

const HomePage = () => {
  const { currency, exchangeRates } = useCurrency(); // Access currency and exchange rates from context
  const navigation = useNavigation();  // Navigation hook

  // Function to convert price based on selected currency
  const convertPrice = (price) => {
    if (exchangeRates && currency !== 'USD') {
      return (price * exchangeRates[currency]).toFixed(2);
    }
    return price.toFixed(2);  // If no conversion needed, return the original price
  };

  // Handle the watch selection
  const handleWatchPress = (watch) => {
    const convertedPrice = convertPrice(watch.price);  // Get the price in selected currency
console.log(convertedPrice);
    // Ensure you're passing the converted price, not the original one
    navigation.navigate('ShoppingDetails', { 
      watch, 
      convertedPrice,
      currency 
    });
  };

  return (
    <ScrollView style={styles.scrollView}>
     {/* Full Image Section */}
     <View style={styles.fullImageContainer}>
        <Image source={require('./images/firstFullpic.png')} style={styles.fullImage} />
        <View style={styles.overlayTextContainer}>
          <Text style={styles.overlayTitle}>Veneris Horology</Text>
          <Text style={styles.overlayDescription}>A Legacy of Precision,</Text>
          <Text style={styles.overlayDescription1}>A Statement of Style</Text> </View>
</View>

      
{/* Shop Now Button */}
<TouchableOpacity style={styles.shopNowButton} onPress={() => navigation.navigate('Shopping')}>
        <Text style={styles.shopNowText}>Shop Now</Text>
      </TouchableOpacity>
     

      <View style={styles.bestSellersContainer}>
        <Text style={styles.bestSellersTitle}>Best Sellers</Text>

        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {bestSellersData.map((item) => (
            <TouchableOpacity
              key={item.id}
              onPress={() => handleWatchPress(item)}  // Navigate to ShoppingDetails with the watch data and converted price
            >
              <View style={styles.bestSellerCard}>
                <Image source={item.image} style={styles.bestSellerImage} />
                <Text style={styles.bestSellerName}>{item.name}</Text>
                <Text style={styles.bestSellerPrice}>
                  {convertPrice(item.price)} {currency} {/* Display converted price */}
                </Text>
                <Text style={styles.bestSellerDescription}>{item.description}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
      
{/* Discover More Button */}
<TouchableOpacity style={styles.discoverMoreButton} onPress={() => navigation.navigate('Shopping')}>
        <Text style={styles.discoverMoreText}>Discover More</Text>
      </TouchableOpacity>
      {/* Founder Section */}
      <View style={styles.founderContainer}>
        <Image source={require('./images/founder-removebg-preview.png')} style={styles.founderImage} />
        <View style={styles.founderTextContainer}>
          <Text style={styles.founderTitle}>The Original</Text>
          <Text style={styles.founderDescription}>
            Born from a passion for time itself, Veneris Horology was founded on the belief that a watch is more than just a tool, it's a testament to the elegance and precision of the passing moments. Inspired by the beauty of Venus, the Roman Goddess of love and beauty, Veneris Horology embodies the grace, luxury, and timeless craftsmanship.
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: 'black',
  },
  bestSellersContainer: {
    padding: 5,
    marginTop: 20,
    backgroundColor: 'black',
    borderRadius: 10,
    marginHorizontal: 0,
  },
  bestSellersTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
    textAlign: 'center',
  },
  bestSellerCard: {
    padding: 15,
    marginRight: 15,
    borderRadius: 10,
    width: 200,
    alignItems: 'center',
  },
  bestSellerImage: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
    borderRadius: 10,
  },
  bestSellerName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 10,
  },
  bestSellerPrice: {
    fontSize: 14,
    color: '#C5A580',
    marginTop: 5,
  },
  bestSellerDescription: {
    fontSize: 12,
    color: '#bbb',
    textAlign: 'center',
    marginTop: 5,
  },
  discoverMoreButton: {
    backgroundColor: '#C5A580',
    paddingVertical: 12,
    paddingHorizontal: 30,
    marginVertical: 20,
    borderRadius: 5,
    alignSelf: 'center',
  },
  discoverMoreText: {
    color: '#000',
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  fullImageContainer: {
    position: 'relative',
    marginVertical: 20,
  },
  fullImage: {
    width: '100%',
    height: 300,
    resizeMode: 'cover',
  },
  overlayTextContainer: {
    position: 'absolute',
    top: 50,
    left: 150,
    padding: 10,
    borderRadius: 5,
  },
  overlayTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#C5A580',
    marginBottom: 15,
  },
  overlayDescription: {
    fontSize: 16,
    color: '#fff',
    marginTop: 10,
    fontWeight: 'bold',
    marginLeft:12,
  },
  overlayDescription1: {
    fontSize: 16,
    color: '#fff',
    marginTop: 10,
    fontWeight: 'bold',
    marginLeft:14,
  },
  shopNowButton: {
    backgroundColor: '#C5A580',
    paddingVertical: 12,
    paddingHorizontal: 10,
    marginVertical: 15,
    marginTop:-130,
    borderRadius: 5,
    marginLeft:100,
    alignSelf: 'center',
    marginBottom: 20
  },
  shopNowText: {
    color: '#000',
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  founderContainer: {
    alignItems: 'center',  // Center the content
    marginVertical: 20,
  },
  founderImage: {
    width: 150,  // Adjust the size as needed
    height: 150,
    resizeMode: 'contain',
    borderRadius: 75,  // Keep circular shape
  },
  founderTextContainer: {
    marginTop: 10,  // Add some space between image and text
    alignItems: 'center',  // Center the text below the image
  },
  founderTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#C5A580',
  },
  founderDescription: {
    fontSize: 16,
    color: '#bbb',
    marginTop: 10,
    textAlign: 'center',  // Center-align the description text
    fontWeight: 'bold',
  },
});

export default HomePage;
