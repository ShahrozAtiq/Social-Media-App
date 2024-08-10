/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef } from "react";
import {
  Animated,
  Text,
  StyleSheet,
  Dimensions,
  TouchableWithoutFeedback,
  View,
  Pressable,
} from "react-native";
import { usePrevious } from "./helpers/StateHelpers";
import { isNullOrWhitespace } from "./helpers/ValidationHelpers";
import ImageZoom from "./helpers/ImageZoom";
import { useSwipe } from "./helpers/useSwipe";
import { hpx, wpx } from "./helpers/Scale";
import TopDescription from "./component/TopDescription";
import Footer from "./component/Footer";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import InputField from "../InputField";
import { Ionicons } from "@expo/vector-icons";
import { GlobalStyles } from "../../constants/Styles";
import ReAnimated, {
  FadeIn,
  FadeInDown,
  FadeInUp,
  FadeOut,
  FadeOutDown,
  FadeOutUp,
} from "react-native-reanimated";
// https://github.com/Ajmal0197/Whatsapp-Status-React-Native/tree/master
const { width, height } = Dimensions.get("window");

export const StoryListItem = ({ stories, setShowStory }) => {
  // const { stories } = props;

  const longPressed = useRef(false);
  const [load, setLoad] = useState(true);
  const [showSwipUp, setShowSwipUp] = useState(false);
  const [content, setContent] = useState(
    stories.map((x) => {
      return {
        image: x.story_image,
        finish: 0,
      };
    })
  );
  const [current, setCurrent] = useState(0);
  const [reply, setReply] = useState("");
  const progress = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(1)).current;

  const prevCurrent = usePrevious(current);

  useEffect(() => {
    if (!isNullOrWhitespace(prevCurrent)) {
      if (
        current > prevCurrent &&
        content[current - 1].image == content[current].image
      ) {
        start();
      } else if (
        current < prevCurrent &&
        content[current + 1].image == content[current].image
      ) {
        start();
      }
    }
  }, [current]);

  function start() {
    setLoad(false);
    progress.setValue(0);
    startAnimation();
  }

  function startAnimation() {
    Animated.timing(progress, {
      toValue: 1,
      duration: 5000,
      useNativeDriver: false,
    }).start(({ finished }) => {
      if (finished) {
        next();
      }
    });
  }

  function next() {
    // check if the next content is not empty
    setLoad(true);
    if (current !== content.length - 1) {
      let data = [...content];
      data[current].finish = 1;
      setContent(data);
      setCurrent(current + 1);
      progress.setValue(0);
    } else {
      onSwipeDown();
    }
  }

  function previous() {
    // checking if the previous content is not empty
    setLoad(true);
    if (current - 1 >= 0) {
      let data = [...content];
      data[current].finish = 0;
      setContent(data);
      setCurrent(current - 1);
      progress.setValue(0);
    }
  }

  const { onTouchStart, onTouchEnd } = useSwipe(
    onSwipeLeft,
    onSwipeRight,
    onSwipeUp,
    onSwipeDown,
    6
  );

  function onSwipeLeft() {
    console.log("next");
    next();
  }

  function onSwipeRight() {
    previous();
  }
  function onSwipeUp() {
    onInteractionStart();
    setShowSwipUp(true);
  }
  function onSwipeDown() {
    setShowStory(false);
  }

  const onInteractionStart = () => {
    progress.stopAnimation(() =>
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 100,
        useNativeDriver: true,
      }).start()
    );
  };

  const onInteractionEnd = () => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 100,
      useNativeDriver: true,
    }).start(() => {
      startAnimation();
    });
  };

  const onTouchStartF = (e) => {
    if (!showSwipUp) {
      console.log("sda");
      onTouchStart(e);
    }
  };
  const onTouchEndF = (e) => {
    if (!showSwipUp) {
      onTouchEnd(e);
    }
  };

  return (
    <View
      onTouchStart={(e) => onTouchStartF(e)}
      onTouchEnd={(e) => onTouchEndF(e)}
      style={{
        flex: 1,
        backgroundColor: "black",
      }}
    >
      {/* TOP VIEW */}

      <TouchableWithoutFeedback
        onPressIn={() => progress.stopAnimation()}
        onPressOut={() => {
          if (longPressed.current) {
            onInteractionEnd();
            longPressed.current = false;
          } else {
            startAnimation();
          }
        }}
        onLongPress={() => {
          longPressed.current = true;
          onInteractionStart();
        }}
      >
        <ImageZoom
          uri={content[current].image}
          activityIndicatorProps={{
            color: "white",
            style: styles.loader,
          }}
          // onLongPressActiveInteration={onInteractionStart}
          // onLongPressEndInteration={onInteractionEnd}
          minScale={0.5}
          onLoadEnd={() => start()}
          resizeMode={true ? "cover" : "center"}
        />
      </TouchableWithoutFeedback>
      <LinearGradient
        style={{ height: 100, width: "100%", position: "absolute", top: 0 }}
        colors={["rgba(0,0,0,0.5)", "transparent"]}
      />
      <LinearGradient
        style={{ height: 100, width: "100%", position: "absolute", bottom: 0 }}
        colors={["transparent", "rgba(0,0,0,0.5)"]}
      />
      <Animated.View
        style={{
          ...styles.headerConatiner,
          opacity: fadeAnim, // Bind opacity to animated value
        }}
      >
        <SafeAreaView style={styles.animationBarContainer}>
          {content.map((index, key) => {
            return (
              <View key={key} style={styles.animationBackground}>
                <Animated.View
                  style={{
                    flex: current == key ? progress : content[key].finish,
                    height: 5,
                    borderRadius: 50,
                    backgroundColor: "white",
                  }}
                />
              </View>
            );
          })}
        </SafeAreaView>
        <TopDescription
          currentViewIndex={`${current + 1} / ${stories.length}`}
        />
      </Animated.View>
      <Animated.View
        style={{
          position: "absolute",
          bottom: 0,
          // zIndex: 1,
          width,
          paddingBottom: 30,
          opacity: fadeAnim,
        }}
      >
        <Footer onPress={onSwipeUp} />
      </Animated.View>
      {showSwipUp && (
        <View
          style={{
            width: "100%",
            height: "100%",
            position: "absolute",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <ReAnimated.View
            entering={FadeIn}
            exiting={FadeOut}
            onTouchEnd={() => {
              onInteractionEnd();
              setShowSwipUp(false);
            }}
            style={{
              width: "100%",
              height: "100%",
              backgroundColor: "rgba(0,0,0,0.7)",
              position: "absolute",
            }}
          />
          <ReAnimated.View
            entering={FadeInDown}
            exiting={FadeOutDown}
            style={{
              flexDirection: "row",
              paddingHorizontal: 10,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <View style={{ flex: 1 }}>
              <InputField
                value={reply}
                onChangeText={setReply}
                placeholder="Share Your Thoughts"
                keyboardType="default"
                inValid={true}
                autoFocuse={true}
              />
            </View>

            <View
              style={{
                backgroundColor: GlobalStyles.colors.gray,
                padding: 10,
                borderRadius: 50,
                marginLeft: 10,
              }}
            >
              <Ionicons
                name="send"
                color={GlobalStyles.colors.blue}
                size={30}
              />
            </View>
          </ReAnimated.View>
        </View>
      )}
    </View>
  );
};

export default StoryListItem;

const styles = StyleSheet.create({
  headerConatiner: {
    height: hpx(143, 763),
    position: "absolute",
    width,
    paddingTop: 20,
    paddingHorizontal: wpx(16),
  },
  spinnerContainer: {
    zIndex: -100,
    position: "absolute",
    justifyContent: "center",
    backgroundColor: "black",
    alignSelf: "center",
    width: width,
    height: height,
  },
  animationBarContainer: {
    flexDirection: "row",
    borderRadius: 10,
    marginVertical: 20,
  },
  animationBackground: {
    height: 5,
    flex: 1,
    flexDirection: "row",
    backgroundColor: "gray",
    marginHorizontal: 2,
    borderRadius: 50,
  },
  pressContainer: {
    flex: 1,
    flexDirection: "row",
  },
  rowCenter: { flexDirection: "row", alignItems: "center" },
});
