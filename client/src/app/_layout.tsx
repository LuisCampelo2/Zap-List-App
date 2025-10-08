import { View, StyleSheet } from "react-native";
import { Header } from "../components/header";
import { Provider } from "react-redux";
import { Slot } from "expo-router";
import { store } from "../store/store";

export default function Layout() {
    return (
        <Provider store={store}>
            <View style={styles.container}>
                <Header />
                <Slot />
            </View>
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
