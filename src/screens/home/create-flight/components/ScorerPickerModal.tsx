import { useState, useEffect, FC } from "react";
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  Image,
  StyleSheet,
  Platform,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../../../../constants/colors";
import { Player } from "../types";

interface ScorerPickerModalProps {
  visible: boolean;
  players: Player[];
  selected: string; // "all" hoặc player.id
  onSelect: (id: string) => void;
  onClose: () => void;
}

/** Modal chọn người nhập điểm: "Tất cả" với avatar chồng + từng người chơi */
export const ScorerPickerModal: FC<ScorerPickerModalProps> = ({
  visible,
  players,
  selected,
  onSelect,
  onClose,
}) => {
  const [tempSelected, setTempSelected] = useState(selected);

  useEffect(() => {
    if (visible) setTempSelected(selected);
  }, [visible]);

  const handleConfirm = () => {
    onSelect(tempSelected);
    onClose();
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.sheet}>
          <View style={styles.dragHandle} />

          <View style={styles.header}>
            <View />
            <Text style={styles.title}>Chọn người nhập điểm</Text>
            <TouchableOpacity onPress={onClose}>
              <Ionicons name="close" size={24} color={Colors.text} />
            </TouchableOpacity>
          </View>

          <ScrollView showsVerticalScrollIndicator={false}>
            {/* "Tất cả mọi người" với avatar chồng */}
            <TouchableOpacity
              style={[styles.row, tempSelected === "all" && styles.rowSelected]}
              onPress={() => setTempSelected("all")}
            >
              <View style={styles.stackedAvatars}>
                {players.slice(0, 4).map((p, i) => (
                  <Image
                    key={p.id}
                    source={{ uri: p.avatar }}
                    style={[
                      styles.stackAvatar,
                      { marginLeft: i > 0 ? -10 : 0, zIndex: 4 - i },
                    ]}
                  />
                ))}
              </View>
              <Text
                style={[
                  styles.rowText,
                  tempSelected === "all" && styles.rowTextSelected,
                ]}
              >
                Tất cả mọi người
              </Text>
              {tempSelected === "all" && (
                <Ionicons
                  name="checkmark-circle"
                  size={22}
                  color={Colors.primary}
                />
              )}
            </TouchableOpacity>

            {/* Danh sách từng người chơi */}
            {players.map((player) => (
              <TouchableOpacity
                key={player.id}
                style={[
                  styles.row,
                  tempSelected === player.id && styles.rowSelected,
                ]}
                onPress={() => setTempSelected(player.id)}
              >
                <Image source={{ uri: player.avatar }} style={styles.avatar} />
                <View style={styles.info}>
                  <Text
                    style={[
                      styles.name,
                      tempSelected === player.id && styles.rowTextSelected,
                    ]}
                  >
                    {player.name}
                  </Text>
                  <View style={styles.meta}>
                    <View style={styles.indexBadge}>
                      <Text style={styles.indexText}>Index {player.index}</Text>
                    </View>
                    <Text style={styles.metaText}>HDC {player.hdc}</Text>
                    <Text style={styles.metaText}>VGA: {player.vga}</Text>
                  </View>
                </View>
                {tempSelected === player.id && (
                  <Ionicons
                    name="checkmark-circle"
                    size={22}
                    color={Colors.primary}
                  />
                )}
              </TouchableOpacity>
            ))}
          </ScrollView>

          <View style={styles.footerBtn}>
            <TouchableOpacity style={styles.confirmBtn} onPress={handleConfirm}>
              <Text style={styles.confirmText}>Xác nhận</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "flex-end",
  },
  sheet: {
    backgroundColor: "#FFF",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    maxHeight: "80%",
    paddingBottom: Platform.OS === "ios" ? 34 : 16,
  },
  dragHandle: {
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: "#D0D0D0",
    alignSelf: "center",
    marginTop: 10,
    marginBottom: 8,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },
  title: { fontSize: 17, fontWeight: "700", color: "#1A1A1A" },
  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 14,
  },
  rowSelected: { backgroundColor: "#F0F7FF" },
  rowText: { flex: 1, fontSize: 15, fontWeight: "500", color: "#333" },
  rowTextSelected: { color: Colors.primary, fontWeight: "700" },

  // Stacked Avatars
  stackedAvatars: { flexDirection: "row", marginRight: 12 },
  stackAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: "#FFF",
  },

  // Player row
  avatar: { width: 44, height: 44, borderRadius: 22, marginRight: 12 },
  info: { flex: 1 },
  name: { fontSize: 15, fontWeight: "600", color: "#1A1A1A", marginBottom: 3 },
  meta: { flexDirection: "row", alignItems: "center", gap: 8 },
  indexBadge: {
    backgroundColor: "#FFF3E0",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
  },
  indexText: { fontSize: 11, fontWeight: "700", color: "#E65100" },
  metaText: { fontSize: 12, color: "#888", fontWeight: "500" },

  footerBtn: { paddingHorizontal: 20, paddingTop: 12 , paddingBottom: 50},
  confirmBtn: {
    height: 56,
    borderRadius: 16,
    backgroundColor: Colors.primary,
    justifyContent: "center",
    alignItems: "center",
  },
  confirmText: { fontSize: 16, fontWeight: "700", color: "#FFF" },
});
