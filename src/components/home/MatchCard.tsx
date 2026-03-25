import React from "react";
import { View, Text, StyleSheet } from "react-native";

import { MatchStatusBadge } from "./MatchStatusBadge";
import { ScoreTable } from "./ScoreTable";
import { Match } from "../../constants/mock-data";
import { Colors } from "../../constants/colors";

// ✅ Import SVG icons
import LocationIcon from "../../../assets/icons/home/Location.svg";
import ClubIcon from "../../../assets/icons/home/3User.svg";
import CalendarIcon from "../../../assets/icons/home/calender2.svg";

export const MatchCard: React.FC<{ match: Match }> = ({ match }) => (
  <View style={styles.card}>
    <Text style={styles.title}>{match.title}</Text>
    <MatchStatusBadge status={match.status} />

    <View style={styles.infoRow}>
      <LocationIcon width={14} height={14} color={Colors.textSecondary} />
      <Text style={styles.infoText}>{match.location}</Text>
    </View>
    <View style={styles.infoRow}>
      <ClubIcon width={14} height={14} color={Colors.textSecondary} />
      <Text style={styles.infoText}>{match.club}</Text>
    </View>
    <View style={styles.infoRow}>
      <CalendarIcon width={14} height={14} color={Colors.textSecondary} />
      <Text style={styles.infoText}>{match.datetime}</Text>
    </View>

    {/* ✅ Divider trước bảng điểm */}
    <View style={styles.divider} />

    <ScoreTable {...match.scores} />
  </View>
);

const styles = StyleSheet.create({
  card: {
    width: 280,
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: 16,
    marginRight: 16, // Increase right margin for the larger shadow blur to not be clipped

    // Thêm lại viền và shadow nhỏ để không bị cắt lỗi hiển thị
    borderWidth: 1,
    borderColor: "#E5E7EB",

    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1, 
    shadowRadius: 8, 
    elevation: 3,
  },
  title: {
    fontSize: 15,
    fontWeight: "700",
    color: Colors.text,
    marginBottom: 8,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginBottom: 4,
  },
  infoText: { fontSize: 13, color: Colors.textSecondary },

  // ✅ Đường kẻ phân cách
  divider: {
    height: 1,
    backgroundColor: "#E5E7EB",
    marginVertical: 12,
  },
});
