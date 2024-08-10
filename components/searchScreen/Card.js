import * as React from "react";
import { View } from "react-native";
import Svg, { ClipPath, Defs, Image, Path } from "react-native-svg";

import CardHeader from "./CardHeader";
import CardFooter from "./CardFooter";
import dummyPost from "../../data/dummyPost";

const Card = ({ children, width, height, radius }) => {
  const adjustedRadius = Math.min(radius, width / 2, height / 2);

  const path = `
    M${adjustedRadius},0
    H${width - adjustedRadius}
    C${width - adjustedRadius},0 ${width},0 ${width},${adjustedRadius}
    L${width * 0.9},${height - adjustedRadius}
    C${width * 0.9},${height - adjustedRadius} ${width * 0.9},${height} ${
    width * 0.9 - adjustedRadius
  },${height}
    H${adjustedRadius + width * 0.1}
    C${adjustedRadius + width * 0.1},${height} ${width * 0.1},${height} ${
    width * 0.1
  },${height - adjustedRadius}
    L0,${adjustedRadius}
    C0,${adjustedRadius} 0,0 ${adjustedRadius},0
    Z
  `;

  return (
    <View style={{ width: width, height: height }}>
      <Svg
        style={{ position: "absolute" }}
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
      >
        <Defs>
          <ClipPath id="clip">
            <Path d={path} strokeWidth={5} />
          </ClipPath>
        </Defs>
        <Image
          x="0"
          y="0"
          width="100%"
          height="100%"
          preserveAspectRatio="xMidYMid slice"
          href={dummyPost.image}
          clipPath="url(#clip)"
        />
      </Svg>
      <CardHeader radius={radius} />
      <View style={{ flex: 1, justifyContent: "flex-end" }}>
        <CardFooter radius={radius} width={width} />
      </View>
    </View>
  );
};

export default Card;
