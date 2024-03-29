import { StatusBar } from "expo-status-bar";
import { useFonts, Roboto_400Regular, Roboto_700Bold } from '@expo-google-fonts/roboto';
import { NativeBaseProvider } from "native-base";
import { Routes } from "@routes/index";
import { Loading } from "@components/Loading";
import { THEME } from "./src/theme";
import { AuthContextProvider } from "@contexts/AuthContext";

export default function App() {
  const [isFontsLoaded] = useFonts({ Roboto_400Regular, Roboto_700Bold });

  return (
    <NativeBaseProvider theme={THEME}>
      <StatusBar
        style="light"
        backgroundColor="transparent"
        translucent
      />

      <AuthContextProvider>
        {isFontsLoaded ? <Routes /> : <Loading />}
      </AuthContextProvider>
    </NativeBaseProvider>
  );
}
