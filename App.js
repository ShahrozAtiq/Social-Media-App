import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState, useContext } from "react";
import { LogBox, StyleSheet, Text, View } from "react-native";
import AuthNavigation from "./AuthNavigation";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ActivityIndicator } from "react-native";
import AuthContentProvider, { AuthContext } from "./store/auth-context";
import { GlobalStyles } from "./constants/Styles";
import Loader from "./components/UI/Loader";

export default function App() {
  LogBox.ignoreAllLogs();
  function Root() {
    const [isTryingLogin, setIsTryingLogin] = useState(true);
    const authCtx = useContext(AuthContext);

    useEffect(() => {
      async function fetchToken() {
        setTimeout(() => {
          setIsTryingLogin(false);
        }, 2000);
      }

      fetchToken();
    }, []);

    if (isTryingLogin) {
      return (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: GlobalStyles.colors.primary,
          }}
        >
          <Loader />
        </View>
      );
    }

    return <AuthNavigation />;
  }

  return (
    <AuthContentProvider>
      <StatusBar backgroundColor={GlobalStyles.colors.primary} />
      <Root />
    </AuthContentProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: GlobalStyles.colors.primary,
    alignItems: "center",
    justifyContent: "center",
  },
});
