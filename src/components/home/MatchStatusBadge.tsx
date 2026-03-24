import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Colors } from "../../constants/colors";

type Status = "live" | "finished" | "upcoming";

const STATUS_CONFIG: Record<
  Status,
  { label: string; bg: string; color: string; icon: string }
> = {
  live: {
    label: "Đang diễn ra",
    bg: Colors.liveLight,
    color: Colors.live,
    icon: "📍",
  },
  finished: {
    label: "Đã kết thúc",
    bg: Colors.finishedLight,
    color: Colors.finished,
    icon: "📅",
  },
  upcoming: {
    label: "Sắp diễn ra",
    bg: "#E3F2FD",
    color: Colors.primary,
    icon: "⏰",
  },
};

export const MatchStatusBadge: React.FC<{ status: Status }> = ({ status }) => {
  const cfg = STATUS_CONFIG[status];
  return (
    <View style={[styles.badge, { backgroundColor: cfg.bg }]}>
      <Text style={styles.icon}>{cfg.icon}</Text>
      <Text style={[styles.label, { color: cfg.color }]}>{cfg.label}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
    gap: 4,
    marginBottom: 8,
  },
  icon: { fontSize: 12 },
  label: { fontSize: 12, fontWeight: "600" },
});
