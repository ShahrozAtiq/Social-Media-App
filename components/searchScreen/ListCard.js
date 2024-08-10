import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
  Platform,
} from "react-native";
import React from "react";
import { DEFAULT_DP, GlobalStyles } from "../../constants/Styles";

const ListCard = ({ userData }) => {
  return (
    <Pressable
      style={({ pressed }) =>
        Platform.OS === "ios" && pressed && { opacity: 0.5 }
      }
      android_ripple={{
        color: "rgba(86, 86, 202,0.5)",
        foreground: true,
      }}
    >
      <View
        style={{
          backgroundColor: GlobalStyles.colors.primary300,
          flexDirection: "row",
          alignItems: "center",
          padding: 10,
        }}
      >
        <Image
          style={{
            width: 60,
            height: 60,
            resizeMode: "cover",
            borderRadius: 30,
          }}
          source={{
            uri: !!userData.picturePath ? userData.picturePath : DEFAULT_DP,
          }}
        />
        <View style={{ marginLeft: 10 }}>
          <Text style={{ fontWeight: "bold", color: "white" }}>
            {userData.username}
          </Text>
          <Text style={{ color: "rgba(255,255,255,0.6)" }}>
            {userData.fullName}
          </Text>
        </View>
      </View>
      <View
        style={{
          height: 1,
          width: "100%",
          backgroundColor: GlobalStyles.colors.primary,
        }}
      />
    </Pressable>
  );
};

export default ListCard;

const styles = StyleSheet.create({});
