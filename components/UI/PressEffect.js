import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

const PressEffect = ({ children, style }) => {
  const pressed = useSharedValue(false);
  const animatedStyle = useAnimatedStyle(() => {
    return {
      ...style,
      transform: [{ scale: pressed.value ? withSpring(0.8) : withSpring(1) }],
    };
  });
  return (
    <Animated.View
      onTouchStart={() => (pressed.value = true)}
      onTouchEnd={() => (pressed.value = false)}
      onTouchCancel={() => (pressed.value = false)}
      style={animatedStyle}
    >
      {children}
    </Animated.View>
  );
};

export default PressEffect;

const styles = StyleSheet.create({});
