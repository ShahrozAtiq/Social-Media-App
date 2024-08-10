import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { GlobalStyles } from "../../constants/Styles";
import { USERS } from "../../data/users";
function CommentCard() {
  return (
    <View style={styles.container}>
      <View style={{ flexDirection: "row" }}>
        <Image
          source={{ uri: USERS[1].image }}
          style={{
            width: 50,
            height: 50,
            resizeMode: "cover",
            borderRadius: 50,
          }}
        />
        <View
          style={{
            flex: 1,
            marginHorizontal: 20,
            justifyContent: "center",
          }}
        >
          <Text style={{ fontWeight: "bold", fontSize: 14, color: "white" }}>
            John Doe asdlaksm aslkdmsdksad as
            aaksjdlmakjndsmlasknjdlmlskcnmsalmcksacansldsakdalsdlnsdksadm;samdas;dm;
          </Text>
          <Text
            style={{
              fontSize: 10,
              color: "rgba(255,255,255,0.6)",
              alignSelf: "flex-end",
            }}
          >
            2 minutes Ago
          </Text>
        </View>
      </View>
    </View>
  );
}

export default CommentCard;

const styles = StyleSheet.create({
  container: {
    backgroundColor: GlobalStyles.colors.primary300,
    borderRadius: 20,
    marginHorizontal: 10,
    marginVertical: 5,
    padding: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
