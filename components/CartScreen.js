import React, {useEffect,  useState ,useCallback} from 'react';
import { View, Text, FlatList, Alert, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { db } from '../firebaseConfig'; 
import { collection, query, where, onSnapshot, deleteDoc, doc, writeBatch } from 'firebase/firestore';
import { auth } from '../firebaseConfig';
import Icon from 'react-native-vector-icons/Ionicons';
import { useFocusEffect } from '@react-navigation/native';
const CartScreen = () => {
    const [cartItems, setCartItems] = useState([]);
    const user = auth.currentUser;
  
    const fetchCartItems = useCallback(() => {
      if (!user) {
        Alert.alert("Not Authenticated", "Please log in to view your cart.");
        return () => {};
      }
  
      const cartsCollectionRef = collection(db, 'carts');
      const q = query(cartsCollectionRef, where("userId", "==", user.uid));
  
      return onSnapshot(q, (snapshot) => {
        const items = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data()
        }));
        console.log("Current cart items:", items);
        setCartItems(items);
      }, (error) => {
        console.error("Error fetching cart items:", error);
        Alert.alert('Error', 'Failed to load cart items. Please try again.');
      });
    }, [user]);
  
    useEffect(() => {
      const unsubscribe = fetchCartItems();
      return () => unsubscribe();
    }, [fetchCartItems]);
  
    
    useFocusEffect(
      useCallback(() => {
        const unsubscribe = fetchCartItems();
        return () => unsubscribe();
      }, [fetchCartItems])
    );

    const handlePurchase = async () => {
        if (cartItems.length === 0) {
          Alert.alert("Cart is Empty", "There are no items to purchase.");
          return;
        }
      
        const batch = writeBatch(db);
        try {
          cartItems.forEach((item) => {
            const itemId = String(item.id);
            const cartItemRef = doc(db, 'carts', itemId);
            console.log("Preparing to delete:", cartItemRef.id);
            batch.delete(cartItemRef);
          });
      
          await batch.commit();
          console.log("Batch delete committed.");
          
      setCartItems([]);
          
        
          
          Alert.alert("Thank You!", "Your purchase has been successful.");
        } catch (error) {
          console.error("Error completing purchase:", error);
          Alert.alert("Error", "There was a problem completing your purchase. Please try again.");
        }
      };

      const handleDeleteItem = async (itemId) => {
        try {
          
          const cartItemRef = doc(db, 'carts', String(itemId));
          await deleteDoc(cartItemRef);
      
      
          const updatedCart = cartItems.filter(item => item.id !== itemId);
          setCartItems(updatedCart);
      
          console.log("Deleted item with ID:", itemId);
        } catch (error) {
          console.error('Failed to delete item from server', error);
          Alert.alert('Error', 'Failed to delete item. Please try again.');
        }
      };





  const calculateTotal = () => {
    return cartItems.reduce((total, item) => {
      const price = typeof item.price === 'number' ? item.price : 0;
      const rate = item.exchangeRates?.[item.currency] || 1; 
      return total + (price * rate);
    }, 0).toFixed(2); 
  };

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Image source={item.image} style={styles.itemImage} />
      <View style={styles.itemDetails}>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemPrice}>
          {item.price ? item.price.toFixed(2) : 'N/A'} {item.currency ? item.currency : ''}
        </Text>
      </View>
      <TouchableOpacity onPress={() => handleDeleteItem(item.id)}>
  <Icon name="trash" size={24} color="black" />
</TouchableOpacity>
    </View>
  );
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Cart</Text>
      {cartItems.length === 0 ? (
        <Text style={styles.emptyCart}>Your cart is empty.</Text>
      ) : (
        <>
          <FlatList
            data={cartItems}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            />
            <Text style={styles.totalText}>Total: {calculateTotal()} {cartItems[0]?.currency}</Text>
  
            <TouchableOpacity style={styles.purchaseButton} onPress={handlePurchase}>
              <Text style={styles.purchaseButtonText}>Purchase</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      backgroundColor: '#C5A580',  
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 20,
      color: '#000',
    },
    emptyCart: {
      textAlign: 'center',
      fontSize: 18,
      color: '#888',
    },
    itemContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 15,
      backgroundColor: '#fff', 
      borderBottomWidth: 1,
      borderColor: '#ccc',
      justifyContent: 'space-between', 
    },
    itemImage: {
      width: 50, 
      height: 50, 
      marginRight: 15, 
    },
    itemDetails: {
      flex: 1, 
    },
    itemName: {
      fontSize: 18,
      color: '#000', 
    },
    itemPrice: {
      fontSize: 16,
      color: '#555',
    },
    totalText: {
      fontSize: 18,
      fontWeight: 'bold',
      marginTop: 20,
      marginBottom: 20,
      color: '#000', 
    },
    purchaseButton: {
      marginTop: 20,
      padding: 15,
      backgroundColor: '#000', 
      borderRadius: 5,
      alignItems: 'center',
    },
    purchaseButtonText: {
      color: '#fff', 
      fontSize: 18,
    },
   
  });
  
  export default CartScreen;