import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { Colors } from "../../constants/colors";
import { User } from "../../types/auth.types";

interface HomeHeaderProps {
  user: User;
  clubName?: string;
}

export const HomeHeader: React.FC<HomeHeaderProps> = ({
  user,
  clubName = "MBF Club",
}) => (
  <View style={styles.container}>
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
        <View style={styles.clubBadge}>
          <Text style={styles.clubText}>{clubName}</Text>
          <View style={styles.dot} />
        </View>
      </View>
    </View>

    {/* Icons */}
    <View style={styles.iconRow}>
      <TouchableOpacity style={styles.iconBtn}>
        <Text style={styles.icon}>💬</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.iconBtn}>
        <Text style={styles.icon}>🔔</Text>
      </TouchableOpacity>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: Colors.white,
  },
  leftRow: { flexDirection: "row", alignItems: "center", gap: 10 },
  avatar: { width: 46, height: 46, borderRadius: 23 },
  greeting: { fontSize: 14, marginBottom: 4 },
  italic: { fontStyle: "italic", color: Colors.textSecondary },
  name: { fontWeight: "700", color: Colors.text },
  clubBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.background,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 10,
    gap: 4,
  },
  clubText: { fontSize: 12, color: Colors.text, fontWeight: "500" },
  dot: { width: 8, height: 8, borderRadius: 4, backgroundColor: "#4CAF50" },
  iconRow: { flexDirection: "row", gap: 8 },
  iconBtn: { padding: 6 },
  icon: { fontSize: 20 },
});
