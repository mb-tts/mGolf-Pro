import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  SafeAreaView,
  TextInput
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

// 1. TẠO DỮ LIỆU ẢO (DUMMY DATA) 20 NGƯỜI
const generateData = () => {
  return Array.from({ length: 20 }, (_, index) => ({
    id: (index + 1).toString(),
    rank: index + 1,
    name: "Nguyễn Hải Linh", // Lấy tên giống ảnh mẫu
    hdc: 20,
    vga: "123568",
    image: `https://picsum.photos/id/${10 + index}/100`, // Avatar ngẫu nhiên
    // Gán role "Quản trị viên" cho người đầu tiên
    role: index === 0 ? "Quản trị viên" : null,
  }));
};

const LEADERBOARD_DATA = generateData();

// 2. COMPONENT HIỂN THỊ TỪNG DÒNG
const MemberRow = ({ item }) => {
  // Format số thứ tự: thêm '0' ở đầu nếu số nhỏ hơn 10
  const formattedRank = item.rank.toString().padStart(2, "0");

  return (
    <View style={styles.itemContainer}>
      {/* Số thứ tự */}
      <Text style={styles.rankText}>{formattedRank}</Text>

      {/* Avatar */}
      <Image source={{ uri: item.image }} style={styles.avatar} />

      {/* Thông tin: Tên, HDC, VGA */}
      <View style={styles.infoContainer}>
        <Text style={styles.nameText}>{item.name}</Text>
        <Text style={styles.statsContainer}>
          <Text style={styles.label}>HDC: </Text>
          <Text style={styles.value}>{item.hdc} </Text>
          <Text style={styles.label}>VGA: </Text>
          <Text style={styles.value}>{item.vga}</Text>
        </Text>
      </View>

      {/* Role (Chỉ hiển thị nếu có) */}
      {item.role && <Text style={styles.roleText}>{item.role}</Text>}
    </View>
  );
};

// 3. COMPONENT CHÍNH
export default function MemberScreen() {
  return (
    <SafeAreaView style={styles.container}>
      {/* SEARCH */}
      <View style={styles.searchWrap}>
        <View style={styles.searchBox}>
          <Ionicons name="search" size={18} color="#666" />
          <TextInput
            placeholder="Tìm kiếm"
            style={styles.input}
            placeholderTextColor="#999"
          />
        </View>

        <View style={styles.filterBtn}>
          <Ionicons name="options-outline" size={20} color="#007AFF" />
        </View>
      </View>
      <FlatList
        data={LEADERBOARD_DATA}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <MemberRow item={item} />}
        showsVerticalScrollIndicator={false} // Ẩn thanh cuộn cho đẹp
      />
    </SafeAreaView>
  );
}

// 4. STYLES
const styles = StyleSheet.create({
  container: {
    padding: 16, 
    flex: 1,
    backgroundColor: "#fff",
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#F5F5F5", // Màu viền xám nhạt giống ảnh
    backgroundColor: "#fff",
  },
  rankText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#0055A5", // Màu xanh dương cho số thứ tự
    width: 25, // Cố định độ rộng để căn lề đều nhau
    marginRight: 10,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
  infoContainer: {
    flex: 1,
    justifyContent: "center",
  },
  nameText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#222",
    marginBottom: 4,
  },
  statsContainer: {
    fontSize: 14,
  },
  label: {
    color: "#888", // Màu xám cho chữ "HDC:" và "VGA:"
  },
  value: {
    color: "#222", // Màu đen cho con số
    fontWeight: "500",
  },
  roleText: {
    fontSize: 14,
    color: "#666",
    marginLeft: 10,
  },

  /* SEARCH */
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
    borderRadius: 25,
    paddingHorizontal: 12,
    height: 40,
    borderColor: 'black', 
    elevation: 2
  },

  input: {
    marginLeft: 8,
    flex: 1,
  },

  filterBtn: {
    marginLeft: 10,
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    elevation: 2
  },
});
