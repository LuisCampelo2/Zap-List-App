import { View, StyleSheet, TouchableOpacity } from "react-native"
import { Ionicons } from '@expo/vector-icons';
import EvilIcons from '@expo/vector-icons/EvilIcons';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { Link } from 'expo-router';



export const NavBar = () => {
    return (
        <View style={styles.container}>
            <Link href="/" asChild>
                <TouchableOpacity>
                    <Ionicons name="home" size={30} />
                </TouchableOpacity>
            </Link>
            <EvilIcons name="cart" size={40} color="black" />
            <FontAwesome5 name="bell" size={30} color="black" />
            <Link href="/user" asChild>
                <TouchableOpacity>
                    <Ionicons name="person-sharp" size={30} color="black" />
                </TouchableOpacity>
            </Link>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FF7B00',
        height: 79,
        flexDirection: 'row',
        gap: 80,
        alignItems: 'center',
        justifyContent: 'center',

    }
})
