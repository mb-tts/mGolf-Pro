import React, { useState } from "react";
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../../../../constants/colors";

// ─── Type cho một Game đã lưu ──────────────────────────────────────────────────
export interface SavedGame {
  id: string;
  name: string;
  /** Các loại game kích hoạt, ví dụ: ["Everything", "Team xoay"] */
  gameTypes: string[];
  /** Snapshot cài đặt chi tiết — sẽ được dùng để khôi phục state */
  settings: SavedGameSettings;
}

export interface SavedGameSettings {
  selectedSection: string | null;
  everythingFilter: string;
  teamXoaySettings: {
    holeCount: number;
    comparison: "best" | "all" | "weakest";
    byMonth: boolean;
    playBest: boolean;
    restrictions: boolean;
  };
  teamCoDefinedSettings: {
    holeCount: number;
    comparison: "best" | "all" | "weakest";
  };
  contractSettings: {
    skinsOut: string;
    skinsIn: string;
    skinsTotal: string;
  };
  quyGaSettings: {
    skinsPerHole: string;
    condition: "birdie" | "eagle" | "par" | "";
  };
}

// ─── Props ──────────────────────────────────────────────────────────────────────
interface SavedGameModalProps {
  visible: boolean;
  savedGames: SavedGame[];
  onSelect: (game: SavedGame) => void;
  onClose: () => void;
}

/** Bottom-sheet modal "Game đã lưu" — cho phép chọn một game đã lưu trước đó */
export const SavedGameModal: React.FC<SavedGameModalProps> = ({
  visible,
  savedGames,
  onSelect,
  onClose,
}) => {
  const [tempSelected, setTempSelected] = useState<SavedGame | null>(null);

  // Reset khi mở modal
  React.useEffect(() => {
    if (visible) {
      setTempSelected(null);
    }
  }, [visible]);

  const handleConfirm = () => {
    if (tempSelected) onSelect(tempSelected);
    onClose();
  };

  const renderItem = ({ item, index }: { item: SavedGame; index: number }) => {
    const isSelected = tempSelected?.id === item.id;
    const isLast = index === savedGames.length - 1;

    return (
      <TouchableOpacity
        activeOpacity={0.7}
        style={[
          styles.gameRow,
          isSelected && styles.gameRowSelected,
          !isLast && styles.gameRowBorder,
        ]}
        onPress={() => setTempSelected(item)}
      >
        <View style={styles.gameInfo}>
          <Text
            style={[styles.gameName, isSelected && styles.gameNameSelected]}
          >
            {item.name}
          </Text>
          <Text style={styles.gameTypes}>{item.gameTypes.join(", ")}</Text>
        </View>

        {isSelected && (
          <Ionicons
            name="checkmark-circle"
            size={22}
            color={Colors.primary}
          />
        )}
      </TouchableOpacity>
    );
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
          {/* Drag Handle */}
          <View style={styles.dragHandle} />

          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.title}>Game đã lưu</Text>
            <TouchableOpacity onPress={onClose} hitSlop={8}>
              <Ionicons name="close" size={24} color={Colors.text} />
            </TouchableOpacity>
          </View>

          {/* Danh sách game đã lưu */}
          {savedGames.length === 0 ? (
            <View style={styles.emptyContainer}>
              <Ionicons
                name="game-controller-outline"
                size={48}
                color="#CCC"
              />
              <Text style={styles.emptyText}>Chưa có game nào được lưu</Text>
            </View>
          ) : (
            <FlatList
              data={savedGames}
              keyExtractor={(item) => item.id}
              showsVerticalScrollIndicator={false}
              renderItem={renderItem}
              contentContainerStyle={styles.listContent}
            />
          )}

          {/* Nút Xác nhận */}
          <View style={styles.footerBtn}>
            <TouchableOpacity
              style={[
                styles.confirmBtn,
                !tempSelected && styles.confirmBtnDisabled,
              ]}
              onPress={handleConfirm}
              disabled={!tempSelected}
            >
              <Text
                style={[
                  styles.confirmText,
                  !tempSelected && styles.confirmTextDisabled,
                ]}
              >
                Xác nhận
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

// ─── Styles ─────────────────────────────────────────────────────────────────────
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
    maxHeight: "70%",
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
  },
  title: {
    fontSize: 17,
    fontWeight: "700",
    color: "#1A1A1A",
  },

  /* Danh sách */
  listContent: {
    paddingHorizontal: 20,
  },
  gameRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
  },
  gameRowBorder: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#E8E8E8",
  },
  gameRowSelected: {
    backgroundColor: "#F0F7FF",
    marginHorizontal: -20,
    paddingHorizontal: 20,
    borderRadius: 0,
  },
  gameInfo: {
    flex: 1,
  },
  gameName: {
    fontSize: 15,
    fontWeight: "600",
    color: "#1A1A1A",
    marginBottom: 4,
  },
  gameNameSelected: {
    color: Colors.primary,
  },
  gameTypes: {
    fontSize: 13,
    color: "#999",
  },

  /* Empty state */
  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 48,
    gap: 12,
  },
  emptyText: {
    fontSize: 14,
    color: "#999",
  },

  /* Footer */
  footerBtn: {
    paddingHorizontal: 20,
    paddingTop: 12,
  },
  confirmBtn: {
    height: 56,
    borderRadius: 16,
    backgroundColor: Colors.primary,
    justifyContent: "center",
    alignItems: "center",
  },
  confirmBtnDisabled: {
    backgroundColor: "#F0F0F0",
  },
  confirmText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#FFF",
  },
  confirmTextDisabled: {
    color: "#9E9E9E",
  },
});
