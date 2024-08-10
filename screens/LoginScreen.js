import { View, Text, StyleSheet } from "react-native";
import React from "react";
import LoginForm from "../components/loginScreen/LoginForm";
import { GlobalStyles } from "../constants/Styles";
import { SafeAreaView } from "react-native-safe-area-context";

const LoginScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          margin: 30,
          marginTop: GlobalStyles.styles.windowHeight * 0.1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text
          style={{
            fontSize: 35,
            fontWeight: "bold",
            color: "white",
          }}
        >
          Welcome Back!
        </Text>
        <Text
          style={{
            fontSize: 18,
            color: "rgba(255,255,255,0.6)",
          }}
        >
          Sign in to be continoue
        </Text>
      </View>
      <View style={{ marginHorizontal: 10 }}>
        <LoginForm navigation={navigation} />
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: GlobalStyles.colors.primary,
    // paddingTop: 50,
    // paddingHorizontal: 12,
  },
});
