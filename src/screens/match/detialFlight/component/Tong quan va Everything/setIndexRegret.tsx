import { View, TextInput, TouchableOpacity, Modal, Text } from "react-native";
import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet } from "react-native";

const [filterVisible, setFilterVisible] = useState(false);
export default function setIndexRegret() {
  return (
    <View>
      <TouchableOpacity
        style={styles.footerRow}
        onPress={() => setFilterVisible(true)}
      >
        <Text style={styles.footerText}>Index hố đường về x2 -1</Text>
        <TouchableOpacity>
          <Ionicons name="create-outline" size={20} color="#0066B2" />
        </TouchableOpacity>
      </TouchableOpacity>
      <Modal
        animationType="slide"
        transparent={true}
        visible={filterVisible}
        onRequestClose={() => setFilterVisible(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setFilterVisible(false)}
        >
          <TouchableOpacity activeOpacity={1} style={styles.bottomSheet}>
            <View style={styles.dragHandleWrap}>
              <View style={styles.dragHandle} />
            </View>

            <View style={styles.sheetHeader}>
              <TouchableOpacity onPress={() => setFilterVisible(false)}>
                <Ionicons name="chevron-back" size={24} color="#333" />
              </TouchableOpacity>
              <Text style={styles.sheetTitle}>Cập nhật Index hố </Text>
              <View style={{ width: 24 }} />
            </View>
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>
    </View>
  );
}
const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    justifyContent: "flex-end",
  },
  bottomSheet: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    height: "85%",
    paddingTop: 8,
  },
  dragHandleWrap: {
    alignItems: "center",
    marginBottom: 12,
  },
  dragHandle: {
    width: 40,
    height: 4,
    backgroundColor: "#E0E0E0",
    borderRadius: 2,
  },
  sheetHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  sheetTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
  },footerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 12, paddingTop: 12, borderTopWidth: 1, borderTopColor: '#F3F4F6' },
  footerText: { fontSize: 13, color: '#4B5563' },
});
