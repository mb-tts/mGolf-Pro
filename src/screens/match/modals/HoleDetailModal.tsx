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
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@/constants/colors";

const { width } = Dimensions.get("window");

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
}

export const HoleDetailModal: React.FC<HoleDetailModalProps> = ({
  visible,
  selectedHole,
  players,
  isAutoNext,
  onAutoNextChange,
  onClose,
}) => {
  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.modalOverlay}>
        <View style={styles.holeDetailContent}>
          <View style={styles.modalHeaderRow}>
            <View style={{ width: 24 }} />
            <Text style={styles.modalTitle}>
              Kết quả hố{" "}
              <View style={styles.holeCircle}>
                <Text style={styles.holeCircleText}>{selectedHole}</Text>
              </View>
            </Text>
            <TouchableOpacity onPress={onClose}>
              <Ionicons name="close" size={24} color="#333" />
            </TouchableOpacity>
          </View>

          <Text style={styles.holeSpecsText}>
            302 yards    4 par    Index 5    
            <Ionicons name="help-circle-outline" size={16} color="#999" />
          </Text>

          <View style={styles.playerGrid}>
            {players.map((p, i) => (
              <View key={i} style={styles.playerScoreCard}>
                <Image
                  source={{ uri: p.avatar }}
                  style={styles.playerAvatarLarge}
                />
                <Text style={styles.playerNameModal}>{p.name}</Text>
                <View
                  style={[
                    styles.scoreBadge,
                    {
                      backgroundColor:
                        p.relative > 0 ? "#0061AF" : "#F8F9FA",
                      borderWidth: p.relative <= 0 ? 1 : 0,
                      borderColor: "#DDD",
                    },
                  ]}
                >
                  <Text
                    style={[
                      styles.scoreBadgeText,
                      {
                        color: p.relative > 0 ? "#FFF" : "#0061AF",
                      },
                    ]}
                  >
                    {p.relative > 0 ? `+${p.relative}` : p.relative}
                  </Text>
                </View>
              </View>
            ))}
          </View>

          <View style={styles.modalFooterActions}>
            <TouchableOpacity style={styles.outlineActionBtn}>
              <Text style={styles.outlineActionText}>Chi tiết flight</Text>
            </TouchableOpacity>
            <View style={styles.switchContainer}>
              <Switch
                value={isAutoNext}
                onValueChange={onAutoNextChange}
                trackColor={{ false: "#DDD", true: "#0061AF" }}
              />
              <Text style={styles.switchLabel}>Tự chuyển</Text>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
  },
  holeDetailContent: {
    width: width * 0.9,
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
  modalTitle: { fontSize: 18, fontWeight: "bold", textAlign: "center" },
  holeCircle: {
    width: 26,
    height: 26,
    borderRadius: 13,
    borderWidth: 1,
    borderColor: "#DDD",
    justifyContent: "center",
    alignItems: "center",
  },
  holeCircleText: { fontSize: 14, fontWeight: "bold" },
  holeSpecsText: {
    textAlign: "center",
    color: "#666",
    fontSize: 14,
    marginBottom: 20,
  },
  playerGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: 10,
  },
  playerScoreCard: {
    width: (width * 0.9 - 60) / 4,
    alignItems: "center",
    backgroundColor: "#F8F9FA",
    borderRadius: 16,
    paddingVertical: 12,
  },
  playerAvatarLarge: { width: 36, height: 36, borderRadius: 18, marginBottom: 6 },
  playerNameModal: { fontSize: 10, color: "#666", marginBottom: 8 },
  scoreBadge: {
    width: 36,
    height: 24,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  scoreBadgeText: { fontSize: 12, fontWeight: "bold" },
  modalFooterActions: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 24,
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
