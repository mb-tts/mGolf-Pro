import React, { useState, useMemo } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../../constants/colors";
import { MOCK_HISTORY_MATCHES } from "../../constants/mock-data";
import HistoryCard from "./historycard";
import FilterBottomSheet from "./filter";

export const HistoryScreen = () => {
  const [searchText, setSearchText] = useState("");
  const [isFilterVisible, setIsFilterVisible] = useState(false);

  // Search logic
  const filteredMatches = useMemo(() => {
    if (!searchText.trim()) return MOCK_HISTORY_MATCHES;
    const lower = searchText.toLowerCase();
    return MOCK_HISTORY_MATCHES.filter(
      (m) =>
        m.title.toLowerCase().includes(lower) ||
        m.location.toLowerCase().includes(lower) ||
        m.club.toLowerCase().includes(lower),
    );
  }, [searchText]);

  return (
    <SafeAreaView style={styles.safe} edges={["top"]}>
      <View style={styles.customHeader}>
        <Text style={styles.headerTitle}>Lịch sử</Text>
      </View>

      <View style={styles.container}>
        <View style={styles.searchRow}>
          <View style={styles.searchContainer}>
            <Ionicons
              name="search-outline"
              size={20}
              color={Colors.textSecondary}
            />
            <TextInput
              style={styles.searchInput}
              placeholder="Nhập tên outing hoặc trận đấu"
              placeholderTextColor={Colors.textSecondary}
              value={searchText}
              onChangeText={setSearchText}
            />
          </View>
          <TouchableOpacity
            style={styles.filterButton}
            onPress={() => setIsFilterVisible(true)}
          >
            <Ionicons name="options-outline" size={24} color={Colors.primary} />
          </TouchableOpacity>
        </View>

        <FlatList
          data={filteredMatches}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <HistoryCard match={item} onPress={() => {}} />
          )}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      </View>
      <FilterBottomSheet
        visible={isFilterVisible}
        onClose={() => setIsFilterVisible(false)}
        onApply={() => {
          console.log("Áp dụng bộ lọc");
          setIsFilterVisible(false);
        }}
        onClear={() => {
          console.log("Xóa bộ lọc");
          setIsFilterVisible(false);
        }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: Colors.white, // Trả lại màu trắng cho SafeArea (tai thỏ)
  },
  container: {
    flex: 1,
    backgroundColor: "#DFE5EB", // Chuyển background xuống vùng nội dung
  },
  searchRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 16,
    marginBottom: 16,
    paddingHorizontal: 16,
    gap: 12,
  },
  searchContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F8F9FA",
    borderRadius: 8,
    paddingHorizontal: 12,
    height: 44,
  },
  searchInput: {
    flex: 1,
    height: "100%",
    marginLeft: 8,
    fontSize: 14,
    color: Colors.text || "#1A1A1A",
  },
  filterButton: {
    width: 44,
    height: 44,
    backgroundColor: Colors.white || "#FFF",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  listContent: {
    paddingHorizontal: 20,
    paddingBottom: 24,
  },
  customHeader: {
    height: 50,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    backgroundColor: Colors.white, // Header màu trắng theo yêu cầu
    paddingHorizontal: 20,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: Colors.text || "#1A1A1A",
  },
});
