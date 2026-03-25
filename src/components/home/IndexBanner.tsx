import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
} from "react-native";
import { Colors } from "../../constants/colors";

interface IndexBannerProps {
  index: number;
  onEdit?: () => void;
  onReset?: () => void;
}

export const IndexBanner: React.FC<IndexBannerProps> = ({
  index,
  onEdit,
  onReset,
}) => (
  <View style={styles.wrapper}>
    <ImageBackground
      source={{ uri: "https://i.imgur.com/8B5YJPX.png" }} // TODO: thay ảnh thật
      style={styles.banner}
      imageStyle={styles.image}
    >
      <View style={styles.overlay}>
        <TouchableOpacity style={styles.leftSection} onPress={onEdit}>
          <Text style={styles.label}>Index ✏️</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.rightSection} onPress={onReset}>
          <Text style={styles.value}>{index.toFixed(1)} 🔄</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  </View>
);

const styles = StyleSheet.create({
  wrapper: {
    marginHorizontal: 16,
    marginVertical: 12,
    borderRadius: 16,
    overflow: "hidden",
    elevation: 3,
  },
  banner: { height: 90 },
  image: { borderRadius: 16 },
  overlay: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    backgroundColor: "rgba(0,0,0,0.15)",
  },
  leftSection: {},
  rightSection: {},
  label: { fontSize: 20, fontWeight: "700", color: Colors.white },
  value: { fontSize: 24, fontWeight: "800", color: Colors.white },
});
