import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { Path, Svg } from "react-native-svg";
import { GlobalStyles } from "../../constants/Styles";
import EMOJIS from "../../data/EMOJIS";
import { TextInput } from "react-native";

const LENGTH = 9;
const ITEM_SIZE = GlobalStyles.styles.windowWidth / LENGTH;
const TRANSLATE_VALUE = ITEM_SIZE * 0.15;
const MARIN_VER = 10;
const INPUT_HEIGHT = 14 + 20;

const WIDTH = GlobalStyles.styles.windowWidth;

const EmojiInput = ({ opacity = 1 }) => {
  const [text, setText] = useState("");
  const [HEIGHT, setHEIGHT] = useState(
    ITEM_SIZE + (TRANSLATE_VALUE * LENGTH) / 2 + MARIN_VER + INPUT_HEIGHT
  );
  const path = `
    M0,${TRANSLATE_VALUE * 5}
    Q${WIDTH * 0.4},0 ${WIDTH / 2},${0}
    Q${WIDTH * 0.6},0 ${WIDTH},${TRANSLATE_VALUE * 5}
    V${HEIGHT}
    H0
  Z
    `;
  return (
    <View
      onLayout={(e) => {
        setHEIGHT(e.nativeEvent.layout.height + (TRANSLATE_VALUE * LENGTH) / 2);
      }}
    >
      <Svg
        style={{ position: "absolute", bottom: 0 }}
        width={WIDTH}
        height={HEIGHT}
        viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
      >
        <Path
          d={path}
          fill={GlobalStyles.colors.primary500}
          opacity={opacity}
          strokeWidth={1}
          stroke={GlobalStyles.colors.primary600}
        />
      </Svg>

      <View style={{ flexDirection: "row", marginVertical: MARIN_VER }}>
        {Array.from({ length: LENGTH }).map((_, index) => {
          const translateY = TRANSLATE_VALUE * (index % 5);
          return (
            <View
              key={index}
              style={{
                width: ITEM_SIZE,
                height: ITEM_SIZE,
                justifyContent: "center",
                alignItems: "center",
                transform: [
                  {
                    translateY:
                      index > 4
                        ? TRANSLATE_VALUE * ((index % 5) - 3)
                        : -translateY,
                  },
                ],
              }}
            >
              <Text key={index} style={{ fontSize: ITEM_SIZE / 1.5 }}>
                {EMOJIS[index]}
              </Text>
            </View>
          );
        })}
      </View>
      <TextInput
        style={{
          color: "white",
          marginHorizontal: 40,
          marginVertical: 20,
          marginTop: 0,
          fontSize: 14,
          padding: 0,
        }}
        placeholderTextColor="#bdbdbd"
        autoCapitalize="none"
        placeholder={"Send Message"}
        onChangeText={setText}
        value={text}
      />
    </View>
  );
};

export default EmojiInput;

const styles = StyleSheet.create({});
