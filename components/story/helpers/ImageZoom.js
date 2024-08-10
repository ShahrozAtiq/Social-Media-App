import React, { useRef, useState } from "react";
import { ActivityIndicator, Dimensions, Image, StyleSheet } from "react-native";
import {
  LongPressGestureHandler,
  PanGestureHandler,
  PinchGestureHandler,
  State,
  TapGestureHandler,
} from "react-native-gesture-handler";
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { clamp, noop } from "./index";
import styles from "./styles";

const AnimatedImage = Animated.createAnimatedComponent(Image);
const { width, height } = Dimensions.get("window");
export default function ImageZoom({ uri = "", onLoadEnd = noop, ...props }) {
  const [isLoading, setIsLoading] = useState(true);

  const scale = useSharedValue(1);
  const initialFocalX = useSharedValue(0);
  const initialFocalY = useSharedValue(0);
  const focalX = useSharedValue(0);
  const focalY = useSharedValue(0);
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: translateX.value },
      { translateY: translateY.value },
      { translateX: focalX.value },
      { translateY: focalY.value },
      { scale: scale.value },
    ],
  }));

  const onImageLoadEnd = () => {
    onLoadEnd();
    setIsLoading(false);
  };

  return (
    <AnimatedImage
      style={[styles.container, animatedStyle]}
      source={{ uri }}
      resizeMode={"cover"}
      onLoadEnd={onImageLoadEnd}
      {...props}
    />
  );
}
