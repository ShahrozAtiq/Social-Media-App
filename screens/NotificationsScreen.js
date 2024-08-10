import { Pressable, StyleSheet, Text, View } from "react-native";
import { useEffect } from "react";
import NotificationCard from "../components/notificationScreen/NotificationCard";
import { Ionicons } from "@expo/vector-icons";
import SettingsIcon from "../components/AnimatedUi/SettingsIcon";
import { GlobalStyles } from "../constants/Styles";
import { StatusBar } from "expo-status-bar";
const NotificationsScreen = ({ navigation, route }) => {
  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      title: "Activity",
      headerRight: () => {
        return (
          <View style={{ marginRight: 20 }}>
            <SettingsIcon onPress={() => {}} />
          </View>
        );
      },
    });
  }, []);
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={GlobalStyles.colors.primary} />
      <NotificationCard mode="LIKE" />
      <NotificationCard mode="COMMENT" />
      <NotificationCard mode="FOLLOW" />
    </View>
  );
};

export default NotificationsScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: GlobalStyles.colors.primary },
});
