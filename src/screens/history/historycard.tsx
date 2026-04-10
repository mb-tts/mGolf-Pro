import React, { memo } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Colors } from "@/constants/colors"; 
import { Match } from "@/constants/mock-data";
import { ScoreTable } from "@/components/home/ScoreTable";

// SVG Icons
import LocationIcon from "@assets/icons/home/Location.svg";
import ClubIcon from "@assets/icons/home/3User.svg";
import CalendarIcon from "@assets/icons/home/calender2.svg";

interface HistoryCardProps {
  match: Match;
  onPress: () => void;
}

const HistoryCard: React.FC<HistoryCardProps> = ({ match, onPress }) => (
  <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.7}>
     
    <View style={styles.header}>
      <Text style={styles.title} numberOfLines={1}>
        {match.title}
      </Text>
      <Text style={styles.detailText}>Xem chi tiết</Text>
    </View>

    <View style={styles.infoRow}>
      <LocationIcon width={14} height={14} color={Colors.textSecondary} />
      <Text style={styles.infoText} numberOfLines={1}>{match.location}</Text>
    </View>
    <View style={styles.infoRow}>
      <ClubIcon width={14} height={14} color={Colors.textSecondary} />
      <Text style={styles.infoText}>{match.club}</Text>
    </View>
    <View style={styles.infoRow}>
      <CalendarIcon width={14} height={14} color={Colors.textSecondary} />
      <Text style={styles.infoText}>{match.datetime}</Text>
    </View>

    {/* Divider line before score table */}
    <View style={styles.divider} />
    <View style={styles.scoreWrapper}>
      <ScoreTable {...match.scores} />
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.white,
    borderRadius: 20,
    padding: 16,
    marginBottom: 16,
    
    // Equivalent: box-shadow: 0px 1px 16px 0px rgba(0, 0, 0, 0.1)
    elevation: 5, // For Android
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 16,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between", 
    alignItems: "center", 
    marginBottom: 12,
  },
  title: {
    fontSize: 15,
    fontWeight: "700",
    color: Colors.text,
    flex: 1, 
    marginRight: 10, 
  },
  detailText: {
    fontSize: 12,
    color: Colors.primary || "#0066FF",
    fontWeight: "600",
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6, // Thông số Figma
    marginBottom: 4,
  },
  infoIcon: {
    fontSize: 16,
    color: Colors.textSecondary || "#6B7280", 
  },
  divider: {
    height: 1,
    backgroundColor: "#F3F4F6", // very light gray divider
    marginTop: 12,
    marginBottom: 4,
  },
  infoText: {
    fontSize: 13,
    color: Colors.textSecondary || "#6B7280", 
    flex: 1,
  },
  scoreWrapper: {
    marginTop: 8,
  },
});

export default memo(HistoryCard);