import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { Player } from ".";

interface SelectedPlayerChipProps {
  player: Player;
  onRemove: () => void;
}

const SelectedPlayerChip: React.FC<SelectedPlayerChipProps> = ({
  player,
  onRemove,
}) => {
  return (
    <View style={styles.container}>
      <Image source={{ uri: player.image }} style={styles.avatar} />
      <View style={styles.nameRow}>
        <Text style={styles.name} numberOfLines={1}>
          {player.name}
        </Text>
        <TouchableOpacity style={styles.removeBtn} onPress={onRemove}>
          <Text style={styles.removeIcon}>✕</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    marginBottom: 8,
  },
  nameRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  name: {
    fontSize: 12,
    color: "#333",
    marginRight: 4,
    fontWeight: "500",
  },
  removeBtn: {
    backgroundColor: "#E53935",
    borderRadius: 12,
    width: 14,
    height: 14,
    alignItems: "center",
    justifyContent: "center",
  },
  removeIcon: {
    color: "#fff",
    fontSize: 8,
    fontWeight: "900",
  },
});

export default SelectedPlayerChip;