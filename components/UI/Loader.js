import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import React from "react";
import { GlobalStyles } from "../../constants/Styles";

const Loader = ({ size = "large", color = GlobalStyles.colors.purple }) => {
  return <ActivityIndicator size={size} color={color} />;
};

export default Loader;

const styles = StyleSheet.create({});
