import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Modal,
  Image,
  TouchableOpacity,
  Dimensions,
} from "react-native";

const { width } = Dimensions.get("window");

interface PlayerScore {
  name: string;
  avatar: string;
  score: number;
  relative: number;
  id?: string;
}

interface ConfirmModalProps {
  visible: boolean;
  players: PlayerScore[];
  onConfirm: () => void;
  onCancel: () => void;
}

export const ConfirmModal: React.FC<ConfirmModalProps> = ({
  visible,
  players,
  onConfirm,
  onCancel,
}) => {
  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.modalOverlay}>
        <View style={styles.confirmContent}>
          <Text style={styles.confirmTitle}>Thông báo</Text>
          <Text style={styles.confirmSubTitle}>
            Bạn có muốn xác nhận kết quả này không?
          </Text>

          <View style={styles.summaryTable}>
            <View style={styles.summaryHeader}>
              <View style={{ flex: 1.5 }} />
              <Text style={styles.summaryHeaderText}>Số gậy</Text>
              <Text style={styles.summaryHeaderText}>NET</Text>
              <Text style={styles.summaryHeaderText}>Skins</Text>
            </View>
            {players.map((p, i) => (
              <View key={i} style={styles.summaryRow}>
                <View style={styles.summaryPlayerInfo}>
                  <Image
                    source={{ uri: p.avatar }}
                    style={styles.summaryAvatar}
                  />
                  <Text style={styles.summaryPlayerName}>{p.name}</Text>
                </View>
                <Text style={styles.summaryValue}>+15</Text>
                <Text style={styles.summaryValue}>5</Text>
                <Text style={[styles.summaryValue, { color: "#ED1C24" }]}>
                  -1
                </Text>
              </View>
            ))}
          </View>

          <View style={styles.confirmActions}>
            <TouchableOpacity
              style={styles.cancelConfirmBtn}
              onPress={onCancel}
            >
              <Text style={styles.cancelConfirmText}>Huỷ</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.okConfirmBtn} onPress={onConfirm}>
              <Text style={styles.okConfirmText}>Xác nhận</Text>
            </TouchableOpacity>
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
  confirmContent: {
    width: width * 0.85,
    backgroundColor: "#FFF",
    borderRadius: 24,
    padding: 24,
  },
  confirmTitle: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 8,
  },
  confirmSubTitle: { textAlign: "center", color: "#666", marginBottom: 20 },
  summaryTable: {
    borderWidth: 1,
    borderColor: "#EAF6FF",
    borderRadius: 16,
    overflow: "hidden",
    marginBottom: 24,
  },
  summaryHeader: {
    flexDirection: "row",
    backgroundColor: "#F9FAFB",
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  summaryHeaderText: {
    flex: 1,
    textAlign: "center",
    fontSize: 12,
    color: "#666",
  },
  summaryRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderTopWidth: 1,
    borderTopColor: "#F0F0F0",
  },
  summaryPlayerInfo: {
    flex: 1.5,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  summaryAvatar: { width: 28, height: 28, borderRadius: 14 },
  summaryPlayerName: { fontSize: 12, fontWeight: "500" },
  summaryValue: {
    flex: 1,
    textAlign: "center",
    fontSize: 14,
    fontWeight: "bold",
    color: "#0061AF",
  },
  confirmActions: { flexDirection: "row", gap: 12 },
  cancelConfirmBtn: {
    flex: 1,
    height: 48,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#0061AF",
    justifyContent: "center",
    alignItems: "center",
  },
  cancelConfirmText: { color: "#0061AF", fontWeight: "bold" },
  okConfirmBtn: {
    flex: 1,
    height: 48,
    borderRadius: 12,
    backgroundColor: "#0061AF",
    justifyContent: "center",
    alignItems: "center",
  },
  okConfirmText: { color: "#FFF", fontWeight: "bold" },
});
