import { Pressable, StyleSheet, Image, View, Dimensions } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { GlobalStyles } from "../../constants/Styles";
import { useNavigation } from "@react-navigation/native";
import { AppContext } from "../../store/app-context";
import Loader from "../UI/Loader";

const NewPostIcon = ({ exploreActive, pressed, setPressed }) => {
  const appCtx = useContext(AppContext);
  const exiting = (values) => {
    "worklet";
    const animations = {
      transform: [{ scale: withTiming(0) }],
    };
    const initialValues = {
      transform: [{ scale: 1 }],
    };
    return {
      initialValues,
      animations,
    };
  };

  const navigation = useNavigation();

  const scale = useSharedValue(0);
  const scaleAnimation = useAnimatedStyle(() => ({
    transform: [{ scale: withSpring(scale.value) }],
  }));

  useEffect(() => {
    scale.value = withSpring(pressed ? 1 : 0, { duration: 100 });
    rotation.value = withSpring(pressed ? 135 : 0);
  }),
    [pressed];

  const rotation = useSharedValue(0);
  const rotationAnimation = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotation.value}deg` }],
  }));
  return (
    <Pressable
      style={{
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {pressed && (
        <Animated.View
          exiting={exiting}
          style={[
            {
              position: "absolute",
              height: 150,
              width: 150,
              flexDirection: "row",
              justifyContent: "space-around",
            },
            scaleAnimation,
          ]}
        >
          <View
            onTouchEnd={() => {
              setPressed(false);
              navigation.navigate("NewPostScreen");
            }}
            style={{
              padding: 10,
              borderRadius: 50,
              overflow: "hidden",
              alignSelf: "baseline",
              borderWidth: 1,
              borderColor: GlobalStyles.colors.gray100,
              backgroundColor: "rgba(0,0,0,0.5)",
            }}
          >
            <Image
              source={require("../../assets/photo.png")}
              style={{
                width: 30,
                height: 30,
                tintColor: "white",
              }}
            />
          </View>
          <View
            onTouchEnd={() => {
              setPressed(false);
              navigation.navigate("NewPostScreen", { type: "video" });
            }}
            style={{
              padding: 10,
              borderRadius: 50,
              overflow: "hidden",
              alignSelf: "baseline",
              borderWidth: 1,
              borderColor: GlobalStyles.colors.gray100,
              backgroundColor: "rgba(0,0,0,0.5)",
            }}
          >
            <Image
              source={require("../../assets/reels-focused.png")}
              style={{
                width: 30,
                height: 30,
                tintColor: "white",
              }}
            />
          </View>
        </Animated.View>
      )}
      <Pressable
        onPress={() => {
          if (exploreActive) {
            if (!appCtx.fetchingUsers) {
              appCtx.setFetchingUsers(true);
            }
          } else {
            setPressed(!pressed);
          }
        }}
        style={{
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <LinearGradient
          colors={[GlobalStyles.colors.blue, GlobalStyles.colors.cyan]}
          start={{ x: 0, y: 1 }}
          end={{ x: 1, y: 0 }}
          style={{
            width: 50,
            height: 50,
            borderRadius: 50,
            position: "absolute",
          }}
        />
        {exploreActive ? (
          <View>
            {appCtx.fetchingUsers ? (
              <Loader color="white" />
            ) : (
              <Animated.Image
                resizeMode="contain"
                style={[
                  {
                    width: 30,
                    height: 30,
                    tintColor: "white",
                  },
                ]}
                source={require("../../assets/shuffle.png")}
              />
            )}
          </View>
        ) : (
          <Animated.Image
            resizeMode="contain"
            style={[
              {
                width: 20,
                height: 20,
                tintColor: "white",
              },
              rotationAnimation,
            ]}
            source={require("../../assets/add.png")}
          />
        )}
      </Pressable>
    </Pressable>
  );
};

export default NewPostIcon;

const styles = StyleSheet.create({});
