import { Dimensions, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Path, Svg } from "react-native-svg";
import { GlobalStyles } from "../../../constants/Styles";

const StorySvg = ({ headerHeight, storyHeight }) => {
  const { width: WIDTH } = Dimensions.get("screen");
  const HEIGHT = headerHeight + storyHeight;

  const controlPointX = WIDTH / 2;
  const controlPointY = headerHeight * 2;

  const lineSpace = 15;
  const startLineY = headerHeight * 0.75;

  const maxLines = Math.floor((HEIGHT - startLineY) / lineSpace) - 1;

  const lines = [];

  let cumulativeHeight = startLineY;
  for (let i = 1; i < maxLines; i++) {
    const lineY = startLineY + i * lineSpace;
    const linePath = `
      M0,${lineY}
      Q${controlPointX},${controlPointY + lineSpace * i} ${WIDTH},${lineY}
    `;
    lines.push(linePath);

    cumulativeHeight += lineSpace;
    if (cumulativeHeight >= HEIGHT) {
      break;
    }
  }

  const path2Y = startLineY + maxLines * lineSpace;
  const path2 = `
    M0,0
    L0,${path2Y}
    Q${controlPointX},${HEIGHT + 60} ${WIDTH},${path2Y}
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
      <Path d={path2} fill={GlobalStyles.colors.primary200} />
      {/* Render the dynamically generated lines */}
      {lines.map((linePath, index) => (
        <Path
          key={index}
          d={linePath}
          stroke={GlobalStyles.colors.primary}
          strokeWidth={1}
          fill="none"
        />
      ))}
    </Svg>
  );
};

export default StorySvg;

const styles = StyleSheet.create({});
