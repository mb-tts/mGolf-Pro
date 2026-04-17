import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Modal,
  ScrollView,
  Alert,
  Dimensions,
} from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AppStackParamList } from "@/types/navigation.types";
import { MOCK_ALL_PLAYERS } from "./mock-data";
// ─── TYPES & MOCK DATA (Lấy từ file của bạn) ──────────────────────────────────
export interface Player {
  id: string;
  name: string;
  avatar: string;
  index: number;
  hdc: number;
  vga: string;
  isOwner: boolean;
  isSelected?: boolean;
}

type Team = Player[]; // Sẽ chứa 0 hoặc 2 Player
type Match = { id: number; teamA: Team; teamB: Team };

const { height } = Dimensions.get("window");

// ─── COMPONENT MAIN ──────────────────────────────────────────────────────────
export default function TeamXoayScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<AppStackParamList>>();

  // State lưu 3 trận đấu
  const [matches, setMatches] = useState<Match[]>([
    { id: 1, teamA: [], teamB: [] },
    { id: 2, teamA: [], teamB: [] },
    { id: 3, teamA: [], teamB: [] },
  ]);

  // States cho Modal chọn người
  const [modalVisible, setModalVisible] = useState(false);
  const [targetSlot, setTargetSlot] = useState<{ matchIndex: number; isTeamA: boolean } | null>(null);
  const [tempSelectedPlayers, setTempSelectedPlayers] = useState<Player[]>([]);

  // Helper: compute IDs that are already assigned in other slots (to hide in modal)
  const computeAssignedIds = (currentMatchIndex?: number, selectingTeamA?: boolean) => {
    const ids = new Set<string>();
    if (currentMatchIndex === undefined) return ids;
    const match = matches[currentMatchIndex];
    if (!match) return ids;
    // Only exclude players assigned in the opposite team within the same match
    if (selectingTeamA) {
      match.teamB.forEach((p) => ids.add(p.id));
    } else {
      match.teamA.forEach((p) => ids.add(p.id));
    }
    return ids;
  };

  // ─── LOGIC KIỂM TRA ĐỒNG ĐỘI ───────────────────────────────────────────────
  // Trả về true nếu 2 người này đã từng là đồng đội trong một team ở bất kỳ trận nào
  const isPairAlreadyTeammates = (p1: Player, p2: Player, currentMatchIndex: number) => {
    for (let i = 0; i < matches.length; i++) {
      if (i === currentMatchIndex) continue; // Bỏ qua trận hiện tại đang xét
      const match = matches[i];
      
      const checkTeam = (team: Team) => {
        if (team.length === 2) {
          const ids = team.map((p) => p.id);
          return ids.includes(p1.id) && ids.includes(p2.id);
        }
        return false;
      };

      if (checkTeam(match.teamA) || checkTeam(match.teamB)) return true;
    }
    return false;
  };

  // ─── ACTIONS MỞ/ĐÓNG MODAL & CHỌN NGƯỜI ────────────────────────────────────
  const openPlayerSelection = (matchIndex: number, isTeamA: boolean) => {
    setTargetSlot({ matchIndex, isTeamA });
    const currentTeam = isTeamA ? matches[matchIndex].teamA : matches[matchIndex].teamB;
    setTempSelectedPlayers([...currentTeam]);
    setModalVisible(true);
  };

  const togglePlayerSelection = (player: Player) => {
    const isSelected = tempSelectedPlayers.find((p) => p.id === player.id);
    if (isSelected) {
      setTempSelectedPlayers(tempSelectedPlayers.filter((p) => p.id !== player.id));
    } else {
      if (tempSelectedPlayers.length < 2) {
        setTempSelectedPlayers([...tempSelectedPlayers, player]);
      } else {
        Alert.alert("Thông báo", "Chỉ được chọn tối đa 2 người cho một cặp đấu.");
      }
    }
  };

  const handleConfirmTeam = () => {
    if (tempSelectedPlayers.length !== 2) {
      Alert.alert("Lỗi", "Vui lòng chọn đủ 2 người chơi để tạo cặp đấu.");
      return;
    }

    if (targetSlot) {
      // KIỂM TRA LUẬT: Cặp này đã từng ghép chưa?
      if (isPairAlreadyTeammates(tempSelectedPlayers[0], tempSelectedPlayers[1], targetSlot.matchIndex)) {
        Alert.alert(
          "Cặp đấu không hợp lệ", 
          "Hai người chơi này đã là đồng đội của nhau ở trận khác. Vui lòng chọn cặp khác!"
        );
        return;
      }

      // Hợp lệ -> Lưu vào State
      const newMatches = [...matches];
      if (targetSlot.isTeamA) {
        newMatches[targetSlot.matchIndex].teamA = tempSelectedPlayers;
      } else {
        newMatches[targetSlot.matchIndex].teamB = tempSelectedPlayers;
      }
      setMatches(newMatches);
      setModalVisible(false);
    }
  };

  // Tính năng random chia team xoay vòng tiêu chuẩn cho 4 người đầu tiên
  const generateRandomTeams = () => {
    const available = MOCK_ALL_PLAYERS.filter((p) => p.isSelected);
    if (available.length < 4) return;
    const p = available.slice(0, 4); // Lấy 4 người đầu đã chọn
    setMatches([
      { id: 1, teamA: [p[0], p[1]], teamB: [p[2], p[3]] },
      { id: 2, teamA: [p[0], p[2]], teamB: [p[1], p[3]] },
      { id: 3, teamA: [p[0], p[3]], teamB: [p[1], p[2]] },
    ]);
  };

  // Format tên viết tắt (VD: Nguyễn Văn Anh -> N.Anh)
  const formatShortName = (fullName: string) => {
    const parts = fullName.split(" ");
    if (parts.length < 2) return fullName;
    const firstInitial = parts[0].charAt(0);
    const lastName = parts[parts.length - 1];
    return `${firstInitial}.${lastName}`;
  };

  // Render Box chứa Team (Trống hoặc Đã chọn)
  const renderTeamBox = (team: Team, matchIndex: number, isTeamA: boolean) => {
    const isEmpty = team.length === 0;

    return (
      <TouchableOpacity
        style={styles.teamBox}
        onPress={() => openPlayerSelection(matchIndex, isTeamA)}
      >
        {isEmpty ? (
          <Text style={styles.emptyText}>Chọn cặp đấu</Text>
        ) : (
          <View style={styles.teamPlayersWrap}>
            {team.map((player, idx) => (
              <View key={idx} style={styles.playerAvatarItem}>
                <Image source={{ uri: player.avatar }} style={styles.avatarImg} />
                <Text style={styles.shortNameText} numberOfLines={1}>
                  {formatShortName(player.name)}
                </Text>
              </View>
            ))}
          </View>
        )}
      </TouchableOpacity>
    );
  };

  const insets = useSafeAreaInsets();

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={24} color="#333" />
        </TouchableOpacity>
      </View>
      
      <Text style={styles.title}>Trận đấu sắp bắt đầu...</Text>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.cardContainer}>
          <Text style={styles.subTitle}>Thứ tự chơi team xoay</Text>

          {/* DANH SÁCH 3 TRẬN ĐẤU */}
          {matches.map((match, index) => (
            <View key={match.id} style={styles.matchRow}>
              {renderTeamBox(match.teamA, index, true)}
              
              <View style={styles.vsBadge}>
                <Text style={styles.vsText}>vs</Text>
              </View>
              
              {renderTeamBox(match.teamB, index, false)}
            </View>
          ))}

          {/* NÚT ACTION NHỎ */}
          <View style={styles.actionRow}>
            <TouchableOpacity style={styles.smallOutlineBtn}>
              <Ionicons name="person-outline" size={16} color="#0061AF" style={{ marginRight: 6 }} />
              <Text style={styles.smallOutlineText}>Tuỳ chỉnh team</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.smallFillBtn} onPress={generateRandomTeams}>
              <Ionicons name="refresh-outline" size={16} color="#FFF" style={{ marginRight: 6 }} />
              <Text style={styles.smallFillText}>Team ngẫu nhiên</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      {/* FOOTER NÚT VÀO TRẬN ĐẤU */}
      <View style={[styles.footerWrap, { paddingBottom: insets.bottom }]}>
        <View style={styles.footer}>
          <TouchableOpacity
            style={styles.continueBtn}
            activeOpacity={0.8}
            onPress={() => navigation.navigate("ScoreInputScreen")}
          >
            <Text style={styles.continueText}>Vào trận đấu</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* MODAL CHỌN NGƯỜI CHƠI */}
      <Modal visible={modalVisible} transparent={true} animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Chọn cặp đấu</Text>
              <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.closeBtn}>
                <Ionicons name="close" size={24} color="#333" />
              </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
              {(() => {
                const assignedIds = computeAssignedIds(targetSlot?.matchIndex, targetSlot?.isTeamA);
                const available = MOCK_ALL_PLAYERS
                  .filter((p) => p.isSelected)
                  .filter((p) => {
                    // keep those already in tempSelectedPlayers so user can unselect
                    if (tempSelectedPlayers.some((tp) => tp.id === p.id)) return true;
                    // hide if assigned in other slots or (if selecting teamB) already in any teamA
                    return !assignedIds.has(p.id);
                  });

                return available.map((player) => {
                  const isSelected = tempSelectedPlayers.some((p) => p.id === player.id);
                  return (
                    <TouchableOpacity
                      key={player.id}
                      style={styles.playerItem}
                      activeOpacity={0.7}
                      onPress={() => togglePlayerSelection(player)}
                    >
                      <Image source={{ uri: player.avatar }} style={styles.modalAvatar} />
                      <View style={styles.playerInfo}>
                        <Text style={styles.playerName}>{player.name}</Text>
                        <View style={styles.playerStatsRow}>
                          <Text style={styles.statTag}>Index {player.index}</Text>
                          <Text style={styles.statTag}>HDC {player.hdc}</Text>
                          <Text style={styles.statTagText}>VGA: {player.vga}</Text>
                        </View>
                      </View>
                      <View style={[styles.checkbox, isSelected && styles.checkboxActive]}>
                        {isSelected && <Ionicons name="checkmark" size={14} color="#FFF" />}
                      </View>
                    </TouchableOpacity>
                  );
                });
              })()}
            </ScrollView>

            <View style={styles.modalFooter}>
              <TouchableOpacity style={styles.mainBtn} onPress={handleConfirmTeam}>
                <Text style={styles.mainBtnText}>Xác nhận</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

// ─── STYLES ──────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F9FA",
  },
  header: {
    paddingHorizontal: 16,
    paddingTop: 10,
    marginBottom: 20,
  },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#FFF",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1A1A1A",
    marginHorizontal: 16,
    marginBottom: 20,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 100,
  },
  cardContainer: {
    backgroundColor: "#FFF",
    borderRadius: 16,
    padding: 16,
    shadowColor: "#000",
    shadowOpacity: 0.03,
    shadowRadius: 10,
    elevation: 2,
  },
  subTitle: {
    fontSize: 14,
    color: "#666",
    marginBottom: 16,
  },
  matchRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  teamBox: {
    flex: 1,
    height: 60,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFF",
  },
  emptyText: {
    color: "#0061AF",
    fontSize: 13,
    fontWeight: "500",
  },
  teamPlayersWrap: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    width: "100%",
    paddingHorizontal: 8,
  },
  playerAvatarItem: {
    alignItems: "center",
  },
  avatarImg: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginBottom: 4,
    backgroundColor: "#EEE",
  },
  shortNameText: {
    fontSize: 10,
    color: "#333",
    maxWidth: 50,
  },
  vsBadge: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "#F3F4F6",
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 8,
  },
  vsText: {
    fontSize: 12,
    color: "#666",
    fontWeight: "600",
  },
  actionRow: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 12,
    marginTop: 10,
  },
  smallOutlineBtn: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#0061AF",
  },
  smallOutlineText: {
    color: "#0061AF",
    fontSize: 13,
    fontWeight: "500",
  },
  smallFillBtn: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: "#0061AF",
  },
  smallFillText: {
    color: "#FFF",
    fontSize: 13,
    fontWeight: "500",
  },
  footer: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: "#FFF",
    borderTopWidth: 1,
    borderColor: "#EEE", 
  },
  mainBtn: {
    backgroundColor: "#0061AF",
    height: 50,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  mainBtnText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "600",
  },

  /* MODAL STYLES */
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: "#FFF",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    height: height * 0.7,
    paddingTop: 16,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderColor: "#EEE",
    position: "relative",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1A1A1A",
  },
  closeBtn: {
    position: "absolute",
    right: 16,
    top: 0,
  },
  playerItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderColor: "#F3F4F6",
  },
  modalAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 12,
  },
  playerInfo: {
    flex: 1,
  },
  playerName: {
    fontSize: 15,
    fontWeight: "500",
    color: "#1A1A1A",
    marginBottom: 4,
  },
  playerStatsRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  statTag: {
    fontSize: 11,
    color: "#0061AF",
    backgroundColor: "#E6F0F9",
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  statTagText: {
    fontSize: 11,
    color: "#666",
  },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 1.5,
    borderColor: "#CCC",
    alignItems: "center",
    justifyContent: "center",
  },
  checkboxActive: {
    backgroundColor: "#0061AF",
    borderColor: "#0061AF",
  },
  modalFooter: {
    padding: 16,
    borderTopWidth: 1,
    borderColor: "#EEE",
    paddingBottom: 30, // SafeArea cho iPhone X+
  },
  footerWrap: { backgroundColor: "#FFF", borderTopWidth: 1, borderTopColor: "#F0F0F0" },
  continueBtn: {
    height: 56, borderRadius: 16, backgroundColor: "#0061AF",
    justifyContent: "center", alignItems: "center",
  },
  continueText: { fontSize: 16, fontWeight: "700", color: "#FFF" },
});