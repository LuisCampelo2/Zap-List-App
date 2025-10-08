import {Image,ScrollView,Dimensions,StyleSheet } from "react-native";

const { width } = Dimensions.get('window');

const images = [
    require('../../assets/images/banner/Banner.png'),
];

export const Carousel = () => {
    return (
        <ScrollView
            horizontal
            pagingEnabled 
            showsHorizontalScrollIndicator={false}
        >
            {images.map((img, index) => (
                <Image key={index} source={img} style={styles.image} />
            ))}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    image: {
        width: 343,
        height: 136,
        resizeMode: 'cover',
    },
});