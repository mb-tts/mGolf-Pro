import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Image,
  Switch,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { AppStackParamList } from "@/types/navigation.types";
import { Ionicons } from "@expo/vector-icons";
import { ScreenWrapper } from "@/components/common/ScreenWrapper";
import { Colors } from "@/constants/colors";
import { HoleDetailModal, LegendModal, ConfirmModal } from "./modals";
import FlightIcon from "@assets/icons/flight_icon.png";
import FlightEditIcon from "@assets/icons/flightedit_icon.png";
import RankingIcon from "@assets/icons/ranking_icon.png";
type ScoreInputNavigationProp = NativeStackNavigationProp<
  AppStackParamList,
  "ScoreInputScreen"
>;
const { width, height } = Dimensions.get("window");

interface PlayerScore {
  name: string;
  avatar: string;
  score: number;
  relative: number;
  id?: string;
}

const ScoreInputScreen = () => {
  const navigation = useNavigation<ScoreInputNavigationProp>();
  const insets = useSafeAreaInsets();

  const handleBack = () => {
    navigation.goBack();
  };
  
  // States
  const [showHoleModal, setShowHoleModal] = useState(false);
  const [showLegendModal, setShowLegendModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [isAutoNext, setIsAutoNext] = useState(true);
  const [selectedHole, setSelectedHole] = useState<number | null>(null);
  const [selectedCell, setSelectedCell] = useState<{ holeId: number; playerIdx: number } | null>(null);
  const [scoreData, setScoreData] = useState<Record<string, { score: number; relative: number }>>({
    "1_0": { score: 1, relative: 3 },
    "1_1": { score: 2, relative: 2 },
    "1_2": { score: 5, relative: -1 },
    "1_3": { score: 6, relative: -2 },
  });

  // Mock data
  const players: PlayerScore[] = [
    { name: "N.Long", avatar: "https://i.pravatar.cc/150?u=1", score: 1, relative: 3, id: "23345" },
    { name: "N.Linh", avatar: "https://i.pravatar.cc/150?u=2", score: 2, relative: 2, id: "23345" },
    { name: "N.Huy", avatar: "https://i.pravatar.cc/150?u=3", score: 5, relative: -1, id: "23345" },
    { name: "N.Nam", avatar: "https://i.pravatar.cc/150?u=4", score: 6, relative: -2, id: "23345" },
  ];

  const courseA = Array.from({ length: 9 }, (_, i) => ({
    id: i + 1,
    par: 4,
    index: 5,
  }));

  const handleOpenHole = (holeId: number) => {
    setSelectedHole(holeId);
    setShowHoleModal(true);
  };

  const handleKeypadPress = (value: number | string) => {
    if (!selectedCell) return;
    const key = `${selectedCell.holeId}_${selectedCell.playerIdx}`;
    const current = scoreData[key] || { score: 0, relative: 0 };
    let newScore = current.score;

    if (value === "-") newScore = Math.max(0, newScore - 1);
    else if (value === "+") newScore = newScore + 1;
    else if (typeof value === "number") newScore = value;

    const newRelative = newScore - 4; // Giả sử par = 4, relative = score - par
    setScoreData(prev => ({ ...prev, [key]: { score: newScore, relative: newRelative } }));
  };

  const renderKeypadButton = (label: string | React.ReactNode, bgColor: string = "#0061AF", textColor: string = "#FFF", onPress?: () => void, borderColor: string = "#0061AF") => (
    <TouchableOpacity style={[styles.keypadBtn, { backgroundColor: bgColor, borderColor: borderColor }]} onPress={onPress}>
      {typeof label === "string" ? (
        <Text style={[styles.keypadBtnText, { color: textColor }]}>{label}</Text>
      ) : label}
    </TouchableOpacity>
  );

  return (
    <ScreenWrapper extendBehindStatusBar={false}>
      {/* HEADER */}
      <View style={[styles.header, { paddingTop: insets.top + 8 }]}>
        <TouchableOpacity onPress={handleBack} style={styles.backBtn}>
          <Ionicons name="chevron-back" size={20} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Nhập điểm</Text>
        <View style={styles.placeholder} />
      </View>


      <View style={styles.mainContainer}>
        <ScrollView style={styles.tableScrollView} showsVerticalScrollIndicator={false}>
          {/* Top Actions */}
          <View style={styles.actionRow}>
            <TouchableOpacity style={styles.actionItem} onPress={() => navigation.navigate("overviewScreen")}>
              <View style={styles.iconWrapper}>
                <Image source={FlightIcon} style={styles.actionIcon} />
              </View>
              <Text style={styles.actionLabel}>Xem chi tiết flight</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionItem}>
              <View style={styles.iconWrapper}>
                <Image source={RankingIcon} style={styles.actionIcon} />
              </View>
              <Text style={styles.actionLabel}>Ranking</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionItem}>
              <View style={styles.iconWrapper}>
                <Image source={FlightEditIcon} style={styles.actionIcon} />
              </View>
              <Text style={styles.actionLabel}>Chỉnh sửa flight</Text>
            </TouchableOpacity>
          </View>

          {/* Table */}
          <View style={styles.tableContainer}>
            <View style={styles.tableHeader}>
              <View style={styles.holeHeaderCell}><Text style={styles.headerText}>Hố</Text></View>
              {players.map((p, i) => (
                <View key={i} style={styles.playerHeaderCell}>
                  <Text style={styles.headerText}>{p.name}</Text>
                  <View style={styles.playerIdTag}><Text style={styles.playerIdText}>{p.id}</Text></View>
                </View>
              ))}
            </View>
            <View style={styles.courseHeader}><Text style={styles.courseHeaderText}>Đường A</Text></View>
            {courseA.map((hole) => (
              <TouchableOpacity key={hole.id} style={styles.holeRow} onPress={() => handleOpenHole(hole.id)}>
                <View style={styles.holeInfoCell}>
                  <View style={styles.holeNumberBadge}><Text style={styles.holeNumberText}>{hole.id}</Text></View>
                  <Text style={styles.holeSubText}>Index: {hole.index}</Text>
                  <Text style={styles.parText}>{hole.par}</Text>
                </View>
                {players.map((p, idx) => {
                  const key = `${hole.id}_${idx}`;
                  const cellData = scoreData[key] || p;
                  return (
                    <TouchableOpacity
                      key={idx}
                      style={[styles.scoreCell, hole.id % 2 === 0 && styles.scoreCellHighlight]}
                      onPress={() => setSelectedCell({ holeId: hole.id, playerIdx: idx })}
                    >
                      <Text style={styles.scoreValueText}>{cellData.score}</Text>
                      <Text style={[styles.relativeTextSmall, { color: cellData.relative > 0 ? "#ED1C24" : "#1A7C24" }]}>
                        {cellData.relative > 0 ? `+${cellData.relative}` : cellData.relative === 0 ? "E" : cellData.relative}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </TouchableOpacity>             
            ))}
            <View style={styles.courseHeader}><Text style={styles.courseHeaderText}>Đường B</Text></View>
            {courseA.map((hole) => (
              <TouchableOpacity key={hole.id} style={styles.holeRow} onPress={() => handleOpenHole(hole.id)}>
                <View style={styles.holeInfoCell}>
                  <View style={styles.holeNumberBadge}><Text style={styles.holeNumberText}>{hole.id}</Text></View>
                  <Text style={styles.holeSubText}>Index: {hole.index}</Text>
                  <Text style={styles.parText}>{hole.par}</Text>
                </View>
                {players.map((p, idx) => {
                  const key = `${hole.id}_${idx}`;
                  const cellData = scoreData[key] || p;
                  return (
                    <TouchableOpacity
                      key={idx}
                      style={[styles.scoreCell, hole.id % 2 === 0 && styles.scoreCellHighlight]}
                      onPress={() => setSelectedCell({ holeId: hole.id, playerIdx: idx })}
                    >
                      <Text style={styles.scoreValueText}>{cellData.score}</Text>
                      <Text style={[styles.relativeTextSmall, { color: cellData.relative > 0 ? "#ED1C24" : "#1A7C24" }]}>
                        {cellData.relative > 0 ? `+${cellData.relative}` : cellData.relative === 0 ? "E" : cellData.relative}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </TouchableOpacity>             
            ))}
          </View>
          
        </ScrollView>

        {/* Persistant Keypad Section */}
        {selectedCell && (
          <View style={styles.bottomKeypadSection}>
            <View style={styles.keypadGrid}>
              <View style={styles.keypadRow}>
                {["-1", "0", "1", "2", "3"].map(n => (
                  <View key={n} style={{flex:1}}>
                    {renderKeypadButton(n, "#0061AF", "#FFF", () => handleKeypadPress(parseInt(n)))}
                  </View>
                ))}
              </View>
              <View style={styles.keypadRow}>
                {["4", "5"].map(n => (
                  <View key={n} style={{flex:1}}>
                    {renderKeypadButton(n, "#0061AF", "#FFF", () => handleKeypadPress(parseInt(n)))}
                  </View>
                ))}
                <View style={{flex:1}}>
                  {renderKeypadButton(<Ionicons name="remove" size={24} color="#FFF" />, "#E50019", "#FFF", () => handleKeypadPress("-"))}
                </View>
                <View style={{flex:1}}>
                  {renderKeypadButton(<Ionicons name="add" size={24} color="#FFF" />, "#00A651", "#FFF", () => handleKeypadPress("+"))}
                </View>
                <View style={{flex:1}}>
                  {renderKeypadButton(<Ionicons name="chevron-down" size={24} color="#0061AF" />, "#FFF", "#0061AF", () => setSelectedCell(null), "#0061AF")}
                </View>
              </View>
            </View>

            <TouchableOpacity style={styles.dropdownTrigger}>
              <Text style={styles.dropdownText}>Tuỳ chọn nhập điểm</Text>
              <Ionicons name="chevron-down" size={20} color={Colors.primary} />
            </TouchableOpacity>

            <TouchableOpacity style={styles.finishBtn} onPress={() => setShowConfirmModal(true)}>
              <Text style={styles.finishBtnText}>Kết thúc trận đấu</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>

      {/* MODALS */}
      <HoleDetailModal
        visible={showHoleModal}
        selectedHole={selectedHole}
        players={players}
        isAutoNext={isAutoNext}
        onAutoNextChange={setIsAutoNext}
        onClose={() => setShowHoleModal(false)}
      />

      <LegendModal
        visible={showLegendModal}
        players={players}
        onClose={() => setShowLegendModal(false)}
      />

      <ConfirmModal
        visible={showConfirmModal}
        players={players}
        onConfirm={() => navigation.goBack()}
        onCancel={() => setShowConfirmModal(false)}
      />
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  header: { 
    flexDirection: "row", 
    alignItems: "center", 
    justifyContent: "space-between", 
    paddingHorizontal: 16, 
    paddingVertical: 12,
    backgroundColor: "#FFF",
  },
  backBtn: { 
    width: 36, 
    height: 36, 
    borderRadius: 8, 
    borderWidth: 1, 
    borderColor: "#E5E7EB", 
    alignItems: "center", 
    justifyContent: "center",
    backgroundColor: '#FFF'
  },
  headerTitle: { 
    fontSize: 18, 
    fontWeight: "600", 
    color: "#1A1A1A" 
  },
  placeholder: { 
    width: 36 
  },
  mainContainer: { flex: 1 },
  tableScrollView: { flex: 1 },
  actionRow: { flexDirection: "row", justifyContent: "space-between", paddingHorizontal: 16, paddingVertical: 16, backgroundColor: "#FFF" },
  actionItem: { alignItems: "center", width: width / 3 - 20 },
  iconWrapper: { width: 44, height: 44, borderRadius: 22, justifyContent: "center", alignItems: "center", marginBottom: 6 },
  actionLabel: { fontSize: 11, color: "#333", textAlign: "center" },
  actionIcon: { width: 32, height: 32, resizeMode: "contain" },
  trophyBtn: { width: 32, height: 32, borderRadius: 16, backgroundColor: "#EAF6FF", justifyContent: "center", alignItems: "center" },
  
  tableContainer: { borderTopWidth: 1, borderTopColor: "#DFE5EB", borderRadius: 12, overflow: "hidden" },
  tableHeader: { flexDirection: "row", backgroundColor: Colors.primary },
  headerText: { color: "#FFF", fontSize: 14 },
  holeHeaderCell: { width: 50, paddingVertical: 12, alignItems: "center", borderRightWidth: 1, borderRightColor: "#FFF" },
  playerHeaderCell: { flex: 1, paddingVertical: 8, alignItems: "center", borderRightWidth: 1, borderRightColor: "#FFF" },
  playerIdTag: { backgroundColor: "#E0F2FF", paddingHorizontal: 5, paddingVertical: 1, borderRadius: 10, marginTop: 2 },
  playerIdText: { color: "#0061AF", fontSize: 11 },
  courseHeader: { backgroundColor: "#EAF6FF", paddingVertical: 13, alignItems: "center" },
  courseHeaderText: { color: Colors.primary, fontWeight: "500", fontSize: 13 },
  holeRow: { flexDirection: "row", borderBottomWidth: 1, borderBottomColor: "#DFE5EB" },
  holeInfoCell: { width: 50, backgroundColor: "#F8F8F8", alignItems: "center", paddingVertical: 6, borderRightWidth: 1, borderRightColor: "#DFE5EB" },
  holeNumberBadge: { width: 24, height: 24, borderRadius: 12, borderWidth: 1, borderColor: "#DDD", justifyContent: "center", alignItems: "center", backgroundColor: "#FFF" },
  holeNumberText: { fontWeight: "bold", fontSize: 12, color: "#333" },
  holeSubText: { fontSize: 7, color: "#999" },
  parText: { fontSize: 10, fontWeight: "700", position: "absolute", top: 4, right: 4 },
  scoreCell: {height: 55, width: 80, flex: 1, justifyContent: "center", alignItems: "center", borderRightWidth: 1, borderRightColor: "#DFE5EB", paddingVertical: 10 },
  scoreCellHighlight: { backgroundColor: "#F9FAFB" },
  scoreValueText: { fontSize: 16, fontWeight: "500" },
  relativeTextSmall: { fontSize: 10, position: "absolute", top: 2, right: 4, fontWeight: "600" },

  bottomKeypadSection: { backgroundColor: "#FFF", paddingHorizontal: 16, paddingVertical: 12, paddingBottom: 24, borderTopWidth: 1, borderTopColor: "#EEE" },
  keypadGrid: { marginBottom: 12 },
  keypadRow: { flexDirection: "row", gap: 6, marginBottom: 8 },
  keypadBtn: { height: 56, width: 57.4, borderRadius: 12, justifyContent: "center", alignItems: "center", borderWidth: 1 },
  keypadBtnText: { fontSize: 20, fontWeight: "bold" },
  dropdownTrigger: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", borderWidth: 1, borderColor: "#DDD", borderRadius: 12, paddingHorizontal: 16, height: 48, marginBottom: 12 },
  dropdownText: { color: "#666" },
  finishBtn: { backgroundColor: Colors.primary, height: 56, borderRadius: 12, justifyContent: "center", alignItems: "center" },
  finishBtnText: { color: "#FFF", fontSize: 16, fontWeight: "bold" },
});

export default ScoreInputScreen;
