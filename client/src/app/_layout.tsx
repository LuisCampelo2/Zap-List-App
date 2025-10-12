import { View, StyleSheet } from "react-native";
import { Header } from "../components/header";
import { Provider } from "react-redux";
import { Slot, usePathname } from "expo-router";
import { store } from "../store/store";
import { NavBar } from "../components/navBar";


export default function Layout() {
    const pathname = usePathname();
    const hideHeader = ["/authentication/login"];
    return (
        <Provider store={store}>
            <View style={styles.container}>
                {!hideHeader.includes(pathname) && <Header />}
                <Slot />
            </View>
            <NavBar />
        </Provider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        gap: 15,
        backgroundColor: "#f1f1cdff",
        padding: 20,
    },
});
