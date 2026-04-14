
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useAppNavigation } from "@/hooks/useNavigation";

// Import file data của bạn
import { OUTING_DATA } from "../tournament/detail/outingData";

import type { OutingData } from "@/types/golf.types";

export default function CardOfOuting({ data }: { data: OutingData[] }) {
  const navigation = useAppNavigation();

  const handlePressCard = (item: OutingData) => {
    // Gọi đích danh OutingDetailScreen
    navigation.navigate("OutingDetailScreen", { outingData: item });
  };

  if (data.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>Không tìm thấy sự kiện nào</Text>
      </View>
    );
  }

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      {data.map((item) => (
        <TouchableOpacity
          key={item.id}
          style={styles.card}
          activeOpacity={0.9}
          onPress={() => handlePressCard(item)}
        >
          <View>
            <Image
              source={
                typeof item.image === "string"
                  ? { uri: item.image }
                  : item.image
              }
              style={styles.image}
            />
            <View style={styles.timeBadge}>
              <Ionicons name="calendar-outline" size={14} color="#fff" />
              <Text style={styles.timeText}>
                {item.time} {item.date}
              </Text>
            </View>
          </View>

          <View style={styles.info}>
            <Text style={styles.title}>{item.title}</Text>
            <View style={styles.row}>
              <Ionicons name="location-outline" size={16} color="#777" />
              <Text style={styles.text}>{item.address}</Text>
            </View>
            <View style={styles.row}>
              <Ionicons name="people-outline" size={16} color="#777" />
              <Text style={styles.text}>
                {item.participants} người tham gia
              </Text>
            </View>
            <View style={styles.row}>
              <Ionicons name="airplane-outline" size={16} color="#777" />
              <Text style={styles.text}>{item.fly} fly</Text>
            </View>
          </View>
        </TouchableOpacity>
      ))}
      <View style={{ height: 100 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  emptyContainer: {
    padding: 40,
    alignItems: "center",
  },
  emptyText: {
    color: "#999",
    fontSize: 15,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 3,
    marginBottom: 20,
  },
  image: { width: "100%", height: 220 },
  timeBadge: {
    position: "absolute",
    bottom: 10,
    left: 10,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  timeText: { color: "#fff", marginLeft: 6, fontSize: 12 },
  info: { padding: 12 },
  title: { fontSize: 16, fontWeight: "600", marginBottom: 6 },
  row: { flexDirection: "row", alignItems: "center", marginTop: 4 },
  text: { marginLeft: 6, color: "#666", fontSize: 13 },
});
