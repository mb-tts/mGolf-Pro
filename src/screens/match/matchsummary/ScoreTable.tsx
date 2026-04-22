import React from "react";
import { View, Image, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const PRIMARY_BLUE = "#0061AF";

interface Player {
  name: string;
  avatar: string;
}

interface HoleScore {
  holeId: number;
  playerScores: { score: number; relative: number; isTeam?: boolean }[];
}

interface ScoreTableProps {
  players: Player[];
  holeScores: HoleScore[];
}

export const ScoreTable: React.FC<ScoreTableProps> = ({
  players,
  holeScores,
}) => {
  return (
    <View style={styles.tableContainer}>
      {/* Table Header */}
      <View style={styles.tableHeaderRow}>
        <View style={styles.holeHeaderCell}>
          <Text style={styles.tableHeaderText}>Hố</Text>
        </View>
        {players.map((player, idx) => {
          return (
            <View key={idx} style={styles.playerHeaderCell}>
              <Image
                source={{ uri: player.avatar }}
                style={styles.tableHeaderAvatar}
              />
              <Text style={styles.tableHeaderText}>{player.name}</Text>
            </View>
          );
        })}
      </View>

      {/* Table Rows */}
      {holeScores.map((hole) => {
        const isHighlightRow = hole.holeId === 3 || hole.holeId === 5;
        return (
          <View
            key={hole.holeId}
            style={[styles.tableRow, isHighlightRow && styles.tableRowHighlight]}
          >
            <View style={styles.holeCellContainer}>
              <View style={styles.holeNumberCircle}>
                <Text style={styles.holeCellText}>{hole.holeId}</Text>
              </View>
            </View>

            {hole.playerScores.map((score, playerIdx) => (
              <View key={playerIdx} style={styles.scoreCellContainer}>
                <View style={styles.scoreBox}>
                  <View style={styles.baseScoreCircle}>
                    <Text style={styles.baseScoreText}>({score.score})</Text>
                  </View>

                  <View style={styles.relativeTextRow}>
                    <Text style={styles.relativeNumberText}>
                      {score.relative > 0 ? "+" : ""}
                      {score.relative}
                    </Text>
                    <Text style={styles.relativeUpText}> UP</Text>
                  </View>

                  <View style={styles.scoreRow}>
                    <Text style={styles.scoreLabel}>
                      {score.relative > 0 ? "+20" : "-20"}
                    </Text>
                    {score.isTeam ? (
                        <Image 
                            source={require("@assets/icons/golf_team.png")}
                            style={{ marginLeft: 4, width: 15, height: 15 }}
                        />
                    ) : (
                        <Image 
                            source={require("@assets/icons/score.png")}
                            style={{ marginLeft: 4, width: 15, height: 15 }}
                        />
                    )}
                  </View>
                </View>
              </View>
            ))}
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  tableContainer: {
    marginHorizontal: 16,
    borderRadius: 16,
    backgroundColor: "#FFF",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    overflow: "hidden",
    marginBottom: 20,
  },
  tableHeaderRow: {
    flexDirection: "row",
    backgroundColor: "#E8F1FA",
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
  },
  holeHeaderCell: {
    width: 50,
    paddingVertical: 12,
    alignItems: "center",
    justifyContent: "center",
    borderRightWidth: 1,
    borderRightColor: "#E5E7EB",
  },
  playerHeaderCell: {
    flex: 1,
    paddingVertical: 10,
    alignItems: "center",
    justifyContent: "center",
    borderRightWidth: 1,
    borderRightColor: "#E5E7EB",
  },
  tableHeaderAvatar: {
    width: 28,
    height: 28,
    borderRadius: 14,
    marginBottom: 6,
  },
  tableHeaderText: {
    fontSize: 13,
    fontWeight: "600",
    color: "#444",
  },

  tableRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
    backgroundColor: "#FFF",
  },
  tableRowHighlight: {
    backgroundColor: "#FFF8E7",
  },
  holeCellContainer: {
    width: 50,
    paddingVertical: 12,
    alignItems: "center",
    justifyContent: "center",
    borderRightWidth: 1,
    borderRightColor: "#E5E7EB",
  },
  holeNumberCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "#E8F0FE",
    alignItems: "center",
    justifyContent: "center",
  },
  holeCellText: {
    fontSize: 13,
    fontWeight: "700",
    color: PRIMARY_BLUE,
  },
  scoreCellContainer: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 4,
    alignItems: "center",
    justifyContent: "center",
    borderRightWidth: 1,
    borderRightColor: "#E5E7EB",
  },
  scoreBox: {
    alignItems: "center",
  },
  baseScoreCircle: {
    borderWidth: 1,
    borderColor: "#CCC",
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 2,
    marginBottom: 6,
  },
  baseScoreText: {
    fontSize: 13,
    fontWeight: "500",
    color: "#333",
  },
  relativeTextRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
  },
  relativeNumberText: {
    fontSize: 13,
    fontWeight: "700",
    color: "#333",
  },
  relativeUpText: {
    fontSize: 12,
    fontWeight: "500",
    color: "#888",
  },
  scoreRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  scoreLabel: {
    fontSize: 12,
    fontWeight: "600",
    color: "#555",
  },
});
