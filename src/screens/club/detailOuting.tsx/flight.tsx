import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import type { Flight } from "@/types/golf.types";

export default function Filght({ flights }: { flights: Flight[] }) {
  return (
    <ScrollView style={styles.tabContent} showsVerticalScrollIndicator={false}>
      {flights.map((flight) => (
        <View key={flight.id} style={styles.flightCard}>
          {/* Header của Flight */}
          <View style={styles.flightHeader}>
            <Text style={styles.flightName}>{flight.name}</Text>
            <TouchableOpacity>
              <Text style={styles.viewDetailText}>Xem chi tiết</Text>
            </TouchableOpacity>
          </View>

          {/* Lưới 2x2 danh sách người chơi */}
          <View style={styles.playersGrid}>
            {flight.players.map((player) => (
              <View key={player.id} style={styles.playerCard}>
                <Image
                  source={{ uri: player.image }}
                  style={styles.playerAvatar}
                />
                <Text style={styles.playerName} numberOfLines={1}>
                  {player.name}
                </Text>

                <View style={styles.playerStats}>
                  <Text style={styles.statLabel}>HDC: </Text>
                  <Text style={styles.statValue}>{player.hdc} </Text>
                  <Text style={styles.statLabel}>VGA: </Text>
                  <Text style={styles.statValue}>{player.vga}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>
      ))}
      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  tabContent: { paddingTop: 20 , flex: 1},
  flightCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    // Viền và bóng đổ nhẹ tạo cảm giác nổi
    borderWidth: 1,
    borderColor: "#F0F0F0",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  flightHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  flightName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  viewDetailText: {
    fontSize: 14,
    color: "#0055A5", // Màu xanh đặc trưng cho text link
    fontWeight: "600",
  },
  playersGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  playerCard: {
    width: "48%", // Chiếm 48% để chia 2 cột, chừa 4% khoảng trống giữa
    backgroundColor: "#fff",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#F0F0F0",
    padding: 12,
    alignItems: "center",
    marginBottom: 12,
  },
  playerAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginBottom: 8,
  },
  playerName: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 4,
    textAlign: "center",
  },
  playerStats: {
    flexDirection: "row",
    alignItems: "center",
  },
  statLabel: {
    fontSize: 12,
    color: "#888",
  },
  statValue: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#333",
  },
});
