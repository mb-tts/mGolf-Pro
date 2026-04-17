import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Player } from "../types";

interface PlayerCardProps {
  player: Player;
  onRemove?: (id: string) => void;
}

/** Card hiển thị thông tin 1 người chơi: avatar, tên, Index/HDC/VGA, nút xóa */
export const PlayerCard: React.FC<PlayerCardProps> = ({ player, onRemove }) => (
  <View style={styles.row}>
    <Image source={{ uri: player.avatar }} style={styles.avatar} />
    <View style={styles.info}>
      <Text style={styles.name}>{player.name}</Text>
      <View style={styles.meta}>
        <View style={styles.indexBadge}>
          <Text style={styles.indexText}>Index {player.index}</Text>
        </View>
        <Text style={styles.metaText}>HDC {player.hdc}</Text>
        <Text style={styles.metaText}>VGA: {player.vga}</Text>
      </View>
    </View>
    {!player.isOwner && onRemove && (
      <TouchableOpacity style={styles.deleteBtn} onPress={() => onRemove(player.id)}>
        <Ionicons name="trash-outline" size={18} color="#E53935" />
      </TouchableOpacity>
    )}
  </View>
);

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    paddingHorizontal: 14,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    marginRight: 12,
    backgroundColor: "#F0F0F0",
  },
  info: { flex: 1 },
  name: { fontSize: 15, fontWeight: "600", color: "#1A1A1A", marginBottom: 4 },
  meta: { flexDirection: "row", alignItems: "center", gap: 8 },
  indexBadge: {
    backgroundColor: "#FFF3E0",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
  },
  indexText: { fontSize: 11, fontWeight: "700", color: "#E65100" },
  metaText: { fontSize: 12, color: "#888888", fontWeight: "500" },
  deleteBtn: { padding: 8 },
});
