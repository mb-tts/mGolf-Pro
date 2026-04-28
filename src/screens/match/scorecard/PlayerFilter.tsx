import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";

interface PlayerScore {
  id: string;
  name: string;
  avatar: string;
  hdc: number;
  scores: number[];
}

interface PlayerFilterProps {
  players: PlayerScore[];
  selectedPlayerIds: string[];
  onPlayerToggle: (playerId: string) => void;
  onSelectAll: () => void;
}

// Màu xanh primary theo design
const PRIMARY_BLUE = "#0061AF";

export const PlayerFilter: React.FC<PlayerFilterProps> = ({
  players,
  selectedPlayerIds,
  onPlayerToggle,
  onSelectAll,
}) => {
  const isAllSelected = selectedPlayerIds.length === players.length;
  // Nếu chọn partial (không phải tất cả), thì highlight những người được chọn
  const isPartialSelected = selectedPlayerIds.length < players.length && selectedPlayerIds.length > 0;

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Nút Xem tất cả */}
        <TouchableOpacity
          style={[styles.chip, isAllSelected && styles.chipActive]}
          onPress={onSelectAll}
          activeOpacity={0.7}
        >
          <Text
            style={[styles.chipTextAll, isAllSelected && styles.chipTextAllActive]}
          >
            Xem tất cả
          </Text>
        </TouchableOpacity>

        {/* Danh sách Player Chips */}
        {players.map((player) => {
          const isSelected = isPartialSelected && selectedPlayerIds.includes(player.id);
          return (
            <TouchableOpacity
              key={player.id}
              style={[styles.chip, isSelected && styles.chipActive]}
              onPress={() => onPlayerToggle(player.id)}
              activeOpacity={0.7}
            >
              <Image source={{ uri: player.avatar }} style={styles.avatar} />
              <View style={styles.playerInfo}>
                <Text style={styles.hdcText}>HDC {player.hdc}</Text>
                {/* Giả lập giá trị NET hiển thị trên bộ lọc theo ảnh */}
                <Text style={styles.netText}>NET +2</Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F5F6F8",
    paddingVertical: 12,
  },
  scrollContent: {
    paddingHorizontal: 16,
    gap: 12,
  },
  chip: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: "#E5E7EB",
    backgroundColor: "#F8F9FA",
  },
  chipActive: {
    borderColor: PRIMARY_BLUE,
    backgroundColor: "#FFF",
  },
  chipTextAll: {
    fontSize: 13,
    fontWeight: "600",
    color: "#666",
  },
  chipTextAllActive: {
    color: PRIMARY_BLUE,
  },
  avatar: {
    width: 28,
    height: 28,
    borderRadius: 14,
    marginRight: 8,
  },
  playerInfo: {
    justifyContent: "center",
  },
  hdcText: {
    fontSize: 10,
    color: "#666",
    fontWeight: "500",
  },
  netText: {
    fontSize: 11,
    color: "#333",
    fontWeight: "600",
    marginTop: 2,
  },
});