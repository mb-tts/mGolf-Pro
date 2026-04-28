import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Player } from "./";

interface PlayerCardProps {
  player: Player;
  isSelected: boolean;
  onPress: (player: Player) => void;
}

const PlayerCard: React.FC<PlayerCardProps> = ({
  player,
  isSelected,
  onPress,
}) => {
  return (
    <TouchableOpacity
      style={[styles.card, isSelected && styles.cardSelected]}
      onPress={() => onPress(player)}
      activeOpacity={0.7}
    >
      <View style={styles.avatarWrapper}>
        <Image source={{ uri: player.image }} style={styles.avatar} />
      </View>
      <Text style={styles.name} numberOfLines={1}>
        {player.name}
      </Text>
      <View style={styles.statsRow}>
        <Text style={styles.statLabel}>
          HDC: <Text style={styles.statValue}>{player.HDC}</Text>
        </Text>
        <Text style={styles.statLabel}>  VGA: <Text style={styles.statValue}>{player.VGA}</Text></Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 16,
    paddingHorizontal: 8,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    backgroundColor: "#fff",
  },
  cardSelected: {
    borderColor: "#0062C4",
    borderWidth: 1.5,
    backgroundColor: "#FAFAFA",
  },
  avatarWrapper: {
    marginBottom: 10,
  },
  avatar: {
    width: 54,
    height: 54,
    borderRadius: 27,
  },
  name: {
    fontSize: 13,
    fontWeight: "700",
    color: "#111",
    textAlign: "center",
    marginBottom: 6,
  },
  statsRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  statLabel: {
    fontSize: 11,
    color: "#6B7280",
  },
  statValue: {
    fontSize: 11,
    color: "#111",
    fontWeight: "700",
  },
});

export default PlayerCard;