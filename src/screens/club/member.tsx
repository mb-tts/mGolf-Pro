import { useMemo, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import FilterSearchBox from "./filteredSearchBox"; 

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

export interface Member {
  id: string;
  rank: number;
  name: string;
  hdc: number;
  vga: string;
  image: string;
  role: string | null;
}

const LEADERBOARD_DATA = generateData();

const MemberRow = ({ item }: { item: Member }) => {
  const formattedRank = item.rank.toString().padStart(2, "0");

  return (
    <View style={styles.itemContainer}>
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
    </View>
  );
};

// 3. COMPONENT CHÍNH
export default function MemberScreen() {
  const [searchText, setSearchText] = useState("");
  const insets = useSafeAreaInsets();

  const filteredMembers = useMemo(() => {
    const query = searchText.toLowerCase().trim();
    if (!query) return LEADERBOARD_DATA;
    return LEADERBOARD_DATA.filter((m) =>
      m.name.toLowerCase().includes(query) ||
      (m.vga && m.vga.toLowerCase().includes(query))
    );
  }, [searchText]);

  return (
    <View style={styles.container}>
      <FilterSearchBox value={searchText} onChangeText={setSearchText} />

      {/* THAY THẾ FLATLIST BẰNG MAP */}
      <View style={{ paddingBottom: 60 + insets.bottom }}>
        {filteredMembers.length > 0 ? (
          filteredMembers.map((item) => (
            <MemberRow key={item.id} item={item} />
          ))
        ) : (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>Không tìm thấy thành viên</Text>
          </View>
        )}
      </View>
    </View>
  );
}

// 4. STYLES (Giữ nguyên)
const styles = StyleSheet.create({
  emptyContainer: {
    padding: 40,
    alignItems: "center",
  },
  emptyText: {
    color: "#999",
  },
  container: {
    padding: 10,
    flex: 1,
    backgroundColor: "#fff",
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 10,
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