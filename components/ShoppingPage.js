import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import styles from './ShoppingPageDesign'; // Import the styles from the separate file

const watches = [
  { id: 1, name: 'Heritage HO1980', price: 299.99, gender: 'unisex', image: require('./images/bstblack.jpg') },
  { id: 2, name: 'Horology 1818', price: 199.99, gender: 'male', image: require('./images/bstGold.jpg') },
  { id: 3, name: 'Lumina 2001', price: 399.99, gender: 'unisex', image: require('./images/bstFem.jpg') },
  { id: 4, name: 'Celestial Eclipse', price: 1450, gender: 'male', image: require('./images/watch1.1.png') },
  { id: 5, name: 'Rose Imperial', price: 1100, gender: 'male', image: require('./images/watch1.2.png') },
  { id: 6, name: 'Voyager Pro', price: 2000, gender: 'female', image: require('./images/watch1.3.png') },
  { id: 7, name: 'Laine', price: 750, gender: 'unisex', image: require('./images/watch1.4.png') },
  { id: 8, name: 'Blues', price: 1300, gender: 'female', image: require('./images/watch1.5.png') },
  { id: 9, name: 'Lumina', price: 950, gender: 'male', image: require('./images/watch1.6.png') },
  { id: 10, name: 'Aurora', price: 1100, gender: 'male', image: require('./images/watch1.7.png') },
  { id: 11, name: 'Stellar', price: 680, gender: 'female', image: require('./images/watch1.8.png') },
  { id: 12, name: 'Chronos', price: 1450, gender: 'unisex', image: require('./images/watch1.9.png') },
  { id: 13, name: 'Vanguard', price: 1550, gender: 'female', image: require('./images/watch2.0.png') },
  { id: 14, name: 'Prestige', price: 700, gender: 'female', image: require('./images/watch2.1.png') },
];

export default function ShoppingPage() {
  const [search, setSearch] = useState('');
  const [selectedGenders, setSelectedGenders] = useState([]);
  const [isGenderFilterOpen, setIsGenderFilterOpen] = useState(true); // State to toggle gender filter visibility

  const handleGenderChange = (gender) => {
    setSelectedGenders((prev) =>
      prev.includes(gender)
        ? prev.filter((g) => g !== gender)
        : [...prev, gender]
    );
  };

  const toggleGenderFilter = () => {
    setIsGenderFilterOpen((prev) => !prev); // Toggle visibility
  };

  const filteredWatches = watches.filter(
    (watch) =>
      watch.name.toLowerCase().includes(search.toLowerCase()) &&
      (selectedGenders.length === 0 || selectedGenders.includes(watch.gender))
  );

  const renderWatchCard = ({ item }) => (
    <TouchableOpacity style={styles.card}>
      <Image
        source={item.image}
        style={isGenderFilterOpen ? styles.imageSmall : styles.imageLarge} // Conditional style for images
      />
      <Text style={styles.title}>{item.name}</Text>
      <Text style={styles.price}>${item.price.toFixed(2)}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Sidebar with toggle button */}
      <View style={isGenderFilterOpen ? styles.sidebar : styles.sidebarCollapsed}>
        <TouchableOpacity onPress={toggleGenderFilter} style={styles.filterToggle}>
          <Text style={styles.sidebarTitle}>
            {isGenderFilterOpen ? 'Gender ▶' : '▼'}
          </Text>
        </TouchableOpacity>
        {isGenderFilterOpen && (
          <View style={styles.checkboxContainer}>
            <TouchableOpacity onPress={() => handleGenderChange('male')}>
              <Text
                style={[
                  styles.checkbox,
                  selectedGenders.includes('male') && styles.checkboxSelected,
                ]}
              >
                Male
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleGenderChange('female')}>
              <Text
                style={[
                  styles.checkbox,
                  selectedGenders.includes('female') &&
                    styles.checkboxSelected,
                ]}
              >
                Female
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleGenderChange('unisex')}>
              <Text
                style={[
                  styles.checkbox,
                  selectedGenders.includes('unisex') &&
                    styles.checkboxSelected,
                ]}
              >
                Unisex
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </View>

      {/* Main content */}
      <View style={styles.content}>
        <Text style={styles.header}>Catch the time by our Watches</Text>
        <TextInput
          style={styles.searchBar}
          placeholder="Search"
          placeholderTextColor="#C5A580"
          value={search}
          onChangeText={setSearch}
        />
        <FlatList
          data={filteredWatches}
          renderItem={renderWatchCard}
          keyExtractor={(item) => item.id.toString()}
          style={styles.watchGrid}
          contentContainerStyle={styles.flatListContainer}
          numColumns={2} // Displays two watches per row
        />
      </View>
    </View>
  );
}
