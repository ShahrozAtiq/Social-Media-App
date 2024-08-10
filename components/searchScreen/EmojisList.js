import React, { useRef } from "react";
import {
  Animated,
  Dimensions,
  FlatList,
  ImageBackground,
  StyleSheet,
  Text,
  View,
} from "react-native";
import EMOJIS from "../../data/EMOJIS";
import EmojiSVGShape from "./EmojiSVGShape";

const { width: WINDOW_WIDTH } = Dimensions.get("window");
const VISIBLE_ITEMS = 8;
const ITEM_SIZE = WINDOW_WIDTH / VISIBLE_ITEMS;
const TRANSLATE_VALUE = 50 / VISIBLE_ITEMS;
const PADDING_TOP = ITEM_SIZE * 0.1;
function EmojisList({ bottomFilled }) {
  const flatListRef = useRef(null);

  const ScrollX = useRef(new Animated.Value(0)).current;

  return (
    <View style={{ flex: 1 }}>
      <EmojiSVGShape
        height={ITEM_SIZE + TRANSLATE_VALUE * (VISIBLE_ITEMS / 2)}
        size={ITEM_SIZE}
        visible_items={VISIBLE_ITEMS / 2}
        paddingTop={PADDING_TOP * 2}
        bottomFilled={bottomFilled}
      />
      <Animated.FlatList
        ref={flatListRef}
        style={{
          paddingTop: PADDING_TOP,
        }}
        data={EMOJIS}
        keyExtractor={(item, index) => item.toString()}
        horizontal
        contentContainerStyle={{
          paddingHorizontal: WINDOW_WIDTH / 2 - ITEM_SIZE / 2,
        }}
        showsHorizontalScrollIndicator={false}
        snapToInterval={ITEM_SIZE}
        decelerationRate={"fast"}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: ScrollX } } }],
          { useNativeDriver: true }
        )}
        onMomentumScrollEnd={(event) => {
          const index = Math.round(
            event.nativeEvent.contentOffset.x / ITEM_SIZE
          );
        }}
        renderItem={({ item, index }) => {
          const inputRange = [
            (index - 1) * ITEM_SIZE,
            index * ITEM_SIZE,
            (index + 1) * ITEM_SIZE,
          ];

          const translateY = ScrollX.interpolate({
            inputRange,
            outputRange: [TRANSLATE_VALUE, 0, TRANSLATE_VALUE],
          });

          return (
            <Animated.View
              onTouchEnd={() => {
                flatListRef.current?.scrollToOffset({
                  offset: index * ITEM_SIZE,
                  animated: true,
                });
              }}
              style={{
                transform: [{ translateY }],
                borderRadius: 50,
                alignSelf: "flex-start",
                justifyContent: "center",
                alignItems: "center",
                width: ITEM_SIZE,
                height: ITEM_SIZE,
              }}
            >
              <Text
                style={{
                  fontSize: ITEM_SIZE / 2,
                  textAlign: "center",
                }}
              >
                {item}
              </Text>
            </Animated.View>
          );
        }}
      />
    </View>
  );
}

export default EmojisList;

const styles = StyleSheet.create({});
