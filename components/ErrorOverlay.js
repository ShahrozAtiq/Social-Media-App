import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { GlobalStyles } from "../constants/Styles";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";

function ErrorOverlay({ message, onClose }) {
  return (
    <Animated.View
      entering={FadeIn}
      exiting={FadeOut}
      style={{
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(90, 90, 205,0.8)",
        position: "absolute",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Image
        source={require("../assets/warning.png")}
        style={{ width: 50, height: 50 }}
      />
      <Text style={{ color: "white", fontWeight: "bold", marginTop: 5 }}>
        {message}
      </Text>
      <Text
        onPress={onClose}
        style={{
          color: "white",
          fontWeight: "bold",
          marginTop: 5,
          fontSize: 18,
          backgroundColor: "rgba(255,255,255,0.3)",
          padding: 10,
          paddingHorizontal: 15,
          borderRadius: 15,
          borderWidth: 1,
          borderColor: GlobalStyles.colors.blue,
        }}
      >
        Ok
      </Text>
    </Animated.View>
  );
}

export default ErrorOverlay;

const styles = StyleSheet.create({});
