import React from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Dimensions
} from "react-native";
import { useVideoPlayer, VideoView } from "expo-video";
import { Ionicons } from "@expo/vector-icons";
import { useAppNavigation } from "@/hooks/useNavigation";

const { width, height } = Dimensions.get("window");

export default function HoleVideoScreen() {
  const navigation = useAppNavigation();
  const videoSource = require("../../../../assets/images/videogolf.mp4");

  const player = useVideoPlayer(videoSource, player => {
    player.loop = true;
    player.play();
  });

  return (
    <View style={styles.container}>
      {/* VIDEO */}
      <VideoView
        style={styles.video}
        player={player}
        fullscreenOptions={{ enable: true }}
        allowsPictureInPicture
        contentFit="cover"
        nativeControls={true}
      />

      {/* BACK BUTTON */}
      <TouchableOpacity
        style={styles.backBtn}
        onPress={() => navigation.goBack()}
      >
        <Ionicons name="arrow-back" size={26} color="white" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black"
  },
  video: {
    width: width,
    height: height
  },
  backBtn: {
    position: "absolute",
    top: 50,
    left: 20,
    zIndex: 10,
    backgroundColor: 'rgba(0,0,0,0.3)',
    borderRadius: 20,
    padding: 5
  }
});