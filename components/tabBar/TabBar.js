import { Fragment, useContext, useEffect, useRef, useState } from "react";
import { View, Pressable, StyleSheet, Image } from "react-native";
import Animated, {
  FadeIn,
  FadeOut,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import { GlobalStyles } from "../../constants/Styles";
import TabBarSvg from "./TabBarSvg";
import NewPostIcon from "./NewPostIcon";
import { AppContext } from "../../store/app-context";

const TabBar = ({ state, descriptors, navigation }) => {
  const appCtx = useContext(AppContext);
  const screens = [
    {
      name: "Home",
      icon: require("../../assets/home-focused.png"),
      iconUnfocued: require("../../assets/home.png"),
    },
    {
      name: "Explore",
      icon: require("../../assets/explore-focused.png"),
      iconUnfocued: require("../../assets/explore.png"),
    },

    {
      name: "Reels",
      icon: require("../../assets/reels-focused.png"),
      iconUnfocued: require("../../assets/reels.png"),
    },
    {
      name: "Chat",
      icon: require("../../assets/chat-focused.png"),
      iconUnfocued: require("../../assets/chat.png"),
    },
  ];
  const [tabBarHeight, setTabBarHeight] = useState(50);
  const [actionBtnPressed, setActionBtnPressed] = useState(false);

  const activeTabScreen = state.routes[state.index].name;
  return (
    <Fragment>
      {actionBtnPressed && (
        <Animated.View
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
          }}
          entering={FadeIn}
          exiting={FadeOut}
        >
          <Pressable
            onPress={() => setActionBtnPressed(false)}
            style={{
              flex: 1,
              backgroundColor: GlobalStyles.colors.primary,
              opacity: 0.8,
            }}
          />
        </Animated.View>
      )}
      <View style={{ zIndex: 10 }}>
        <TabBarSvg height={tabBarHeight} />
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          paddingHorizontal: 20,
          paddingVertical: 5,
          backgroundColor: "transparent",
          position: "absolute",
          bottom: 0,
          zIndex: 20,
        }}
        onLayout={(e) => {
          setTabBarHeight(e.nativeEvent.layout.height);
          appCtx.setTabBarHeight(e.nativeEvent.layout.height + 50);
        }}
      >
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
              ? options.title
              : route.name;

          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: "tabPress",
              target: route.key,
            });
            if (actionBtnPressed) {
              setActionBtnPressed(false);
            }
            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };
          const animatedStyles = useAnimatedStyle(() => {
            return {
              transform: [
                { translateX: isFocused ? withTiming(-10) : withTiming(0) },
                { translateY: isFocused ? withTiming(-6) : withTiming(0) },
              ],
              tintColor: isFocused
                ? withTiming("white")
                : withTiming("rgba(255,255,255,0.2)"),
            };
          });
          const animatedColor = useAnimatedStyle(() => {
            return {
              opacity: isFocused ? withTiming(1) : withTiming(0),
            };
          });
          return (
            <Fragment key={index}>
              <View style={{ flex: 1 }}>
                <Pressable onPress={onPress}>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "center",
                      alignItems: "center",
                      flex: 1,
                      padding: 15,
                    }}
                  >
                    <Animated.Image
                      source={screens[index].icon}
                      resizeMode={"contain"}
                      style={[
                        {
                          width: 25,
                          height: 25,
                          position: "absolute",
                          tintColor: GlobalStyles.colors.primary,
                          overflow: "visible",
                        },
                        animatedColor,
                      ]}
                    />
                    <Animated.Image
                      source={screens[index].iconUnfocued}
                      style={[
                        {
                          width: 25,
                          height: 25,
                          tintColor: "white",
                          opacity: 1,
                        },
                        animatedStyles,
                      ]}
                    />
                  </View>
                </Pressable>
              </View>
              {index == 1 && (
                <View
                  style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <View
                    style={{
                      transform: [{ translateY: -(50 / 2 + 5) }],
                    }}
                  >
                    <NewPostIcon
                      exploreActive={activeTabScreen === "ExploreScreen"}
                      pressed={actionBtnPressed}
                      setPressed={setActionBtnPressed}
                    />
                  </View>
                </View>
              )}
            </Fragment>
          );
        })}
      </View>
    </Fragment>
  );
};

const styles = StyleSheet.create({});

export default TabBar;
