import { Carousel } from "../components/carousel";
import { Text, View, Image, StyleSheet, ScrollView } from "react-native";
import chevron from "../../assets/images/icons/Chevron.png"
import { useSelector } from "react-redux";
import type { RootState, AppDispatch } from "../store/store";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchProducts } from "../slices/productsSlice";
import { API_URL } from "@env";

const images = [
    require('../../assets/images/categories/graos.png'),
    require("../../assets/images/categories/chasECafes.png")
];

const categories = [
    'Grãos',
    'Chás e cafés',
    'Farinhas e derivados',
    'Congelados',
    'Biscoitos e salgadinhos',
    'Utensílios de cozinha',
    'Açúcares e adoçantes',
    'Frutas',
    'Verduras',
    'Legumes',
    'Carnes',
    'Peixes',
    'Massas',
    'Laticínios e ovos',
    'Padaria',
    'Temperos e especiarias',
    'Doces e guloseimas',
    'Bebidas',
    'Material de higiene',
    'Material de limpeza',
    'Itens pra cachorro',
    'Conservas e enlatados',
    'Outros',
];

export const Home = () => {
    const products = useSelector((state: RootState) => state.products.products);
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        dispatch(fetchProducts({ listId: undefined }));
    }, [dispatch]);

    return (
        <View>
            <Carousel />
            <View style={styles.container}>
                <Text style={styles.text}>Categorias</Text>
                <View style={styles.containerIcon}>
                    <Image source={chevron} />
                </View>
            </View>
            <ScrollView horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.categories}>
                {categories.map((c, index) => (
                    <View key={index} style={styles.categoryItem}>
                        <Image
                            source={images[index % images.length]}
                            style={styles.categoryImage}
                        />
                        <Text style={styles.categoryText}>{c}</Text>
                    </View>
                ))}
            </ScrollView>
             <View style={styles.container}>
                <Text style={styles.text}>Grãos</Text>
                <View style={styles.containerIcon}>
                    <Image source={chevron} />
                </View>
            </View>
            <ScrollView horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.categories}>
                {products && products.map((p, index) => (
                    <View key={index}>
                        <Image source={{ uri: `${API_URL}/imgs/${p.photo}`}} style={{ width: 100, height: 100 }} />
                        <Text>{p.name}</Text>
                        <Text>{p.price}</Text>
                    </View>
                ))}
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginTop: 30,
        flexDirection: 'row',
        gap: 5,
        alignItems: "center"
    },
    text: {
        fontSize: 16,
        fontWeight: 'bold',
        marginRight: 5,
    },
    containerIcon: {
        backgroundColor: "#FFFFFF",
        borderRadius: 15,
        width: 20,
        alignItems: "center",
        padding: 5,
    },
    categories: {
        paddingHorizontal: 10,
        gap: 10,
    },
    categoryItem: {
        alignItems: "center",
        marginRight: 15,
    },
    categoryImage: {
        width: 80,
        height: 80,
        borderRadius: 10,
        marginBottom: 5,
    },
    categoryText: {
        fontSize: 12,
        textAlign: "center",
        color: "#333",
        width: 90,
    },
});