import { View } from "react-native";
import AnimatedRing from "./AnimatedRing";

const BackgroundSVG = () => {
  return (
    <View>
      {Array.from({ length: 5 }).map((_, index) => {
        return <AnimatedRing key={index} index={index} />;
      })}
    </View>
  );
};

export default BackgroundSVG;
