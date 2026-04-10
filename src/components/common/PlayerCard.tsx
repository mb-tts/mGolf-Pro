import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
export interface Player {
  id: string;
  name: string;
  avatar: string;
  index: number;
  hdc: number;
  vga: number;
  isVerified?: boolean;
}

interface PlayerCardProps {
  player: Player;
  isLast?: boolean;
  onPress?: (player: Player) => void;
}

export const PlayerCard: React.FC<PlayerCardProps> = ({
  player,
  isLast = false,
  onPress,
}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => onPress?.(player)}
      style={[styles.container, !isLast && styles.borderBottom]}
    >
      {/* Avatar */}
      <Image source={{ uri: player.avatar }} style={styles.avatar} />

      {/* Info */}
      <View style={styles.infoContainer}>
        <Text style={styles.name}>{player.name}</Text>

        <View style={styles.badgesRow}>
          <View style={styles.blueBadge}>
            <Text style={styles.blueBadgeText}>
              Index {player.index.toFixed(1)}
            </Text>
          </View>

          <View style={styles.grayBadge}>
            <Text style={styles.grayBadgeText}>HDC {player.hdc}</Text>
          </View>

          <View style={styles.voaBadge}>
            <Text style={styles.grayBadgeText}>VOA {player.vga}</Text>
          </View>
        </View>
      </View>

      {/* Verify Icon */}
      {player.isVerified ? (
        <View style={styles.verifyIcon}>
          <Ionicons name="checkmark-circle" size={24} color="#0066CC" />
        </View>
      ) : (
        <View style={styles.verifyIcon} />
      )}
    </TouchableOpacity>
  );
};

export default interface PlayerListProps {
  players: Player[];
  onPlayerPress?: (player: Player) => void;
}

export const PlayerList: React.FC<PlayerListProps> = ({
  players,
  onPlayerPress,
}) => {
  const [playerList, setPlayerList] = useState<Player[]>(
    players.map((p) => ({
      ...p,
      isVerified: p.isVerified ?? true,     // ?? ở đây là nếu bên trái là undefined hoặc null thì mới lấy giá trị bên phải, còn nếu là false thì vẫn lấy false
    })),
  );

  const handlePlayerPress = (player: Player) => {
    const updatedList = playerList.map((p) =>
      p.id === player.id ? { ...p, isVerified: !p.isVerified } : p,
    );

    setPlayerList(updatedList);

    onPlayerPress?.(player);
  };

  return (
    <View style={styles.listWrapper}>
      <FlatList
        data={playerList}
        renderItem={({ item, index }) => (
          <PlayerCard
            player={item}
            onPress={handlePlayerPress}
            isLast={index === playerList.length - 1}
          />
        )}
        keyExtractor={(item) => item.id}
        scrollEnabled={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  listWrapper: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    overflow: "hidden",
  },
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 14,
    backgroundColor: "#FFFFFF",
  },
  borderBottom: {
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6",
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 10,
    marginRight: 12,
  },
  infoContainer: {
    flex: 1,
    justifyContent: "center",
  },
  name: {
    fontSize: 13,
    fontWeight: "500",
    color: "#1F2937",
    marginBottom: 6,
  },
  badgesRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  blueBadge: {
    backgroundColor: "#E0F2FE",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  blueBadgeText: {
    color: "#0284C7",
    fontSize: 11,
    fontWeight: "500",
  },
  grayBadge: {
    backgroundColor: "#F3F4F6",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  voaBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  grayBadgeText: {
    color: "#4B5563",
    fontSize: 11,
    fontWeight: "500",
  },
  verifyIcon: {
    marginTop: 28,
  },
});
