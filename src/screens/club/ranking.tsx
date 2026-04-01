import React, { useRef, useState, useEffect } from "react"; // Thêm useState, useEffect
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  SafeAreaView,
  Keyboard, // Thêm Keyboard vào đây
} from "react-native";
import FilterSearchBox from "./filteredSearchBox"; // Import Component dùng chung
import { ScrollView } from "react-native-gesture-handler";

// 1. TẠO DỮ LIỆU ẢO (DUMMY DATA)
const generateData = () => {
  const data = [
    {
      id: "1",
      rank: 1,
      name: "Nguyễn Hùng",
      vgaid: "VGA 123568",
      score: 48,
      image: "https://picsum.photos/id/10/100",
    },
    {
      id: "2",
      rank: 2,
      name: "Nguyễn Hùng",
      vgaid: "VGA 123568",
      score: 44,
      image: "https://picsum.photos/id/11/100",
    },
    {
      id: "3",
      rank: 3,
      name: "Nguyễn Hùng",
      vgaid: "VGA 123568",
      score: 40,
      image: "https://picsum.photos/id/12/100",
    },
    {
      id: "4",
      rank: 4,
      name: "Nguyễn Hùng",
      vgaid: "VGA 123568",
      score: 38,
      image: "https://picsum.photos/id/13/100",
    },
    {
      id: "5",
      rank: 5,
      name: "Lan Anh Phạm",
      vgaid: "VGA 190900",
      score: 36,
      image: "https://picsum.photos/id/14/100",
    },
    {
      id: "6",
      rank: 6,
      name: "Nguyễn Văn An",
      vgaid: "VGA 190901",
      score: 35,
      image: "https://picsum.photos/id/15/100",
    },
  ];

  // Tự động sinh thêm cho đủ 19 người
  for (let i = 7; i <= 19; i++) {
    data.push({
      id: i.toString(),
      rank: i,
      name: `Người chơi ${i}`,
      vgaid: `VGA ${100000 + i}`,
      score: 35 - (i - 6),
      image: `https://picsum.photos/id/${10 + i}/100`,
    });
  }

  // Thêm "Tôi" vào vị trí số 20
  const myData = {
    id: "20",
    rank: 20,
    name: "Tôi",
    vgaid: "VGA 123368",
    score: 10,
    image: "https://picsum.photos/id/30/100",
  };
  data.push(myData);

  return { data, myData };
};

export const { data: LEADERBOARD_DATA, myData: MY_DATA } = generateData();

// Chiều cao cố định của item để hàm scrollToIndex tính toán chính xác
const ITEM_HEIGHT = 80;

// Component hiển thị từng người chơi
export const PlayerRow = ({ item, isSticky = false }) => {
  let rankColor = "#fff";
  if (item.rank === 1) rankColor = "#FFD700";
  else if (item.rank === 2) rankColor = "#C0C0C0";
  else if (item.rank === 3) rankColor = "#CD7F32";

  return (
    <View style={[styles.itemContainer, isSticky && styles.stickyItem]}>
      {/* Phần Avatar & Rank */}
      <View style={styles.avatarContainer}>
        <Image source={{ uri: item.image }} style={styles.avatar} />
        <View style={styles.overlay} />
        <Text style={[styles.rankText, { color: rankColor }]}>{item.rank}</Text>
      </View>

      {/* Phần Thông tin */}
      <View style={styles.infoContainer}>
        <Text style={styles.nameText}>{item.name}</Text>
        <Text style={styles.vgaText}>{item.vgaid}</Text>
      </View>

      {/* Phần Điểm */}
      <View style={styles.scoreContainer}>
        <Text style={styles.scoreText}>{item.score} điểm</Text>
      </View>
    </View>
  );
};
// Thêm prop mainScrollRef nhận từ ClubMainScreen
export default function RankingScreen() {
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => setKeyboardVisible(true),
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => setKeyboardVisible(false),
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView>
        <FilterSearchBox />

        <View
          style={{
            paddingBottom: isKeyboardVisible ? 20 : ITEM_HEIGHT,
          }}
        >
          {LEADERBOARD_DATA.map((item) => (
            <PlayerRow key={item.id} item={item} />
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flex: 1,
    backgroundColor: "#fff",
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    height: ITEM_HEIGHT,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
    backgroundColor: "#fff",
  },
  stickyItem: {
    borderBottomWidth: 0,
  },
  avatarContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  avatar: {
    width: "100%",
    height: "100%",
    position: "absolute",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.4)",
  },
  rankText: {
    fontSize: 20,
    fontWeight: "bold",
    zIndex: 1,
  },
  infoContainer: {
    flex: 1,
    marginLeft: 15,
    justifyContent: "center",
  },
  nameText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 4,
  },
  vgaText: {
    fontSize: 13,
    color: "#888",
  },
  scoreContainer: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#E0E0E0",
  },
  scoreText: {
    fontSize: 14,
    color: "#333",
  },
  stickyBottomContainer: {
    position: "absolute",
    width: "100%",
    top: 0,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#E0E0E0",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    // elevation: 10,
  },
});
