import { Dimensions, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Path, Svg } from "react-native-svg";
import { GlobalStyles } from "../../../constants/Styles";

const HeaderSvg = ({ headerHeight, storyHeight }) => {
  const { width: WIDTH } = Dimensions.get("screen");
  const HEIGHT = headerHeight + storyHeight;

  const controlPointX = WIDTH / 2;
  const controlPointY = headerHeight * 2;

  const path = `
    M0,0
    L0,${headerHeight * 0.75}
    Q${controlPointX},${controlPointY} ${WIDTH},${headerHeight * 0.75}
    L${WIDTH},0
    Z
  `;

  return (
    <Svg
      style={{ position: "absolute" }}
      width={WIDTH}
      height={HEIGHT * 2}
      viewBox={`0 0 ${WIDTH} ${HEIGHT * 2}`}
    >
      <Path d={path} fill={GlobalStyles.colors.primary300} />
    </Svg>
  );
};

export default HeaderSvg;

const styles = StyleSheet.create({});
