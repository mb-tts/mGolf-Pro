import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { PlayerPickerModal } from "./PlayerPickerModal"; 

export interface Player {
  id: string;
  name: string;
  avatar: string;
  index: number;
  hdc: number;
  voa: number;
  isVerified?: boolean;
}

const MOCK_PLAYERS: Player[] = [
  { id: "p1", name: "N.Linh", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop", index: 21.8, hdc: 30, voa: 99999 },
  { id: "p2", name: "N.Nam", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop", index: 21.8, hdc: 30, voa: 99999 },
  { id: "p3", name: "N.Anh", avatar: "https://images.unsplash.com/photo-1501746074465-4cebaf45b800?w=100&h=100&fit=crop", index: 21.8, hdc: 30, voa: 99999 },
  { id: "p4", name: "N. Duy", avatar: "https://images.unsplash.com/photo-1493247527751-218270055e9d?w=100&h=100&fit=crop", index: 21.8, hdc: 30, voa: 99999 }
];

export default function PrepareGameScreen({ navigation }: any) {
  const insets = useSafeAreaInsets();

  const [selectedPlayers, setSelectedPlayers] = useState<Record<string, Player | null>>({
    t1_p1: null,
    t1_p2: null,
    t2_p1: null,
    t2_p2: null,
  });

  const [pickingPos, setPickingPos] = useState<string | null>(null);
  const [showPlayerModal, setShowPlayerModal] = useState(false);

  // 1. LOGIC LỌC NGƯỜI CHƠI TRỐNG
  const getAvailablePlayers = () => {
    return MOCK_PLAYERS.filter((player) => {
      // Kiểm tra xem player này đã được gán vào ô nào KHÁC với ô đang mở (pickingPos) hay chưa
      const isSelectedInOtherSlot = Object.entries(selectedPlayers).some(
        ([pos, selectedPlayer]) => selectedPlayer?.id === player.id && pos !== pickingPos
      );
      
      // Nếu đã được chọn ở ô khác rồi thì ẩn đi (return false)
      return !isSelectedInOtherSlot;
    });
  };

  const handleSelectPlayer = (pos: string) => {
    setPickingPos(pos);
    setShowPlayerModal(true);
  };

  const onConfirmPlayer = (player: Player) => {
    if (pickingPos) {
      setSelectedPlayers((prev) => ({ ...prev, [pickingPos]: player }));
    }
    setShowPlayerModal(false);
  };

  // Nút xóa người chơi khỏi ô (chỉ hiện khi đã chọn)
  const handleRemovePlayer = (pos: string) => {
    setSelectedPlayers((prev) => ({ ...prev, [pos]: null }));
  };

  const renderPlayerPicker = (label: string, pos: string) => {
    const player = selectedPlayers[pos];
    return (
      <View style={styles.pickerContainer}>
        <Text style={styles.pickerLabel}>{label}</Text>
        <TouchableOpacity 
          style={styles.pickerBox} 
          onPress={() => handleSelectPlayer(pos)}
          activeOpacity={0.7}
        >
          {player ? (
            <View style={styles.playerInfo}>
              <Image source={{ uri: player.avatar }} style={styles.miniAvatar} />
              <Text style={styles.playerName} numberOfLines={1}>{player.name}</Text>
              
              {/* Thêm nút X để xóa nhanh người đã chọn */}
              <TouchableOpacity 
                style={styles.clearBtn} 
                onPress={(e) => {
                  e.stopPropagation(); // Ngăn mở modal khi bấm nút xóa
                  handleRemovePlayer(pos);
                }}
              >
                <Ionicons name="close-circle" size={18} color="#999" />
              </TouchableOpacity>
            </View>
          ) : (
            <Text style={styles.placeholder}></Text>
          )}
          {!player && <Ionicons name="caret-down" size={16} color="#0061AF" />}
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.wrapper}>
      <SafeAreaView style={styles.container} edges={["bottom"]}>
        
        <View style={[styles.header, { paddingTop: insets.top + 8 }]}>
          <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
            <Ionicons name="chevron-back" size={22} color="#1A1A1A" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Trận đấu sắp bắt đầu...</Text>
        </View>

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          <View style={styles.card}>
            <Text style={styles.sectionTitle}>Tuỳ chọn cặp đấu team cố định</Text>

            <Text style={styles.teamLabel}>Team 1</Text>
            <View style={styles.row}>
              {renderPlayerPicker("Người chơi 1", "t1_p1")}
              {renderPlayerPicker("Người chơi 2", "t1_p2")}
            </View>

            <Text style={[styles.teamLabel, { marginTop: 24 }]}>Team 2</Text>
            <View style={styles.row}>
              {renderPlayerPicker("Người chơi 1", "t2_p1")}
              {renderPlayerPicker("Người chơi 2", "t2_p2")}
            </View>
          </View>
        </ScrollView>

        <View style={styles.footerWrap}>
          <View style={styles.footer}>
            <TouchableOpacity
              style={styles.continueBtn}
              onPress={() => console.log("Data:", selectedPlayers)}
              activeOpacity={0.8}
            >
              <Text style={styles.continueText}>Vào trận đấu</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>

      <PlayerPickerModal
        visible={showPlayerModal}
        // 2. TRUYỀN DANH SÁCH ĐÃ LỌC VÀO MODAL
        allPlayers={getAvailablePlayers()} 
        onSelect={onConfirmPlayer}
        onClose={() => setShowPlayerModal(false)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: { flex: 1, backgroundColor: "#F5F6FA" },
  container: { flex: 1 },
  header: { paddingHorizontal: 16, paddingBottom: 16 },
  backBtn: {
    width: 40, height: 40, borderRadius: 12, backgroundColor: "#FFF",
    justifyContent: "center", alignItems: "center", elevation: 2,
    shadowColor: "#000", shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1, shadowRadius: 3, marginBottom: 16,
    borderWidth: 1, borderColor: "#F0F0F0"
  },
  headerTitle: { fontSize: 24, fontWeight: "700", color: "#1A1A1A" },
  content: { flex: 1 },
  card: {
    backgroundColor: "#FFF",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 20,
    minHeight: 500,
    marginTop: 8,
  },
  sectionTitle: { fontSize: 14, color: "#555", marginBottom: 24 },
  teamLabel: { fontSize: 16, fontWeight: "600", color: "#333", marginBottom: 12 },
  row: { flexDirection: "row", justifyContent: "space-between", gap: 16 },
  pickerContainer: { flex: 1 },
  pickerLabel: { fontSize: 14, color: "#444", marginBottom: 8 },
  pickerBox: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 52,
    backgroundColor: "#FFF",
  },
  playerInfo: { flexDirection: "row", alignItems: "center", flex: 1 },
  miniAvatar: { width: 28, height: 28, borderRadius: 14, marginRight: 8 },
  playerName: { fontSize: 14, color: "#333", fontWeight: "500", flex: 1 },
  clearBtn: { padding: 4, marginRight: -4 },
  placeholder: { flex: 1 },
  footerWrap: { backgroundColor: "#FFF", borderTopWidth: 1, borderTopColor: "#F0F0F0" },
  footer: { padding: 16 },
  continueBtn: {
    height: 56, borderRadius: 16, backgroundColor: "#0061AF",
    justifyContent: "center", alignItems: "center",
  },
  continueText: { fontSize: 16, fontWeight: "700", color: "#FFF" },
});