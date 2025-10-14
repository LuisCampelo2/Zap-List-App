import { Tabs, Redirect } from "expo-router";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

export default function Layout() {
  const user = useSelector((state: RootState) => state.user);
  if (!user) return <Redirect href="/authentication/login" />;

  return (
    <Tabs>
      <Tabs.Screen name="user" options={{ title: "Perfil" }} />
      <Tabs.Screen name="dashboard" options={{ title: "Dashboard" }} />
    </Tabs>
  );
}
