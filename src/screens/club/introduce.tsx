import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  StatusBar,
  Pressable,
} from "react-native";
import ImagesAndVideosScreen from "./imagesAndvideos";
import { useAppNavigation } from "@/hooks/useNavigation";
import { LinearGradient } from "expo-linear-gradient";
const { width } = Dimensions.get("window");

const images = [
  require("../../../assets/images/image1.png"),
  require("../../../assets/images/image2.png"),
  require("../../../assets/images/image3.png"),
  require("../../../assets/images/image4.png"),
  require("../../../assets/images/image5.png"),
  require("../../../assets/images/image6.png"),
];

export default function IntroduceScreen() {
  const navigation = useAppNavigation();
  const [expanded, setExpanded] = useState(false);
  return (
    <View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Thông tin chung</Text>

        <Text style={styles.content} numberOfLines={expanded ? undefined : 3}>
          Câu lạc bộ MBF Club được thành lập vào năm 2018, hiện có 101 thành
          viên. CLB này là một phần của HNGA và được điều hành bởi Chủ tịch
          Nguyễn Văn Dũng, Tổng thư ký Phùng Ngọc Huy và Đội trưởng Nguyễn.
        </Text>

        <TouchableOpacity onPress={() => setExpanded(!expanded)}>
          <Text style={styles.more}>{expanded ? "Thu gọn" : "Xem thêm"}</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Ảnh và video</Text>

        <View style={styles.grid}>
          {images.map((img, i) => (
            <TouchableOpacity
              key={i}
              // TRUYỀN THÊM { selectedIndex: i } VÀO ĐÂY:
              onPress={() => navigation.navigate("ImagesAndVideosScreen", { selectedIndex: i })}
            >
              <Image source={img} style={styles.gridItem} />
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    backgroundColor: "#fff",
    marginTop: 8,
    padding: 16,
  },

  sectionTitle: {
    fontWeight: "600",
    marginBottom: 10,
    fontSize: 15,
  },

  content: {
    color: "#555",
    lineHeight: 20,
  },

  more: {
    color: "#007AFF",
    marginTop: 6,
  },

  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
  },

  gridItem: {
    width: width / 2 - 30,
    height: 200,
    margin: 4,
    borderRadius: 10,
  },

  tabItemWrap: {
    alignContent: "center",
    flex: 1,
    alignItems: "center",
    paddingVertical: 5,
  },

  underline: {
    position: "absolute",
    bottom: 0,
    width: "25%",
    height: 2,
    backgroundColor: "#007AFF",
  },
});
