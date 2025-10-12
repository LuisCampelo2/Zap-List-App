import { Text } from 'react-native-paper';
import { API_URL } from "@env";
import { Product } from "../types/product";
import { StyleSheet, View, Image, TouchableOpacity } from "react-native";

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
        <TouchableOpacity style={styles.btn} onPress={() => console.log('Adicionado!')}>
          <Text>Adicionar</Text>
        </TouchableOpacity>

      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 10,
    padding: 8,
    width: 140,
  },
  image: {
    backgroundColor: '#fff',
    width: '100%',
    height: 200,
    borderRadius: 8,
  },
  info: {
    width: '100%',
    marginTop: 8,
  },
  title: {
    fontWeight: '600',
    color: '#333',
  },
  price: {
    fontWeight: 'bold',
    color: '#2a9d8f',
    marginTop: 4,
  },
  btn:{
    backgroundColor:'#FF7B00',
    borderRadius:8,
    padding:6,
    alignItems:'center',
  }
});
