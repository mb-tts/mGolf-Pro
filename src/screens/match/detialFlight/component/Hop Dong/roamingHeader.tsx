import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Modal,
  TouchableWithoutFeedback,
  ScrollView,
} from "react-native";
import { Ionicons, FontAwesome5 } from "@expo/vector-icons";

// Đảm bảo đường dẫn import đúng với project của bạn
import { MOCK_FLIGHTS } from "./Roaming/mockData";
import SelectPlayerModal from "./Roaming/SelectPlayerModal";
import { SelectedPlayers } from "./Roaming/index";

type FilterType = "Đi" | "Về" | "Tất cả";

interface RoamingPlayer {
  name: string;
  goScore: number;
  backScore: number;
  totalScore: number;
}

interface RoamingMatch {
  id: string;
  index: number;
  player1: RoamingPlayer;
  player2: RoamingPlayer;
}

const mockRoamingData: RoamingMatch[] = [
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

// Component hiển thị từng hàng điểm số (Đi / Về / Tổng)
const ScoreRow = ({
  score1,
  score2,
  isP1Winner,
  hasBorder,
  showVs,
}: {
  score1: number;
  score2: number;
  isP1Winner: boolean;
  hasBorder?: boolean;
  showVs?: boolean;
}) => (
  <View style={styles.scoreRowContainer}>
    {/* Điểm Player 1 */}
    <View style={styles.scoreBlock}>
      <View style={[styles.scoreInner, hasBorder && styles.scoreBorder]}>
        <Text style={[styles.scoreValue, !isP1Winner && styles.dimmedText]}>
          {score1}
        </Text>
        <Image
          source={require("@assets/images/chip.png")}
          style={styles.chipIcon}
        />
      </View>
    </View>

    {/* Chữ VS ở giữa */}
    <View style={styles.vsContainer}>
      {showVs && <Text style={styles.vsText}>vs</Text>}
    </View>

    {/* Điểm Player 2 */}
    <View style={styles.scoreBlock}>
      <View style={[styles.scoreInner, hasBorder && styles.scoreBorder]}>
        <Text style={[styles.scoreValue, isP1Winner && styles.dimmedText]}>
          {score2}
        </Text>
        <Image
          source={require("@assets/images/chip.png")}
          style={styles.chipIcon}
        />
      </View>
    </View>
  </View>
);

const RoamingCard = ({ match }: { match: RoamingMatch }) => {
  const { player1, player2, index } = match;
  const isP1Winner = player1.totalScore >= player2.totalScore;

  return (
    <View style={styles.card}>
      {/* CỘT TRÁI: Index và các nút Đi/Về/Tổng */}
      <View style={styles.leftCol}>
        <View style={styles.indexCircle}>
          <Text style={styles.indexText}>{index}</Text>
        </View>
        <View style={styles.sideBadge}>
          <Text style={styles.sideBadgeText}>Đi</Text>
        </View>
        <View style={styles.sideBadge}>
          <Text style={styles.sideBadgeText}>Về</Text>
        </View>
        <View style={styles.sideBadge}>
          <Text style={styles.sideBadgeText}>Tổng</Text>
        </View>
      </View>

      {/* CỘT PHẢI: Tên người chơi và điểm số dọc */}
      <View style={styles.rightCol}>
        <View style={styles.nameHeader}>
          <View style={[styles.nameWrapper, { justifyContent: "center", paddingRight: 20 }]}>
            <Text style={[styles.playerName, !isP1Winner && styles.dimmedText]}>
              {player1.name}
            </Text>
            {isP1Winner && (
              <FontAwesome5 name="crown" size={12} color="#F59E0B" style={styles.crown} />
            )}
          </View>
          <View style={[styles.nameWrapper, { justifyContent: "center", paddingLeft: 20 }]}>
            <Text style={[styles.playerName, isP1Winner && styles.dimmedText]}>
              {player2.name}
            </Text>
            {!isP1Winner && (
              <FontAwesome5 name="crown" size={12} color="#F59E0B" style={styles.crown} />
            )}
          </View>
        </View>

        <View style={styles.scoresGrid}>
          <ScoreRow score1={player1.goScore} score2={player2.goScore} isP1Winner={isP1Winner} hasBorder />
          <ScoreRow score1={player1.backScore} score2={player2.backScore} isP1Winner={isP1Winner} hasBorder showVs />
          <ScoreRow score1={player1.totalScore} score2={player2.totalScore} isP1Winner={isP1Winner} />
        </View>
      </View>
    </View>
  );
};

export default function ContractScreen() {
  const [filter, setFilter] = useState<FilterType>("Tất cả");
  const [filterModalVisible, setFilterModalVisible] = useState(false);
  const [selectPlayerVisible, setSelectPlayerVisible] = useState(false);

  const [selectedPlayers, setSelectedPlayers] = useState<SelectedPlayers>({
    player1: null,
    player2: null,
  });

  // State lưu trữ trận đấu tùy chỉnh sau khi chọn 2 người
  const [activeMatch, setActiveMatch] = useState<RoamingMatch | null>(null);

  const handleStart = (selected: SelectedPlayers) => {
    setSelectedPlayers(selected);
    setSelectPlayerVisible(false);

    if (selected.player1 && selected.player2) {
      // Rút gọn tên hiển thị (vd: Nguyễn Văn Anh -> Văn Anh)
      const p1Name = selected.player1.name.split(" ").slice(-2).join(" ");
      const p2Name = selected.player2.name.split(" ").slice(-2).join(" ");

      setActiveMatch({
        id: "active_roaming_match",
        index: 1,
        player1: { name: p1Name, goScore: -6, backScore: -5, totalScore: -11 },
        player2: { name: p2Name, goScore: -8, backScore: -8, totalScore: -16 },
      });
    }
  };

  const handleReset = () => {
    setSelectedPlayers({ player1: null, player2: null });
    setActiveMatch(null);
  };

  // Avatar hiển thị trên Header (Overlap nhau)
  const renderAvatars = () => {
    if (activeMatch && selectedPlayers.player1 && selectedPlayers.player2) {
      return (
        <View style={styles.avatarGroup}>
          <Image source={{ uri: selectedPlayers.player1.image }} style={[styles.headerAvatar, { zIndex: 2 }]} />
          <Image source={{ uri: selectedPlayers.player2.image }} style={[styles.headerAvatar, styles.avatarOverlap, { zIndex: 1 }]} />
        </View>
      );
    }
    // Mock 4 avatars lúc chưa chọn
    return (
      <View style={styles.avatarGroup}>
        {[1, 2, 3, 4].map((i, index) => (
          <Image
            key={i}
            source={{ uri: `https://i.pravatar.cc/150?u=${i}` }}
            style={[
              styles.headerAvatar,
              index > 0 && styles.avatarOverlap,
              { zIndex: 10 - index }
            ]}
          />
        ))}
      </View>
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#FFF" }}>
      <View style={styles.headerContainer}>
        {renderAvatars()}

        <View style={styles.actionGroup}>
          <TouchableOpacity
            style={styles.roamingBtn}
            onPress={() => setSelectPlayerVisible(true)}
          >
            <Text style={styles.roamingText}>Roaming</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.filterBtn}
            onPress={() => setFilterModalVisible(true)}
          >
            <Ionicons name="options-outline" size={20} color="#0062C4" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView contentContainerStyle={{ padding: 16 }}>
        {activeMatch ? (
          // Trạng thái: Đã chọn 2 người chơi
          <>
            <RoamingCard match={activeMatch} />
            <TouchableOpacity style={styles.resetMainBtn} onPress={handleReset}>
              <Text style={styles.resetMainBtnText}>Đặt lại</Text>
            </TouchableOpacity>
          </>
        ) : (
          // Trạng thái ban đầu: Hiển thị danh sách mockData
          mockRoamingData.map((item) => (
            <RoamingCard key={item.id} match={item} />
          ))
        )}
      </ScrollView>

      <SelectPlayerModal
        visible={selectPlayerVisible}
        flights={MOCK_FLIGHTS}
        onClose={() => setSelectPlayerVisible(false)}
        onStart={handleStart}
      />

      <FilterModalSheet
        visible={filterModalVisible}
        onClose={() => setFilterModalVisible(false)}
        currentFilter={filter}
        onSelect={(val: FilterType) => {
          setFilter(val);
          setFilterModalVisible(false);
        }}
      />
    </View>
  );
}

// Giữ nguyên FilterModalSheet
const FilterModalSheet = ({ visible, onClose, onSelect, currentFilter }: any) => {
  const options: FilterType[] = ["Đi", "Về", "Tất cả"];
  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.modalOverlay}>
          <TouchableWithoutFeedback>
            <View style={styles.modalContent}>
              <View style={styles.modalHeader}>
                <View style={styles.modalHandle} />
                <Text style={styles.modalTitle}>Bộ lọc</Text>
                <TouchableOpacity onPress={onClose} style={styles.closeIcon}>
                  <Ionicons name="close" size={24} color="#333" />
                </TouchableOpacity>
              </View>

              <View style={styles.optionsContainer}>
                {options.map((opt) => (
                  <TouchableOpacity key={opt} onPress={() => onSelect(opt)} style={styles.optionItem}>
                    <Text style={[styles.optionText, currentFilter === opt && styles.optionTextActive]}>
                      {opt}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
    backgroundColor: "#FFF",
  },
  avatarGroup: { flexDirection: "row", alignItems: "center" },
  headerAvatar: {
    width: 38,
    height: 38,
    borderRadius: 19,
    borderWidth: 2,
    borderColor: "#FFF",
    backgroundColor: "#eee",
  },
  avatarOverlap: {
    marginLeft: 5,
  },
  actionGroup: { flexDirection: "row", gap: 10, alignItems: "center" },
  roamingBtn: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: "#0062C4", // Màu xanh dương nhạt
  },
  roamingText: { color: "#0062C4", fontWeight: "500", fontSize: 14 },
  filterBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    justifyContent: "center",
    alignItems: "center",
  },

  // RoamingCard Styles
  card: {
    backgroundColor: "#F9FAFB",
    borderRadius: 16,
    flexDirection: "row",
    padding: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#F3F4F6",
  },
  leftCol: {
    width: 65,
    alignItems: "center",
    borderRightWidth: 1,
    borderRightColor: "#E5E7EB",
    paddingRight: 12,
  },
  indexCircle: {
    width: 26,
    height: 26,
    borderRadius: 13,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
    marginTop: 4,
    backgroundColor: "#FFF",
  },
  indexText: { fontSize: 12, color: "#374151", fontWeight: "600" },
  sideBadge: {
    width: "100%",
    paddingVertical: 6,
    borderRadius: 14,
    backgroundColor: "#FFF",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    alignItems: "center",
    marginBottom: 12,
  },
  sideBadgeText: { fontSize: 13, color: "#4B5563" },

  rightCol: { flex: 1, paddingLeft: 12 },
  nameHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
    marginTop: 8,
  },
  nameWrapper: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  playerName: { fontSize: 14, fontWeight: "500", color: "#111" },
  crown: { marginLeft: 6 },
  dimmedText: { color: "#9CA3AF" },

  // Grid Styles
  scoresGrid: {
    flex: 1,
  },
  scoreRowContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  scoreBlock: {
    flex: 1,
    alignItems: "center",
  },
  scoreInner: {
    flexDirection: "row",
    alignItems: "center",
    paddingBottom: 8,
    width: "60%", // Rút ngắn chiều dài của vạch kẻ ngang
    justifyContent: "center",
  },
  scoreBorder: {
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
  },
  vsContainer: {
    width: 30,
    alignItems: "center",
  },
  scoreValue: { fontSize: 15, color: "#111", fontWeight: "500", marginRight: 4 },
  chipIcon: { width: 14, height: 14 },
  vsText: { fontSize: 12, color: "#111", fontWeight: "600", marginTop: -8 },

  resetMainBtn: {
    alignItems: "center",
    paddingVertical: 16,
  },
  resetMainBtnText: {
    color: "#0062C4",
    fontSize: 15,
    fontWeight: "500",
  },

  // Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: "#FFF",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    paddingBottom: 40,
  },
  modalHeader: { alignItems: "center", marginBottom: 20 },
  modalHandle: {
    width: 40,
    height: 4,
    backgroundColor: "#E5E7EB",
    borderRadius: 2,
    marginBottom: 15,
  },
  modalTitle: { fontSize: 16, fontWeight: "600", color: "#111" },
  closeIcon: { position: "absolute", right: 0, top: 10 },
  optionsContainer: { alignItems: "center", gap: 10 },
  optionItem: { width: "100%", alignItems: "center", paddingVertical: 15 },
  optionText: { fontSize: 15, color: "#4B5563" },
  optionTextActive: { color: "#0062C4", fontWeight: "600" },
});