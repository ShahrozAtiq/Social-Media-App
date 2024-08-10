import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Animated, {
  useSharedValue,
  withTiming,
  useAnimatedStyle,
} from "react-native-reanimated";

const SettingsIcon = ({ color = "white", onPress }) => {
  const rotation = useSharedValue(0);

  const rotateIcon = () => {
    rotation.value = withTiming(rotation.value + 360, { duration: 500 });
  };

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ rotate: `${rotation.value}deg` }],
    };
  });

  return (
    <Animated.View
      onTouchEnd={() => {
        rotateIcon();
        onPress();
      }}
      style={[animatedStyle]}
    >
      <Ionicons name="settings" color={color} size={30} />
    </Animated.View>
  );
};

export default SettingsIcon;

const styles = StyleSheet.create({});
