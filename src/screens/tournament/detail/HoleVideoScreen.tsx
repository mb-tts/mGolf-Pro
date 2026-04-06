import React, { useRef, useState } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Text,
  ActivityIndicator
} from "react-native";
import { Video, ResizeMode } from "expo-av";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const { width, height } = Dimensions.get("window");

export default function HoleVideoScreen() {
  const navigation = useNavigation();
  const videoRef = useRef<Video>(null);

  const [status, setStatus] = useState<any>({});
  const [loading, setLoading] = useState(true);

  const videoSource = require("../../../../assets/images/videogolf.mp4");
  return (
    <View style={styles.container}>
      {/* HIỆN LOADING KHI VIDEO ĐANG TẢI */}
      {loading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="white" />
        </View>
      )}

      {/* VIDEO */}
      <Video
        ref={videoRef}
        source={videoSource}
        style={styles.video}
        resizeMode={ResizeMode.COVER}
        useNativeControls={true} // 👈 BẬT TẠM CÁI NÀY ĐỂ KIỂM TRA VIDEO CÓ CHẠY KHÔNG
        shouldPlay={true}        // 👈 ĐỂ TRUE CHO NÓ TỰ CHẠY LUÔN ĐỂ KIỂM TRA
        isMuted={false}
        onPlaybackStatusUpdate={(status) => setStatus(() => status)}
        onLoad={() => {
          console.log("Video đã load thành công!");
          setLoading(false);
        }}
        onError={(error) => {
          console.log("Lỗi load video rồi ông giáo ơi: ", error);
          setLoading(false);
        }}
      />

      {/* BACK BUTTON */}
      <TouchableOpacity
        style={styles.backBtn}
        onPress={() => navigation.goBack()}
      >
        <Ionicons name="arrow-back" size={26} color="white" />
      </TouchableOpacity>

      {/* CUSTOM PLAY BUTTON (Ẩn đi khi đang dùng Native Controls cho đỡ vướng) */}
      {!loading && !status.isPlaying && (
        <TouchableOpacity
          style={styles.playBtn}
          onPress={() => videoRef.current?.playAsync()}
        >
          <Ionicons name="play" size={60} color="rgba(255,255,255,0.8)" />
        </TouchableOpacity>
      )}
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
  loadingContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1
  },
  backBtn: {
    position: "absolute",
    top: 50,
    left: 20,
    zIndex: 10,
    backgroundColor: 'rgba(0,0,0,0.3)',
    borderRadius: 20,
    padding: 5
  },
  playBtn: {
    position: "absolute",
    top: "45%",
    alignSelf: "center",
    zIndex: 5
  }
});