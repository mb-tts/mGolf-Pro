import React, { useMemo, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ImageBackground,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { OUTING_DATA } from "../club/detailOuting.tsx/outingData";

const FALLBACK_DATA = [
  {
    id: "demo-1",
    title: "Sân Golf Vân Trì",
    address: "Kim Nỗ, Đông Anh, Hà Nội",
    image: require("../../../assets/images/image2.png"),
    courseDetails: {
      name: "Sân Golf Vân Trì",
      location: "Kim Nỗ, Đông Anh, Hà Nội",
    },
  },
];

export const TournamentScreen = () => {
  const navigation = useNavigation<any>();
  const [searchText, setSearchText] = useState("");

  const data = OUTING_DATA?.length > 0 ? OUTING_DATA : FALLBACK_DATA;

  const filteredData = useMemo(() => {
    const query = searchText.toLowerCase().trim();
    if (!query) return data;

    return data.filter((item) =>
      [item.title, item.address, item.courseDetails?.name, item.courseDetails?.location]
        .filter(Boolean)
        .join(" ")
        .toLowerCase()
        .includes(query)
    );
  }, [data, searchText]);

  const handlePressCourse = (item: any) => {
    navigation.navigate("OutingDetailScreen", { outingData: item, source: "Tournament" });
  };

  const renderCourse = ({ item }) => (
    <TouchableOpacity
      key={item.id}
      style={styles.card}
      activeOpacity={0.8}
      onPress={() => handlePressCourse(item)}
    >
      <ImageBackground source={item.image} style={styles.image} imageStyle={styles.imageRadius}>
        <View style={styles.overlay} />
        <View style={styles.info}>
          <Text style={styles.name}>{item.courseDetails?.name}</Text>
          <View style={styles.location}>
            <Ionicons name="location-outline" size={13} color="#fff" />
            <Text style={styles.locationText}>{item.courseDetails?.location}</Text>
          </View>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sân đấu</Text>

      <View style={styles.search}>
        <Ionicons name="search" size={18} color="#D1D5DB" />
        <TextInput
          style={styles.input}
          placeholder="Nhập tên sân đấu"
          placeholderTextColor="#D1D5DB"
          value={searchText}
          onChangeText={setSearchText}
        />
      </View>

      <FlatList
        data={filteredData}
        renderItem={renderCourse}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scroll}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text style={styles.emptyText}>Không tìm thấy dữ liệu</Text>
          </View>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", paddingHorizontal: 16 },
  title: { fontSize: 26, fontWeight: "700", color: "#1F2937", paddingTop: 24, paddingBottom: 22 },
  search: {
    flexDirection: "row",
    alignItems: "center",
    height: 40,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#F0F0F0",
    backgroundColor: "#fff",
    paddingHorizontal: 12,
    marginBottom: 20,
  },
  input: { flex: 1, marginLeft: 8, fontSize: 15, color: "#374151" },
  scroll: { paddingBottom: 40 },
  card: {
    borderRadius: 14,
    overflow: "hidden",
    marginBottom: 14,
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 5,
  },
  image: { width: "100%", height: 164, justifyContent: "flex-end" },
  imageRadius: { borderRadius: 14 },
  overlay: { ...StyleSheet.absoluteFillObject, backgroundColor: "rgba(0,0,0,0.35)" },
  info: { padding: 14 },
  name: { color: "#fff", fontSize: 16, fontWeight: "600", marginBottom: 6 },
  location: { flexDirection: "row", alignItems: "center" },
  locationText: { color: "#fff", fontSize: 13, marginLeft: 6, fontWeight: "400" },
  empty: { alignItems: "center", justifyContent: "center", paddingVertical: 80 },
  emptyText: { color: "#9CA3AF", fontSize: 14 },
});
