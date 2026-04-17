import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Modal,
  Image,
  Switch,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons, MaterialCommunityIcons, FontAwesome5 } from "@expo/vector-icons";
import { ScreenWrapper } from "@/components/common/ScreenWrapper";
import { BackHeader } from "@/components/common/BackHeader";
import { Colors } from "@/constants/colors";

const { width, height } = Dimensions.get("window");

interface PlayerScore {
  name: string;
  avatar: string;
  score: number;
  relative: number;
  id?: string;
}

const ScoreInputScreen = () => {
  const navigation = useNavigation();
  
  // States
  const [showHoleModal, setShowHoleModal] = useState(false);
  const [showLegendModal, setShowLegendModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [isAutoNext, setIsAutoNext] = useState(true);
  const [selectedHole, setSelectedHole] = useState<number | null>(null);

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

  const renderKeypadButton = (label: string | React.ReactNode, bgColor: string = "#0061AF", textColor: string = "#FFF") => (
    <TouchableOpacity style={[styles.keypadBtn, { backgroundColor: bgColor }]}>
      {typeof label === "string" ? (
        <Text style={[styles.keypadBtnText, { color: textColor }]}>{label}</Text>
      ) : label}
    </TouchableOpacity>
  );

  return (
    <ScreenWrapper extendBehindStatusBar={true}>
      <BackHeader
        title="Nhập điểm"
        onBack={() => navigation.goBack()}
        variant="clear"
        tintColor="#2D323A"
        rightAction={
          <TouchableOpacity onPress={() => setShowLegendModal(true)} style={styles.trophyBtn}>
            <Ionicons name="trophy-outline" size={20} color={Colors.primary} />
          </TouchableOpacity>
        }
      />

      <View style={styles.mainContainer}>
        <ScrollView style={styles.tableScrollView} showsVerticalScrollIndicator={false}>
          {/* Top Actions */}
          <View style={styles.actionRow}>
            <TouchableOpacity style={styles.actionItem}>
              <View style={[styles.iconWrapper, { backgroundColor: "#0061AF" }]}>
                <Ionicons name="golf" size={24} color="#FFF" />
              </View>
              <Text style={styles.actionLabel}>Xem chi tiết flight</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionItem}>
              <View style={[styles.iconWrapper, { backgroundColor: "#F0A030" }]}>
                <Ionicons name="bar-chart" size={24} color="#FFF" />
              </View>
              <Text style={styles.actionLabel}>Ranking</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionItem}>
              <View style={[styles.iconWrapper, { backgroundColor: "#F06050" }]}>
                <Ionicons name="create-outline" size={24} color="#FFF" />
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
                {players.map((p, idx) => (
                  <View key={idx} style={[styles.scoreCell, hole.id % 2 === 0 && styles.scoreCellHighlight]}>
                    <Text style={styles.scoreValueText}>{p.score}</Text>
                    <Text style={[styles.relativeTextSmall, { color: p.relative > 0 ? "#ED1C24" : "#1A7C24" }]}>
                      {p.relative > 0 ? `+${p.relative}` : p.relative === 0 ? "E" : p.relative}
                    </Text>
                  </View>
                ))}
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>

        {/* Persistant Keypad Section */}
        <View style={styles.bottomKeypadSection}>
          <View style={styles.keypadGrid}>
            <View style={styles.keypadRow}>
              {["-1", "0", "1", "2", "3"].map(n => <View key={n} style={{flex:1}}>{renderKeypadButton(n)}</View>)}
            </View>
            <View style={styles.keypadRow}>
              {["4", "5"].map(n => <View key={n} style={{flex:1}}>{renderKeypadButton(n)}</View>)}
              <View style={{flex:1}}>{renderKeypadButton(<Ionicons name="remove" size={24} color="#FFF" />, "#E50019")}</View>
              <View style={{flex:1}}>{renderKeypadButton(<Ionicons name="add" size={24} color="#FFF" />, "#00A651")}</View>
              <View style={{flex:1}}>{renderKeypadButton(<Ionicons name="chevron-down" size={24} color="#0061AF" />, "#F0F0F0")}</View>
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
      </View>

      {/* MODAL: KẾT QUẢ HỐ (IMAGE 1) */}
      <Modal visible={showHoleModal} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.holeDetailContent}>
            <View style={styles.modalHeaderRow}>
              <View style={{width: 24}} />
              <Text style={styles.modalTitle}>Kết quả hố <View style={styles.holeCircle}><Text style={styles.holeCircleText}>{selectedHole}</Text></View></Text>
              <TouchableOpacity onPress={() => setShowHoleModal(false)}><Ionicons name="close" size={24} color="#333" /></TouchableOpacity>
            </View>
            <Text style={styles.holeSpecsText}>302 yards    4 par    Index 5    <Ionicons name="help-circle-outline" size={16} color="#999" /></Text>
            
            <View style={styles.playerGrid}>
              {players.map((p, i) => (
                <View key={i} style={styles.playerScoreCard}>
                  <Image source={{ uri: p.avatar }} style={styles.playerAvatarLarge} />
                  <Text style={styles.playerNameModal}>{p.name}</Text>
                  <View style={[styles.scoreBadge, { backgroundColor: p.relative > 0 ? "#0061AF" : "#F8F9FA", borderWidth: p.relative <= 0 ? 1 : 0, borderColor: "#DDD" }]}>
                    <Text style={[styles.scoreBadgeText, { color: p.relative > 0 ? "#FFF" : "#0061AF" }]}>{p.relative > 0 ? `+${p.relative}` : p.relative}</Text>
                  </View>
                </View>
              ))}
            </View>

            <View style={styles.modalFooterActions}>
              <TouchableOpacity style={styles.outlineActionBtn}><Text style={styles.outlineActionText}>Chi tiết flight</Text></TouchableOpacity>
              <View style={styles.switchContainer}>
                <Switch value={isAutoNext} onValueChange={setIsAutoNext} trackColor={{ false: "#DDD", true: "#0061AF" }} />
                <Text style={styles.switchLabel}>Tự chuyển</Text>
              </View>
            </View>
          </View>
        </View>
      </Modal>

      {/* MODAL: CHÚ THÍCH (IMAGE 2) */}
      <Modal visible={showLegendModal} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={[styles.holeDetailContent, { paddingBottom: 30 }]}>
            <View style={styles.modalHeaderRow}>
              <TouchableOpacity onPress={() => setShowLegendModal(false)}><Ionicons name="chevron-back" size={24} color="#333" /></TouchableOpacity>
              <Text style={styles.modalTitle}>Chú thích</Text>
              <View style={{width: 24}} />
            </View>
            
            <View style={styles.legendCard}>
              <View style={styles.legendPlayersRow}>
                {players.map((p, i) => (
                  <View key={i} style={styles.legendPlayerItem}>
                    <View style={[styles.legendAvatarWrap, i === 0 && styles.borderGray, i === 1 && styles.borderBlack, i === 2 && styles.borderRed, i === 3 && styles.borderGreen]}>
                      <Image source={{ uri: p.avatar }} style={styles.legendAvatar} />
                    </View>
                    <Text style={styles.legendPlayerCode}>{String.fromCharCode(65 + i)}</Text>
                    <View style={[styles.miniScoreBadge]}><Text style={styles.miniScoreText}>+2</Text></View>
                  </View>
                ))}
              </View>
              <Text style={styles.legendDesc}>Để thuận tiện hơn trong việc tính điểm từng hố, chúng tôi đưa ra các ký hiệu minh hoạ hố chấp tại đây</Text>
              
              <View style={styles.legendItemList}>
                <View style={styles.legendItem}><View style={[styles.legendAvatarWrap, styles.borderBlack]}><Image source={{ uri: players[1].avatar }} style={styles.legendAvatar} /></View><Text style={styles.legendItemText}>Được chấp</Text></View>
                <View style={styles.legendItem}><View style={[styles.legendAvatarWrap, styles.borderRed]}><Image source={{ uri: players[2].avatar }} style={styles.legendAvatar} /></View><Text style={styles.legendItemText}>Không chấp</Text></View>
                <View style={styles.legendItem}><View style={[styles.legendAvatarWrap, styles.borderGreen]}><Image source={{ uri: players[3].avatar }} style={styles.legendAvatar} /></View><Text style={styles.legendItemText}>Chấp</Text></View>
              </View>

              <Text style={styles.legendFooterText}>Trong hố này A sẽ được chấp bởi B; A và C không chấp; A sẽ chấp D</Text>
            </View>
            
            <TouchableOpacity style={styles.continueLongBtn}>
              <Text style={styles.continueLongBtnText}>Tiếp tục (ngang)</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* MODAL: XÁC NHẬN KẾT THÚC (IMAGE 4) */}
      <Modal visible={showConfirmModal} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.confirmContent}>
            <Text style={styles.confirmTitle}>Thông báo</Text>
            <Text style={styles.confirmSubTitle}>Bạn có muốn xác nhận kết quả này không?</Text>
            
            <View style={styles.summaryTable}>
              <View style={styles.summaryHeader}>
                <View style={{flex: 1.5}} />
                <Text style={styles.summaryHeaderText}>Số gậy</Text>
                <Text style={styles.summaryHeaderText}>NET</Text>
                <Text style={styles.summaryHeaderText}>Skins</Text>
              </View>
              {players.map((p, i) => (
                <View key={i} style={styles.summaryRow}>
                  <View style={styles.summaryPlayerInfo}>
                    <Image source={{ uri: p.avatar }} style={styles.summaryAvatar} />
                    <Text style={styles.summaryPlayerName}>{p.name}</Text>
                  </View>
                  <Text style={styles.summaryValue}>+15</Text>
                  <Text style={styles.summaryValue}>5</Text>
                  <Text style={[styles.summaryValue, { color: "#ED1C24" }]}>-1</Text>
                </View>
              ))}
            </View>

            <View style={styles.confirmActions}>
              <TouchableOpacity style={styles.cancelConfirmBtn} onPress={() => setShowConfirmModal(false)}>
                <Text style={styles.cancelConfirmText}>Huỷ</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.okConfirmBtn} onPress={() => navigation.goBack()}>
                <Text style={styles.okConfirmText}>Xác nhận</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  mainContainer: { flex: 1, marginTop: 100 },
  tableScrollView: { flex: 1 },
  actionRow: { flexDirection: "row", justifyContent: "space-between", paddingHorizontal: 16, paddingVertical: 16 },
  actionItem: { alignItems: "center", width: width / 3 - 20 },
  iconWrapper: { width: 44, height: 44, borderRadius: 22, justifyContent: "center", alignItems: "center", marginBottom: 6 },
  actionLabel: { fontSize: 9, color: "#333", textAlign: "center", fontWeight: "500" },
  trophyBtn: { width: 32, height: 32, borderRadius: 16, backgroundColor: "#EAF6FF", justifyContent: "center", alignItems: "center" },
  
  tableContainer: { borderTopWidth: 1, borderTopColor: "#DFE5EB" },
  tableHeader: { flexDirection: "row", backgroundColor: Colors.primary },
  headerText: { color: "#FFF", fontWeight: "600", fontSize: 13 },
  holeHeaderCell: { width: 50, paddingVertical: 12, alignItems: "center", borderRightWidth: 0.5, borderRightColor: "rgba(255,255,255,0.2)" },
  playerHeaderCell: { flex: 1, paddingVertical: 8, alignItems: "center", borderRightWidth: 0.5, borderRightColor: "rgba(255,255,255,0.2)" },
  playerIdTag: { backgroundColor: "rgba(255,255,255,0.2)", paddingHorizontal: 5, paddingVertical: 1, borderRadius: 10, marginTop: 2 },
  playerIdText: { color: "#FFF", fontSize: 9 },
  courseHeader: { backgroundColor: "#EAF6FF", paddingVertical: 8, alignItems: "center" },
  courseHeaderText: { color: Colors.primary, fontWeight: "bold", fontSize: 13 },
  holeRow: { flexDirection: "row", borderBottomWidth: 1, borderBottomColor: "#DFE5EB" },
  holeInfoCell: { width: 50, backgroundColor: "#F8F8F8", alignItems: "center", paddingVertical: 6, borderRightWidth: 1, borderRightColor: "#DFE5EB" },
  holeNumberBadge: { width: 24, height: 24, borderRadius: 12, borderWidth: 1, borderColor: "#DDD", justifyContent: "center", alignItems: "center", backgroundColor: "#FFF" },
  holeNumberText: { fontWeight: "bold", fontSize: 12, color: "#333" },
  holeSubText: { fontSize: 7, color: "#999" },
  parText: { fontSize: 10, fontWeight: "700", position: "absolute", top: 4, right: 4 },
  scoreCell: { flex: 1, justifyContent: "center", alignItems: "center", borderRightWidth: 1, borderRightColor: "#DFE5EB", paddingVertical: 10 },
  scoreCellHighlight: { backgroundColor: "#F9FAFB" },
  scoreValueText: { fontSize: 16, fontWeight: "500" },
  relativeTextSmall: { fontSize: 10, position: "absolute", top: 2, right: 4, fontWeight: "600" },

  bottomKeypadSection: { backgroundColor: "#FFF", paddingHorizontal: 16, paddingVertical: 12, borderTopWidth: 1, borderTopColor: "#EEE" },
  keypadGrid: { marginBottom: 12 },
  keypadRow: { flexDirection: "row", gap: 8, marginBottom: 8 },
  keypadBtn: { height: 50, borderRadius: 12, justifyContent: "center", alignItems: "center" },
  keypadBtnText: { fontSize: 20, fontWeight: "bold" },
  dropdownTrigger: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", borderWidth: 1, borderColor: "#DDD", borderRadius: 12, paddingHorizontal: 16, height: 48, marginBottom: 12 },
  dropdownText: { color: "#666" },
  finishBtn: { backgroundColor: Colors.primary, height: 56, borderRadius: 12, justifyContent: "center", alignItems: "center" },
  finishBtnText: { color: "#FFF", fontSize: 16, fontWeight: "bold" },

  modalOverlay: { flex: 1, backgroundColor: "rgba(0,0,0,0.4)", justifyContent: "center", alignItems: "center" },
  holeDetailContent: { width: width * 0.9, backgroundColor: "#FFF", borderRadius: 24, padding: 20 },
  modalHeaderRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 12 },
  modalTitle: { fontSize: 18, fontWeight: "bold", textAlign: "center" },
  holeCircle: { width: 26, height: 26, borderRadius: 13, borderWidth: 1, borderColor: "#DDD", justifyContent: "center", alignItems: "center" },
  holeCircleText: { fontSize: 14, fontWeight: "bold" },
  holeSpecsText: { textAlign: "center", color: "#666", fontSize: 14, marginBottom: 20 },
  playerGrid: { flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between", gap: 10 },
  playerScoreCard: { width: (width * 0.9 - 60) / 4, alignItems: "center", backgroundColor: "#F8F9FA", borderRadius: 16, paddingVertical: 12 },
  playerAvatarLarge: { width: 36, height: 36, borderRadius: 18, marginBottom: 6 },
  playerNameModal: { fontSize: 10, color: "#666", marginBottom: 8 },
  scoreBadge: { width: 36, height: 24, borderRadius: 12, justifyContent: "center", alignItems: "center" },
  scoreBadgeText: { fontSize: 12, fontWeight: "bold" },
  modalFooterActions: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginTop: 24 },
  outlineActionBtn: { borderWidth: 1, borderColor: "#333", borderRadius: 12, paddingHorizontal: 20, paddingVertical: 10, width: "50%" },
  outlineActionText: { textAlign: "center", fontWeight: "600" },
  switchContainer: { flexDirection: "row", alignItems: "center", gap: 8 },
  switchLabel: { fontSize: 14, fontWeight: "500" },

  legendCard: { marginVertical: 16 },
  legendPlayersRow: { flexDirection: "row", justifyContent: "space-between", marginBottom: 20 },
  legendPlayerItem: { alignItems: "center" },
  legendAvatarWrap: { width: 44, height: 44, borderRadius: 22, padding: 2, backgroundColor: "#FFF" },
  legendAvatar: { width: "100%", height: "100%", borderRadius: 21 },
  borderGray: { borderWidth: 2, borderColor: "#DDD" },
  borderBlack: { borderWidth: 2, borderColor: "#333" },
  borderRed: { borderWidth: 2, borderColor: "#ED1C24" },
  borderGreen: { borderWidth: 2, borderColor: "#00A651" },
  legendPlayerCode: { marginTop: 4, fontWeight: "600" },
  miniScoreBadge: { backgroundColor: "#0061AF20", paddingHorizontal: 6, paddingVertical: 2, borderRadius: 10, marginTop: 4 },
  miniScoreText: { color: "#0061AF", fontSize: 10, fontWeight: "bold" },
  legendDesc: { color: "#333", lineHeight: 20, marginBottom: 16 },
  legendItemList: { gap: 12, marginBottom: 16 },
  legendItem: { flexDirection: "row", alignItems: "center", gap: 12 },
  legendItemText: { fontSize: 14, fontWeight: "500" },
  legendFooterText: { fontSize: 13, color: "#333", fontStyle: "italic" },
  continueLongBtn: { backgroundColor: "#F0F0F0", height: 50, borderRadius: 12, justifyContent: "center", alignItems: "center", borderWidth: 1, borderColor: "#DDD" },
  continueLongBtnText: { fontWeight: "bold" },

  confirmContent: { width: width * 0.85, backgroundColor: "#FFF", borderRadius: 24, padding: 24 },
  confirmTitle: { fontSize: 20, fontWeight: "bold", textAlign: "center", marginBottom: 8 },
  confirmSubTitle: { textAlign: "center", color: "#666", marginBottom: 20 },
  summaryTable: { borderWidth: 1, borderColor: "#EAF6FF", borderRadius: 16, overflow: "hidden", marginBottom: 24 },
  summaryHeader: { flexDirection: "row", backgroundColor: "#F9FAFB", paddingVertical: 10, paddingHorizontal: 12 },
  summaryHeaderText: { flex: 1, textAlign: "center", fontSize: 12, color: "#666" },
  summaryRow: { flexDirection: "row", alignItems: "center", paddingVertical: 10, paddingHorizontal: 12, borderTopWidth: 1, borderTopColor: "#F0F0F0" },
  summaryPlayerInfo: { flex: 1.5, flexDirection: "row", alignItems: "center", gap: 8 },
  summaryAvatar: { width: 28, height: 28, borderRadius: 14 },
  summaryPlayerName: { fontSize: 12, fontWeight: "500" },
  summaryValue: { flex: 1, textAlign: "center", fontSize: 14, fontWeight: "bold", color: "#0061AF" },
  confirmActions: { flexDirection: "row", gap: 12 },
  cancelConfirmBtn: { flex: 1, height: 48, borderRadius: 12, borderWidth: 1, borderColor: "#0061AF", justifyContent: "center", alignItems: "center" },
  cancelConfirmText: { color: "#0061AF", fontWeight: "bold" },
  okConfirmBtn: { flex: 1, height: 48, borderRadius: 12, backgroundColor: "#0061AF", justifyContent: "center", alignItems: "center" },
  okConfirmText: { color: "#FFF", fontWeight: "bold" },
});

export default ScoreInputScreen;
