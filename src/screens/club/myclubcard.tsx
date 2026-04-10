
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
  ImageSourcePropType,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const { width } = Dimensions.get("window");

import { FlatList } from "react-native";
export interface ClubType {
  id: number;
  name: string;
  members: number;
  outings: number;
  logo: ImageSourcePropType;
}

interface MyClubCardProps {
  club: ClubType;
  onPressDetail: () => void;
}
// Mảng dữ liệu của bạn
const Clubs = [
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

export function ClubListScreen() {
  return (
    <View style={{ flex: 1, marginTop: 50 }}>
      <FlatList
        data={Clubs}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <MyClubCardScreen
            club={item}
            onPressDetail={() => {
              console.log("Xem chi tiết CLB: ", item.name);
            }}
          />
        )}
      />
    </View>
  );
}

// Cập nhật lại Props nhận thêm "club"
export default function MyClubCardScreen({
  club,
  onPressDetail,
}: MyClubCardProps) {
  return (
    <View style={styles.myClubCard}>
      <View style={styles.myClubBanner}>
        <View style={styles.myClubBannerContent}>
          {/* Hiển thị tên CLB từ dữ liệu */}
          <Text style={styles.myClubTitle}>{club.name}</Text>
          {/* Hiển thị logo từ dữ liệu */}
          <Image source={club.logo} style={styles.myClubLogo} />
        </View>
        <View style={styles.golfBallPattern} />
      </View>

      <View style={styles.myClubStats}>
        <View style={styles.statBox}>
          {/* Hiển thị số thành viên */}
          <Text style={styles.statNumber}>{club.members}</Text>
          <Text style={styles.statLabel}>Thành viên</Text>
          <Ionicons
            name="people"
            size={40}
            color="rgba(59, 130, 246, 0.1)"
            style={styles.statIconBg}
          />
        </View>
        <View style={styles.statBox}>
          {/* Hiển thị số outing */}
          <Text style={styles.statNumber}>{club.outings}</Text>
          <Text style={styles.statLabel}>Outing</Text>
          <Ionicons
            name="golf"
            size={40}
            color="rgba(59, 130, 246, 0.1)"
            style={styles.statIconBg}
          />
        </View>
      </View>

      <TouchableOpacity style={styles.detailButton} onPress={onPressDetail}>
        <Text style={styles.detailButtonText}>Xem chi tiết Câu lạc bộ</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  myClubCard: {
    width: width * 0.85,
    backgroundColor: "#fff",
    borderRadius: 16,
    marginLeft: 16,
    marginRight: 8,
    overflow: "hidden",
    elevation: 3,
    marginBottom: 10,
  },
  myClubBanner: {
    backgroundColor: "#A3E635",
    height: 100,
    justifyContent: "center",
    paddingHorizontal: 16,
    position: "relative",
  },
  myClubBannerContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    zIndex: 2,
  },
  myClubTitle: { fontSize: 18, fontWeight: "bold", color: "#111827" },
  myClubLogo: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 2,
    borderColor: "#fff",
  },
  golfBallPattern: {
    position: "absolute",
    right: -20,
    top: -20,
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "rgba(255,255,255,0.3)",
    zIndex: 1,
  },
  myClubStats: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 16,
  },
  statBox: {
    flex: 1,
    backgroundColor: "#F0F9FF",
    borderRadius: 12,
    padding: 12,
    marginHorizontal: 4,
    borderWidth: 1,
    borderColor: "#BAE6FD",
    overflow: "hidden",
  },
  statNumber: { fontSize: 18, fontWeight: "bold", color: "#0284C7" },
  statLabel: { fontSize: 13, color: "#0284C7", marginTop: 4 },
  statIconBg: { position: "absolute", right: -5, bottom: -5 },
  detailButton: {
    borderTopWidth: 1,
    borderTopColor: "#F3F4F6",
    paddingVertical: 14,
    alignItems: "center",
  },
  detailButtonText: { color: "#0055A5", fontWeight: "600", fontSize: 14 },
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
});
