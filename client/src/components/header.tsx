import { View, Image, TextInput, StyleSheet, Text } from "react-native";
import logo from "../../assets/images/logo.png";
import SearchIcon from "../../assets/images/icons/search.png";

export const Header = () => {
    return (
        <View style={styles.container}>
            <Image source={logo} style={styles.logo} />
            <View style={styles.searchContainer}>
                <Image source={SearchIcon} />
                <TextInput style={styles.input} placeholder="Buscar" placeholderTextColor="#999" />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        gap:5,
        marginTop:20,
    },
    logo: {
        width:90,
        height: 100,
        marginBottom: 20,
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        borderRadius: 8,
        paddingHorizontal: 10,
        width: 266,
    },
    input: {
        flex: 1,
        height: 50,
    },
});
