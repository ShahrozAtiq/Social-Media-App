import * as React from "react";
import { Pressable, Text, View, Image as Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import dummyPost from "../../data/dummyPost";
import { GlobalStyles } from "../../constants/Styles";
import PressEffect from "../UI/PressEffect";

const CardHeader = ({ radius }) => {
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        margin: radius / 2,
        marginTop: radius / 3,
      }}
    >
      <View style={{ flexDirection: "row" }}>
        <Image
          source={{ uri: dummyPost.profilepic }}
          style={{
            width: 50,
            height: 50,
            borderRadius: 50,
          }}
        />
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            marginLeft: 10,
          }}
        >
          <Text style={{ color: "white", fontWeight: "600" }}>
            {dummyPost.username}
          </Text>
          <Text style={{ color: "rgba(255,255,255,0.5)" }}>
            {dummyPost.time}
          </Text>
        </View>
      </View>
      <PressEffect>
        <Pressable
          style={{
            padding: 5,
            backgroundColor: "rgba(255,255,255,0.5)",
            borderRadius: 50,
          }}
        >
          <Ionicons name="heart" size={30} color={GlobalStyles.colors.purple} />
        </Pressable>
      </PressEffect>
    </View>
  );
};

export default CardHeader;
