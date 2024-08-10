import {
  View,
  StyleSheet,
  Image,
  Pressable,
  Modal,
  FlatList,
  Text,
} from "react-native";
import React, { useRef, useState } from "react";
import { USERS } from "../../../data/users";
import { useNavigation } from "@react-navigation/native";
import { GlobalStyles } from "../../../constants/Styles";
import ImageStory from "../../story/ImageStory";
import { Ionicons } from "@expo/vector-icons";
// https://github.com/birdwingo/react-native-instagram-stories?tab=readme-ov-file

const data = {
  user_id: 1,
  user_image:
    "https://pbs.twimg.com/profile_images/1222140802475773952/61OmyINj.jpg",
  user_name: "Ajmal",
  stories: [
    {
      story_id: 1,
      story_image:
        "https://image.freepik.com/free-vector/universe-mobile-wallpaper-with-planets_79603-600.jpg",
    },
    {
      story_id: 2,
      story_image:
        "https://image.freepik.com/free-vector/mobile-wallpaper-with-fluid-shapes_79603-601.jpg",
    },
    {
      story_id: 3,
      story_image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTjORKvjcbMRGYPR3QIs3MofoWkD4wHzRd_eg&usqp=CAU",
    },
    {
      story_id: 4,
      story_image:
        "https://files.oyebesmartest.com/uploads/preview/vivo-u20-mobile-wallpaper-full-hd-(1)qm6qyz9v60.jpg",
    },
  ],
};

const Stories = ({ followingsData }) => {
  const storiesRef = useRef(null);
  const [showStory, setShowStory] = useState(false);

  const navigation = useNavigation();
  return (
    <View style={{ marginBottom: 13, flexDirection: "row" }}>
      <Pressable
        style={{
          justifyContent: "center",
          alignItems: "center",
          marginHorizontal: 10,
        }}
        onPress={() => {
          navigation.navigate("AddStoryScreen");
        }}
      >
        <View
          style={{
            padding: 3,
            borderRadius: 10,
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 20,
            flexDirection: "row",
          }}
          start={{ x: 1, y: 0 }}
          end={{ x: 0.5, y: 1 }}
        >
          <View
            style={{
              width: 60,
              height: 60,
              resizeMode: "cover",
              borderRadius: 25,
              backgroundColor: GlobalStyles.colors.gray100,
              borderWidth: 1,
              borderColor: GlobalStyles.colors.gray,
              borderStyle: "dashed",
            }}
          >
            <Image
              source={{ uri: !true ? USERS[0].image : undefined }}
              style={{
                flex: 1,
              }}
            />
          </View>
          <View
            style={{
              position: "absolute",
              bottom: -5,
              right: -5,
              borderRadius: 50,
            }}
          >
            <Ionicons
              name="add-circle"
              size={30}
              color={GlobalStyles.colors.yellow}
            />
          </View>
        </View>
        <Text
          style={{
            color: "white",
            fontSize: 12,
            marginTop: 5,
          }}
        >
          Your Story
        </Text>
      </Pressable>

      <FlatList
        keyExtractor={(data, index) => index.toString()}
        data={[1, 2, 3, 4, 5, 6, 7, 8]}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          paddingLeft: 10,
        }}
        renderItem={({ item, index }) => {
          return (
            <Pressable
              style={{
                justifyContent: "center",
                alignItems: "center",
                marginRight: 10,
              }}
              onPress={() => {
                setShowStory(true);
              }}
            >
              <Image
                source={{ uri: USERS[index % 2].image }}
                style={{
                  width: 60,
                  height: 60,
                  resizeMode: "cover",
                  borderRadius: 25,
                }}
              />

              <Text
                style={{
                  color: "white",
                  fontSize: 12,
                  marginTop: 5,
                }}
              >
                {USERS[index % 2].user.length < 8
                  ? USERS[index % 2].user
                  : `${USERS[index % 2].user.substring(0, 8).trim()}...`}
              </Text>
            </Pressable>
          );
        }}
      />

      {showStory && (
        <Modal
          animationType="slide"
          transparent={true}
          visible={showStory}
          statusBarTranslucent={true}
          onRequestClose={() => {
            setShowStory(!showStory);
          }}
        >
          <ImageStory setShowStory={setShowStory} stories={data?.stories} />
        </Modal>
      )}
    </View>
  );
};

export default Stories;

const styles = StyleSheet.create({
  story: {
    width: 70,
    height: 70,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: GlobalStyles.colors.cyan,
  },
});
