import { Dimensions, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Path, Svg } from "react-native-svg";
import { GlobalStyles } from "../../constants/Styles";
const TabBarSvg = ({ height }) => {
  const { width: WIDTH } = Dimensions.get("screen");
  const HEIGHT = height;
  const SPACE = 10;
  const MIDPOIN1X = WIDTH / 2 - 50 / 2 - SPACE;
  const MIDPOIN2X = WIDTH / 2 + 50 / 2 + SPACE;
  const MIDPOINY = 50 / 2 + SPACE;

  const radius = 10;

  const path = `
    M0,0
    L${MIDPOIN1X - radius},${0}
    A${radius},${radius} 0 0,1 ${MIDPOIN1X},${radius}
    A${MIDPOINY},${MIDPOINY} 0 0,0 ${WIDTH / 2},${MIDPOINY}
    A${MIDPOINY},${MIDPOINY} 0 0,0 ${MIDPOIN2X},${radius}
    A${radius},${radius} 0 0,1 ${MIDPOIN2X + radius},${0}
    L${MIDPOIN2X},${0}
    L${WIDTH},${0}
    L${WIDTH},${height}
    L${0},${height}
    L${0},${0}
    Z
  `;

  return (
    <Svg
      style={{ position: "absolute", bottom: 0 }}
      width={WIDTH}
      height={HEIGHT}
      viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
    >
      <Path d={path} fill={GlobalStyles.colors.primary300} />
    </Svg>
  );
};

export default TabBarSvg;

const styles = StyleSheet.create({});
