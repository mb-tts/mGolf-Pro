import React, { useState } from "react";
import {
  View, Text, Modal, TouchableOpacity, FlatList,
  TextInput, Image, StyleSheet, Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../../../../constants/colors";
import { Course } from "../types";

interface CoursePickerModalProps {
  visible: boolean;
  courses: Course[];
  selected: Course | null;
  onSelect: (course: Course) => void;
  onClose: () => void;
}

/** Modal chọn sân đấu: search + list với ảnh thumbnail + Xác nhận */
export const CoursePickerModal: React.FC<CoursePickerModalProps> = ({
  visible, courses, selected, onSelect, onClose,
}) => {
  const [search, setSearch] = useState("");
  const [tempSelected, setTempSelected] = useState<Course | null>(selected);

  // Reset khi mở modal
  React.useEffect(() => {
    if (visible) {
      setTempSelected(selected);
      setSearch("");
    }
  }, [visible]);

  const filtered = courses.filter(
    (c) => c.name.toLowerCase().includes(search.toLowerCase()) ||
           c.address.toLowerCase().includes(search.toLowerCase())
  );

  const handleConfirm = () => {
    if (tempSelected) onSelect(tempSelected);
    onClose();
  };

  return (
    <Modal visible={visible} animationType="slide" transparent onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={styles.sheet}>
          {/* Drag Handle */}
          <View style={styles.dragHandle} />

          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.title}>Chọn sân đấu</Text>
            <TouchableOpacity onPress={onClose}>
              <Ionicons name="close" size={24} color={Colors.text} />
            </TouchableOpacity>
          </View>

          {/* Search */}
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

          {/* List */}
          <FlatList
            data={filtered}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => {
              const isSelected = tempSelected?.id === item.id;
              return (
                <TouchableOpacity
                  style={[styles.courseRow, isSelected && styles.courseRowSelected]}
                  onPress={() => setTempSelected(item)}
                >
                  <Image source={{ uri: item.image }} style={styles.courseImg} />
                  <View style={styles.courseInfo}>
                    <Text style={[styles.courseName, isSelected && styles.courseNameSelected]}>
                      {item.name}
                    </Text>
                    <Text style={styles.courseAddr}>{item.address}</Text>
                  </View>
                  {isSelected && (
                    <Ionicons name="checkmark-circle" size={22} color={Colors.primary} />
                  )}
                </TouchableOpacity>
              );
            }}
          />

          {/* Xác nhận */}
          <View style={styles.footerBtn}>
            <TouchableOpacity
              style={[styles.confirmBtn, !tempSelected && styles.confirmBtnDisabled]}
              onPress={handleConfirm}
              disabled={!tempSelected}
            >
              <Text style={[styles.confirmText, !tempSelected && styles.confirmTextDisabled]}>
                Xác nhận
              </Text>
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
    backgroundColor: "#FFF",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    maxHeight: "85%",
    paddingBottom: Platform.OS === "ios" ? 34 : 16,
  },
  dragHandle: {
    width: 40, height: 4, borderRadius: 2,
    backgroundColor: "#D0D0D0",
    alignSelf: "center",
    marginTop: 10, marginBottom: 8,
  },
  header: {
    flexDirection: "row", justifyContent: "space-between", alignItems: "center",
    paddingHorizontal: 20, paddingVertical: 12,
  },
  title: { fontSize: 17, fontWeight: "700", color: "#1A1A1A" },
  searchBox: {
    flexDirection: "row", alignItems: "center",
    backgroundColor: "#F5F5F5", borderRadius: 12,
    marginHorizontal: 20, marginBottom: 12,
    paddingHorizontal: 12, height: 44, gap: 8,
    borderWidth: 1, borderColor: "#E8E8E8",
  },
  searchInput: { flex: 1, fontSize: 14, color: "#333" },
  courseRow: {
    flexDirection: "row", alignItems: "center",
    paddingHorizontal: 20, paddingVertical: 12,
  },
  courseRowSelected: { backgroundColor: "#F0F7FF" },
  courseImg: {
    width: 64, height: 44, borderRadius: 8,
    marginRight: 12, backgroundColor: "#E8E8E8",
  },
  courseInfo: { flex: 1 },
  courseName: { fontSize: 15, fontWeight: "600", color: "#1A1A1A" },
  courseNameSelected: { color: Colors.primary },
  courseAddr: { fontSize: 12, color: "#999", marginTop: 2 },
  footerBtn: { paddingHorizontal: 20, paddingTop: 12 },
  confirmBtn: {
    height: 56, borderRadius: 16,
    backgroundColor: Colors.primary,
    justifyContent: "center", alignItems: "center",
  },
  confirmBtnDisabled: { backgroundColor: "#F0F0F0" },
  confirmText: { fontSize: 16, fontWeight: "700", color: "#FFF" },
  confirmTextDisabled: { color: "#9E9E9E" },
});
