import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Modal,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Player, Flight, SelectedPlayers, SelectionStep } from "./";
import FlightSection from "./FlightSection";
import SelectedPlayerChip from "./SelectedPlayerChip";

interface SelectPlayerModalProps {
  visible: boolean;
  flights: Flight[];
  onClose: () => void;
  onStart: (selected: SelectedPlayers) => void;
}

const SelectPlayerModal: React.FC<SelectPlayerModalProps> = ({
  visible,
  flights,
  onClose,
  onStart,
}) => {
  const [step, setStep] = useState<SelectionStep>(1);
  const [selected, setSelected] = useState<SelectedPlayers>({
    player1: null,
    player2: null,
  });
  const [search, setSearch] = useState("");

  const handleSelectPlayer = useCallback(
    (player: Player) => {
      if (step === 1) {
        if (selected.player1?.id === player.id) {
          setSelected((prev) => ({ ...prev, player1: null }));
        } else {
          setSelected((prev) => ({ ...prev, player1: player }));
        }
      } else {
        if (player.id === selected.player1?.id) return;
        if (selected.player2?.id === player.id) {
          setSelected((prev) => ({ ...prev, player2: null }));
        } else {
          setSelected((prev) => ({ ...prev, player2: player }));
        }
      }
    },
    [step, selected.player1]
  );

  const handleBack = () => {
    if (step === 2) {
      setStep(1);
      setSelected((prev) => ({ ...prev, player2: null }));
    }
  };

  const handleNext = () => {
    if (step === 1 && selected.player1) {
      setStep(2);
    } else if (step === 2 && selected.player2) {
      onStart(selected);
    }
  };

  const handleRemovePlayer1 = () => {
    setSelected((prev) => ({ ...prev, player1: null }));
  };

  const handleRemovePlayer2 = () => {
    setSelected((prev) => ({ ...prev, player2: null }));
  };

  const handleClose = () => {
    setStep(1);
    setSelected({ player1: null, player2: null });
    setSearch("");
    onClose();
  };

  const filteredFlights: Flight[] = flights.map((flight) => ({
    ...flight,
    players: flight.players.filter((p) =>
      p.name.toLowerCase().includes(search.toLowerCase())
    ),
  }));

  const isNextEnabled =
    (step === 1 && !!selected.player1) || (step === 2 && !!selected.player2);

  const showStart = step === 2 && !!selected.player2;

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent
      onRequestClose={handleClose}
    >
      <View style={styles.overlay}>
        <TouchableOpacity style={styles.backdrop} onPress={handleClose} />
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : undefined}
          style={styles.sheetWrapper}
        >
          <SafeAreaView style={styles.sheet}>
            {/* Header */}
            <View style={styles.header}>
              <Text style={styles.title}>Chọn người chơi</Text>
              <TouchableOpacity onPress={handleClose} style={styles.closeBtn}>
                <Text style={styles.closeIcon}>✕</Text>
              </TouchableOpacity>
            </View>

            {/* 1. Search (Moved UP) */}
            <View style={styles.searchWrapper}>
              <Text style={styles.searchIcon}>🔍</Text>
              <TextInput
                style={styles.searchInput}
                placeholder="Nhập tên người chơi"
                placeholderTextColor="#aaa"
                value={search}
                onChangeText={setSearch}
              />
            </View>

            {/* 2. Selected Matchup Box (Moved DOWN) */}
            {(selected.player1 || selected.player2) && (
              <View style={styles.matchupBox}>
                <View style={styles.matchupPlayer}>
                  {selected.player1 && (
                    <SelectedPlayerChip
                      player={selected.player1}
                      onRemove={handleRemovePlayer1}
                    />
                  )}
                </View>

                <View style={styles.vsBadgeContainer}>
                  <View style={styles.vsBadge}>
                    <Text style={styles.vsText}>VS</Text>
                  </View>
                </View>

                <View style={styles.matchupPlayer}>
                  {selected.player2 && (
                    <SelectedPlayerChip
                      player={selected.player2}
                      onRemove={handleRemovePlayer2}
                    />
                  )}
                </View>
              </View>
            )}

            {/* 3. Player list */}
            <ScrollView
              style={styles.list}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.listContent}
            >
              {filteredFlights.map((flight) =>
                flight.players.length > 0 ? (
                  <FlightSection
                    key={flight.id}
                    flight={flight}
                    step={step}
                    selected={selected}
                    onSelectPlayer={handleSelectPlayer}
                  />
                ) : null
              )}
            </ScrollView>

            {/* Footer */}
            <View style={styles.footer}>
              {step === 2 && !showStart && (
                <TouchableOpacity style={styles.btnBack} onPress={handleBack}>
                  <Text style={styles.btnBackText}>Quay lại</Text>
                </TouchableOpacity>
              )}
              <TouchableOpacity
                style={[
                  styles.btnNext,
                  !isNextEnabled && styles.btnNextDisabled,
                  (step === 1 || showStart) && styles.btnNextFull,
                ]}
                onPress={handleNext}
                disabled={!isNextEnabled}
              >
                <Text style={styles.btnNextText}>
                  {showStart
                    ? "Bắt đầu"
                    : step === 1
                    ? "Chọn người 2" // Chỉnh lại theo hình mẫu
                    : "Chọn người 2"}
                </Text>
              </TouchableOpacity>
            </View>
          </SafeAreaView>
        </KeyboardAvoidingView>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: { flex: 1, justifyContent: "flex-end" },
  backdrop: { ...StyleSheet.absoluteFillObject, backgroundColor: "rgba(0,0,0,0.4)" },
  sheetWrapper: { maxHeight: "90%", flex: 1 },
  sheet: {
    flex: 1,
    backgroundColor: "#F9FAFB", // Nền hơi xám nhạt để phần thẻ trắng nổi bật
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    paddingBottom: 8,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center", // Căn giữa Text
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 16,
    position: "relative",
  },
  title: { fontSize: 16, fontWeight: "600", color: "#111" },
  closeBtn: {
    position: "absolute",
    right: 16,
    top: 16,
    width: 28,
    height: 28,
    alignItems: "center",
    justifyContent: "center",
  },
  closeIcon: { fontSize: 16, color: "#555" },
  searchWrapper: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 16,
    backgroundColor: "#fff",
    borderRadius: 24, // Bo tròn nhiều hơn giống mẫu
    borderWidth: 1,
    borderColor: "#E5E7EB",
    paddingHorizontal: 14,
    paddingVertical: 10,
    marginBottom: 16,
  },
  searchIcon: { fontSize: 14, marginRight: 8, color: "#888" },
  searchInput: { flex: 1, fontSize: 14, color: "#111", padding: 0 },
  matchupBox: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: 16,
    marginBottom: 16,
    paddingVertical: 16,
    paddingHorizontal: 12,
    backgroundColor: "#fff",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 4,
    elevation: 2,
  },
  matchupPlayer: { flex: 1, alignItems: "center", minHeight: 60, justifyContent: "center" },
  vsBadgeContainer: { paddingHorizontal: 10 },
  vsBadge: {
    backgroundColor: "#E53935",
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  vsText: { color: "#fff", fontSize: 10, fontWeight: "700" },
  list: { flex: 1 },
  listContent: { paddingHorizontal: 16, paddingBottom: 8 },
  footer: {
    flexDirection: "row",
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: Platform.OS === 'ios' ? 20 : 12,
    gap: 12,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#f0f0f0",
    marginBottom: 40
  },
  btnBack: {
    flex: 1,
    height: 48,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: "#1A6FDF",
    alignItems: "center",
    justifyContent: "center",
  },
  btnBackText: { fontSize: 15, fontWeight: "600", color: "#1A6FDF" },
  btnNext: {
    flex: 1,
    height: 48,
    borderRadius: 12,
    backgroundColor: "#0062C4",
    alignItems: "center",
    justifyContent: "center",
  },
  btnNextFull: { flex: 1 },
  btnNextDisabled: { backgroundColor: "#A0BFEF" },
  btnNextText: { fontSize: 15, fontWeight: "600", color: "#fff",  },
});

export default SelectPlayerModal;