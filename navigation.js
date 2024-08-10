import { View, Text, Pressable } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import TabBar from "./components/tabBar/TabBar";

import LoginScreen from "./screens/LoginScreen";
import SignupScreen from "./screens/SignupScreen";

import HomeScreen from "./screens/Homescreen";
import NewPostScreen from "./screens/NewPostScreen";
import SearchScreen from "./screens/SearchScreen";
import UserProfileScreen from "./screens/UsersProfileScreen";
import NotificationsScreen from "./screens/NotificationsScreen";
import AppContextProvider from "./store/app-context";
import AddStoryScreen from "./screens/AddStoryScreen";
import MessagesScreen from "./screens/MessagesScreen";
import ChatScreen from "./screens/ChatScreen";
import ReelsScreen from "./screens/ReelsScreen";
import EditProfileScreen from "./screens/EditProfileScreen";
import PressEffect from "./components/UI/PressEffect";
import { GlobalStyles } from "./constants/Styles";
import ExploreScreen from "./screens/ExploreScreen";
import ViewStoryScreen from "./screens/ViewStoryScreen";
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const screenOptions = ({ navigation, route }) => ({
  headerShown: false,
  headerTitleStyle: {
    fontWeight: "bold",
  },
  headerTitleAlign: "left",
  headerTitleStyle: { fontSize: 30, fontWeight: "bold" },
  headerTintColor: "white",
  headerShadowVisible: false,
  headerStyle: {
    backgroundColor: GlobalStyles.colors.primary,
    elevation: 0,
    borderWidth: 0,
  },

  headerLeft: () => (
    <PressEffect>
      <Pressable
        style={{ marginLeft: 20 }}
        onPress={() => {
          navigation.goBack();
        }}
      >
        <Ionicons name="arrow-back" size={25} color={"white"} />
      </Pressable>
    </PressEffect>
  ),
});

function HomeStack() {
  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <Stack.Navigator screenOptions={screenOptions}>
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="UserProfileScreen" component={UserProfileScreen} />
      </Stack.Navigator>
    </View>
  );
}
// function HomeTabStack() {
//   return (
//     <TopTab.Navigator
//       screenOptions={{
//         tabBarShowLabel: false,
//         tabBarStyle: { position: "absolute", width: 0, height: 0 },
//       }}
//     >
//       <TopTab.Screen name="HomeTabScreen" component={HomeStack} />
//       <TopTab.Screen name="MessagesScreen" component={MessagesScreen} />
//     </TopTab.Navigator>
//   );
// }

export const SignedInStack = () => {
  function BottomTabNavigator() {
    return (
      <Tab.Navigator
        tabBar={(props) => <TabBar {...props} />}
        screenOptions={{
          headerShown: false,
          tabBarShowLabel: false,
        }}
      >
        {/* <Tab.Screen name="HomeTabStack" component={HomeTabStack} /> */}
        <Tab.Screen name="HomeScreen" component={HomeScreen} />
        <Tab.Screen name="ExploreScreen" component={ExploreScreen} />
        <Tab.Screen name="ReelsScreen" component={ReelsScreen} />
        <Tab.Screen name="MessagesScreen" component={MessagesScreen} />
        {/* <Tab.Screen name="ReelsScreens" component={SearchScreen} /> */}
        {/* <Tab.Screen name="UserProfileScreen" component={UserProfileScreen} /> */}
      </Tab.Navigator>
    );
  }
  return (
    <AppContextProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={screenOptions}>
          <Stack.Screen
            name="BottomTabNavigator"
            component={BottomTabNavigator}
          />

          <Stack.Screen name="NewPostScreen" component={NewPostScreen} />
          <Stack.Screen name="AddStoryScreen" component={AddStoryScreen} />
          <Stack.Screen name="ChatScreen" component={ChatScreen} />

          <Stack.Screen
            name="EditProfileScreen"
            component={EditProfileScreen}
          />
          {/* <Stack.Screen name="CameraScreen" component={CameraScreen} /> */}
          <Stack.Screen
            name="NotificationsScreen"
            component={NotificationsScreen}
          />
          {/* <Stack.Screen name="UsersListScreen" component={UsersListScreen} /> */}
          <Stack.Screen
            name="UserProfileScreen"
            component={UserProfileScreen}
          />
          <Stack.Screen name="SearchScreen" component={SearchScreen} />

          <Stack.Screen name="MessagesScreen" component={MessagesScreen} />
          <Stack.Screen name="ViewStoryScreen" component={ViewStoryScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </AppContextProvider>
  );
};

export const SignedOutStack = () => (
  <NavigationContainer>
    <Stack.Navigator
      initialRouteName="LoginScreen"
      screenOptions={screenOptions}
    >
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen name="SignupScreen" component={SignupScreen} />
    </Stack.Navigator>
  </NavigationContainer>
);
