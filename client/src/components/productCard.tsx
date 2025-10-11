import { Text } from 'react-native-paper';
import { API_URL } from "@env";
import { Product } from "../types/product";
import { StyleSheet, View, Image } from "react-native";

export const ProductCard = ({ product }: { product: Product }) => {
  return (
    <View style={styles.card}>
      <Image 
        style={styles.image} 
        source={{ uri: `${API_URL}/imgs/${product.photo}` }} 
        resizeMode="cover"
      />
      <View style={styles.info}>
        <Text style={styles.title} numberOfLines={1}>
          {product.name}
        </Text>
        <Text style={styles.price}>
          R$ {product.price}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 8,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
    marginRight: 12,
    width: 140,      
  
  },
  image: {
    width: '100%',
    height: 110,
    borderRadius: 8,
  },
  info: {
    width: '100%',
    marginTop: 8,
    alignItems: 'center',
  },
  title: {
    fontWeight: '600',
    color: '#333',
    textAlign: 'center',
  },
  price: {
    fontWeight: 'bold',
    color: '#2a9d8f',
    marginTop: 4,
  },
});
