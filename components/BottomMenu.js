import React, { useRef, useEffect } from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import ActionSheet from "react-native-actions-sheet";
import { Ionicons } from "@expo/vector-icons";
import { GlobalStyles } from "../constants/Styles";
function BottomMenu({ menu, visible, setVisible }) {
  const actionSheetRef = useRef(null);
  useEffect(() => {
    if (visible) {
      actionSheetRef.current?.setModalVisible(true);
    } else {
      actionSheetRef.current?.setModalVisible(false);
    }
  }, [visible]);

  return (
    <View>
      <ActionSheet
        ref={actionSheetRef}
        containerStyle={{
          backgroundColor: GlobalStyles.colors.blue,
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
        }}
        indicatorStyle={{
          width: 50,
          marginVertical: 10,
          backgroundColor: "white",
        }}
        gestureEnabled={true}
        onClose={() => {
          setVisible(false);
        }}
      >
        {menu.map((button, index) => (
          <View key={index}>
            <Pressable
              onPress={() => {
                setVisible(false);
                button.onPress();
              }}
              android_ripple={{ color: "rgba(255, 255, 255,0.5)" }}
              style={{
                flexDirection: "row",
                alignItems: "center",
                paddingHorizontal: 20,
                paddingVertical: 10,
              }}
            >
              <Ionicons name={button.icon} size={25} color={"white"} />
              <Text style={{ color: "white", fontSize: 20, marginLeft: 10 }}>
                {button.title}
              </Text>
            </Pressable>
            {index + 1 < menu.length && (
              <View
                style={{
                  borderBottomColor: "white",
                  borderBottomWidth: StyleSheet.hairlineWidth,
                }}
              />
            )}
          </View>
        ))}
        <View style={{ height: 50 }} />
      </ActionSheet>
    </View>
  );
}

export default BottomMenu;
