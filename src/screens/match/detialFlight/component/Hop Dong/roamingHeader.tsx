import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import { Ionicons, FontAwesome5 } from "@expo/vector-icons";

import { MOCK_FLIGHTS } from "./Roaming/mockData";
import SelectPlayerModal from "./Roaming/SelectPlayerModal";
import { SelectedPlayers } from "./Roaming/";
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

const ScoreRow = ({ label1, label2, isP1Winner }: any) => (
  <View style={styles.scoreRow}>
    <View style={styles.scoreBox}>
      <Text style={[styles.scoreValue, !isP1Winner && styles.dimmedText]}>
        {label1}
      </Text>
      <Image
        source={require("@assets/images/chip.png")}
        style={styles.chipIcon}
      />
    </View>
    <Text style={styles.vsText}>vs</Text>
    <View style={styles.scoreBox}>
      <Text style={[styles.scoreValue, isP1Winner && styles.dimmedText]}>
        {label2}
      </Text>
      <Image
        source={require("@assets/images/chip.png")}
        style={styles.chipIcon}
      />
    </View>
  </View>
);

const RoamingCard = ({
  match,
  activeFilter,
}: {
  match: RoamingMatch;
  activeFilter: FilterType;
}) => {
  const { player1, player2, index } = match;
  const isP1Winner = player1.totalScore > player2.totalScore;

  return (
    <View style={styles.card}>
      <View style={styles.leftCol}>
        <View style={styles.indexCircle}>
          <Text style={styles.indexText}>{index}</Text>
        </View>

        {activeFilter === "Tất cả" ? (
          <View style={styles.allBadgesContainer}>
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
        ) : (
          <View style={[styles.sideBadge, styles.activeBadge]}>
            <Text style={styles.activeBadgeText}>{activeFilter}</Text>
          </View>
        )}
      </View>

      <View style={styles.rightCol}>
        <View style={styles.nameHeader}>
          <View style={styles.nameWrapper}>
            <Text style={[styles.playerName, !isP1Winner && styles.dimmedText]}>
              {player1.name}
            </Text>
            {isP1Winner && (
              <FontAwesome5
                name="crown"
                size={14}
                color="#F59E0B"
                style={styles.crown}
              />
            )}
          </View>

          <Text style={styles.vsCenter}>vs</Text>

          <View style={styles.nameWrapper}>
            <Text style={[styles.playerName, isP1Winner && styles.dimmedText]}>
              {player2.name}
            </Text>
            {!isP1Winner && (
              <FontAwesome5
                name="crown"
                size={14}
                color="#F59E0B"
                style={styles.crown}
              />
            )}
          </View>
        </View>

        <View style={styles.scoreContent}>
          {activeFilter === "Tất cả" ? (
            <View>
              <ScoreRow
                label1={player1.goScore}
                label2={player2.goScore}
                isP1Winner={isP1Winner}
              />
              <View style={styles.divider} />
              <ScoreRow
                label1={player1.backScore}
                label2={player2.backScore}
                isP1Winner={isP1Winner}
              />
              <View style={styles.divider} />
              <ScoreRow
                label1={player1.totalScore}
                label2={player2.totalScore}
                isP1Winner={isP1Winner}
              />
            </View>
          ) : activeFilter === "Đi" ? (
            <ScoreRow
              label1={player1.goScore}
              label2={player2.goScore}
              isP1Winner={isP1Winner}
            />
          ) : (
            <ScoreRow
              label1={player1.backScore}
              label2={player2.backScore}
              isP1Winner={isP1Winner}
            />
          )}
        </View>
      </View>
    </View>
  );
};

// ✅ FilterModal giữ nguyên
const FilterModal = ({ visible, onClose, onSelect, currentFilter }: any) => {
  const options: FilterType[] = ["Đi", "Về", "Tất cả"];

  return (
    // dùng SelectPlayerModal pattern: import Modal từ RN
    <View />
  );
};

export default function ContractScreen() {
  const [filter, setFilter] = useState<FilterType>("Tất cả");
  const [filterModalVisible, setFilterModalVisible] = useState(false);

  // ✅ State cho SelectPlayerModal
  const [selectPlayerVisible, setSelectPlayerVisible] = useState(false);
  const [selectedPlayers, setSelectedPlayers] = useState<SelectedPlayers>({
    player1: null,
    player2: null,
  });

  const handleStart = (selected: SelectedPlayers) => {
    setSelectedPlayers(selected);
    setSelectPlayerVisible(false);
    // TODO: xử lý logic sau khi chọn xong 2 người chơi
    console.log("Bắt đầu với:", selected.player1?.name, "vs", selected.player2?.name);
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#F9FAFB" }}>
      <View style={styles.headerContainer}>
        {/* Avatar group - hiển thị player đã chọn nếu có, fallback về mock */}
        <View style={styles.avatarGroup}>
          {selectedPlayers.player1 || selectedPlayers.player2 ? (
            <>
              {selectedPlayers.player1 && (
                <Image
                  source={{ uri: selectedPlayers.player1.image }}
                  style={styles.headerAvatar}
                />
              )}
              {selectedPlayers.player2 && (
                <Image
                  source={{ uri: selectedPlayers.player2.image }}
                  style={styles.headerAvatar}
                />
              )}
            </>
          ) : (
            [1, 2, 3, 4].map((i) => (
              <Image
                key={i}
                source={{ uri: `https://i.pravatar.cc/150?u=${i}` }}
                style={styles.headerAvatar}
              />
            ))
          )}
        </View>

        <View style={styles.actionGroup}>
          {/* ✅ Nút Roaming mở SelectPlayerModal */}
          <TouchableOpacity
            style={styles.roamingBtn}
            onPress={() => setSelectPlayerVisible(true)}
          >
            <Text style={styles.roamingText}>Roaming</Text>
          </TouchableOpacity>

          {/* Nút filter */}
          <TouchableOpacity
            style={styles.filterBtn}
            onPress={() => setFilterModalVisible(true)}
          >
            <Ionicons name="options-outline" size={20} color="#0066B2" />
          </TouchableOpacity>
        </View>
      </View>

      <View style={{ padding: 16 }}>
        {mockRoamingData.map((item) => (
          <RoamingCard key={item.id} match={item} activeFilter={filter} />
        ))}
      </View>

      {/* ✅ SelectPlayerModal thay thế modal cũ */}
      <SelectPlayerModal
        visible={selectPlayerVisible}
        flights={MOCK_FLIGHTS}
        onClose={() => setSelectPlayerVisible(false)}
        onStart={handleStart}
      />

      {/* Filter modal (Đi / Về / Tất cả) giữ nguyên */}
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

// Tách FilterModal ra ngoài để tránh dùng Modal lồng nhau
import { Modal, TouchableWithoutFeedback } from "react-native";

const FilterModalSheet = ({ visible, onClose, onSelect, currentFilter }: any) => {
  const options: FilterType[] = ["Đi", "Về", "Tất cả"];
  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
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
                  <TouchableOpacity
                    key={opt}
                    onPress={() => onSelect(opt)}
                    style={styles.optionItem}
                  >
                    <Text
                      style={[
                        styles.optionText,
                        currentFilter === opt && styles.optionTextActive,
                      ]}
                    >
                      {opt}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>

              <TouchableOpacity
                style={[
                  styles.resetBtn,
                  currentFilter !== "Tất cả" && styles.resetBtnActive,
                ]}
                onPress={() => {
                  onSelect("Tất cả");
                  onClose();
                }}
              >
                <Text
                  style={[
                    styles.resetBtnText,
                    currentFilter !== "Tất cả" && styles.resetBtnTextActive,
                  ]}
                >
                  Đặt lại
                </Text>
              </TouchableOpacity>
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
    padding: 16,
    backgroundColor: "#FFF",
  },
  avatarGroup: { flexDirection: "row" , },
  headerAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 2,
    borderColor: "#FFF",
    marginLeft: 5,
  },
  actionGroup: { flexDirection: "row", gap: 8 },
  roamingBtn: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  roamingText: { color: "#0066B2", fontWeight: "600" },
  filterBtn: {
    width: 38,
    height: 38,
    borderRadius: 19,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    justifyContent: "center",
    alignItems: "center",
  },

  // Card
  card: {
    backgroundColor: "#FFF",
    borderRadius: 20,
    flexDirection: "row",
    padding: 16,
    marginBottom: 16,
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
  sideBadge: {
    width: "100%",
    paddingVertical: 6,
    borderRadius: 12,
    backgroundColor: "#F9FAFB",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    alignItems: "center",
    marginBottom: 8,
  },
  sideBadgeText: { fontSize: 13, color: "#374151" },
  activeBadge: { borderColor: "#0066B2", backgroundColor: "#FFF" },
  activeBadgeText: { color: "#0066B2", fontWeight: "bold" },
  allBadgesContainer: { width: "100%", alignItems: "center" },

  rightCol: { flex: 1, paddingLeft: 10 },
  nameHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
    alignItems: "center",
  },
  nameWrapper: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
  },
  vsCenter: { fontSize: 12, color: "#9CA3AF", marginHorizontal: 5 },
  playerName: { fontSize: 15, fontWeight: "600", color: "#374151" },
  crown: { marginLeft: 5 },
  dimmedText: { color: "#9CA3AF" },

  scoreContent: { paddingHorizontal: 10 },
  scoreRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 8,
  },
  scoreBox: { flexDirection: "row", alignItems: "center", gap: 5 },
  scoreValue: { fontSize: 18, fontWeight: "bold", color: "#1F2937" },
  chipIcon: { width: 16, height: 16 },
  vsText: { fontSize: 12, color: "#9CA3AF" },
  divider: { height: 1, backgroundColor: "#F3F4F6", width: "100%" },

  // Filter Modal
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: "#FFF",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    padding: 20,
    paddingBottom: 40,
  },
  modalHeader: { alignItems: "center", marginBottom: 20 },
  modalHandle: {
    width: 40,
    height: 5,
    backgroundColor: "#E5E7EB",
    borderRadius: 3,
    marginBottom: 10,
  },
  modalTitle: { fontSize: 18, fontWeight: "bold" },
  closeIcon: { position: "absolute", right: 0, top: 10 },
  optionsContainer: { alignItems: "center", gap: 20, marginBottom: 30 },
  optionItem: { width: "100%", alignItems: "center", paddingVertical: 10 },
  optionText: { fontSize: 18, color: "#6B7280" },
  optionTextActive: { color: "#0066B2", fontWeight: "bold" },
  resetBtn: {
    backgroundColor: "#F3F4F6",
    paddingVertical: 15,
    borderRadius: 15,
    alignItems: "center",
    marginBottom: 15,
  },
  resetBtnActive: { backgroundColor: "#0066B2" },
  resetBtnText: { fontSize: 16, color: "#9CA3AF", fontWeight: "bold" },
  resetBtnTextActive: { color: "#FFF" },
});