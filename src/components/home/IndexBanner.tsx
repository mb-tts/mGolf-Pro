import { FC } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
} from "react-native";
import { Colors } from "@/constants/colors";

import EditIcon from "@assets/icons/home/edit-2.svg";
import ResetIcon from "@assets/icons/home/rotate-left.svg";
import IndexBannerImage from "@assets/images/IndexBanner.png";

interface IndexBannerProps {
  index: number;
  onEdit?: () => void;
  onReset?: () => void;
}

export const IndexBanner: FC<IndexBannerProps> = ({
  index,
  onEdit,
  onReset,
}) => (
  <View style={styles.wrapper}>
    <ImageBackground
      source={IndexBannerImage}
      style={styles.banner}
      imageStyle={styles.image}
    >
      <View style={styles.overlay}>
        {/* Left: "Index ✏️" */}
        <TouchableOpacity style={styles.row} onPress={onEdit}>
          <Text style={styles.label}>Index</Text>
          <EditIcon width={14} height={14} color={Colors.white} />
        </TouchableOpacity>

        {/* Right: "12.5 🔄" */}
        <TouchableOpacity style={styles.row} onPress={onReset}>
          <Text style={styles.value}>{index.toFixed(1)}</Text>
          <ResetIcon width={16} height={16} color={Colors.white} />
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
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
  },
  banner: { height: 80 }, // ✅ chiều cao vừa như ảnh
  image: { borderRadius: 16 },
  overlay: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    backgroundColor: "rgba(0,0,0,0.08)", // ✅ overlay nhẹ hơn
  },
  row: {
    flexDirection: "row", // ✅ text + icon cùng hàng
    alignItems: "center",
    gap: 5, // ✅ khoảng cách nhỏ giữa text và icon
  },
  label: {
    fontSize: 22,
    fontWeight: "600",
    color: "#1A1A1A", // ✅ chữ đen đậm
  },
  value: {
    fontSize: 22,
    fontWeight: "600",
    color: "#1A1A1A", // ✅ chữ đen đậm
  },
});
