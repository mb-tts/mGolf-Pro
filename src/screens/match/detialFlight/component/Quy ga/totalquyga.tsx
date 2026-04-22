import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { fundPlayers } from "./dataquyga";

export default function ChickenFundSummary() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tổng kết</Text>

      <View style={styles.summaryCard}>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Tổng quỹ</Text>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text style={styles.value}>94 </Text>
            <Image
              source={require("@assets/images/chip.png")}
              style={{ height: 18, width: 18 }}
            />
          </View>
        </View>
        <View
          style={[
            styles.infoRow,
            {
              borderBottomWidth: 1,
              borderBottomColor: "#F3F4F6",
              paddingBottom: 12,
            },
          ]}
        >
          <Text style={styles.label}>Quỹ hiện tại</Text>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text style={styles.value}> 48 </Text>
            <Image
              source={require("@assets/images/chip.png")}
              style={{ height: 18, width: 18 }}
            />
          </View>
        </View>

        {fundPlayers.map((p) => (
          <View key={p.id} style={styles.playerRow}>
            <View style={styles.playerLeft}>
              <Image source={{ uri: p.avatar }} style={styles.pAvatar} />
              <Text style={styles.pName}>{p.name}</Text>
              {p.isWinner && (
                <Image
                  source={require("@assets/images/crown1.png")}
                  style={{ height: 18, width: 18 }}
                />
              )}
            </View>
            <View style={[styles.pBadge, p.isWinner && styles.winnerBadge]}>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Text style={[styles.pPoints, p.isWinner && styles.winnerText]}>
                  {p.points}
                </Text>
                <Image
                  source={require("@assets/images/chip.png")}
                  style={{ height: 18, width: 18 }}
                />
              </View>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, marginBottom: 40 },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 12,
    color: "#1F2937",
  },
  summaryCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 8,
  },
  label: { fontSize: 15, color: "#374151" },
  value: { fontSize: 15, fontWeight: "600" },

  playerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 12,
  },
  playerLeft: { flexDirection: "row", alignItems: "center" },
  pAvatar: { width: 36, height: 36, borderRadius: 18, marginRight: 10 },
  pName: { fontSize: 15, color: "#374151", fontWeight: "500" },
  pBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    backgroundColor: "#F3F4F6",
  },
  winnerBadge: { backgroundColor: "#F59E0B" },
  pPoints: { fontSize: 14, fontWeight: "600", color: "#4B5563" },
  winnerText: { color: "#FFFFFF" },
});
