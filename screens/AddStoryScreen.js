import {
  Image,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useEffect, useRef, useState } from "react";
import CameraScreen from "./CameraScreen";
import { TextInput } from "react-native";
import { Keyboard } from "react-native";
import Button from "../components/Button";
import { GlobalStyles } from "../constants/Styles";

const AddStoryScreen = ({ navigation, route }) => {
  const [showCamera, setShowCamera] = useState(true);
  const [story, setStory] = useState("");
  const [caption, setCaption] = useState("");
  const [exit, setExit] = useState(false);
  const textInputRef = useRef();
  useEffect(() => {
    if (exit) {
      navigation.goBack();
    }
  }, [exit]);
  return (
    <View style={styles.container}>
      <CameraScreen
        mode="story"
        showCamera={showCamera}
        setShowCamera={setShowCamera}
        getPost={setStory}
        setExit={setExit}
      />
      {story && (
        <>
          <Image
            source={{ uri: story }}
            style={{
              width: "100%",
              height: "100%",
              position: "absolute",
              aspectRatio: 9 / 16,
            }}
          />
          <Pressable
            style={{
              flex: 1,
              justifyContent: "flex-end",
              alignItems: "center",
              paddingBottom: 100,
            }}
            onPress={() => {
              if (textInputRef.current.isFocused()) {
                Keyboard.dismiss();
              } else {
                textInputRef.current.focus();
              }
            }}
          >
            <TextInput
              ref={textInputRef}
              style={{
                width: "100%",
                color: "white",
                textAlign: "center",
                backgroundColor: "rgba(0,0,0,0.5)",
                padding: 10,
                fontSize: 18,
              }}
              placeholder="Add a caption"
              placeholderTextColor={GlobalStyles.colors.gray}
              autoCapitalize="none"
              onChangeText={setCaption}
              value={caption}
              multiline={true}
            />
          </Pressable>
        </>
      )}
      <View style={{ margin: 10 }}>
        <Button title={"Share"} />
      </View>
    </View>
  );
};

export default AddStoryScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: GlobalStyles.colors.primary,
  },
});
