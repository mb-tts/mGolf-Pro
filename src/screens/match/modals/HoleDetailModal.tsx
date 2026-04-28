import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Modal,
  Image,
  TouchableOpacity,
  Switch,
  Dimensions,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const { width, height } = Dimensions.get("window");

interface PlayerScore {
  name: string;
  avatar: string;
  score: number;
  relative: number;
  id?: string;
}

interface HoleDetailModalProps {
  visible: boolean;
  selectedHole: number | null;
  players: PlayerScore[];
  isAutoNext: boolean;
  onAutoNextChange: (value: boolean) => void;
  onClose: () => void;
  onShowAnnotation: () => void;
}

export const HoleDetailModal: React.FC<HoleDetailModalProps> = ({
  visible,
  selectedHole,
  players,
  isAutoNext,
  onAutoNextChange,
  onClose,
  onShowAnnotation,
}) => {
  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.modalOverlay}>
        <View style={styles.holeDetailContent}>
          
          {/* Header */}
          <View style={styles.modalHeaderRow}>
            <View style={{ width: 24 }} /> {/* Spacer để căn giữa title */}
            <View style={styles.headerTitleContainer}>
              <Text style={styles.modalTitle}>Kết quả hố </Text>
              <View style={styles.holeCircle}>
                <Text style={styles.holeCircleText}>{selectedHole}</Text>
              </View>
            </View>
            <TouchableOpacity onPress={onClose}>
              <Ionicons name="close" size={24} color="#555" />
            </TouchableOpacity>
          </View>

          {/* Thông số hố */}
          <View style={styles.holeSpecsRow}>
            <Text style={styles.holeSpecsText}>
              302 yards    4 par    Index 5
            </Text>
            <TouchableOpacity onPress={onShowAnnotation}>
              <Ionicons name="help-circle-outline" size={16} color="#999" style={{ marginLeft: 4 }} />
            </TouchableOpacity>
          </View>

          {/* Danh sách so sánh điểm */}
          <ScrollView showsVerticalScrollIndicator={false} style={styles.listContainer}>
            {players.map((mainPlayer, i) => {
              // Lọc ra 3 người chơi còn lại cho phần bên phải
              const otherPlayers = players.filter((_, index) => index !== i);

              return (
                <View key={i} style={styles.playerCardRow}>
                  {/* Cột trái (Người chơi chính) */}
                  <View style={styles.mainPlayerSection}>
                    <Image source={{ uri: mainPlayer.avatar }} style={styles.avatarLarge} />
                    <Text style={styles.playerNameDark}>{mainPlayer.name}</Text>
                    <View style={styles.scoreBadgeSolid}>
                      <Text style={styles.scoreBadgeTextSolid}>
                        {mainPlayer.relative > 0 ? `+${mainPlayer.relative}` : mainPlayer.relative}
                      </Text>
                    </View>
                  </View>

                  {/* Cột phải (Các người chơi còn lại) */}
                  <View style={styles.otherPlayersSection}>
                    {otherPlayers.map((other, j) => (
                      <View key={j} style={styles.otherPlayerItem}>
                        <Image source={{ uri: other.avatar }} style={styles.avatarSmall} />
                        <Text style={styles.playerNameLight}>{other.name}</Text>
                        <View style={styles.scoreBadgeOutline}>
                          <Text style={styles.scoreBadgeTextOutline}>
                            {other.relative > 0 ? `+${other.relative}` : other.relative}
                          </Text>
                        </View>
                      </View>
                    ))}
                  </View>
                </View>
              );
            })}
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  holeDetailContent: {
    width: width * 0.9,
    maxHeight: height * 0.7, // Giới hạn chiều cao để có thể scroll
    backgroundColor: "#FFF",
    borderRadius: 24,
    padding: 20,
  },
  modalHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  headerTitleContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  modalTitle: { 
    fontSize: 18, 
    fontWeight: "bold",
    color: "#333",
  },
  holeCircle: {
    width: 26,
    height: 26,
    borderRadius: 13,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 4,
  },
  holeCircleText: { fontSize: 14, fontWeight: "bold", color: "#333" },
  holeSpecsRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  holeSpecsText: {
    color: "#666",
    fontSize: 14,
  },
  listContainer: {
    marginBottom: 10,
  },
  
  // Styles cho cấu trúc Card
  playerCardRow: {
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 16,
    marginBottom: 12,
    backgroundColor: "#FFF",
  },
  mainPlayerSection: {
    backgroundColor: "#E6EBF0", // Màu nền xám xanh nhẹ cho người bên trái
    width: 85,
    paddingVertical: 14,
    borderTopLeftRadius: 16,
    borderBottomLeftRadius: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  otherPlayersSection: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    paddingVertical: 14,
  },
  otherPlayerItem: {
    alignItems: "center",
  },
  
  // Avatars & Texts
  avatarLarge: { width: 30, height: 30, borderRadius: 20, marginBottom: 8 },
  avatarSmall: { width: 30, height: 30, borderRadius: 18, marginBottom: 8 },
  playerNameDark: { fontSize: 12, fontWeight: "600", color: "#333", marginBottom: 8 },
  playerNameLight: { fontSize: 12, color: "#666", marginBottom: 8 },
  
  // Badges
  scoreBadgeSolid: {
    backgroundColor: "#0061AF",
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    minWidth: 44,
    alignItems: 'center',
  },
  scoreBadgeTextSolid: { fontSize: 12, fontWeight: "bold", color: "#FFF" },
  
  scoreBadgeOutline: {
    backgroundColor: "#FFF",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    minWidth: 44,
    alignItems: 'center',
  },
  scoreBadgeTextOutline: { fontSize: 12, fontWeight: "bold", color: "#0061AF" },
  
  // Footer
  modalFooterActions: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
  },
  outlineActionBtn: {
    borderWidth: 1,
    borderColor: "#333",
    borderRadius: 12,
    paddingHorizontal: 20,
    paddingVertical: 10,
    width: "50%",
  },
  outlineActionText: { textAlign: "center", fontWeight: "600" },
  switchContainer: { flexDirection: "row", alignItems: "center", gap: 8 },
  switchLabel: { fontSize: 14, fontWeight: "500" },
});