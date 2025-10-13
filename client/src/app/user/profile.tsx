import { View, Text, TouchableOpacity } from "react-native"
import { useSelector, useDispatch } from "react-redux";
import { type AppDispatch, RootState } from "../../store/store";
import { logout } from "../../slices/userSlice";
import { router } from "expo-router";

export default function Profile() {
    const dispatch = useDispatch<AppDispatch>();
    const user = useSelector((state: RootState) => state.user.user);


    const handleLogout = async () => {
        try {
            await dispatch(logout());
            router.push("/");
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <View>
            <Text>Seu perfil</Text>
            <Text>Olá {user?.name}</Text>
            <TouchableOpacity onPress={handleLogout}>
                <Text>
                    Sair da conta
                </Text>
            </TouchableOpacity>
        </View>
    )
}