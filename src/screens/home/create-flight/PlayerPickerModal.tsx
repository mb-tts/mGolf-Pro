import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Image,
  ScrollView,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Player } from "../../../components/common/PlayerCard"; // Đảm bảo đường dẫn này đúng với project của bạn

export interface PlayerPickerModalProps {
  visible: boolean;
  allPlayers: Player[];
  onSelect: (player: Player) => void;
  onClose: () => void;
}

// Đã thêm export và đổi tên chuẩn thành PlayerPickerModal
export const PlayerPickerModal: React.FC<PlayerPickerModalProps> = ({
  visible,
  allPlayers,
  onSelect,
  onClose,
}) => {
  const [selectedTemp, setSelectedTemp] = useState<Player | null>(null);

  // Reset lựa chọn tạm thời mỗi khi mở modal
  useEffect(() => {
    if (visible) setSelectedTemp(null);
  }, [visible]);

  const handleConfirm = () => {
    if (selectedTemp) {
      onSelect(selectedTemp);
    }
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <TouchableOpacity style={styles.backdrop} onPress={onClose} />
        
        <View style={styles.sheet}>
          {/* Thanh gạt nhỏ ở trên cùng */}
          <View style={styles.dragHandleWrap}>
            <View style={styles.dragHandle} />
          </View>

          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.title}>Thêm người chơi</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
              <Ionicons name="close" size={24} color="#333" />
            </TouchableOpacity>
          </View>

          {/* Danh sách người chơi */}
          <ScrollView style={styles.list} showsVerticalScrollIndicator={false}>
            {allPlayers.map((player) => {
              const isSelected = selectedTemp?.id === player.id;
              return (
                <TouchableOpacity
                  key={player.id}
                  style={[
                    styles.playerRow,
                    isSelected && styles.playerRowSelected,
                  ]}
                  onPress={() => setSelectedTemp(player)}
                >
                  <Image source={{ uri: player.avatar }} style={styles.avatar} />
                  
                  <View style={styles.info}>
                    <Text style={styles.name}>{player.name}</Text>
                    <View style={styles.tags}>
                      <View style={[styles.tag, styles.tagIndex]}>
                        <Text style={styles.tagTextIndex}>Index {player.index}</Text>
                      </View>
                      <View style={[styles.tag, styles.tagHdc]}>
                        <Text style={styles.tagTextHdc}>HDC {player.hdc}</Text>
                      </View>
                      <Text style={styles.vgaText}>VGA: {player.vga}</Text>
                    </View>
                  </View>
                </TouchableOpacity>
              );
            })}
          </ScrollView>

          {/* Nút Xác nhận */}
          <View style={styles.footer}>
            <TouchableOpacity
              style={[
                styles.confirmBtn,
                !selectedTemp && styles.confirmBtnDisabled,
              ]}
              onPress={handleConfirm}
              disabled={!selectedTemp}
            >
              <Text style={styles.confirmText}>Xác nhận</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const { height } = Dimensions.get("window");

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "flex-end",
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
  },
  sheet: {
    backgroundColor: "#FFF",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    minHeight: height * 0.6,
    maxHeight: height * 0.8,
  },
  dragHandleWrap: {
    alignItems: "center",
    paddingTop: 12,
    paddingBottom: 8,
  },
  dragHandle: {
    width: 40,
    height: 4,
    backgroundColor: "#E0E0E0",
    borderRadius: 2,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
    position: "relative",
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
  },
  closeBtn: {
    position: "absolute",
    right: 16,
    padding: 4,
  },
  list: {
    paddingHorizontal: 16,
    paddingTop: 8,
  },
  playerRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#F5F5F5",
  },
  playerRowSelected: {
    backgroundColor: "#F0F8FF",
    borderRadius: 12,
    paddingHorizontal: 8,
    marginHorizontal: -8,
    borderBottomWidth: 0,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 12,
  },
  info: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: "500",
    color: "#333",
    marginBottom: 6,
  },
  tags: {
    flexDirection: "row",
    alignItems: "center",
  },
  tag: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: 8,
  },
  tagIndex: {
    backgroundColor: "#E6F3FF",
  },
  tagTextIndex: {
    color: "#0061AF",
    fontSize: 12,
    fontWeight: "500",
  },
  tagHdc: {
    backgroundColor: "#F5F5F5",
  },
  tagTextHdc: {
    color: "#666",
    fontSize: 12,
    fontWeight: "500",
  },
  vgaText: {
    color: "#888",
    fontSize: 12,
  },
  footer: {
    padding: 16,
    paddingBottom: 32,
    borderTopWidth: 1,
    borderTopColor: "#F0F0F0",
  },
  confirmBtn: {
    backgroundColor: "#0061AF",
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: "center",
  },
  confirmBtnDisabled: {
    backgroundColor: "#A0C4E1",
  },
  confirmText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "600",
  },
});