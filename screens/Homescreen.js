import * as React from "react";
import { View, StyleSheet } from "react-native";
import Header from "../components/home/head/Header.js";
import Stories, { CONTAINER_HEIGHT } from "../components/home/head/Stories.js";
import { SafeAreaView } from "react-native-safe-area-context";
import { GlobalStyles } from "../constants/Styles.js";
import Body from "../components/home/body/Body.js";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import HeaderSvg from "../components/home/head/HeaderSVG.js";
import StorySvg from "../components/home/head/StorySvg.js";
import { StatusBar } from "expo-status-bar";

const HomeScreen = ({ navigation }) => {
  const [followings, setFollowings] = React.useState({ data: [], list: [] });
  const [headerHeight, setHeaderHeight] = React.useState(50);
  const StoryTranslate = useSharedValue(false);

  const storyAnimatedStyles = useAnimatedStyle(() => {
    return {
      marginTop: StoryTranslate.value
        ? withTiming(-CONTAINER_HEIGHT)
        : withTiming(0),
      opacity: StoryTranslate.value ? withTiming(0) : withTiming(1),
    };
  });
  const storySvgAnimatedStyles = useAnimatedStyle(() => {
    return {
      position: "absolute",
      transform: [
        {
          translateY: StoryTranslate.value
            ? withTiming(-CONTAINER_HEIGHT)
            : withTiming(0),
        },
      ],
    };
  });
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={GlobalStyles.colors.primary300} />
      <View>
        <Animated.View style={storySvgAnimatedStyles}>
          <StorySvg
            headerHeight={headerHeight}
            storyHeight={CONTAINER_HEIGHT}
            size={80}
            paddingTop={20}
            visible_items={5}
            animatedStyle={storyAnimatedStyles}
          />
        </Animated.View>
        <View>
          <HeaderSvg
            headerHeight={headerHeight}
            storyHeight={CONTAINER_HEIGHT}
            size={80}
            paddingTop={20}
            visible_items={5}
            animatedStyle={storyAnimatedStyles}
          />
          <View
            onLayout={(event) => {
              setHeaderHeight(event.nativeEvent.layout.height);
            }}
          >
            <Header navigation={navigation} />
          </View>
        </View>

        <Animated.View style={storyAnimatedStyles}>
          <Stories followingsData={followings.data} />
        </Animated.View>
      </View>
      <Body StoryTranslate={StoryTranslate} />
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: GlobalStyles.colors.primary,
  },
});
