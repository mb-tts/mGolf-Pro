import React, { useState } from "react";
import {
  View, Text, Modal, TouchableOpacity, FlatList,
  TextInput, Image, StyleSheet, Platform, ScrollView,
  KeyboardAvoidingView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../../../../constants/colors";
import { Player } from "../types";

interface PlayerPickerModalProps {
  visible: boolean;
  allPlayers: Player[];
  selectedPlayers: Player[];
  onConfirm: (players: Player[]) => void;
  onClose: () => void;
}

/** Modal thêm người chơi: search + chip đã chọn + list + form thủ công */
export const PlayerPickerModal: React.FC<PlayerPickerModalProps> = ({
  visible, allPlayers, selectedPlayers, onConfirm, onClose,
}) => {
  const [search, setSearch] = useState("");
  const [tempSelected, setTempSelected] = useState<Player[]>([]);
  const [showManualForm, setShowManualForm] = useState(false);

  // Form thủ công
  const [manualVga, setManualVga] = useState("");
  const [manualName, setManualName] = useState("");
  const [manualIndex, setManualIndex] = useState("");
  const [manualPhone, setManualPhone] = useState("");

  React.useEffect(() => {
    if (visible) {
      setTempSelected(selectedPlayers.filter((p) => !p.isOwner));
      setSearch("");
      setShowManualForm(false);
      resetManualForm();
    }
  }, [visible]);

  const resetManualForm = () => {
    setManualVga("");
    setManualName("");
    setManualIndex("");
    setManualPhone("");
  };

  // Người chơi có thể chọn (chưa là owner, chưa được chọn tạm)
  const ownerIds = selectedPlayers.filter((p) => p.isOwner).map((p) => p.id);
  const available = allPlayers
    .filter((p) => !ownerIds.includes(p.id))
    .filter((p) =>
      search
        ? p.name.toLowerCase().includes(search.toLowerCase()) || p.vga.includes(search)
        : true
    );

  const isPlayerSelected = (id: string) => tempSelected.some((p) => p.id === id);

  const togglePlayer = (player: Player) => {
    if (isPlayerSelected(player.id)) {
      setTempSelected((prev) => prev.filter((p) => p.id !== player.id));
    } else {
      if (tempSelected.length + ownerIds.length >= 4) return; // Max 4
      setTempSelected((prev) => [...prev, { ...player, isOwner: false }]);
    }
  };

  const removeChip = (id: string) => {
    setTempSelected((prev) => prev.filter((p) => p.id !== id));
  };

  const handleConfirm = () => {
    const owners = selectedPlayers.filter((p) => p.isOwner);
    onConfirm([...owners, ...tempSelected]);
    onClose();
  };

  const handleAddManual = () => {
    if (!manualName.trim() || !manualIndex.trim()) return;
    const newPlayer: Player = {
      id: `manual_${Date.now()}`,
      name: manualName.trim(),
      avatar: `https://i.pravatar.cc/150?u=${Date.now()}`,
      index: parseFloat(manualIndex) || 0,
      hdc: Math.round((parseFloat(manualIndex) || 0) * 1.2),
      vga: manualVga.trim() || "---",
      phone: manualPhone.trim(),
      isOwner: false,
    };
    setTempSelected((prev) => [...prev, newPlayer]);
    setShowManualForm(false);
    resetManualForm();
  };

  // ── Form thủ công ──
  if (showManualForm) {
    return (
      <Modal visible={visible} animationType="slide" transparent onRequestClose={onClose}>
        <View style={styles.overlay}>
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : undefined}
            style={styles.sheetManual}
          >
            <View style={styles.dragHandle} />
            <View style={styles.header}>
              <TouchableOpacity onPress={() => setShowManualForm(false)}>
                <Ionicons name="chevron-back" size={24} color={Colors.text} />
              </TouchableOpacity>
              <Text style={styles.title}>Thêm người chơi thủ công</Text>
              <TouchableOpacity onPress={onClose}>
                <Ionicons name="close" size={24} color={Colors.text} />
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.formScroll} contentContainerStyle={{ paddingBottom: 30 }}>
              <Text style={styles.fieldLabel}>VGA</Text>
              <TextInput
                style={styles.fieldInput}
                placeholder="Nhập mã VGA"
                placeholderTextColor="#AAA"
                value={manualVga}
                onChangeText={setManualVga}
                keyboardType="number-pad"
              />

              <Text style={styles.fieldLabelRequired}>
                Tên người chơi <Text style={styles.required}>*</Text>
              </Text>
              <TextInput
                style={styles.fieldInput}
                placeholder="Nhập tên người chơi"
                placeholderTextColor="#AAA"
                value={manualName}
                onChangeText={setManualName}
              />

              <Text style={styles.fieldLabelRequired}>
                Index <Text style={styles.required}>*</Text>
              </Text>
              <TextInput
                style={styles.fieldInput}
                placeholder="Nhập index"
                placeholderTextColor="#AAA"
                value={manualIndex}
                onChangeText={setManualIndex}
                keyboardType="decimal-pad"
              />

              <Text style={styles.fieldLabel}>HDC sân</Text>
              <View style={styles.fieldDisabled}>
                <Text style={styles.fieldDisabledText}>---</Text>
              </View>

              <Text style={styles.fieldLabel}>Số điện thoại</Text>
              <TextInput
                style={styles.fieldInput}
                placeholder="Nhập số điện thoại"
                placeholderTextColor="#AAA"
                value={manualPhone}
                onChangeText={setManualPhone}
                keyboardType="phone-pad"
              />
            </ScrollView>

            <View style={styles.footerBtn}>
              <TouchableOpacity
                style={[
                  styles.confirmBtn,
                  (!manualName.trim() || !manualIndex.trim()) && styles.confirmBtnDisabled,
                ]}
                onPress={handleAddManual}
                disabled={!manualName.trim() || !manualIndex.trim()}
              >
                <Text
                  style={[
                    styles.confirmText,
                    (!manualName.trim() || !manualIndex.trim()) && styles.confirmTextDisabled,
                  ]}
                >
                  Thêm người chơi
                </Text>
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
        </View>
      </Modal>
    );
  }

  // ── Danh sách chọn ──
  return (
    <Modal visible={visible} animationType="slide" transparent onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={styles.sheet}>
          <View style={styles.dragHandle} />

          <View style={styles.header}>
            <View />
            <Text style={styles.title}>Thêm người chơi</Text>
            <TouchableOpacity onPress={onClose}>
              <Ionicons name="close" size={24} color={Colors.text} />
            </TouchableOpacity>
          </View>

          {/* Search + Icon thêm thủ công */}
          <View style={styles.searchRow}>
            <View style={styles.searchBox}>
              <Ionicons name="search" size={18} color="#999" />
              <TextInput
                style={styles.searchInput}
                placeholder="Nhập tên sân đấu"
                placeholderTextColor="#AAA"
                value={search}
                onChangeText={setSearch}
              />
            </View>
            <TouchableOpacity
              style={styles.manualBtn}
              onPress={() => setShowManualForm(true)}
            >
              <Ionicons name="person-add-outline" size={22} color={Colors.primary} />
            </TouchableOpacity>
          </View>

          {/* Chips người đã chọn */}
          {tempSelected.length > 0 && (
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.chipRow}
            >
              {tempSelected.map((p) => (
                <View key={p.id} style={styles.chip}>
                  <Image source={{ uri: p.avatar }} style={styles.chipAvatar} />
                  <Text style={styles.chipName} numberOfLines={1}>
                    {p.name}
                  </Text>
                  <TouchableOpacity onPress={() => removeChip(p.id)}>
                    <Ionicons name="close-circle" size={18} color="#E53935" />
                  </TouchableOpacity>
                </View>
              ))}
            </ScrollView>
          )}

          {/* Danh sách */}
          <FlatList
            data={available}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => {
              const checked = isPlayerSelected(item.id);
              return (
                <TouchableOpacity
                  style={[styles.playerRow, checked && styles.playerRowSelected]}
                  onPress={() => togglePlayer(item)}
                >
                  <Image source={{ uri: item.avatar }} style={styles.playerAvatar} />
                  <View style={styles.playerInfo}>
                    <Text style={styles.playerName}>{item.name}</Text>
                    <View style={styles.playerMeta}>
                      <View style={styles.indexBadge}>
                        <Text style={styles.indexText}>Index {item.index}</Text>
                      </View>
                      <Text style={styles.metaText}>HDC {item.hdc}</Text>
                      <Text style={styles.metaText}>VGA: {item.vga}</Text>
                    </View>
                  </View>
                  {checked && (
                    <Ionicons name="checkmark-circle" size={22} color={Colors.primary} />
                  )}
                </TouchableOpacity>
              );
            }}
            ListEmptyComponent={
              <View style={styles.empty}>
                <Text style={styles.emptyText}>Không tìm thấy người chơi</Text>
              </View>
            }
          />

          {/* Xác nhận */}
          <View style={styles.footerBtn}>
            <TouchableOpacity style={styles.confirmBtn} onPress={handleConfirm}>
              <Text style={styles.confirmText}>Xác nhận</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: { flex: 1, backgroundColor: "rgba(0,0,0,0.4)", justifyContent: "flex-end" },
  sheet: {
    backgroundColor: "#FFF", borderTopLeftRadius: 24, borderTopRightRadius: 24,
    maxHeight: "85%", paddingBottom: Platform.OS === "ios" ? 34 : 16,
  },
  sheetManual: {
    backgroundColor: "#FFF", borderTopLeftRadius: 24, borderTopRightRadius: 24,
    maxHeight: "90%", paddingBottom: Platform.OS === "ios" ? 34 : 16,
  },
  dragHandle: {
    width: 40, height: 4, borderRadius: 2, backgroundColor: "#D0D0D0",
    alignSelf: "center", marginTop: 10, marginBottom: 8,
  },
  header: {
    flexDirection: "row", justifyContent: "space-between", alignItems: "center",
    paddingHorizontal: 20, paddingVertical: 12,
  },
  title: { fontSize: 17, fontWeight: "700", color: "#1A1A1A" },

  // Search
  searchRow: {
    flexDirection: "row", alignItems: "center",
    paddingHorizontal: 20, gap: 10, marginBottom: 8,
  },
  searchBox: {
    flex: 1, flexDirection: "row", alignItems: "center",
    backgroundColor: "#F5F5F5", borderRadius: 12,
    paddingHorizontal: 12, height: 44, gap: 8,
    borderWidth: 1, borderColor: "#E8E8E8",
  },
  searchInput: { flex: 1, fontSize: 14, color: "#333" },
  manualBtn: {
    width: 44, height: 44, borderRadius: 12,
    backgroundColor: "#F0F7FF", justifyContent: "center", alignItems: "center",
  },

  // Chips
  chipRow: { paddingHorizontal: 20, paddingVertical: 8, gap: 8 },
  chip: {
    flexDirection: "row", alignItems: "center",
    backgroundColor: "#F5F5F5", borderRadius: 20,
    paddingVertical: 6, paddingHorizontal: 10, gap: 6,
  },
  chipAvatar: { width: 24, height: 24, borderRadius: 12 },
  chipName: { fontSize: 13, fontWeight: "500", color: "#333", maxWidth: 100 },

  // Player List
  playerRow: {
    flexDirection: "row", alignItems: "center",
    paddingHorizontal: 20, paddingVertical: 12,
  },
  playerRowSelected: { backgroundColor: "#F0F7FF" },
  playerAvatar: {
    width: 44, height: 44, borderRadius: 22, marginRight: 12, backgroundColor: "#F0F0F0",
  },
  playerInfo: { flex: 1 },
  playerName: { fontSize: 15, fontWeight: "600", color: "#1A1A1A", marginBottom: 3 },
  playerMeta: { flexDirection: "row", alignItems: "center", gap: 8 },
  indexBadge: {
    backgroundColor: "#FFF3E0", paddingHorizontal: 8, paddingVertical: 2, borderRadius: 6,
  },
  indexText: { fontSize: 11, fontWeight: "700", color: "#E65100" },
  metaText: { fontSize: 12, color: "#888", fontWeight: "500" },
  empty: { alignItems: "center", paddingVertical: 40 },
  emptyText: { fontSize: 14, color: "#AAA" },

  // Manual Form
  formScroll: { paddingHorizontal: 20 },
  fieldLabel: { fontSize: 14, fontWeight: "600", color: "#404040", marginTop: 16, marginBottom: 6 },
  fieldLabelRequired: { fontSize: 14, fontWeight: "600", color: "#404040", marginTop: 16, marginBottom: 6 },
  required: { color: "#E53935" },
  fieldInput: {
    borderBottomWidth: 1, borderBottomColor: "#E8E8E8",
    paddingVertical: 12, fontSize: 15, color: "#1A1A1A",
  },
  fieldDisabled: {
    backgroundColor: "#F5F5F5", borderRadius: 12,
    paddingVertical: 14, paddingHorizontal: 16,
  },
  fieldDisabledText: { fontSize: 15, color: "#999" },

  // Footer
  footerBtn: { paddingHorizontal: 20, paddingTop: 12 },
  confirmBtn: {
    height: 56, borderRadius: 16, backgroundColor: Colors.primary,
    justifyContent: "center", alignItems: "center",
  },
  confirmBtnDisabled: { backgroundColor: "#F0F0F0" },
  confirmText: { fontSize: 16, fontWeight: "700", color: "#FFF" },
  confirmTextDisabled: { color: "#9E9E9E" },
});
