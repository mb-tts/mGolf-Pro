import { View, StyleSheet, TouchableOpacity, StatusBar } from "react-native";
import { useVideoPlayer, VideoView } from "expo-video";
import { Ionicons } from "@expo/vector-icons";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { AppStackParamList } from "@/types/navigation.types";

const DEFAULT_VIDEO_SOURCE = require("../../../../assets/images/videogolf.mp4");

type Props = NativeStackScreenProps<AppStackParamList, "HoleVideoScreen">;

export default function HoleVideoScreen({ navigation, route }: Props) {
  const videoSource =
    route.params?.videoUrl ??
    route.params?.currentHole?.videoUrl ??
    DEFAULT_VIDEO_SOURCE;

  const player = useVideoPlayer(videoSource, player => {
    player.loop = true;
    player.play();
  });

  return (
    <View style={styles.container}>
      <StatusBar hidden translucent backgroundColor="transparent" />

      <VideoView
        style={styles.video}
        player={player}
        allowsPictureInPicture
        contentFit="cover"
        nativeControls={false}
      />

      <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={26} color="white" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
  video: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "black",
  },
  backBtn: {
    position: "absolute",
    top: 50,
    left: 20,
    zIndex: 10,
    backgroundColor: "rgba(0,0,0,0.3)",
    borderRadius: 20,
    padding: 5,
  },
});
