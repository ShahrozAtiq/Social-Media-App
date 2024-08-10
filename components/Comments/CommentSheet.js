import React, { useRef, useEffect, useState } from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import ActionSheet from "react-native-actions-sheet";
import { Ionicons } from "@expo/vector-icons";
import CommentCard from "./CommentCard";
import { GlobalStyles } from "../../constants/Styles";
import { FlatList } from "react-native-gesture-handler";
import InputField from "../InputField";
import EmojiInput from "../UI/EmojiInput";

function CommentSheet({ visible, setVisible }) {
  const [comment, setComment] = useState("");
  const actionSheetRef = useRef(null);
  useEffect(() => {
    if (visible) {
      actionSheetRef.current?.setModalVisible(true);
    } else {
      actionSheetRef.current?.setModalVisible(false);
    }
  }, [visible]);

  return (
    <View style={{ flex: 1 }}>
      <ActionSheet
        ref={actionSheetRef}
        containerStyle={{
          backgroundColor: GlobalStyles.colors.primary,
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
        }}
        indicatorStyle={{
          width: 50,
          marginVertical: 10,
          backgroundColor: "white",
        }}
        gestureEnabled={true}
        onClose={() => {
          setVisible();
        }}
      >
        <FlatList
          keyExtractor={(item, index) => index.toString()}
          data={[1, 2, 3, 4, 5, 6, 7, 7, 8, 9, 5]}
          renderItem={({ item, index }) => {
            return <CommentCard />;
          }}
        />
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            marginHorizontal: 10,
          }}
        >
          {/* <View style={{ flex: 1, marginVertical: 10 }}>
            <InputField
              onChangeText={setComment}
              value={comment}
              placeholder="Type Somthing"
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
          </View> */}
          <EmojiInput />
        </View>
      </ActionSheet>
    </View>
  );
}

export default CommentSheet;
