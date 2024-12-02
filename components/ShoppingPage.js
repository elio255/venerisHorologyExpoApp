
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import { Picker } from '@react-native-picker/picker'; 
import { useNavigation } from '@react-navigation/native';
import { useCurrency } from './CurrencyContext';
import styles from './ShoppingPageDesign';
import { getExchangeRates } from './currencyApi';
import BestSeller1 from './images/bstblack.jpg';
import BestSeller2 from './images/bstGold.jpg';
import BestSeller3 from './images/bstFem.jpg';
import watch1 from './images/watch1.1.png';
import watch2 from './images/watch1.2.png';
import watch3 from './images/watch1.3.png';
import watch4 from './images/watch1.4.png';
import watch5 from './images/watch1.5.png';
import watch6 from './images/watch1.6.png';
import watch7 from './images/watch1.7.png';
import watch8 from './images/watch1.8.png';
import watch9 from './images/watch1.9.png';
import watch10 from './images/watch2.0.png';
import watch11 from './images/watch2.1.png';



const watches = [
  { 
      id: 1, 
      name: 'Heritage HO1980',
      gender:'male', 
      price: 299.99, 
      description: 'A classic design with a modern touch.', 
      image: BestSeller1,
      attributes: {
          category: 'Luxury',
          moreText: 'Elegant design suitable for all occasions.',
          type: 'Analog',
          metal: 'Stainless Steel',
          diamond: 'Yes'
      }
  },
  { 
      id: 2, 
      name: 'Horology 1818', 
      price: 199.99,
      gender: 'female', 
      description: 'Timeless elegance for every occasion.', 
      image: BestSeller2,
      attributes: {
          category: 'Formal',
          moreText: 'A sophisticated watch for the modern gentleman.',
          type: 'Quartz',
          metal: 'Gold Plated',
          diamond: 'No'
      }
  },
  {
      id: 3, 
      name: 'Lumina 2001', 
      price: 399.99, 
      description: 'A bold statement piece for the innovative individual.', 
      image: BestSeller3,
      gender:'unisex',
      attributes: {
          category: 'Casual',
          moreText: 'Round smartwatch with multiple features.',
          type: 'Smart',
          metal: 'Aluminum',
          diamond: 'No'
      }
  },
  { 
      id: 4, 
      name: 'Celestial Eclipse', 
      price: 1450, 
      description: 'A luxurious watch inspired by the beauty of the cosmos.',
      gender:'male', 
      image: watch1,
      attributes: {
          category: 'Luxury',
          moreText: 'Features a midnight blue dial and a moon phase indicator.',
          type: 'Automatic',
          metal: 'Titanium',
          diamond: 'Yes'
      }
  },
  { 
      id: 5, 
      name: 'Rose Imperial', 
      price: 1100,
      gender:'male', 
      description: 'A watch that combines vintage charm with modern elegance.', 
      image: watch2,
      attributes: {
          category: 'Classic',
          moreText: 'Textured rose gold finish with Roman numeral markers.',
          type: 'Analog',
          metal: 'Rose Gold Plated',
          diamond: 'No'
      }
  },
  { 
      id: 6, 
      name: 'Voyager Pro', 
      price: 2000, 
      description: 'Built for the adventurer, with features for rugged travels.', 
      image: watch3,
      gender:'unisex',
      attributes: {
          category: 'Sports',
          moreText: 'High water resistance with durable rubber strap.',
          type: 'Digital',
          metal: 'Ceramic',
          diamond: 'No'
      }
  },
  { 
      id: 7, 
      name: 'Laine', 
      price: 750, 
      description: 'A stylish unisex watch for everyday elegance.', 
      image: watch4,
      gender:'male',
      attributes: {
          category: 'Casual',
          moreText: 'Lightweight and versatile with a minimalist dial.',
          type: 'Quartz',
          metal: 'Stainless Steel',
          diamond: 'No'
      }
  },
  { 
      id: 8, 
      name: 'Blues', 
      price: 1300, 
      gender:'female',
      description: 'A chic watch with a deep blue dial for fashion-forward individuals.', 
      image: watch5,
      attributes: {
          category: 'Fashion',
          moreText: 'Unique blue dial with leather strap.',
          type: 'Analog',
          metal: 'Stainless Steel',
          diamond: 'No'
      }
  },
  { 
      id: 9, 
      name: 'Lumina', 
      price: 950, 
      gender:'unisex',
      description: 'An elegant watch with luminous hands for easy reading.', 
      image: watch6,
      attributes: {
          category: 'Dress',
          moreText: 'Classic look with luminescent features.',
          type: 'Analog',
          metal: 'Stainless Steel',
          diamond: 'Yes'
      }
  },
  { 
      id: 10, 
      name: 'Aurora', 
      gender:'male',
      price: 1100, 
      description: 'A sophisticated watch with a hint of sparkle.', 
      image: watch7,
      attributes: {
          category: 'Dress',
          moreText: 'Subtle sparkle on bezel and markers.',
          type: 'Analog',
          metal: 'Gold Plated',
          diamond: 'Yes'
      }
  },
  { 
      id: 11, 
      name: 'Stellar', 
      price: 680, 
      gender:'female',
      description: 'A modern watch with an understated elegance.', 
      image: watch8,
      attributes: {
          category: 'Casual',
          moreText: 'Simple design with stainless steel strap.',
          type: 'Quartz',
          metal: 'Aluminum',
          diamond: 'No'
      }
  },
  { 
      id: 12, 
      name: 'Chronos', 
      price: 1450, 
      description: 'A versatile unisex watch with precision timekeeping.', 
      image: watch9,
      gender:'unisex',
      attributes: {
          category: 'Classic',
          moreText: 'Features a chronograph and date display.',
          type: 'Chronograph',
          metal: 'Stainless Steel',
          diamond: 'No'
      }
  },
  { 
      id: 13, 
      name: 'Vanguard', 
      price: 1550, 
      gender:'male',
      description: 'A bold watch for those who lead the way.', 
      image: watch10,
      attributes: {
          category: 'Adventure',
          moreText: 'Bold design with extra durability.',
          type: 'Automatic',
          metal: 'Carbon Fiber',
          diamond: 'No'
      }
  },
  { 
      id: 14, 
      name: 'Prestige', 
      price: 700,
      gender:'female', 
      description: 'A refined watch for special occasions.', 
      image: watch11,
      attributes: {
          category: 'Luxury',
          moreText: 'Refined style with comfortable leather strap.',
          type: 'Quartz',
          metal: 'Gold Plated',
          diamond: 'No'
      }
  }
];

export default function ShoppingPage() {
  const { currency, changeCurrency } = useCurrency(); 
  const [search, setSearch] = useState('');
  const [selectedGenders, setSelectedGenders] = useState([]);
  const [isGenderFilterOpen, setIsGenderFilterOpen] = useState(true);
  const [exchangeRates, setExchangeRates] = useState(null); 
  const navigation = useNavigation();

  useEffect(() => {
    const fetchRates = async () => {
      try {
        const rates = await getExchangeRates(); 
        setExchangeRates(rates);
      } catch (error) {
        console.error('Error fetching exchange rates:', error);
      }
    };
    fetchRates();
  }, [currency]); 
  const handleGenderChange = (gender) => {
    setSelectedGenders((prev) =>
      prev.includes(gender) ? prev.filter((g) => g !== gender) : [...prev, gender]
    );
  };

  const toggleGenderFilter = () => {
    setIsGenderFilterOpen((prev) => !prev);
  };

  const convertPrice = (price) => {
    if (exchangeRates && currency !== 'USD') {
      return (price * exchangeRates[currency]).toFixed(2);
    }
    return price.toFixed(2);
  };

  const filteredWatches = watches.filter(
    (watch) =>
      watch.name.toLowerCase().includes(search.toLowerCase()) &&
      (selectedGenders.length === 0 || selectedGenders.includes(watch.gender))
  );

  const renderWatchCard = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() =>
        navigation.navigate('ShoppingDetails', {
          watch: item,
          currency,
          exchangeRates,
        })
      }
    >
      <Image source={item.image} style={styles.imageSmall} />
      <Text style={styles.title}>{item.name}</Text>
      <Text style={styles.price}>
        {convertPrice(item.price)} {currency}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
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
                  selectedGenders.includes('female') && styles.checkboxSelected,
                ]}
              >
                Female
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleGenderChange('unisex')}>
              <Text
                style={[
                  styles.checkbox,
                  selectedGenders.includes('unisex') && styles.checkboxSelected,
                ]}
              >
                Unisex
              </Text>
            </TouchableOpacity>
          </View>
        )}

        <View style={styles.currencySelector}>
          <Text style={styles.sidebarTitle}>
            {isGenderFilterOpen ? 'Currency:' : ''}
          </Text>
          <Picker
            selectedValue={currency}
            style={styles.picker}
            onValueChange={(itemValue) => changeCurrency(itemValue)} 
            itemStyle={{ color: '#C5A580' }} 
          >
            {exchangeRates &&
              Object.keys(exchangeRates).map((cur) => (
                <Picker.Item key={cur} label={cur} value={cur} />
              ))}
          </Picker>
        </View>
      </View>

      
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
          numColumns={2}
        />
      </View>
    </View>
  );
}