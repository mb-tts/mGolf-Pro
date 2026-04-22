import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { chickenHoles, fundPlayers } from "./dataquyga";

export default function ChickenFundTable() {
  return (
    <View style={styles.tableCard}>
      {/* Header */}
      <View style={styles.headerRow}>
        <View style={styles.holeHeader}>
          <Text style={styles.headerText}>Hố</Text>
        </View>
        {fundPlayers.map((p) => (
          <View key={p.id} style={styles.playerHeader}>
            <Image source={{ uri: p.avatar }} style={styles.avatar} />
            <Text style={styles.playerName}>{p.name}</Text>
          </View>
        ))}
        <View style={styles.potHeader}>
          <Text style={styles.headerText}>Quỹ hiện tại</Text>
        </View>
      </View>

      {/* Rows */}
      {chickenHoles.map((hole) => (
        <View
          key={hole.holeNumber}
          style={[styles.row, hole.isHighlighted && styles.highlightedRow]}
        >
          <View style={styles.holeCol}>
            <View style={styles.holeCircle}>
              <Text style={styles.holeNum}>{hole.holeNumber}</Text>
            </View>
          </View>

          {fundPlayers.map((p) => (
            <View key={p.id} style={styles.scoreCol}>
              <Text style={styles.scoreText}>{hole.scores[p.id]}</Text>
              {hole.isHighlighted && hole.scores[p.id] === 2 && (
                <Image
                  source={require("@assets/images/crown1.png")}
                  style={{ height: 18, width: 18 }}
                />
              )}
            </View>
          ))}

          <View style={styles.potCol}>
            <Text style={styles.potText}>{hole.currentPot}</Text>
          </View>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  tableCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    overflow: "hidden",
    margin: 16,
  },
  headerRow: {
    flexDirection: "row",
    backgroundColor: "#F0F7FF",
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
    paddingVertical: 10,
  },
  headerText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#374151",
    textAlign: "center",
    marginTop: 20
  },
  holeHeader: { width: 50 },
  playerHeader: { flex: 1, alignItems: "center" },
  potHeader: { width: 80 },
  avatar: { width: 28, height: 28, borderRadius: 14, marginBottom: 4 },
  playerName: { fontSize: 11, color: "#374151" },

  row: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6",
    alignItems: "center",
    paddingVertical: 8,
  },
  highlightedRow: { backgroundColor: "#FFFBEB" },
  holeCol: { width: 50, alignItems: "center" },
  holeCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#D1D5DB",
    justifyContent: "center",
    alignItems: "center",
  },
  holeNum: { fontSize: 12, fontWeight: "600" },
  scoreCol: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  scoreText: { fontSize: 14, color: "#4B5563" },
  potCol: { width: 80, alignItems: "center" },
  potText: { fontSize: 14, fontWeight: "bold", color: "#111827" },
});
