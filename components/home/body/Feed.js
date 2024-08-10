import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { GlobalStyles } from "../../../constants/Styles";
import { FlatList } from "react-native";
import { RefreshControl } from "react-native";
import Post from "./Post";
import { POSTS } from "../../../data/posts";
import { CONTAINER_HEIGHT } from "../head/Stories";
import { useSharedValue } from "react-native-reanimated";
import PostAdvance from "./PostAdvance";

const Feed = ({ StoryTranslate }) => {
  const lastScrollY = useSharedValue(0);
  return (
    <View style={{ flex: 1, backgroundColor: GlobalStyles.colors.primary }}>
      <FlatList
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingTop: 10,
          paddingBottom: GlobalStyles.styles.tabBarPadding,
          gap: 20,
        }}
        onMomentumScrollBegin={(event) => {
          const scrollY = event.nativeEvent.contentOffset.y;
          if (scrollY > lastScrollY.value) StoryTranslate.value = true;
          else {
            StoryTranslate.value = false;
          }
        }}
        onMomentumScrollEnd={(event) => {
          scrollY = event.nativeEvent.contentOffset.y;
          // if (scrollY < lastScrollY.value) StoryTranslate.value = 0;
          lastScrollY.value = scrollY;
        }}
        refreshControl={
          <RefreshControl refreshing={false} onRefresh={() => {}} />
        }
        keyExtractor={(data, index) => index.toString()}
        data={[1, 2, 3, 4, 5, 6]}
        renderItem={({ data, index }) => {
          return (
            <View>
              <PostAdvance post={index % 2 === 0 ? POSTS[0] : POSTS[1]} />
            </View>
          );
        }}
      />
    </View>
  );
};

export default Feed;

const styles = StyleSheet.create({});
