import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { PlayerPickerModal } from "./PlayerPickerModal";
import { MOCK_ALL_PLAYERS } from "./mock-data";

import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { AppStackParamList } from "@/types/navigation.types";

export interface Player {
  id: string;
  name: string;
  avatar: string;
  index: number;
  hdc: number;
  vga: string;
  isVerified?: boolean;
}

type Props = NativeStackScreenProps<AppStackParamList, "TeamCoDinh">;

export default function TeamCoDinhScreen({ navigation }: Props) {
  const insets = useSafeAreaInsets();

  const [selectedPlayers, setSelectedPlayers] = useState<
    Record<string, Player | null>
  >({
    t1_p1: null,
    t1_p2: null,
    t2_p1: null,
    t2_p2: null,
  });

  const [pickingPos, setPickingPos] = useState<string | null>(null);
  const [showPlayerModal, setShowPlayerModal] = useState(false);

  const getAvailablePlayers = () => {
    return MOCK_ALL_PLAYERS.filter((player) => {
      if (!player.isSelected) return false;

      const isSelectedInOtherSlot = Object.entries(selectedPlayers).some(
        ([pos, selectedPlayer]) =>
          selectedPlayer?.id === player.id && pos !== pickingPos,
      );

      return !isSelectedInOtherSlot;
    });
  };

  const handleSelectPlayer = (pos: string) => {
    setPickingPos(pos);
    setShowPlayerModal(true);
  };

  const onConfirmPlayer = (player: Player) => {
    if (pickingPos) {
      setSelectedPlayers((prev) => ({
        ...prev,
        [pickingPos]: player,
      }));
    }
    setShowPlayerModal(false);
  };

  const handleRemovePlayer = (pos: string) => {
    setSelectedPlayers((prev) => ({
      ...prev,
      [pos]: null,
    }));
  };

  const renderPlayerPicker = (label: string, pos: string) => {
    const player = selectedPlayers[pos];

    return (
      <View style={styles.pickerContainer}>
        <Text style={styles.pickerLabel}>{label}</Text>

        <TouchableOpacity
          style={styles.pickerBox}
          onPress={() => handleSelectPlayer(pos)}
          activeOpacity={0.7}
        >
          {player ? (
            <View style={styles.playerInfo}>
              <Image
                source={{ uri: player.avatar }}
                style={styles.miniAvatar}
              />
              <Text style={styles.playerName} numberOfLines={1}>
                {player.name}
              </Text>

              <TouchableOpacity
                style={styles.clearBtn}
                onPress={(e) => {
                  e.stopPropagation();
                  handleRemovePlayer(pos);
                }}
              >
                <Ionicons name="close-circle" size={18} color="#999" />
              </TouchableOpacity>
            </View>
          ) : (
            <Text style={styles.placeholder} />
          )}

          {!player && <Ionicons name="caret-down" size={16} color="#0061AF" />}
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container} edges={["bottom"]}>
      {/* HEADER */}
      <View style={[styles.header, { paddingTop: insets.top + 8 }]}>
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="chevron-back" size={22} color="#1A1A1A" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Trận đấu sắp bắt đầu...</Text>
      </View>

      {/* CONTENT */}
      <ScrollView
        style={{ flex: 1 }}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 20,
        }}
      >
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Tuỳ chọn cặp đấu team cố định</Text>

          <Text style={styles.teamLabel}>Team 1</Text>
          <View style={styles.row}>
            {renderPlayerPicker("Người chơi 1", "t1_p1")}
            {renderPlayerPicker("Người chơi 2", "t1_p2")}
          </View>

          <Text style={[styles.teamLabel, { marginTop: 24 }]}>Team 2</Text>
          <View style={styles.row}>
            {renderPlayerPicker("Người chơi 1", "t2_p1")}
            {renderPlayerPicker("Người chơi 2", "t2_p2")}
          </View>
        </View>
      </ScrollView>

      {/* FOOTER */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.continueBtn}
          onPress={() => navigation.navigate("ScoreInputScreen", { teamMode: "codinh" })}
          activeOpacity={0.8}
        >
          <Text style={styles.continueText}>Vào trận đấu</Text>
        </TouchableOpacity>
      </View>

      <PlayerPickerModal
        visible={showPlayerModal}
        allPlayers={getAvailablePlayers()}
        onSelect={onConfirmPlayer}
        onClose={() => setShowPlayerModal(false)}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  wrapper: { flex: 1, backgroundColor: "#F5F6FA" },
  container: { flex: 1 },

  header: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },

  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: "#FFF",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#F0F0F0",
  },

  headerTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: "#1A1A1A",
  },

  content: { flex: 1 },

  card: {
    backgroundColor: "#FFF",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 20,
    marginTop: 8,
  },

  sectionTitle: {
    fontSize: 14,
    color: "#555",
    marginBottom: 24,
  },

  teamLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 12,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 16,
  },

  pickerContainer: { flex: 1 },

  pickerLabel: {
    fontSize: 14,
    color: "#444",
    marginBottom: 8,
  },

  pickerBox: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 52,
    backgroundColor: "#FFF",
  },

  playerInfo: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },

  miniAvatar: {
    width: 28,
    height: 28,
    borderRadius: 14,
    marginRight: 8,
  },

  playerName: {
    fontSize: 14,
    color: "#333",
    fontWeight: "500",
    flex: 1,
  },

  clearBtn: {
    padding: 4,
    marginRight: -4,
  },

  placeholder: { flex: 1 },

  footerWrap: {
    backgroundColor: "#FFF",
    borderTopWidth: 1,
    borderTopColor: "#F0F0F0",
  },
  footer: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: "#FFF",
    borderTopWidth: 1,
    borderTopColor: "#F0F0F0",
  },

  continueBtn: {
    height: 56,
    borderRadius: 16,
    backgroundColor: "#0061AF",
    justifyContent: "center",
    alignItems: "center",
  },

  continueText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#FFF",
  },
});
