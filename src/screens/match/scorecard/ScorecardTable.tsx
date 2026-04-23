import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";

interface HoleData {
  hole: number | string;
  par: number;
  strokeIndex: number | string;
}

interface PlayerScore {
  id: string;
  name: string;
  avatar: string;
  hdc: number;
  scores: number[];
}

interface ScorecardTableProps {
  players: PlayerScore[];
  holes: HoleData[];
}

const PRIMARY_BLUE = "#0061AF";

export const ScorecardTable: React.FC<ScorecardTableProps> = ({ players, holes }) => {
  
  // Hàm render hình khối cho điểm số (Birdie, Bogey,...)
  const renderScoreShape = (score: number, par: number) => {
    if (!score) return <Text style={styles.scoreText}>-</Text>;
    const diff = score - par;

    if (diff === -1) {
      // Birdie (Hình tròn)
      return (
        <View style={styles.circleShape}>
          <Text style={styles.scoreText}>{score}</Text>
        </View>
      );
    } else if (diff <= -2) {
      // Eagle/Albatross (Hình vuông thoi giả lập)
      return (
        <View style={styles.diamondShape}>
          <Text style={styles.scoreText}>{score}</Text>
        </View>
      );
    }
    
    // Par hoặc Over Par (Không viền)
    return <Text style={styles.scoreText}>{score}</Text>;
  };

  return (
    <ScrollView 
      style={styles.mainWrapper} 
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: 32 }} 
    >
      <View style={styles.tableCard}>
        {/* LEFT FIXED COLUMN (Sticky) */}
        <View style={styles.fixedColumn}>
          <View style={[styles.cell, styles.holeRowBg]}>
            <Text style={styles.labelBoldText}>Hole</Text>
          </View>
          <View style={[styles.cell, styles.parRowBg]}>
            <Text style={styles.labelBoldText}>Par</Text>
          </View>
          <View style={[styles.cell, styles.strokeRowBg]}>
            <Text style={styles.labelBoldText}>Stroke index</Text>
          </View>
          {players.map((p) => (
            <View key={p.id} style={[styles.cell, styles.playerRowBg]}>
              <Text style={styles.playerNameText} numberOfLines={1}>
                {p.name}
              </Text>
            </View>
          ))}
        </View>

        {/* RIGHT SCROLLABLE COLUMNS (Cuộn ngang) */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.scrollableArea} bounces={false}>
          <View>
            {/* Hàng: Hole */}
            <View style={styles.row}>
              {holes.map((h, i) => (
                <React.Fragment key={`hole-${i}`}>
                  <View style={[styles.dataCell, styles.holeRowBg]}>
                    <Text style={styles.labelBoldText}>{h.hole}</Text>
                  </View>
                  {i === 9 && <View style={[styles.separatorColumn, styles.separatorBg]} />}
                </React.Fragment>
              ))}
            </View>

            {/* Hàng: Par */}
            <View style={styles.row}>
              {holes.map((h, i) => (
                <React.Fragment key={`par-${i}`}>
                  <View style={[styles.dataCell, styles.parRowBg]}>
                    <Text style={styles.blueText}>{h.par}</Text>
                  </View>
                  {i === 9 && <View style={[styles.separatorColumn, styles.separatorBg]} />}
                </React.Fragment>
              ))}
            </View>

            {/* Hàng: Stroke Index */}
            <View style={styles.row}>
              {holes.map((h, i) => (
                <React.Fragment key={`stroke-${i}`}>
                  <View style={[styles.dataCell, styles.strokeRowBg]}>
                    <Text style={styles.blueText}>{h.strokeIndex}</Text>
                  </View>
                  {i === 9 && <View style={[styles.separatorColumn, styles.separatorBg]} />}
                </React.Fragment>
              ))}
            </View>

            {/* Hàng: Điểm từng Player */}
            {players.map((p) => (
              <View key={`score-row-${p.id}`} style={styles.row}>
                {holes.map((h, i) => {
                  const score = p.scores[i] || 0; 
                  return (
                    <React.Fragment key={`score-${p.id}-${i}`}>
                      <View style={[styles.dataCell, styles.playerRowBg]}>
                        {renderScoreShape(score, h.par)}
                      </View>
                      {i === 9 && <View style={[styles.separatorColumn, styles.separatorBg]} />}
                    </React.Fragment>
                  );
                })}
              </View>
            ))}
          </View>
        </ScrollView>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  mainWrapper: {
    flex: 1,
    paddingHorizontal: 16, // Đẩy toàn bộ bảng cách xa mép màn hình 16px
    paddingTop: 8,
  },
  tableCard: {
    flexDirection: "row",
    backgroundColor: "#FFF",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    overflow: "hidden",     // Đảm bảo các ô bên trong không bị lòi ra ngoài góc bo
  },
  
  // --- Layout Cột ---
  fixedColumn: {
    width: 140, 
    borderRightWidth: 1,
    borderColor: "#E5E7EB",
    zIndex: 10,
    backgroundColor: "#FFF",
  },
  scrollableArea: {
    flex: 1,
  },
  row: {
    flexDirection: "row",
  },
  
  // --- Style các ô (Cell) ---
  cell: {
    height: 32,
    justifyContent: "center",
    paddingHorizontal: 14, // Padding đệm chữ cách xa lề trái
    borderBottomWidth: 1,
    borderColor: "#F0F0F0",
  },
  dataCell: {
    width: 50, 
    height: 32,
    justifyContent: "center",
    alignItems: "center",
    borderBottomWidth: 1,
    borderRightWidth: 1,
    borderColor: "#F0F0F0",
  },
  
  // --- Màu Nền Theo Hàng ---
  holeRowBg: { backgroundColor: "#FFE2B4" }, 
  parRowBg: { backgroundColor: "#FDFDFD" }, 
  strokeRowBg: { backgroundColor: "#FBE6EE" }, 
  playerRowBg: { backgroundColor: "#FFF" },
  separatorBg: { backgroundColor: "#FFE2B4" },

  // --- Cột Ngăn Cách ---
  separatorColumn: {
    width: 32,
    height: 32,
    borderBottomWidth: 1,
    borderRightWidth: 1,
    borderColor: "#F0F0F0",
  },

  // --- Typography ---
  labelBoldText: {
    fontSize: 13,
    fontWeight: "700",
    color: "#333",
  },
  blueText: {
    fontSize: 13,
    fontWeight: "600",
    color: PRIMARY_BLUE,
  },
  playerNameText: {
    fontSize: 13,
    fontWeight: "600",
    color: "#222",
  },
  scoreText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#111",
  },

  // --- Style Điểm Golf (Vòng tròn/Vuông) ---
  circleShape: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: "#666",
    justifyContent: "center",
    alignItems: "center",
  },
  diamondShape: {
    width: 28,
    height: 28,
    borderWidth: 1.5,
    borderColor: "#666",
    borderRadius: 6, 
    justifyContent: "center",
    alignItems: "center",
  },
});