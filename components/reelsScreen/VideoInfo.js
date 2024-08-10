import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";

const VideoInfo = ({ title, date, location }) => {
  return (
    <View>
      <Text
        style={{
          color: "white",
          fontSize: 26,
          fontWeight: "500",
        }}
      >
        {title}
      </Text>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Ionicons name="location" size={15} color={"white"} />
          <Text style={{ color: "white", paddingHorizontal: 5 }}>
            {location}
          </Text>
        </View>
        <Text style={{ color: "white", paddingHorizontal: 5 }}>{date}</Text>
      </View>
    </View>
  );
};

export default VideoInfo;

const styles = StyleSheet.create({});
