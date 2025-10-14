import { Carousel } from "../components/carousel";
import { Text, View, Image, StyleSheet, ScrollView } from "react-native";
import chevron from "../../assets/images/icons/Chevron.png"
import { useSelector } from "react-redux";
import type { RootState, AppDispatch } from "../store/store";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchProducts } from "../slices/productsSlice";
import { ProductCard } from "../components/productCard";

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

export default function Index() {
    const products = useSelector((state: RootState) => state.products.products);
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        dispatch(fetchProducts({ listId: undefined }));
    }, [dispatch]);

    return (
        <ScrollView>
            <Carousel />
            <View style={styles.containerTitle}>
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
                        <Text>{c}</Text>
                    </View>
                ))}
            </ScrollView>
            {categories.map((c) => (
                <View style={styles.container}>
                    <View style={styles.containerTitleCategory}>
                        <Text style={styles.text}>{c}</Text>
                        <View style={styles.containerIcon}>
                            <Image source={chevron} />
                        </View>
                    </View>
                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={styles.containerProducts}
                    >
                        {products
                            .filter(p => p.category === c)
                            .map((p, index) => (
                                <View key={index} style={styles.containerProducts}>
                                    <ProductCard product={p} />
                                </View>
                            ))}
                    </ScrollView>
                </View>
            ))}
        </ScrollView>
    )
}
const styles = StyleSheet.create({
    container: {
        gap: 20,
    },
    containerTitle: {
        marginBottom: 30,
        marginTop: 45,
        flexDirection: 'row',
    },
    containerTitleCategory: {
        marginTop: 45,
        flexDirection: 'row',
    },
    containerProducts: {
        flexDirection: 'row',
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
    categories: {},
    categoryItem: {
        alignItems: "center",
        marginRight: 15,
    },
    categoryImage: {
        width: 80,
        borderRadius: 10,
    },
    categoryText: {},
});