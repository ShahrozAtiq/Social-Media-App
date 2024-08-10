import {
  ActivityIndicator,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useState, useEffect } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { GlobalStyles } from "../../constants/Styles";

const RemoteImage = ({ imageUri, style }) => {
  const [ratio, setRatio] = useState(1);

  useEffect(() => {
    if (imageUri) {
      Image.getSize(imageUri, (width, height) => {
        const ratio = width / height;
        if (ratio < 0.7) {
          setRatio(0.7);
        } else {
          setRatio(ratio);
        }
      });
    }
  }, [imageUri]);

  if (!imageUri) {
    return <ActivityIndicator />;
  }

  return (
    <ImageBackground
      source={{
        uri: imageUri,
      }}
      style={[styles.image, { aspectRatio: ratio }, style]}
      imageStyle={{
        borderRadius: 15,
      }}
    >
      <View
        style={{
          flex: 1,
          justifyContent: "flex-end",
          padding: 10,
        }}
      >
        <Text
          style={{
            color: "white",
            fontWeight: "bold",
            fontSize: 20,
          }}
        >
          Post Title
        </Text>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  image: {
    width: "100%",
  },
});

export default RemoteImage;
