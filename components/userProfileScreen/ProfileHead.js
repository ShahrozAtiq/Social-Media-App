import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  Pressable,
  ImageBackground,
} from "react-native";
import React from "react";

import { useNavigation } from "@react-navigation/native";
import { GlobalStyles, DEFAULT_DP } from "../../constants/Styles.js";
import PressEffect from "../UI/PressEffect.js";

const ProfileHead = ({ userData, viewMode }) => {
  const [profilePic, setProfilePic] = React.useState(
    !!userData.picturePath ? userData.picturePath : DEFAULT_DP
  );
  const navigation = useNavigation();

  function ProfileStat({ text, subText, onPress }) {
    return (
      <Pressable style={{ alignItems: "center" }} onPress={onPress}>
        <Text style={{ fontWeight: "400", fontSize: 25, color: "white" }}>
          {text}
        </Text>
        <Text style={{ fontSize: 12, color: "rgba(255,255,255,0.6)" }}>
          {subText}
        </Text>
      </Pressable>
    );
  }

  return (
    <View>
      <View
        style={{
          alignItems: "center",
          margin: 10,
        }}
      >
        <ImageBackground
          style={{
            width: 150,
            height: 150,

            marginHorizontal: 10,
          }}
          imageStyle={{
            borderRadius: 100,
          }}
          source={{ uri: profilePic }}
        >
          <View
            style={{
              position: "absolute",
              right: 0,
              bottom: 5,
            }}
          >
            <PressEffect
              style={{
                backgroundColor: GlobalStyles.colors.primary300,
                padding: 10,
                borderRadius: 50,
              }}
            >
              <Pressable
                onPress={() => {
                  if (!viewMode) navigation.navigate("EditProfileScreen");
                }}
              >
                <Image
                  source={
                    viewMode
                      ? require("../../assets/add-friend.png")
                      : require("../../assets/edit.png")
                  }
                  style={{ width: 25, height: 25, tintColor: "white" }}
                />
              </Pressable>
            </PressEffect>
          </View>
          {viewMode && (
            <View
              style={{
                position: "absolute",
                left: 0,
                top: 5,
                transform: [{ rotateY: "180deg" }],
              }}
            >
              <PressEffect>
                <Pressable
                  onPress={() => {
                    navigation.navigate("MessagesScreen");
                  }}
                >
                  <Image
                    source={require("../../assets/chat-focused.png")}
                    style={{ width: 30, height: 30, tintColor: "white" }}
                  />
                </Pressable>
              </PressEffect>
            </View>
          )}
        </ImageBackground>
        <Text
          style={{
            fontWeight: "bold",
            fontSize: 25,
            color: "white",
          }}
        >
          {userData.fullName}
        </Text>
        <Text
          style={{
            fontSize: 15,
            color: "rgba(255,255,255,0.6)",
          }}
        >
          @{userData.username}
        </Text>
      </View>

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
          alignItems: "center",
          marginBottom: 20,
          backgroundColor: GlobalStyles.colors.primary200,
          borderRadius: 20,
          marginHorizontal: 10,
          paddingVertical: 10,
        }}
      >
        <ProfileStat text={"255"} subText={"Posts"} />
        <ProfileStat text={"14.6k"} subText={"Followers"} />
        <ProfileStat text={"378"} subText={"Followings"} />
      </View>
    </View>
  );
};

export default ProfileHead;

const styles = StyleSheet.create({});
