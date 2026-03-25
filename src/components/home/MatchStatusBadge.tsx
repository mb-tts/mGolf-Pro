import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Colors } from "../../constants/colors";
import { SvgProps } from "react-native-svg";

// Import SVG icons
import LiveIcon from "../../../assets/icons/home/airdrop.svg"; // 📍 live
import FinishedIcon from "../../../assets/icons/home/calendar.svg"; // 📅 finished
import UpcomingIcon from "../../../assets/icons/home/clock.svg"; // ⏰ upcoming

type Status = "live" | "finished" | "upcoming";

const STATUS_CONFIG: Record<
  Status,
  {
    label: string;
    bg: string;
    color: string;
    Icon: React.FC<SvgProps>; // dùng component thay vì string emoji
  }
> = {
  live: {
    label: "Đang diễn ra",
    bg: Colors.liveLight,
    color: Colors.live,
    Icon: LiveIcon,
  },
  finished: {
    label: "Đã kết thúc",
    bg: Colors.finishedLight,
    color: Colors.finished,
    Icon: FinishedIcon,
  },
  upcoming: {
    label: "Sắp diễn ra",
    bg: "#E3F2FD",
    color: Colors.primary,
    Icon: UpcomingIcon,
  },
};

export const MatchStatusBadge: React.FC<{ status: Status }> = ({ status }) => {
  const { bg, color, label, Icon } = STATUS_CONFIG[status];
  return (
    <View style={[styles.badge, { backgroundColor: bg }]}>
      <Icon width={14} height={14} color={color} />
      {/* icon cùng màu với text */}
      <Text style={[styles.label, { color }]}>{label}</Text>
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
  label: { fontSize: 12, fontWeight: "600" },
});
