import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { GlobalStyles } from "../constants/Styles";

function Button({
  title,
  onPress,
  disabled,
  titleStyle,
  containerStyle,
  secondary,
}) {
  return (
    <View
      style={[
        {
          backgroundColor: GlobalStyles.colors.blue,
          borderRadius: 50,
          overflow: "hidden",
        },
        secondary && {
          backgroundColor: GlobalStyles.colors.primary200,
          borderWidth: 1,
          borderColor: GlobalStyles.colors.primary600,
        },
        containerStyle,
        disabled && { opacity: 0.8 },
      ]}
    >
      <Pressable
        android_ripple={{
          color: secondary
            ? "rgba(86, 86, 202,0.5)"
            : "rgba(255, 255, 255,0.5)",
          foreground: true,
        }}
        style={{ justifyContent: "center", alignItems: "center" }}
        onPress={onPress}
        disabled={disabled}
      >
        <Text
          style={[
            {
              color: "white",
              fontWeight: "bold",
              fontSize: 18,
              padding: 20,
            },
            secondary && { color: "white" },
            titleStyle,
          ]}
        >
          {title}
        </Text>
      </Pressable>
    </View>
  );
}

export default Button;

const styles = StyleSheet.create({});
