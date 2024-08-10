import { StyleSheet, Text, View } from "react-native";
import React from "react";
import * as Progress from "react-native-progress";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";
function ProgressOverlay({ title, progress }) {
  return (
    <Animated.View
      entering={FadeIn}
      exiting={FadeOut}
      style={{
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(90, 90, 205,0.8)",
        position: "absolute",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {progress > 0 ? (
        <Progress.Circle
          borderWidth={0}
          color={"white"}
          strokeCap={"round"}
          progress={progress}
          thickness={10}
          size={50}
        />
      ) : (
        <Progress.Circle
          indeterminate
          borderWidth={10}
          color={"white"}
          strokeCap={"round"}
          size={50}
        />
      )}
      <Text style={{ color: "white", fontWeight: "bold", marginTop: 5 }}>
        {title}
      </Text>
    </Animated.View>
  );
}

export default ProgressOverlay;

const styles = StyleSheet.create({});
