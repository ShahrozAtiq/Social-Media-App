import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useRef } from "react";
import { Ionicons } from "@expo/vector-icons";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";

const Footer = ({ onPress }) => {
  const translateY = useSharedValue(0);

  useEffect(() => {
    translateY.value = withRepeat(
      withTiming(-15, { duration: 1000, easing: Easing.linear }),
      -1,
      true
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: translateY.value }],
    };
  });

  return (
    <View style={{ justifyContent: "center", alignItems: "center" }}>
      <Animated.View onTouchEnd={onPress} style={animatedStyle}>
        <Ionicons name="chevron-up-circle" size={30} color={"white"} />
      </Animated.View>
      <Text style={{ color: "white", fontSize: 15 }}>Swip Up To Reply</Text>
    </View>
  );
};

export default Footer;

const styles = StyleSheet.create({});
