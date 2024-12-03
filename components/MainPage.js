import React from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';  // Import navigation hook
import BestSeller1 from './images/bstblack-removebg.png';
import BestSeller2 from './images/bstGold-removebg.png';
import BestSeller3 from './images/bstFem-removebg.png';
import firstFullpic from './images/firstFullpic.png';
import founderImage from './images/founder-removebg-preview.png';

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
  const navigation = useNavigation();  // Access the navigation object

  // Handle the watch selection
  const handleWatchPress = (watch) => {
    navigation.navigate('ShoppingDetails', { watch }); // Navigate to ShoppingDetails screen with watch data
  };

  // Handle the "Discover More" button press
  const handleDiscoverMorePress = () => {
    // Navigate to ShoppingPage and also sync the drawer with this change
    navigation.navigate('Shopping');  // This will ensure that the drawer shows the shopping page
  };

  // Handle the "Shop Now" button press
  const handleShopNowPress = () => {
    // Navigate to ShoppingPage and also sync the drawer with this change
    navigation.navigate('Shopping');  // This will ensure that the drawer shows the shopping page
  };

  return (
    <ScrollView style={styles.scrollView}>
     
      <View style={styles.bestSellersContainer}>
        <Text style={styles.bestSellersTitle}>Best Sellers</Text>

        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {bestSellersData.map((item) => (
            <TouchableOpacity 
              key={item.id} 
              onPress={() => handleWatchPress(item)} // Navigate to ShoppingDetails
            >
              <View style={styles.bestSellerCard}>
                <Image source={item.image} style={styles.bestSellerImage} />
                <Text style={styles.bestSellerName}>{item.name}</Text>
                <Text style={styles.bestSellerPrice}>${item.price.toFixed(2)}</Text>
                <Text style={styles.bestSellerDescription}>{item.description}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Discover More Button */}
      <TouchableOpacity style={styles.discoverMoreButton} onPress={handleDiscoverMorePress}>
        <Text style={styles.discoverMoreText}>Discover More</Text>
      </TouchableOpacity>

      <View style={styles.fullImageContainer}>
        <Image source={firstFullpic} style={styles.fullImage} />
        <View style={styles.overlayTextContainer}>
          <Text style={styles.overlayTitle}>Veneris Horology</Text>
          <Text style={styles.overlayDescription}>A Legacy of Precision, A statement of Style</Text>
        </View>
      </View>

      {/* Shop Now Button */}
      <TouchableOpacity style={styles.shopNowButton} onPress={handleShopNowPress}>
        <Text style={styles.shopNowText}>Shop Now</Text>
      </TouchableOpacity>

      {/* Founder Image and Text Section */}
      <View style={styles.founderContainer}>
        <Image source={founderImage} style={styles.founderImage} />
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
    paddingHorizontal: 40,
    marginVertical: 20,
    borderRadius: 5,
    alignSelf: 'center',
  },
  discoverMoreText: {
    color: '#000',
    fontSize: 18,
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
  },
  shopNowButton: {
    backgroundColor: '#C5A580',
    paddingVertical: 12,
    paddingHorizontal: 40,
    marginVertical: 15,
    borderRadius: 5,
    alignSelf: 'center',
    marginBottom: 20
  },
  shopNowText: {
    color: '#000',
    fontSize: 18,
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
