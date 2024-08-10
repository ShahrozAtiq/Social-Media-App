import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { GlobalStyles } from "../../constants/Styles";
import PressEffect from "../UI/PressEffect";

function IconButton({ name, size = 20, color = "white" }) {
  return (
    <View
      style={{
        backgroundColor: GlobalStyles.colors.primary300,
        alignSelf: "center",
        padding: 10,
        borderRadius: 50,
      }}
    >
      <PressEffect>
        <Ionicons name={name} size={size} color={color} />
      </PressEffect>
    </View>
  );
}

const ActionButtons = () => {
  return (
    <View style={{ gap: 5, flexDirection: "row" }}>
      <IconButton name="heart-outline" />
      <IconButton
        onPress={() => setShowComment(true)}
        name="chatbubble-ellipses"
      />
      <IconButton name="add-circle" />
    </View>
  );
};

export default ActionButtons;

const styles = StyleSheet.create({});
