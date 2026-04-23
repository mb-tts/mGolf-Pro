import React, { useState, useMemo } from "react";
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
} from "react-native";
import { Ionicons, Feather } from "@expo/vector-icons";
import { ScorecardTable } from "./ScorecardTable";
import { PlayerFilter } from "./PlayerFilter";
import { SafeAreaView } from "react-native-safe-area-context";

interface HoleData {
  hole: number | string;
  par: number;
  strokeIndex: number | string;
}

interface PlayerScore {
  id: string;
  name: string;
  avatar: string;
  hdc: number;
  scores: number[];
}

interface ScorecardModalProps {
  visible: boolean;
  players: PlayerScore[];
  holes: HoleData[];
  onClose: () => void;
}

export const ScorecardModal: React.FC<ScorecardModalProps> = ({
  visible,
  players,
  holes,
  onClose,
}) => {
  const [selectedPlayerIds, setSelectedPlayerIds] = useState<string[]>(
    players.map((p) => p.id)
  );

  const filteredPlayers = useMemo(() => {
    return players.filter((p) => selectedPlayerIds.includes(p.id));
  }, [players, selectedPlayerIds]);

  const handleSelectAllPlayers = () => {
    setSelectedPlayerIds(players.map((p) => p.id));
  };

  const handlePlayerToggle = (playerId: string) => {
    const isAllSelected = selectedPlayerIds.length === players.length;
    
    if (isAllSelected) {
      setSelectedPlayerIds([playerId]);
    } else {
      // Nếu đang ở mode partial, toggle như bình thường
      setSelectedPlayerIds((prev) =>
        prev.includes(playerId)
          ? prev.filter((id) => id !== playerId)
          : [...prev, playerId]
      );
    }
  };

  return (
    <Modal visible={visible} transparent animationType="slide">
      <SafeAreaView style={styles.container}>
        {/* HEADER */}
        <View style={styles.header}>
          <TouchableOpacity onPress={onClose} style={styles.backBtn}>
            <Ionicons name="chevron-back" size={24} color="#333" />
          </TouchableOpacity>
          <Text style={styles.headerTitle} numberOfLines={1}>
            Sân Golf Vân Trì 12:05, 08/12/2024
          </Text>
          <TouchableOpacity style={styles.iconBtn}>
            <Feather name="download" size={22} color="#0056D2" />
          </TouchableOpacity>
        </View>

        {/* HORIZONTAL PLAYER FILTER */}
        <PlayerFilter
          players={players}
          selectedPlayerIds={selectedPlayerIds}
          onPlayerToggle={handlePlayerToggle}
          onSelectAll={handleSelectAllPlayers}
        />

        {/* SCORECARD TABLE (Handles its own horizontal scroll) */}
        <View style={styles.tableWrapper}>
          <ScorecardTable players={filteredPlayers} holes={holes} />
        </View>
      </SafeAreaView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F6F8", // Nền xám nhạt toàn màn hình
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#FFF",
  },
    backBtn: { 
    width: 36, 
    height: 36, 
    borderRadius: 8, 
    borderWidth: 1, 
    borderColor: "#E5E7EB", 
    alignItems: "center", 
    justifyContent: "center",
    backgroundColor: '#FFF'
  },
  iconBtn: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  headerTitle: {
    flex: 1,
    fontSize: 16,
    fontWeight: "600",
    color: "#1A1A1A",
    marginHorizontal: 8,
  },
  tableWrapper: {
    flex: 1,
    marginTop: 8,
  },
});