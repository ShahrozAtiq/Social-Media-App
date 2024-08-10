import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  ActivityIndicator,
  Pressable,
  Image,
} from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { GlobalStyles } from "../../constants/Styles.js";
import { FlatList } from "react-native-gesture-handler";
import CollectionCard from "./CollectionCard.js";

import React, { useState, useEffect, useContext } from "react";
import Post from "../../components/userProfileScreen/Post";
import { AuthContext } from "../../store/auth-context";
import { Ionicons } from "@expo/vector-icons";
import { POSTS } from "../../data/posts.js";

const TopTab = createMaterialTopTabNavigator();

function Posts({ navigation, route, refreshing }) {
  const authCtx = useContext(AuthContext);
  const [fetching, setFetching] = useState(true);
  const [errorFetching, setErrorFetching] = useState(false);
  const [posts, setPosts] = useState([]);
  const getPosts = async () => {
    try {
      setFetching(true);

      setErrorFetching(false);
      setPosts(POSTS);
    } catch (error) {
      setErrorFetching(true);
      console.log(error);
    }
    setFetching(false);
  };
  useEffect(() => {
    getPosts();
  }, []);
  useEffect(() => {
    if (refreshing) {
      console.log("refreshing");
      getPosts();
    }
  }, [refreshing]);
  return (
    <View style={{ flex: 1, backgroundColor: GlobalStyles.colors.primary }}>
      {fetching ? (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <ActivityIndicator size={50} color={GlobalStyles.colors.purple} />
        </View>
      ) : errorFetching ? (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Pressable onPress={getPosts}>
            <Ionicons
              name="reload-circle"
              color={GlobalStyles.colors.purple}
              size={50}
            />
            <Text
              style={{ color: GlobalStyles.colors.purple, fontWeight: "bold" }}
            >
              Reload
            </Text>
          </Pressable>
        </View>
      ) : posts.length > 0 ? (
        <ScrollView showsVerticalScrollIndicator={false}>
          <View
            style={{
              flexDirection: "row",
              margin: 5,
              marginBottom: GlobalStyles.styles.tabBarPadding,
            }}
          >
            <View style={{ flex: 1 }}>
              {posts.map((item, index) => (
                <View key={index}>
                  {index % 2 === 0 && <Post postData={posts[index]} />}
                </View>
              ))}
            </View>
            <View style={{ flex: 1 }}>
              {posts.map((item, index) => (
                <View key={index}>
                  {index % 2 !== 0 && <Post postData={posts[index]} />}
                </View>
              ))}
            </View>
          </View>
        </ScrollView>
      ) : (
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Image
            source={require("../../assets/no-photo.jpg")}
            style={{
              width: 300,
              height: 300,
              resizeMode: "contain",
            }}
          />
        </View>
      )}
    </View>
  );
}

function Videos() {
  return (
    <View style={{ backgroundColor: GlobalStyles.colors.primary }}>
      <FlatList
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          justifyContent: "center",
          alignItems: "center",
          paddingBottom: GlobalStyles.styles.tabBarPadding,
        }}
        keyExtractor={(data, index) => index.toString()}
        data={[1, 2, 3, 4, 5, 6]}
        numColumns={2}
        renderItem={({ data, index }) => {
          return (
            <View>
              <CollectionCard />
            </View>
          );
        }}
      />
    </View>
  );
}
const ProfileBody = ({ refreshing }) => {
  return (
    <TopTab.Navigator
      screenOptions={{
        tabBarActiveTintColor: "white",
        tabBarLabelStyle: {
          textTransform: "none",
          fontSize: 18,
          padding: 0,
          margin: 0,
        },
        tabBarInactiveTintColor: "rgba(255,255,255,0.3)",
        tabBarIndicatorStyle: {
          height: 3,
          width: "10%",
          left: "20%",
          borderRadius: 30,
          backgroundColor: GlobalStyles.colors.purple,
        },
        tabBarStyle: {
          padding: 0,
          margin: 0,
          justifyContent: "center",
          width: "100%",
          elevation: 0,
          backgroundColor: "transparent",
          borderBottomWidth: 1,
          borderBottomColor: "rgba(255,255,255,0.1)",
        },
        tabBarPressColor: "white",
      }}
    >
      <TopTab.Screen
        name="Posts"
        options={{
          title: "Images",
        }}
      >
        {({ navigation, route }) => (
          <Posts
            navigation={navigation}
            route={route}
            refreshing={refreshing}
          />
        )}
      </TopTab.Screen>
      <TopTab.Screen
        name="Videos"
        options={{
          title: "VIDS",
        }}
      >
        {({ navigation, route }) => (
          <Videos
            navigation={navigation}
            route={route}
            refreshing={refreshing}
          />
        )}
      </TopTab.Screen>
    </TopTab.Navigator>
  );
};

export default ProfileBody;

const styles = StyleSheet.create({});
