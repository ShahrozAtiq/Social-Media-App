import { FlatList, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import ChatCard from "../components/messagesScreen/ChatCard";
import InputField from "../components/InputField";
import { Ionicons } from "@expo/vector-icons";
import { GlobalStyles } from "../constants/Styles";
const ChatScreen = ({ navigation, route }) => {
  const [message, setMessage] = useState("");
  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      title: "John Doe",
    });
  }, []);
  return (
    <View style={styles.container}>
      <FlatList
        data={[1, 22, 3, 74, 4, 5, 6, 8, 5, 5, 5, 8, 5, , 5]}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => {
          return (
            <View style={{}}>
              <ChatCard sender={index % 2 == 0} />
            </View>
          );
        }}
      />
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          padding: 10,
        }}
      >
        <View style={{ flex: 1 }}>
          <InputField
            onChangeText={setMessage}
            onBlur={() => {}}
            value={message}
            placeholder="Type something"
            keyboardType="default"
            inValid={true}
          />
        </View>
        <View
          style={{
            backgroundColor: "rgba(122, 64, 248,0.5)",

            padding: 10,
            borderRadius: 50,
            marginLeft: 10,
          }}
        >
          <Ionicons name="send" color={"white"} size={30} />
        </View>
      </View>
    </View>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: GlobalStyles.colors.primary },
});
