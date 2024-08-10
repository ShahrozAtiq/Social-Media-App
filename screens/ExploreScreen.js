import { StyleSheet, Text, View } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { GlobalStyles } from "../constants/Styles";
import { StatusBar } from "react-native";
import Avatar from "../components/exploreScreen/Avatar";
import { AppContext } from "../store/app-context";
import BackgroundSVG from "../components/exploreScreen/BackgroundSVG";
import { getRandomUser } from "../utils/helperFunctions";

const ITEM_SIZE = 70;
const MIN_DISTANCE = ITEM_SIZE + 20;

const ExploreScreen = ({ navigation }) => {
  const appCtx = useContext(AppContext);
  const [usersData, setUsersData] = useState([]);
  const [positions, setPositions] = useState([]);

  function getUsers(size) {
    getRandomUser(size).then((users) => {
      getPositions(size);
      setUsersData(users);
      appCtx.setFetchingUsers(false);
    });
  }
  function getPositions(size) {
    const newPositions = [];
    Array.from({ length: size }, (_, index) => index).forEach((_, index) => {
      const position = generateNonOverlappingPosition(newPositions);
      newPositions.push(position);
    });
    setPositions(newPositions);
  }
  useEffect(() => {
    if (appCtx.fetchingUsers) {
      getUsers(7);
    }
  }, [appCtx.fetchingUsers]);

  const offsetY = GlobalStyles.styles.windowHeight * 0.1;
  const offsetX = 20;

  const usableHeight =
    GlobalStyles.styles.windowHeight -
    appCtx.tabBarHeight -
    ITEM_SIZE -
    offsetY;
  const usableWidth = GlobalStyles.styles.windowWidth * 0.9 - ITEM_SIZE;

  const generateNonOverlappingPosition = (existingPositions) => {
    let position;
    let isOverlapping;
    do {
      isOverlapping = false;
      const translateY = offsetY + Math.random() * usableHeight;
      const translateX = offsetX + Math.random() * usableWidth;
      const avatarSize = ITEM_SIZE - Math.random() * 20;
      position = { translateX, translateY, avatarSize };

      if (
        translateY + ITEM_SIZE >= GlobalStyles.styles.windowHeight * 0.4 &&
        translateY <= GlobalStyles.styles.windowHeight * 0.6
      ) {
        if (
          translateX + ITEM_SIZE > GlobalStyles.styles.windowWidth * 0.2 &&
          translateX < GlobalStyles.styles.windowWidth * 0.8
        ) {
          if (Math.round(Math.random() * 10) % 2 === 0) {
            if (translateY < GlobalStyles.styles.windowHeight * 0.5) {
              position.translateY =
                GlobalStyles.styles.windowHeight * 0.4 - ITEM_SIZE;
            } else {
              position.translateY = GlobalStyles.styles.windowHeight * 0.6;
            }
          } else {
            if (translateX < GlobalStyles.styles.windowWidth * 0.5) {
              position.translateX =
                GlobalStyles.styles.windowWidth * 0.2 - ITEM_SIZE;
            } else {
              position.translateX = GlobalStyles.styles.windowWidth * 0.8;
            }
          }
        }
      }

      for (let i = 0; i < existingPositions.length; i++) {
        const existingPosition = existingPositions[i];
        const distance = Math.sqrt(
          Math.pow(position.translateX - existingPosition.translateX, 2) +
            Math.pow(position.translateY - existingPosition.translateY, 2)
        );
        if (distance < MIN_DISTANCE) {
          isOverlapping = true;
          break;
        }
      }
    } while (isOverlapping);
    return position;
  };

  const avatars = usersData.map((item, index) => {
    const position = positions[index];

    return (
      position && (
        <View
          key={index}
          style={{
            position: "absolute",
            transform: [
              { translateX: position.translateX },
              { translateY: position.translateY },
            ],
          }}
        >
          <Avatar
            imgUri={item.profilePic}
            displayName={item.name.split(" ")[0]}
            avatarSize={position.avatarSize}
            remainingSpace={usableHeight - position.translateY - ITEM_SIZE}
          />
        </View>
      )
    );
  });

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={"transparent"} translucent={true} />
      <BackgroundSVG />
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text
          style={{
            color: "white",
            fontSize: 24,
            fontWeight: "500",
            marginBottom: 20,
          }}
        >
          Nearby Friends
        </Text>
        <Text style={{ color: "rgba(255,255,255,0.5)", fontSize: 18 }}>
          Connect with new people.
        </Text>
        <Text style={{ color: "rgba(255,255,255,0.5)", fontSize: 18 }}>
          Expand your network!
        </Text>
      </View>
      <View
        style={{
          position: "absolute",
        }}
      >
        {usersData.length > 0 && avatars}
      </View>
    </View>
  );
};

export default ExploreScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: GlobalStyles.colors.primary,
  },
});
