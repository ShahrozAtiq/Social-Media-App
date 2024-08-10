import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import { USERS } from "../../data/users";
import { GlobalStyles } from "../../constants/Styles";
import { Ionicons } from "@expo/vector-icons";
import Button from "../Button";
function NotificationCard({ mode = "LIKE" }) {
  return (
    <View style={styles.container}>
      <View style={{ flexDirection: "row", width: "70%" }}>
        <Image
          source={{ uri: USERS[1].image }}
          style={{
            width: 50,
            height: 50,
            resizeMode: "cover",
            borderRadius: 50,
          }}
        />
        <View style={{ marginHorizontal: 20, justifyContent: "space-between" }}>
          <View style={{ marginBottom: 10 }}>
            <Text style={{ fontWeight: "bold", fontSize: 18, color: "white" }}>
              John Doe
            </Text>
            <Text style={{ fontSize: 14, color: GlobalStyles.colors.purple }}>
              {mode === "LIKE" && "liked your photo"}
              {mode === "COMMENT" && "comments on your photo"}
              {mode === "FOLLOW" && "starts following you"}
            </Text>
          </View>

          <Text style={{ fontSize: 12, color: "gray" }}>2 minutes Ago</Text>
        </View>
      </View>
      {(mode === "LIKE" || mode === "COMMENT") && (
        <View style={{ width: "20%", height: 80 }}>
          <Image
            source={{ uri: USERS[1].story }}
            style={{
              flex: 1,
              resizeMode: "cover",
              borderRadius: 10,
            }}
          />
          <View
            style={{
              backgroundColor: "white",
              borderRadius: 50,
              padding: 3,
              position: "absolute",
              right: -5,
              top: -5,
            }}
          >
            <Ionicons
              name={mode === "LIKE" ? "heart" : "chatbubble-ellipses"}
              size={12}
              color={GlobalStyles.colors.blue}
            />
          </View>
        </View>
      )}
      {mode === "FOLLOW" && (
        <View style={{}}>
          <Button
            title={"Follow Back"}
            secondary={true}
            titleStyle={{ fontSize: 12, padding: 10 }}
          />
        </View>
      )}
    </View>
  );
}

export default NotificationCard;

const styles = StyleSheet.create({
  container: {
    backgroundColor: GlobalStyles.colors.primary500,
    borderRadius: 20,
    marginHorizontal: 10,
    marginVertical: 5,
    padding: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
