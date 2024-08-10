import React, { useRef } from "react";
import {
  Animated,
  Dimensions,
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import Card from "./Card";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("screen");
const ITEM_SIZE = SCREEN_WIDTH * 0.8;

const PostsList = () => {
  const ScrollX = useRef(new Animated.Value(0)).current;

  return (
    <Animated.FlatList
      horizontal
      contentContainerStyle={{
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: SCREEN_WIDTH * 0.1,
      }}
      showsHorizontalScrollIndicator={false}
      snapToInterval={ITEM_SIZE}
      decelerationRate={"fast"}
      onScroll={Animated.event(
        [{ nativeEvent: { contentOffset: { x: ScrollX } } }],
        { useNativeDriver: true }
      )}
      data={[1, 2, 3, 4, 5, 6]}
      keyExtractor={(item, index) => item.toString()}
      renderItem={({ item, index }) => {
        const inputRange = [
          (index - 1) * ITEM_SIZE,
          index * ITEM_SIZE,
          (index + 1) * ITEM_SIZE,
        ];
        const scale = ScrollX.interpolate({
          inputRange,
          outputRange: [0.7, 1, 0.7],
        });
        const translateX = ScrollX.interpolate({
          inputRange,
          outputRange: [-SCREEN_WIDTH * 0.2, 0, SCREEN_WIDTH * 0.2],
        });
        const rotate = ScrollX.interpolate({
          inputRange,
          outputRange: ["10deg", "0deg", "-10deg"],
        });
        return (
          <Animated.View
            style={{
              transform: [{ scale }, { translateX }, { rotate }],
            }}
          >
            <Card width={ITEM_SIZE} height={SCREEN_HEIGHT / 2} radius={30} />
          </Animated.View>
        );
      }}
    />
  );
};

export default PostsList;

const styles = StyleSheet.create({});
