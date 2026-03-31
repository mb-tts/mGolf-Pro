import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  SafeAreaView,
} from "react-native";
import FilterSearchBox from "./filteredSearchBox"; // Import Component dùng chung
import { ScrollView } from "react-native-gesture-handler";

// 1. TẠO DỮ LIỆU ẢO (DUMMY DATA) 20 NGƯỜI
const generateData = () => {
  return Array.from({ length: 20 }, (_, index) => ({
    id: (index + 1).toString(),
    rank: index + 1,
    name: "Nguyễn Hải Linh",
    hdc: 20,
    vga: "123568",
    image: `https://picsum.photos/id/${10 + index}/100`,
    // Gán role "Quản trị viên" cho người đầu tiên
    role: index === 0 ? "Quản trị viên" : null,
  }));
};

const LEADERBOARD_DATA = generateData();

const MemberRow = ({ item }) => {
  const formattedRank = item.rank.toString().padStart(2, "0");

  return (
    <ScrollView style={styles.itemContainer} showsVerticalScrollIndicator={false}>
      
      <Text style={styles.rankText}>{formattedRank}</Text>

      
      <Image source={{ uri: item.image }} style={styles.avatar} />

      <View style={styles.infoContainer}>
        <Text style={styles.nameText}>{item.name}</Text>
        <Text style={styles.statsContainer}>
          <Text style={styles.label}>HDC: </Text>
          <Text style={styles.value}>{item.hdc} </Text>
          <Text style={styles.label}>VGA: </Text>
          <Text style={styles.value}>{item.vga}</Text>
        </Text>
      </View>

      {item.role ? <Text style={styles.roleText}>{item.role}</Text> : null}
    </ScrollView>
  );
};

// 3. COMPONENT CHÍNH
export default function MemberScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <FilterSearchBox />

      <FlatList
        data={LEADERBOARD_DATA}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <MemberRow item={item} />}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

// 4. STYLES (Đã xóa các style của SearchBox thừa)
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
    borderBottomColor: "#F5F5F5",
    backgroundColor: "#fff",
  },
  rankText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#0055A5",
    width: 25,
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
    color: "#888",
  },
  value: {
    color: "#222",
    fontWeight: "500",
  },
  roleText: {
    fontSize: 14,
    color: "#666",
    marginLeft: 10,
  },
});
