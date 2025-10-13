import { useEffect } from "react";
import { getUser } from "../slices/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { type AppDispatch, type RootState } from "../store/store";
import { Slot, useRouter } from "expo-router";
import { View, Text } from "react-native";

export const PrivateRoute = () => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { authenticated, loading } = useSelector((state: RootState) => state.user);

  useEffect(() => {
    if (!authenticated && !loading) {
      dispatch(getUser());
    }
  }, [dispatch]);

  useEffect(() => {
    if (!loading && !authenticated) {
      router.replace("/authentication/login");
    }
  }, [authenticated, loading]);

  if (loading) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>Carregando...</Text>
      </View>
    );
  }

  return authenticated ? <Slot /> : null;
};
