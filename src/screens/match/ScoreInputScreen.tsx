import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { ScreenWrapper } from "@/components/common/ScreenWrapper";
import { BackHeader } from "@/components/common/BackHeader";
import { Colors } from "@/constants/colors";

const { width } = Dimensions.get("window");

interface ScoreCellProps {
  score: number;
  relative: number;
  highlight?: boolean;
}

const ScoreCell: React.FC<ScoreCellProps> = ({ score, relative, highlight }) => {
  const relativeColor = relative > 0 ? "#ED1C24" : relative < 0 ? "#1A7C24" : "#333";
  const relativeText = relative > 0 ? `+${relative}` : relative === 0 ? "E" : relative;

  return (
    <View style={[styles.scoreCell, highlight && styles.scoreCellHighlight]}>
      <Text style={styles.scoreText}>{score}</Text>
      <Text style={[styles.relativeText, { color: relativeColor }]}>
        {relativeText}
      </Text>
    </View>
  );
};

const ScoreInputScreen = () => {
  const navigation = useNavigation();

  // Mock data for players
  const players = [
    { name: "N.Long", id: "23345" },
    { name: "N.Linh", id: "23345" },
    { name: "N.Huy", id: "23345" },
    { name: "N.Nam", id: "23345" },
  ];

  // Mock data for Course A (holes 1-9)
  const courseA = Array.from({ length: 9 }, (_, i) => ({
    id: i + 1,
    par: 4,
    index: 5,
    scores: [
      { score: 1, relative: 3 },
      { score: 2, relative: 2 },
      { score: 5, relative: -1 },
      { score: 6, relative: -2 },
    ],
  }));

  const renderActionItem = (icon: any, label: string, color: string) => (
    <TouchableOpacity style={styles.actionItem}>
      <View style={[styles.iconWrapper, { backgroundColor: color }]}>
        <Ionicons name={icon} size={24} color="#FFF" />
      </View>
      <Text style={styles.actionLabel}>{label}</Text>
    </TouchableOpacity>
  );

  return (
    <ScreenWrapper extendBehindStatusBar={true}>
      <BackHeader
        title="Nhập điểm"
        onBack={() => navigation.goBack()}
        variant="clear"
        tintColor="#2D323A"
      />

      <ScrollView style={styles.container} contentContainerStyle={styles.content}>
        {/* Top Actions */}
        <View style={styles.actionRow}>
          {renderActionItem("golf", "Chi tiết flight", "#0061AF")}
          {renderActionItem("bar-chart", "Ranking", "#F0A030")}
          {renderActionItem("people-outline", "Xem flight khác", "#10B090")}
          {renderActionItem("create-outline", "Chỉnh sửa flight", "#F06050")}
        </View>

        {/* Table Container */}
        <View style={styles.tableContainer}>
          {/* Table Header */}
          <View style={styles.tableHeader}>
            <View style={styles.holeHeaderCell}>
              <Text style={styles.headerText}>Hố</Text>
            </View>
            {players.map((player, index) => (
              <View key={index} style={styles.playerHeaderCell}>
                <Text style={styles.headerText}>{player.name}</Text>
                <View style={styles.playerIdTag}>
                  <Text style={styles.playerIdText}>{player.id}</Text>
                </View>
              </View>
            ))}
          </View>

          {/* Course Name Row */}
          <View style={styles.courseHeader}>
            <Text style={styles.courseHeaderText}>Đường A</Text>
          </View>

          {/* Hole Rows */}
          {courseA.map((hole) => (
            <View key={hole.id} style={styles.holeRow}>
              <View style={styles.holeInfoCell}>
                <View style={styles.holeNumberBadge}>
                  <Text style={styles.holeNumberText}>{hole.id}</Text>
                </View>
                <Text style={styles.holeSubText}>Index: {hole.index}</Text>
                <Text style={styles.parText}>{hole.par}</Text>
              </View>
              {hole.scores.map((score, sIdx) => (
                <ScoreCell
                  key={sIdx}
                  score={score.score}
                  relative={score.relative}
                  highlight={hole.id % 2 === 0}
                />
              ))}
            </View>
          ))}
          
          {/* Course B Placeholder */}
          <View style={styles.courseHeader}>
            <Text style={styles.courseHeaderText}>Đường B</Text>
          </View>
        </View>
      </ScrollView>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 100, // Space for BackHeader
  },
  content: {
    paddingBottom: 40,
  },
  actionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
  actionItem: {
    alignItems: "center",
    width: width / 4 - 20,
  },
  iconWrapper: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  actionLabel: {
    fontSize: 10,
    color: "#333",
    textAlign: "center",
  },
  tableContainer: {
    marginHorizontal: 0,
    borderRadius: 16,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#DFE5EB",
  },
  tableHeader: {
    flexDirection: "row",
    backgroundColor: Colors.primary,
  },
  headerText: {
    color: "#FFF",
    fontWeight: "600",
    fontSize: 14,
  },
  holeHeaderCell: {
    width: 60,
    paddingVertical: 12,
    alignItems: "center",
    justifyContent: "center",
    borderRightWidth: 1,
    borderRightColor: "rgba(255,255,255,0.2)",
  },
  playerHeaderCell: {
    flex: 1,
    paddingVertical: 10,
    alignItems: "center",
    borderRightWidth: 1,
    borderRightColor: "rgba(255,255,255,0.2)",
  },
  playerIdTag: {
    backgroundColor: "rgba(255,255,255,0.2)",
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
    marginTop: 4,
  },
  playerIdText: {
    color: "#FFF",
    fontSize: 10,
    fontWeight: "500",
  },
  courseHeader: {
    backgroundColor: "#EAF6FF",
    paddingVertical: 10,
    alignItems: "center",
  },
  courseHeaderText: {
    color: Colors.primary,
    fontWeight: "bold",
    fontSize: 14,
  },
  holeRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#DFE5EB",
  },
  holeInfoCell: {
    width: 60,
    backgroundColor: "#F8F8F8",
    alignItems: "center",
    paddingVertical: 8,
    borderRightWidth: 1,
    borderRightColor: "#DFE5EB",
    justifyContent: "center",
  },
  holeNumberBadge: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#DFE5EB",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFF",
  },
  holeNumberText: {
    fontWeight: "bold",
    fontSize: 14,
    color: "#333",
  },
  holeSubText: {
    fontSize: 8,
    color: "#666",
    marginTop: 2,
  },
  parText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#333",
    marginTop: 2,
  },
  scoreCell: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFF",
    borderRightWidth: 1,
    borderRightColor: "#DFE5EB",
    paddingVertical: 12,
  },
  scoreCellHighlight: {
    backgroundColor: "rgba(223, 229, 235, 0.2)",
  },
  scoreText: {
    fontSize: 18,
    fontWeight: "500",
    color: "#292929",
  },
  relativeText: {
    fontSize: 11,
    fontWeight: "500",
    position: "absolute",
    top: 4,
    right: 8,
  },
});

export default ScoreInputScreen;
