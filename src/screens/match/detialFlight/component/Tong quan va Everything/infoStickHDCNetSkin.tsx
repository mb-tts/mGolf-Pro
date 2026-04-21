import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { PlayerData } from "./data"; // Nhúng data từ file trên

interface PlayerCardProps {
  player: PlayerData;
}

export default function PlayerCard({ player }: PlayerCardProps) {
  return (
    <View style={[styles.cardContainer, player.isMe && styles.cardMe]}>
      <View style={styles.header}>
        <Image source={{ uri: player.avatarUrl }} style={styles.avatar} />
        <Text style={styles.name} numberOfLines={1}>
          {player.name}
        </Text>
      </View>

      <View style={styles.statRow}>
        <Text style={styles.statLabel}>Gậy/HDC</Text>
        <Text style={styles.statValueBlue}>{player.strokesHdc}</Text>
      </View>

      <View style={styles.statRow}>
        <Text style={styles.statLabel}>NET</Text>
        <Text style={styles.statValueBlue}>{player.netScore}</Text>
      </View>

      <View style={styles.statRow}>
        <View style={styles.skinsLabelWrapper}>
          <Text style={styles.statLabel}>Skins</Text>
          <Image
            source={require("@assets/images/chip.png")}
            style={styles.outingImage}
          />
        </View>
        <Text style={styles.statValueBlue}>{player.skins}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    borderRadius: 16,
    backgroundColor: "#F9FAFB",
    padding: 12,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    flex: 1,
    marginHorizontal: 6,
    marginBottom: 12,
  },
  cardMe: {
    backgroundColor: "#F0F9FF",
    borderColor: "#BAE6FD",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#D1D5DB",
  },
  name: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111827",
    flex: 1,
    textAlign: "right",
    marginLeft: 8,
  },
  statRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  statLabel: {
    fontSize: 14,
    color: "#4B5563",
  },
  skinsLabelWrapper: {
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    fontSize: 14,
    marginLeft: 4,
  },
  statValueBlue: {
    fontSize: 15,
    fontWeight: "600",
    color: "#0066B2",
  },
  outingImage: {
    width: 20, 
    height: 20, 
  }
});
