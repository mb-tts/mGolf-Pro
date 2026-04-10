import { FC } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { Colors } from "@/constants/colors";
import { User } from "@/types/auth.types";

import SearchIcon from "@assets/icons/home/Search.svg";
import NotificationIcon from "@assets/icons/home/Notification.svg";
import DotImage from "@assets/icons/home/Dot.png";

interface HomeHeaderProps {
  user: User;
  clubName?: string;
  onPressAvatar?: () => void;
}

export const HomeHeader: FC<HomeHeaderProps> = ({
  user,
  clubName = "MBF Club",
  onPressAvatar,
}) => (
  <TouchableOpacity
    style={styles.container}
    activeOpacity={1}
    onPress={onPressAvatar}
  >
    {/* Avatar + Info */}
    <View style={styles.leftRow}>
      <Image
        source={{ uri: "https://i.pravatar.cc/150?img=3" }}
        style={styles.avatar}
      />
      <View>
        <Text style={styles.greeting}>
          <Text style={styles.italic}>Xin chào, </Text>
          <Text style={styles.name}>{user.fullName}</Text>
        </Text>

        {/* badge */}
        <View style={styles.clubBadge}>
          <Text style={styles.clubText}>{clubName}</Text>
          <Image source={DotImage} style={styles.dot} />
        </View>
      </View>
    </View>

    {/* Icons */}
    <View style={styles.iconRow}>
      <TouchableOpacity style={styles.iconBtn}>
        <SearchIcon width={20} height={20} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.iconBtn}>
        <NotificationIcon width={20} height={20} />
      </TouchableOpacity>
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 10, // ✅ giảm padding dọc
    backgroundColor: Colors.white,
  },
  leftRow: { flexDirection: "row", alignItems: "center", gap: 10 },
  avatar: { width: 40, height: 40, borderRadius: 20 }, // ✅ thu nhỏ avatar
  greeting: { fontSize: 13, marginBottom: 3 },
  italic: {
    fontFamily: "Meow Script", // tên font đã import
    fontWeight: "400", // tương đương Regular
    fontStyle: "normal", // React Native không nhận "Regular", chỉ normal/italic
    fontSize: 14,
    lineHeight: 14 * 1.4, // 140% line-height
    letterSpacing: -0.01 * 14, // -1% của font size
    color: Colors.textSecondary,
  },
  name: { fontWeight: "700", color: Colors.text },
  clubBadge: {
    flexDirection: "row", // quan trọng: xếp ngang
    alignItems: "center",
    alignSelf: "flex-start", // không chiếm full width
    backgroundColor: "#EAF6FF",
    borderRadius: 10,
    paddingHorizontal: 8, // thêm padding ngang
    paddingVertical: 2, // thêm padding dọc
    gap: 4, //  khoảng cách giữa text và dot
  },
  clubText: {
    fontSize: 11,
    color: Colors.text,
    fontWeight: "500",
  },
  dot: {
    width: 6,
    height: 6,
    resizeMode: "contain",
  },
  iconRow: { flexDirection: "row", gap: 4 }, // ✅ thu gap lại
  iconBtn: { padding: 6 },
});
