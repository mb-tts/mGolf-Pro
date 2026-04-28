export interface RoamingPlayer {
  name: string;
  goScore: number;
  backScore: number;
  totalScore: number;
}

export interface RoamingMatch {
  id: string;
  index: number;
  player1: RoamingPlayer;
  player2: RoamingPlayer;
}

export const mockRoamingData: RoamingMatch[] = [
  {
    id: "1",
    index: 1,
    player1: { name: "Hoàng Anh", goScore: -6, backScore: -5, totalScore: -11 },
    player2: { name: "Xuân Anh", goScore: -8, backScore: -8, totalScore: -16 },
  },
  {
    id: "2",
    index: 2,
    player1: { name: "Hoàng Anh", goScore: -6, backScore: -5, totalScore: -11 },
    player2: { name: "Lan Anh", goScore: -8, backScore: -8, totalScore: -16 },
  },
  {
    id: "3",
    index: 3,
    player1: { name: "Hoàng Anh", goScore: -8, backScore: -8, totalScore: -16 },
    player2: { name: "Linh Anh", goScore: -6, backScore: -5, totalScore: -11 },
  },
];

import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";

interface Props {
  match: any;
}

const ScoreRow = ({ label1, label2, isP1Winner }: any) => (
  <View style={styles.scoreRow}>
    <View style={styles.scoreBox}>
      <Text style={[styles.scoreText, !isP1Winner && styles.dimmedText]}>
        {label1}
      </Text>
      <Image
        source={require("@assets/images/chip.png")}
        style={{ height: 14, width: 14 }}
      />
    </View>
    <Text style={styles.vsText}>vs</Text>
    <View style={styles.scoreBox}>
      <Text style={[styles.scoreText, isP1Winner && styles.dimmedText]}>
        {label2}
      </Text>
      <Image
        source={require("@assets/images/chip.png")}
        style={{ height: 14, width: 14 }}
      />
    </View>
  </View>
);

export default function RoamingCard({ match }: Props) {
  const { player1, player2, index } = match;

  const isP1Winner = player1.totalScore > player2.totalScore;

  return (
    <View style={styles.card}>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    flexDirection: "row",
    padding: 5,
    borderWidth: 1,
    borderColor: "#F3F4F6",
  },
  leftCol: {
    width: 60,
    alignItems: "center",
    borderRightWidth: 1,
    borderRightColor: "#F3F4F6",
    paddingRight: 10,
  },
  indexCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },
  indexText: { fontSize: 12, color: "#6B7280", fontWeight: "bold" },
  sideBtn: {
    width: "100%",
    paddingVertical: 6,
    borderRadius: 12,
    backgroundColor: "#F9FAFB",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    alignItems: "center",
    marginBottom: 8,
  },
  sideBtnText: { fontSize: 13, color: "#374151", fontWeight: "500" },

  rightCol: { flex: 1, paddingLeft: 10 },
  nameHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  nameWrapper: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
  },
  playerName: { fontSize: 15, fontWeight: "600", color: "#374151" },
  crown: { marginLeft: 5 },
  dimmedText: { color: "#9CA3AF" }, // Màu xám cho bên thua

  scoreContent: { paddingHorizontal: 20 },
  scoreRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 8,
  },
  scoreBox: { flexDirection: "row", alignItems: "center", minWidth: 50 },
  scoreText: { fontSize: 16, fontWeight: "bold", color: "#1F2937" },
  coinIcon: { marginLeft: 4, fontSize: 12 },
  vsText: { fontSize: 12, color: "#6B7280", marginHorizontal: 10 },
  divider: {
    height: 1,
    backgroundColor: "#F3F4F6",
    width: "80%",
    alignSelf: "center",
  },
});
