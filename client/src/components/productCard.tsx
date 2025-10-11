import { Card, Text } from 'react-native-paper';
import { API_URL } from "@env";
import { Product } from "../types/product";
import { StyleSheet, View, Image } from "react-native";


export const ProductCard = ({ product }: { product: Product }) => {
    //   source={{ uri: `${API_URL}/imgs/${product.photo}` }}
    return (
        <View style={styles.card}>
            <View>
                <Image style={styles.image} source={{ uri: `${API_URL}/imgs/${product.photo}` }} />
            </View>
            <View>
                <Text style={styles.title}>{product.name}</Text>
                <Text style={styles.price}>{product.price}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 10,
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowOffset: { width: 0, height: 2 },
        elevation: 4,
        marginRight: 10,
    },
    image: { width: 100, height: 100, borderRadius: 8 },
    title: { fontWeight: 'bold', marginTop: 5 },
    price: { color: '#888' },
});
