import { View, StyleSheet } from "react-native"
import { Ionicons } from '@expo/vector-icons';
import EvilIcons from '@expo/vector-icons/EvilIcons';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';



export const NavBar = () => {
    return (
            <View style={styles.container}>
                <Ionicons name="home" size={30} />
                <EvilIcons name="cart" size={40} color="black" />
                <FontAwesome5 name="bell" size={30} color="black" />
                <Ionicons name="person-sharp" size={30} color="black" />
            </View>
    )
}
const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FF7B00',
        height: 79,
        flexDirection: 'row',
        gap: 80,
        alignItems:'center',
        justifyContent:'center',
        
    }
})
