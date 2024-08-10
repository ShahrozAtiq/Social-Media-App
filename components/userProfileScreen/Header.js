import React from "react";
import { View, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import SettingsIcon from "../AnimatedUi/SettingsIcon";
import { useNavigation } from "@react-navigation/native";
import PressEffect from "../UI/PressEffect";

const Header = ({ viewMode }) => {
  const navigation = useNavigation();
  return (
    <View>
      <SafeAreaView
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          marginHorizontal: 20,
          marginTop: 10,
        }}
      >
        <PressEffect>
          <Ionicons
            onPress={() => {
              navigation.goBack();
            }}
            name="arrow-back"
            size={25}
            color={"white"}
          />
        </PressEffect>
        <SettingsIcon onPress={() => {}} />
      </SafeAreaView>
    </View>
  );
};
export default Header;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
    paddingTop: 15,
  },

  headerText: {
    color: "#fff",
    fontWeight: "500",
    fontSize: 16,
  },
});
