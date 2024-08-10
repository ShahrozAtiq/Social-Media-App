import { useState } from "react";
import { Pressable, Text, View, Image as Image, TextInput } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import dummyPost from "../../data/dummyPost";

const CardFooter = ({ radius, width }) => {
  const [text, setText] = useState("");
  return (
    <View
      style={{
        flexDirection: "row",
        backgroundColor: "rgba(0,0,0,0.8)",
        borderRadius: 25,
        alignItems: "center",
        padding: 5,
        marginHorizontal: width * 0.1 + radius / 4,
        marginBottom: radius / 4,
      }}
    >
      <Image
        source={{ uri: dummyPost.sender }}
        style={{ width: 40, height: 50, borderRadius: 50 }}
      />
      <View style={{ flex: 1 }}>
        <TextInput
          placeholder="Add Comment..."
          placeholderTextColor={"rgba(255,255,255,0.5)"}
          onChangeText={(text) => setText(text)}
          value={text}
          selectionColor={"orange"}
          style={{
            color: "white",
            padding: 10,
          }}
        />
      </View>
      <Ionicons
        style={{ marginHorizontal: 10, transform: [{ rotate: "-20deg" }] }}
        name="send"
        size={25}
        color={"white"}
      />
    </View>
  );
};

export default CardFooter;
