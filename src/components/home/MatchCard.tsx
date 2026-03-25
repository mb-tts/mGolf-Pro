import React from "react";
import { View, Text, StyleSheet } from "react-native";

import { MatchStatusBadge } from "./MatchStatusBadge";
import { ScoreTable } from "./ScoreTable";
import { Match } from "../../constants/mock-data";
import { Colors } from "../../constants/colors";

export const MatchCard: React.FC<{ match: Match }> = ({ match }) => (
  <View style={styles.card}>
    <Text style={styles.title}>{match.title}</Text>
    <MatchStatusBadge status={match.status} />

    <View style={styles.infoRow}>
      <Text style={styles.infoIcon}>📍</Text>
      <Text style={styles.infoText}>{match.location}</Text>
    </View>
    <View style={styles.infoRow}>
      <Text style={styles.infoIcon}>👥</Text>
      <Text style={styles.infoText}>{match.club}</Text>
    </View>
    <View style={styles.infoRow}>
      <Text style={styles.infoIcon}>📅</Text>
      <Text style={styles.infoText}>{match.datetime}</Text>
    </View>

    <ScoreTable {...match.scores} />
  </View>
);

const styles = StyleSheet.create({
  card: {
    width: 280,
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: 16,
    marginRight: 12,
    elevation: 3,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 8,
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
  infoIcon: { fontSize: 13 },
  infoText: { fontSize: 13, color: Colors.textSecondary },
});
