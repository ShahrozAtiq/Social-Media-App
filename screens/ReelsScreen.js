import {
  View,
  StyleSheet,
  FlatList,
  FlatListProps,
  StatusBar,
} from "react-native";

import { useCallback, useEffect, useRef, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import VideoPost from "../components/reelsScreen/VideoPost";
import { GlobalStyles } from "../constants/Styles";
import { Animated } from "react-native";

const dummyPosts = [
  {
    id: "2",
    video:
      "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/vertical-videos/2.mp4",
    title: "My New Year View",
    date: "1 Jan, 2022",
    location: "New York, USA",
  },
  {
    id: "1",
    video:
      "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/vertical-videos/1.mp4",
    title: "Some Workout",
    date: "31 Dec, 2024",
    location: "Omsk, Russia",
  },
  {
    id: "3",
    video:
      "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/vertical-videos/3.mp4",
    title: "Some Workout",
    date: "31 Dec, 2024",
    location: "Omsk, Russia",
  },
  {
    id: "2",
    video:
      "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/vertical-videos/2.mp4",
    title: "My New Year View",
    date: "1 Jan, 2022",
    location: "New York, USA",
  },
  {
    id: "1",
    video:
      "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/vertical-videos/1.mp4",
    title: "Some Workout",
    date: "31 Dec, 2024",
    location: "Omsk, Russia",
  },
  {
    id: "3",
    video:
      "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/vertical-videos/3.mp4",
    title: "Some Workout",
    date: "31 Dec, 2024",
    location: "Omsk, Russia",
  },
  {
    id: "2",
    video:
      "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/vertical-videos/2.mp4",
    title: "My New Year View",
    date: "1 Jan, 2022",
    location: "New York, USA",
  },
  {
    id: "1",
    video:
      "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/vertical-videos/1.mp4",
    title: "Some Workout",
    date: "31 Dec, 2024",
    location: "Omsk, Russia",
  },
  {
    id: "3",
    video:
      "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/vertical-videos/3.mp4",
    title: "Some Workout",
    date: "31 Dec, 2024",
    location: "Omsk, Russia",
  },
  // {
  //   id: "3",
  //   video:
  //     "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/vertical-videos/3.mp4",
  //   // video: require("./storage/videos/video3.mp4"),

  //   caption: "Hola",
  // },
  // {
  //   id: "4",
  //   video:
  //     "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/vertical-videos/4.mp4",
  //   // video: require("./storage/videos/video4.mp4"),

  //   caption: "Piano practice",
  // },
  // {
  //   id: "5",
  //   video:
  //     "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/vertical-videos/5.mp4",
  //   // video: require("./storage/videos/video1.mp4"),

  //   caption: "Hello World!",
  // },
];

const ITEM_SIZE =
  GlobalStyles.styles.windowHeight - GlobalStyles.styles.tabBarPadding + 25;

const ReelsScreen = () => {
  const [activePostId, setActivePostId] = useState(dummyPosts[0].id);
  const [posts, setPosts] = useState([]);
  const ScrollY = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const fetchPosts = async () => {
      // fetch posts from the server
      setPosts(dummyPosts);
    };

    fetchPosts();
  }, []);

  const viewabilityConfigCallbackPairs = useRef([
    {
      viewabilityConfig: { itemVisiblePercentThreshold: 50 },
      onViewableItemsChanged: ({ changed, viewableItems }) => {
        if (viewableItems.length > 0 && viewableItems[0].isViewable) {
          setActivePostId(viewableItems[0].item.id);
        }
      },
    },
  ]);

  const onEndReached = () => {
    // fetch more posts from database
    // setPosts((currentPosts) => [...currentPosts, ...dummyPosts]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={"black"} />

      <Animated.FlatList
        data={posts}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: ScrollY } } }],
          { useNativeDriver: true }
        )}
        renderItem={({ item, index }) => {
          const inputRange = [
            (index - 1) * ITEM_SIZE,
            index * ITEM_SIZE,
            (index + 1) * ITEM_SIZE,
          ];
          const scale = ScrollY.interpolate({
            inputRange,
            outputRange: [1, 1, 0.7],
          });
          const translateY = ScrollY.interpolate({
            inputRange,
            outputRange: [0, 0, ITEM_SIZE / 2],
          });
          return (
            <Animated.View
              style={{
                transform: [{ scale }, { translateY }],
              }}
            >
              <VideoPost
                post={item}
                activePostId={activePostId}
                index={index}
              />
            </Animated.View>
          );
        }}
        keyExtractor={(item, index) => `${item.id}-${index}`}
        pagingEnabled
        viewabilityConfigCallbackPairs={viewabilityConfigCallbackPairs.current}
        showsVerticalScrollIndicator={false}
        onEndReached={onEndReached}
        onEndReachedThreshold={3}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    paddingBottom: GlobalStyles.styles.tabBarPadding - 25,
  },
});

export default ReelsScreen;
