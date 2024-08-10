import {
  Pressable,
  StatusBar,
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
} from "react-native";
import React, { memo, useState } from "react";
import { GlobalStyles } from "../../constants/Styles";
import EmojisList from "../searchScreen/EmojisList";
import { USERS } from "../../data/users";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import PressEffect from "../UI/PressEffect";
import ProgressBar from "./ProgressBar";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import EmojiInput from "../UI/EmojiInput";
const RenderStory = ({ active, nextUser, previousUser, index }) => {
  const navigation = useNavigation();
  const [currentStory, setCurrentStory] = useState(0);
  const noOfStories = USERS[0].stories.length;
  console.log("object", index);
  const nextStory = () => {
    if (currentStory < noOfStories - 1) {
      setCurrentStory(currentStory + 1);
    } else {
      nextUser();
    }
  };
  const previousStory = () => {
    if (currentStory - 1 >= 0) {
      setCurrentStory(currentStory - 1);
    } else {
      previousUser();
    }
  };

  const Header = ({ noOfStories }) => {
    return (
      <>
        <LinearGradient
          colors={["rgba(0,0,0,0.5)", "transparent"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
          style={{
            position: "absolute",
            top: 0,
            width: "100%",
            height: StatusBar.currentHeight + 80,
          }}
        />
        <View style={{ padding: 10 }}>
          <View style={{ flexDirection: "row", width: "100%" }}>
            {Array.from({ length: noOfStories }).map((_, index) => (
              <View key={index} style={{ flex: 1, marginHorizontal: 2 }}>
                <ProgressBar
                  onFinish={nextStory}
                  start={index === currentStory && active}
                  completed={index < currentStory}
                />
              </View>
            ))}
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              margin: 10,
              justifyContent: "space-between",
            }}
          >
            <PressEffect>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Image
                  source={{ uri: USERS[0].image }}
                  style={{ width: 40, height: 40, borderRadius: 50 }}
                />
                <View style={{ paddingLeft: 10 }}>
                  <Text style={{ color: "white" }}>{USERS[0].user}</Text>
                  <Text
                    style={{ color: GlobalStyles.colors.gray, fontSize: 10 }}
                  >
                    10 mins ago
                  </Text>
                </View>
              </View>
            </PressEffect>
            <PressEffect>
              <Pressable
                onPress={() => {
                  navigation.goBack();
                }}
                style={{
                  backgroundColor: GlobalStyles.colors.primary500,
                  padding: 5,
                  borderRadius: 15,
                  borderWidth: 1,
                  borderColor: GlobalStyles.colors.primary600,
                }}
              >
                <Ionicons name="close" size={25} color={"white"} />
              </Pressable>
            </PressEffect>
          </View>
        </View>
      </>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          overflow: "hidden",
        }}
      >
        <Image
          source={{
            uri: USERS[0].stories[currentStory],
          }}
          style={{
            flex: 1,
            resizeMode: "contain",
          }}
        />
        <Pressable
          onPress={previousStory}
          style={{
            position: "absolute",
            width: "50%",
            height: "100%",
            left: 0,
          }}
        />
        <Pressable
          onPress={nextStory}
          style={{
            position: "absolute",
            width: "50%",
            height: "100%",
            right: 0,
          }}
        />
      </View>
      <View
        style={{
          flex: 1,
          justifyContent: "space-between",
        }}
      >
        <Header noOfStories={noOfStories} />

        <EmojiInput opacity={0.6} />
      </View>
    </View>
  );
};

export default memo(RenderStory);

const styles = StyleSheet.create({});
