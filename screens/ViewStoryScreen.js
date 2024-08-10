import { Animated, StatusBar, StyleSheet, View } from "react-native";
import React, { useCallback, useRef, useState } from "react";
import { GlobalStyles } from "../constants/Styles";

import RenderStory from "../components/ViewStoryScreen/RenderStory";

const ITEM_WIDTH = GlobalStyles.styles.windowWidth;
const ITEM_HEIGHT = GlobalStyles.styles.windowHeight;

const ViewStoryScreen = () => {
  const [users, setUsers] = useState([1, 2, 3, 4, 5]);
  const scrollX = useRef(new Animated.Value(0)).current;
  const [currentUser, setCurrentUser] = useState(0);
  const flatListRef = useRef(null);

  const nextUserHandler = useCallback(() => {
    if (currentUser + 1 < users.length) {
      flatListRef.current?.scrollToIndex({
        index: currentUser + 1,
      });

      setCurrentUser((prevData) => prevData + 1);
    }
  }, [currentUser, users.length]);
  const previousUserHandler = useCallback(() => {
    if (currentUser - 1 > 0) {
      flatListRef.current?.scrollToIndex({
        index: currentUser - 1,
      });
      setCurrentUser((prevData) => prevData - 1);
    }
  }, [currentUser]);

  const renderItem = useCallback(
    ({ item, index }) => {
      const inputRange = [
        (index - 1) * ITEM_WIDTH,
        index * ITEM_WIDTH,
        (index + 1) * ITEM_WIDTH,
      ];
      const rotateY = scrollX.interpolate({
        inputRange,
        outputRange: ["90deg", "0deg", "-90deg"],
        extrapolate: "clamp",
      });
      const translateX = scrollX.interpolate({
        inputRange,
        outputRange: [ITEM_WIDTH / 2, 0, -ITEM_WIDTH / 2],
        extrapolate: "clamp",
      });
      const translateX2 = scrollX.interpolate({
        inputRange,
        outputRange: [-ITEM_WIDTH / 2, 0, ITEM_WIDTH / 2],
        extrapolate: "clamp",
      });

      return (
        <Animated.View
          style={{
            transform: [{ translateX: translateX2 }],
          }}
        >
          <Animated.View
            style={{
              width: ITEM_WIDTH,
              height: ITEM_HEIGHT,
              transform: [
                { perspective: ITEM_WIDTH * 2 },
                { rotateY },
                { translateX },
              ],
            }}
          >
            <RenderStory
              active={currentUser === index}
              nextUser={nextUserHandler}
              previousUser={previousUserHandler}
              index={index}
            />
          </Animated.View>
        </Animated.View>
      );
    },
    [currentUser, scrollX]
  );

  return (
    <View style={styles.container}>
      <View
        style={{
          backgroundColor: GlobalStyles.colors.primary,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          overflow: "hidden",
          marginTop: StatusBar.currentHeight,
        }}
      >
        <StatusBar translucent={true} backgroundColor={"transparent"} />
        <Animated.FlatList
          ref={flatListRef}
          data={users}
          keyExtractor={(item, index) => index.toString()}
          horizontal
          pagingEnabled
          decelerationRate="fast"
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
            { useNativeDriver: true }
          )}
          onMomentumScrollEnd={(event) => {
            const index = Math.round(
              event.nativeEvent.contentOffset.x / ITEM_WIDTH
            );
            setCurrentUser(index);
          }}
          renderItem={renderItem}
        />
      </View>
    </View>
  );
};

export default ViewStoryScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
});
