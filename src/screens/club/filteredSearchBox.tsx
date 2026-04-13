import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Modal,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import Boloc from "./bolocInOuting"; 
export default function FilterSearchBox() {
  const [filterVisible, setFilterVisible] = useState(false);

  return (
    // <KeyboardAvoidingView
    //   behavior={Platform.OS === "ios" ? "padding" : "height"}
    // >
      <View>
        
        <View style={styles.searchWrap}>
          <View style={styles.searchBox}>
            <Ionicons name="search" size={18} color="#666" />
            <TextInput
              placeholder="Tìm kiếm"
              style={styles.input}
              placeholderTextColor="#999"
            />
          </View>

         
          <TouchableOpacity
            style={styles.filterBtn}
            onPress={() => setFilterVisible(true)}
          >
            <Ionicons name="options-outline" size={20} color="#007AFF" />
          </TouchableOpacity>
        </View>

        
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
                <Text style={styles.sheetTitle}>Bộ lọc</Text>
                <View style={{ width: 24 }} /> 
              </View>

              
              <Boloc />

              
              <SafeAreaView>
                <View style={styles.sheetFooter}>
                  <TouchableOpacity style={styles.clearBtn}>
                    <Text style={styles.clearBtnText}>Xóa tất cả</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.applyBtn}
                    onPress={() => setFilterVisible(false)}
                  >
                    <Text style={styles.applyBtnText}>Áp dụng bộ lọc</Text>
                  </TouchableOpacity>
                </View>
              </SafeAreaView>
            </TouchableOpacity>
          </TouchableOpacity>
        </Modal>
      </View>
    // </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  searchWrap: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  searchBox: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 44,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
    borderWidth: 1, 
    borderColor: "#E0E0E0",
  },
  input: {
    marginLeft: 8,
    flex: 1,
    height: "100%",
  },
  filterBtn: {
    marginLeft: 10,
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
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
  },
  sheetFooter: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: "#F0F0F0",
    backgroundColor: "#fff",
  },
  clearBtn: {
    paddingVertical: 10,
  },
  clearBtnText: {
    fontSize: 15,
    color: "#999",
    textDecorationLine: "underline",
  },
  applyBtn: {
    backgroundColor: "#0066CC",
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 32,
    flex: 1,
    marginLeft: 24,
    alignItems: "center",
  },
  applyBtnText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
