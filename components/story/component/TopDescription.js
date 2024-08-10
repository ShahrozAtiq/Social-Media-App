import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import { wpx } from "../helpers/Scale";
import { USERS } from "../../../data/users";

const TopDescription = () => {
  return (
    <View style={styles.rowCenter}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <View>
          <Image
            style={{
              width: 50,
              height: 50,
              resizeMode: "cover",
              borderRadius: 15,
            }}
            source={{ uri: USERS[0].image }}
          />
        </View>
        <Text
          numberOfLines={1}
          style={{ color: "white", fontWeight: "bold", marginStart: 10 }}
        >
          username
        </Text>
      </View>

      <Text style={{ color: "white" }}>4 hrs Ago</Text>
    </View>
  );
};

export default TopDescription;

const styles = StyleSheet.create({
  rowCenter: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});
