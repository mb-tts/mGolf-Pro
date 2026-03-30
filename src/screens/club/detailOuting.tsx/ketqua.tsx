import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function KetQua({ results }: any) {
  // State để lưu trữ từ khóa tìm kiếm
  const [searchText, setSearchText] = useState("");

  // Lọc dữ liệu dựa trên từ khóa gõ vào ô tìm kiếm
  const filteredResults = results?.filter((item: any) =>
    item.name.toLowerCase().includes(searchText.toLowerCase())
  ) || [];

  return (
    <View style={styles.tabContent}>
      
      {/* 1. THANH TÌM KIẾM */}
      <View style={styles.searchWrap}>
        <Ionicons name="search" size={20} color="#0055A5" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Tìm kiếm"
          placeholderTextColor="#999"
          value={searchText}
          onChangeText={setSearchText}
        />
      </View>

      {/* 2. BẢNG KẾT QUẢ */}
      <View style={styles.tableContainer}>
        
        {/* Header của bảng */}
        <View style={styles.tableHeader}>
          <Text style={[styles.headerText, styles.colSTT]}>STT</Text>
          <Text style={[styles.headerText, styles.colGolfer]}>Golfer</Text>
          <Text style={[styles.headerText, styles.colNet]}>NET</Text>
          <Text style={[styles.headerText, styles.colPoints, styles.noBorderRight]}>Điểm xếp hạng</Text>
        </View>


        {filteredResults.map((item: any, index: number) => (
          <View key={item.id} style={styles.tableRow}>
           
            <Text style={[styles.cellText, styles.colSTT]}>{item.rank}</Text>
            
           
            <View style={[styles.colGolfer, styles.golferCell]}>
              <Image source={{ uri: item.image }} style={styles.avatar} />
              <View style={styles.golferInfoBox}>
                <Text style={styles.golferName} numberOfLines={1}>{item.name}</Text>
                <Text style={styles.golferStats}>
                  <Text style={{color: '#888'}}>HDC: </Text>{item.hdc}  <Text style={{color: '#888'}}>VGA: </Text>{item.vga}
                </Text>
              </View>
            </View>

            <Text style={[styles.cellText, styles.colNet]}>{item.net}</Text>
 
            <Text style={[styles.cellText, styles.colPoints, styles.noBorderRight]}>{item.points}</Text>
          </View>
        ))}
      </View>
      
      <View style={{ height: 40 }} />
    </View>
  );
}

const styles = StyleSheet.create({
  tabContent: { paddingTop: 20 },
  
  // Search Box Styles
  searchWrap: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#E0E6ED",
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 40,
    marginBottom: 20,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: "100%",
    fontSize: 15,
    color: "#333",
  },

  // Table Styles
  tableContainer: {
    borderWidth: 1,
    borderColor: "#E0E6ED",
    borderRadius: 12,
    overflow: "hidden", // Để góc bo tròn không bị tràn
    backgroundColor: "#fff",
  },
  tableHeader: {
    flexDirection: "row",
    backgroundColor: "#F0F8FF", // Màu xanh lơ nhạt
    borderBottomWidth: 1,
    borderBottomColor: "#E0E6ED",
  },
  tableRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#E0E6ED",
    alignItems: "center",
  },
  
  // Header Text & Cell Text
  headerText: {
    fontSize: 13,
    fontWeight: "bold",
    color: "#0055A5",
    paddingVertical: 12,
    textAlign: "center",
    borderRightWidth: 1,
    borderRightColor: "#E0E6ED",
  },
  cellText: {
    fontSize: 14,
    color: "#333",
    paddingVertical: 16,
    textAlign: "center",
    borderRightWidth: 1,
    borderRightColor: "#E0E6ED",
  },
  noBorderRight: {
    borderRightWidth: 0, // Cột cuối cùng không có viền phải
  },

  // Columns Width
  colSTT: { width: "12%" },
  colGolfer: { width: "48%", borderRightWidth: 1, borderRightColor: "#E0E6ED" },
  colNet: { width: "15%" },
  colPoints: { width: "25%" },

  // Golfer Cell Specific
  golferCell: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 8,
    paddingVertical: 10,
    height: '100%'
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginRight: 8,
  },
  golferInfoBox: {
    flex: 1,
    justifyContent: "center",
  },
  golferName: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 2,
  },
  golferStats: {
    fontSize: 11,
    color: "#333",
    fontWeight: "500",
  },
});