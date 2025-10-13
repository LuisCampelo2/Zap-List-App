import { Provider } from "react-redux";
import { store } from "../store/store";
import { Stack } from "expo-router";
import { NavBar } from "../components/navBar";
import { Header } from "../components/header";
import { StyleSheet, View } from "react-native";

export default function Layout() {
    return (
        <Provider store={store}>
            <View style={styles.container}>
                    <Header />
                <View style={styles.content}>
                    <Stack
                        screenOptions={{
                            headerShown: false,
                            contentStyle: { backgroundColor: 'transparent' },
                        }}
                    >
                        <Stack.Screen name="index" options={{ title: "Index" }} />
                        <Stack.Screen name="home" options={{ title: "Home" }} />
                        <Stack.Screen name="user/profile" options={{ title: "Profile" }} />
                        <Stack.Screen
                            name="authentication/login"
                            options={{ title: "Login" }}
                        />
                    </Stack>
                </View>
                    <NavBar />
            </View>
        </Provider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:'#f8ecc5ff'
    },
    content: {
        flex: 1,
        padding:20,
    },
});
