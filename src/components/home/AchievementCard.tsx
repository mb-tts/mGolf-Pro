import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Colors } from "../../constants/colors"; // ← đổi import
import { Achievement } from "../../constants/mock-data";

const ICONS: Record<Achievement["type"], string> = {
  // ← type-safe hơn
  ranking: "🏆",
  net: "⛳",
  gross: "🏌️",
};

export const AchievementCard: React.FC<{ item: Achievement }> = ({ item }) => (
  <View style={styles.card}>
    <Text style={styles.icon}>{ICONS[item.type]}</Text>
    <Text style={styles.value}>{item.value}</Text>
    <Text style={styles.label}>{item.label}</Text>
  </View>
);

const styles = StyleSheet.create({
  card: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: Colors.gold,
    backgroundColor: Colors.white,
    gap: 6,
  },
  icon: { fontSize: 24 },
  value: { fontSize: 36, fontWeight: "800", color: Colors.gold },
  label: {
    fontSize: 12,
    fontWeight: "600",
    color: Colors.gold,
    textAlign: "center",
  },
});
