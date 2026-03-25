import React, { memo } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../../constants/colors"; 
import { Match } from "../../constants/mock-data";
import { ScoreTable } from "../../components/home/ScoreTable";

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
      <Ionicons name="location-outline" style={styles.infoIcon} />
      <Text style={styles.infoText} numberOfLines={1}>{match.location}</Text>
    </View>
    <View style={styles.infoRow}>
      <Ionicons name="people-outline" style={styles.infoIcon} />
      <Text style={styles.infoText}>{match.club}</Text>
    </View>
    <View style={styles.infoRow}>
      <Ionicons name="calendar-outline" style={styles.infoIcon} />
      <Text style={styles.infoText}>{match.datetime}</Text>
    </View>

    
    <View style={styles.scoreWrapper}>
      <ScoreTable {...match.scores} />
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.white,
    
    borderRadius: 16, 
    paddingTop: 16, 
    paddingBottom: 16,
    paddingHorizontal: 16,
    marginBottom: 8, 
    
    elevation: 3,
    shadowColor: Colors.shadow || "#000",
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