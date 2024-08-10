// ProgressBar.js
import React, { useEffect } from "react";
import { View, StyleSheet } from "react-native";
import Animated, {
  Easing,
  useSharedValue,
  withTiming,
  useAnimatedStyle,
  runOnJS,
} from "react-native-reanimated";
import { GlobalStyles } from "../../constants/Styles";

const DURATION = 5;
const ProgressBar = ({ onFinish, start, completed }) => {
  const progress = useSharedValue(0);
  const isCompleted = useSharedValue(false);

  useEffect(() => {
    if (start) {
      isCompleted.value = false;
      progress.value = withTiming(
        1,
        {
          duration: DURATION * 1000,
          easing: Easing.linear,
        },
        (isFinished) => {
          if (isFinished) {
            isCompleted.value = true;
            if (onFinish) {
              runOnJS(onFinish)();
            }
          }
        }
      );
    }
  }, [start]);

  useEffect(() => {
    if (completed) {
      progress.value = 1;
    }
  }, [completed]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      width: `${progress.value * 100}%`,
    };
  });

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.progressBar, animatedStyle]} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 5,
    backgroundColor: GlobalStyles.colors.primary500,
    borderRadius: 10,
    overflow: "hidden",
  },
  progressBar: {
    height: "100%",
    backgroundColor: GlobalStyles.colors.purple,
    borderRadius: 10,
  },
});

export default ProgressBar;
