import React from "react";
import { View, Image, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const PRIMARY_BLUE = "#0061AF";

interface Player {
  name: string;
  avatar: string;
}

interface PlayerCardsProps {
  players: Player[];
  calculatePlayerTotals: (playerIdx: number) => {
    totalScore: number;
    totalRelative: number;
    skinsCount: number;
  };
}

export const PlayerCards: React.FC<PlayerCardsProps> = ({
  players,
  calculatePlayerTotals,
}) => {
  return (
    <View style={styles.playerCardsContainer}>
      {players.map((player, idx) => {
        const totals = calculatePlayerTotals(idx);
        return (
          <View key={idx} style={styles.playerCard}>
            <View style={styles.playerCardHeader}>
              <Image
                source={{ uri: player.avatar }}
                style={styles.playerAvatar}
              />
              <Text style={styles.playerName} numberOfLines={1}>
                {player.name}
              </Text>
            </View>

            <View style={styles.playerStatRow}>
              <Text style={styles.statLabel}>Gậy/HDC</Text>
              <Text style={styles.statValue}>
                +{totals.totalScore}/{totals.totalScore + 15}
              </Text>
            </View>

            <View style={styles.playerStatRow}>
              <Text style={styles.statLabel}>NET</Text>
              <Text style={styles.statValue}>{totals.totalRelative}</Text>
            </View>

            <View style={styles.playerStatRow}>
              <View style={styles.skinsLabelContainer}>
                <Text style={styles.statLabel}>Skins</Text>
                    <Image 
                        source={require("@assets/icons/score.png")}
                        style={{ marginLeft: 4, width: 15, height: 15 }}
                    />
              </View>
              <Text style={styles.statValue}>
                {totals.skinsCount > 0 ? `-${totals.skinsCount}` : "0"}
              </Text>
            </View>
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  playerCardsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingHorizontal: 16,
    justifyContent: "space-between",
    marginBottom: 16,
  },
  playerCard: {
    width: "48%",
    backgroundColor: "#FFF",
    borderRadius: 16,
    padding: 14,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#E5E7EB",

  },
  playerCardHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  playerAvatar: {
    width: 24,
    height: 24,
    borderRadius: 18,
  },
  playerName: {
    flex: 1,
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
    textAlign: "right",
    marginLeft: 8,
  },
  playerStatRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 6,
  },
  statLabel: {
    fontSize: 14,
    fontWeight: "400",
  },
  skinsLabelContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  statValue: {
    fontSize: 14,
    fontWeight: "600",
    color: PRIMARY_BLUE,
  },
});
