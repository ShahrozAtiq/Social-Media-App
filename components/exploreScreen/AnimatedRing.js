import React, { useEffect } from "react";
// import Svg, { Circle } from "react-native-svg";
import { GlobalStyles } from "../../constants/Styles";
import Animated, {
  //   useAnimatedProps,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withRepeat,
  withTiming,
} from "react-native-reanimated";
import { View } from "react-native";

const AnimatedRing = ({ index }) => {
  //   const AnimatedCircle = Animated.createAnimatedComponent(Circle);
  const radius = useSharedValue(0);

  useEffect(() => {
    radius.value = withDelay(
      index * 1000,
      withRepeat(
        withTiming(GlobalStyles.styles.windowHeight * 1.5, { duration: 5000 }),
        -1,
        false
      )
    );
  }, []);

  //   const animatedProps = useAnimatedProps(() => {
  //     return {
  //       r: radius.value,
  //     };
  //   });
  const animatedStyles = useAnimatedStyle(() => {
    return {
      width: radius.value,
      height: radius.value,
      borderRadius: radius.value / 2,
      borderWidth: 2,
      borderColor: GlobalStyles.colors.primary500,
    };
  });
  return (
    // <Svg
    //   style={{ position: "absolute" }}
    //   height={GlobalStyles.styles.windowHeight}
    //   width={GlobalStyles.styles.windowWidth}
    //   fill="red"
    //   viewBox={`0 0 ${GlobalStyles.styles.windowWidth} ${GlobalStyles.styles.windowHeight}`}
    // >
    //   <AnimatedCircle
    //     cx={GlobalStyles.styles.windowWidth / 2}
    //     cy={GlobalStyles.styles.windowHeight / 2}
    //     animatedProps={animatedProps}
    //     fill="none"
    //     strokeWidth={2}
    //     stroke={GlobalStyles.colors.primary500}
    //   />
    // </Svg>
    <View
      style={{
        position: "absolute",
        justifyContent: "center",
        alignItems: "center",
        width: GlobalStyles.styles.windowWidth,
        height: GlobalStyles.styles.windowHeight,
      }}
    >
      <Animated.View style={animatedStyles} />
    </View>
  );
};

export default AnimatedRing;
