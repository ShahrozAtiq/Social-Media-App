import {
  Dimensions,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React from "react";
import { POSTS } from "../../data/posts";
import { USERS } from "../../data/users";
import { useNavigation } from "@react-navigation/native";
const { height, width } = Dimensions.get("window");
const size = width / 4 - 10;
const CollectionCard = () => {
  const navigation = useNavigation();
  return (
    <Pressable
      onPress={() => {}}
      android_ripple={{ color: "rgba(255, 255, 255,0.5)", foreground: true }}
      style={styles.container}
    >
      <View style={styles.row}>
        <Image
          source={{ uri: POSTS[0].imageUrl }}
          style={styles.image}
          resizeMode="cover"
        />
        <Image
          source={{ uri: USERS[1].image }}
          style={styles.image}
          resizeMode="cover"
        />
      </View>
      <View style={styles.row}>
        <Image
          source={{ uri: POSTS[0].imageUrl }}
          style={styles.image}
          resizeMode="cover"
        />
        <Image
          source={{ uri: USERS[1].story }}
          style={styles.image}
          resizeMode="cover"
        />
      </View>
      <View style={{ position: "absolute" }}>
        <Text
          style={{
            color: "white",
            textAlign: "center",
            fontWeight: "bold",
            fontSize: 18,
          }}
        >
          Collection Title
        </Text>
      </View>
    </Pressable>
  );
};

export default CollectionCard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    overflow: "hidden",
    margin: 5,
    backgroundColor: "black",
  },
  row: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: size,
    height: size,
    // margin: 5,
    opacity: 0.5,
  },
});
