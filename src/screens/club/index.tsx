// File: src/screens/club/index.tsx
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Image,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ScreenWrapper } from "../../components/common/ScreenWrapper";
const { width } = Dimensions.get("window");
import MyClubCardScreen from "./myclubcard";
import { useNavigation } from "@react-navigation/native";
import ClubMainScreen from "./mainscreen";
// ─── DỮ LIỆU MẪU CHO CLUBS ─────────────────────────────────────────────────────
const dummyClubs = [
  {
    id: 1,
    name: "MBF Club",
    members: 256,
    outings: 16,
    logo: require("../../../assets/images/image2.png"),
  },
  {
    id: 2,
    name: "Green Golfers",
    members: 180,
    outings: 10,
    logo: require("../../../assets/images/image3.png"),
  },
];

// ─── COMPONENT CON ─────────────────────────────────────────────────────────────
const SearchBar = () => (
  <View style={styles.searchContainer}>
    <Ionicons
      name="search-outline"
      size={20}
      color="#3B82F6"
      style={styles.searchIcon}
    />
    <TextInput
      style={styles.searchInput}
      placeholder="Nhập tên hoặc mã câu lạc bộ"
      placeholderTextColor="#9CA3AF"
    />
  </View>
);

const OutingCard = ({ item }: { item: any }) => (
  <TouchableOpacity style={styles.outingCard} activeOpacity={0.9}>
    <View style={styles.outingImageContainer}>
      <Image
        source={require("../../../assets/images/image.png")}
        style={styles.outingImage}
      />
      <View style={styles.clubBadge}>
        <Text style={styles.clubBadgeText}>MBF CLB</Text>
        <Image
          source={require("../../../assets/images/NewImage.png")}
          style={styles.clubBadgeIcon}
        />
      </View>

      {item.isHappening ? (
        <View style={[styles.statusBadge, { backgroundColor: "#EF4444" }]}>
          <Ionicons name="radio-button-on" size={12} color="#fff" />
          <Text style={styles.statusBadgeText}>Đang diễn ra</Text>
        </View>
      ) : (
        <View
          style={[styles.statusBadge, { backgroundColor: "rgba(0,0,0,0.6)" }]}
        >
          <Ionicons name="calendar-outline" size={12} color="#fff" />
          <Text style={styles.statusBadgeText}>{item.time}</Text>
        </View>
      )}
    </View>

    <View style={styles.outingInfo}>
      <Text style={styles.outingTitle}>{item.title}</Text>
      <View style={styles.infoRow}>
        <Ionicons name="location-outline" size={16} color="#6B7280" />
        <Text style={styles.infoText} numberOfLines={1}>
          {item.location}
        </Text>
      </View>
      <View style={styles.infoRow}>
        <Ionicons name="people-outline" size={16} color="#6B7280" />
        <Text style={styles.infoText}>{item.participants} người tham gia</Text>
      </View>
      <View style={styles.infoRow}>
        <Ionicons name="airplane-outline" size={16} color="#6B7280" />
        <Text style={styles.infoText}>{item.fly} fly</Text>
      </View>
    </View>
  </TouchableOpacity>
);

// ─── MÀN HÌNH CHÍNH ────────────────────────────────────────────────────────────
export default function ClubIndexScreen() {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<any>();
  const dummyEvents = [
    {
      id: "1",
      title: "Dalat Place Golf",
      location: "12 Trần Phú, Lâm Đồng, Đà Lạt",
      participants: 4,
      fly: 10,
      isHappening: true,
    },
    {
      id: "2",
      title: "Dalat Place Golf 2",
      location: "12 Trần Phú, Lâm Đồng, Đà Lạt",
      participants: 4,
      fly: 10,
      isHappening: false,
      time: "8:00 12/12/2024",
    },
  ];

  // Hàm xử lý khi bấm vào chi tiết CLB
  const handlePressDetail = (clubName: string) => {
    console.log("Xem chi tiết CLB:", clubName);
    navigation.navigate("ClubMainScreen", { clubName }); // Truyền thêm clubName nếu cần
  };

  return (
    <ScreenWrapper>
      <Text style={styles.headerTitle}>Câu lạc bộ</Text>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <SearchBar />

        {/* ─── PHẦN CÂU LẠC BỘ CỦA TÔI ─── */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Câu lạc bộ của tôi</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {/* Sử dụng map để duyệt qua mảng dummyClubs */}
            {dummyClubs.map((clubItem) => (
              <MyClubCardScreen
                key={clubItem.id}
                club={clubItem}
                onPressDetail={() => handlePressDetail(clubItem.name)}
              />
            ))}
          </ScrollView>
        </View>

        {/* ─── PHẦN SỰ KIỆN OUTING ─── */}
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Sự kiện outing</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>Xem tất cả</Text>
            </TouchableOpacity>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {dummyEvents.map((item) => (
              <OutingCard key={item.id} item={item} />
            ))}
          </ScrollView>
        </View>
      </ScrollView>
    </ScreenWrapper>
  );
}

// ─── STYLES ───────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F4F6F8" },
  headerTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#1F2937",
    marginHorizontal: 16,
    marginVertical: 12,
  },
  scrollContent: { paddingBottom: 40 },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    marginHorizontal: 16,
    borderRadius: 24,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  searchIcon: { marginRight: 8 },
  searchInput: { flex: 1, fontSize: 15, color: "#1F2937" },
  sectionContainer: { marginBottom: 24 },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1F2937",
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  seeAllText: { fontSize: 14, fontWeight: "600", color: "#0055A5" },
  outingCard: {
    width: width * 0.7,
    backgroundColor: "#fff",
    borderRadius: 16,
    marginLeft: 16,
    marginRight: 8,
    overflow: "hidden",
    elevation: 3,
    marginBottom: 10,
  },
  outingImageContainer: { height: 140, position: "relative" },
  outingImage: { width: "100%", height: "100%" },
  clubBadge: {
    position: "absolute",
    top: 12,
    left: 12,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#0055A5",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 20,
  },
  clubBadgeText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "bold",
    marginRight: 6,
  },
  clubBadgeIcon: { width: 16, height: 16, borderRadius: 8 },
  statusBadge: {
    position: "absolute",
    bottom: 12,
    left: 12,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusBadgeText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "600",
    marginLeft: 4,
  },
  outingInfo: { padding: 16 },
  outingTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1F2937",
    marginBottom: 10,
  },
  infoRow: { flexDirection: "row", alignItems: "center", marginBottom: 6 },
  infoText: { fontSize: 13, color: "#6B7280", marginLeft: 6, flex: 1 },
});