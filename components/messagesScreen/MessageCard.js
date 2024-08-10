import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { USERS } from "../../data/users";
import { Image } from "react-native";
import { GlobalStyles } from "../../constants/Styles";
import { useNavigation } from "@react-navigation/native";

const MessageCard = () => {
  const navigation = useNavigation();
  return (
    <Pressable
      style={{
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 20,
        paddingVertical: 10,
      }}
      onPress={() => {
        navigation.navigate("ChatScreen");
      }}
      android_ripple={{
        color: "rgba(122, 64, 248,0.1)",
        foreground: true,
      }}
    >
      <Image
        source={{ uri: USERS[0].image }}
        style={{ width: 70, height: 70, borderRadius: 50 }}
      />
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <View style={{ marginHorizontal: 10 }}>
          <Text style={{ fontSize: 18, fontWeight: "bold", color: "white" }}>
            John Doe
          </Text>
          <Text style={{ fontSize: 14, color: GlobalStyles.colors.gray }}>
            Say Hi to your friend
          </Text>
        </View>
        <View
          style={{
            justifyContent: "space-around",
          }}
        >
          <Text style={{ fontSize: 10, color: GlobalStyles.colors.gray }}>
            2 mins ago
          </Text>
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              width: 20,
              height: 20,
              borderRadius: 50,
              backgroundColor: GlobalStyles.colors.blue,
              alignSelf: "center",
            }}
          >
            <Text
              style={{
                fontSize: 12,
                fontWeight: "bold",
                color: "white",
              }}
            >
              {Math.round(Math.random() * 9)}
            </Text>
          </View>
        </View>
      </View>
    </Pressable>
  );
};

export default MessageCard;

const styles = StyleSheet.create({});
