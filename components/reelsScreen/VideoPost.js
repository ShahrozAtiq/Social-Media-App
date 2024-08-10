import { View, StyleSheet, ActivityIndicator } from "react-native";
import { Video, ResizeMode } from "expo-av";
import { LinearGradient } from "expo-linear-gradient";
import { useEffect, useRef, useState } from "react";
import { GlobalStyles } from "../../constants/Styles";
import CommentSheet from "../Comments/CommentSheet";
import Avatar from "./Avatar";
import ActionButtons from "./ActionButtons";
import VideoInfo from "./VideoInfo";

const VideoPost = ({ post, activePostId, index }) => {
  const video = useRef(null);
  const [showComment, setShowComment] = useState(false);
  const [showCaptions, setShowCaptions] = useState(false);
  const [status, setStatus] = useState();
  const isPlaying = status?.isLoaded && status.isPlaying;
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (!video.current) {
      return;
    }
    if (activePostId !== post.id) {
      video.current.pauseAsync();
      console.log("paused", index);
    }
    if (activePostId === post.id) {
      video.current.playAsync();
      console.log("focused", index);
    }
  }, [activePostId, post.id]);

  const onPress = () => {
    if (!video.current) {
      return;
    }
    if (isPlaying) {
      video.current.pauseAsync();
    } else {
      video.current.playAsync();
    }
  };

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: GlobalStyles.colors.primary500,
        },
      ]}
    >
      <Video
        ref={video}
        style={styles.video}
        source={{ uri: post.video }}
        resizeMode={ResizeMode.COVER}
        onPlaybackStatusUpdate={(status) => {
          setStatus(status);
        }}
        isLooping
        onLoadStart={() => {
          setLoading(true);
        }}
        onReadyForDisplay={() => {
          setLoading(false);
        }}
        volume={1}
      />

      <View
        style={{
          position: "absolute",
          width: "100%",
          bottom: 0,
        }}
      >
        <LinearGradient
          colors={["transparent", "rgba(0,0,0,0.5)"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
          style={{
            position: "absolute",
            bottom: 0,
            width: "100%",
            height: "100%",
          }}
        />
        <View
          style={{
            backgroundColor: "rgba(38, 41, 56,0.5)",
            borderTopLeftRadius: 30,
            borderTopRightRadius: 30,
          }}
        >
          <View style={{ flexDirection: "row", margin: 20 }}>
            <View style={{ width: "100%" }}>
              <VideoInfo
                title={post.title}
                date={post.date}
                location={post.location}
              />
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginTop: 20,
                }}
              >
                <Avatar />
                <ActionButtons />
              </View>
            </View>
          </View>
        </View>
      </View>

      {loading && (
        <View
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
          }}
        >
          <ActivityIndicator
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
            size={50}
            color={"white"}
          />
        </View>
      )}
      <View>
        <CommentSheet visible={showComment} setVisible={setShowComment} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: GlobalStyles.styles.windowWidth,
    height:
      GlobalStyles.styles.windowHeight - GlobalStyles.styles.tabBarPadding + 25,
    borderRadius: 30,
    overflow: "hidden",
  },
  video: {
    flex: 1,
  },
});

export default VideoPost;
