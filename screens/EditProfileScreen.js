import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import Button from "../components/Button";
import InputField from "../components/InputField";
import { DEFAULT_DP, GlobalStyles } from "../constants/Styles";
import { Image } from "react-native";
import { AuthContext } from "../store/auth-context";
import CameraScreen from "./CameraScreen";
import { getFilename } from "../utils/helperFunctions";
import ProgressOverlay from "../components/ProgressOverlay";
import ErrorOverlay from "../components/ErrorOverlay";
import PressEffect from "../components/UI/PressEffect";

const EditProfileScreen = ({ navigation, route }) => {
  const authCtx = useContext(AuthContext);
  const [profilePic, setProfilePic] = useState("");
  const [showCamera, setShowCamera] = useState(false);
  const [userData, setUserData] = useState({
    fullName: authCtx.userData.fullName,
    username: authCtx.userData.username,
    bio: authCtx.userData.bio,
    email: authCtx.userData.email,
    password: "",
    friends: "",
    picturePath: "",
    occupation: authCtx.userData.occupation,
  });
  const [uploading, setUploading] = useState({
    status: false,
    progress: 0,
    success: true,
  });

  async function updateBtnHandler() {
    const filenameData = getFilename(profilePic);

    const formData = new FormData();
    formData.append("_id", authCtx.userData._id);
    formData.append("username", userData.username);
    formData.append("fullName", userData.fullName);
    formData.append("email", userData.email);
    formData.append("occupation", userData.occupation);
    formData.append("bio", userData.bio);
    if (!!profilePic) {
      formData.append("picture", {
        uri: profilePic,
        type: "image/" + filenameData.fileType,
        name: filenameData.name,
      });
      formData.append("picturePath", filenameData.name);
    }
    try {
      setUploading((prevData) => {
        return { ...prevData, status: true };
      });
      setTimeout(() => {
        setUploading({ status: false, progress: 0, success: true });
        navigation.goBack();
      }, 3000);
    } catch (error) {
      setUploading((prevData) => {
        return { ...prevData, success: false };
      });
      console.log(error.message);
    }
  }
  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      title: "Edit Profile",
    });
  }, []);
  return (
    <View style={styles.container}>
      <CameraScreen
        showCamera={showCamera}
        setShowCamera={setShowCamera}
        getPost={setProfilePic}
        mode={"profilePic"}
      />
      <ScrollView
        contentContainerStyle={{
          marginHorizontal: 15,
        }}
      >
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <View>
            <PressEffect>
              <Pressable
                onPress={() => {
                  setShowCamera(true);
                }}
              >
                <Image
                  source={{
                    uri: !!profilePic ? profilePic : DEFAULT_DP,
                  }}
                  style={{
                    width: 100,
                    height: 100,
                    borderRadius: 50,
                    resizeMode: "cover",
                  }}
                />
                <View
                  style={{
                    position: "absolute",
                    bottom: 0,
                    right: 0,
                    padding: 5,
                    backgroundColor: GlobalStyles.colors.primary500,
                    borderRadius: 50,
                  }}
                >
                  <Image
                    source={require("../assets/edit.png")}
                    style={{
                      width: 20,
                      height: 20,
                      resizeMode: "cover",
                      tintColor: "white",
                    }}
                  />
                </View>
              </Pressable>
            </PressEffect>
          </View>
        </View>
        <Text style={styles.title}>Full Name</Text>
        <InputField
          placeholder="John Doe"
          keyboardType="default"
          onChangeText={(text) => {
            setUserData((prevData) => {
              return { ...prevData, fullName: text };
            });
          }}
          value={userData.fullName}
          inValid={true}
        />

        <Text style={styles.title}>Username</Text>
        <InputField
          placeholder="username"
          keyboardType="default"
          onChangeText={(text) => {
            setUserData((prevData) => {
              return { ...prevData, username: text };
            });
          }}
          value={userData.username}
          inValid={true}
        />

        <Text style={styles.title}>Email</Text>
        <InputField
          placeholder="email@email.com"
          keyboardType="default"
          onChangeText={(text) => {
            setUserData((prevData) => {
              return { ...prevData, email: text };
            });
          }}
          value={userData.email}
          inValid={true}
        />

        {/* <Text style={styles.title}>Password</Text>
        <InputField
          placeholder="********"
          keyboardType="default"
          onChangeText={(text) => {
            setUserData((prevData) => {
              return { ...prevData, password: text };
            });
          }}
          value={userData.password}
          inValid={true}
        /> */}

        <Text style={styles.title}>Occupation</Text>
        <InputField
          placeholder="Influencer"
          keyboardType="default"
          onChangeText={(text) => {
            setUserData((prevData) => {
              return { ...prevData, occupation: text };
            });
          }}
          value={userData.occupation}
          inValid={true}
        />

        <Text style={styles.title}>Bio</Text>
        <InputField
          placeholder="Life is beautifull"
          keyboardType="default"
          onChangeText={(text) => {
            setUserData((prevData) => {
              return { ...prevData, bio: text };
            });
          }}
          value={userData.bio}
          inValid={true}
          multiline={true}
        />
      </ScrollView>
      <View style={{ margin: 10 }}>
        <Button title={"Update"} onPress={updateBtnHandler} />
      </View>
      {uploading.status && (
        <>
          {uploading.success ? (
            <ProgressOverlay
              title={"Uploading"}
              progress={uploading.progress}
            />
          ) : (
            <ErrorOverlay
              message={"Uploading Failed"}
              onClose={() => {
                setUploading({ status: false, progress: 0, success: true });
              }}
            />
          )}
        </>
      )}
    </View>
  );
};

export default EditProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: GlobalStyles.colors.primary,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
    margin: 15,
    marginBottom: 5,
  },
});
