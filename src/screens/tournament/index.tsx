import { useMemo, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ImageBackground,
  TouchableOpacity,
  TextInput,
  StatusBar,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useAppNavigation } from "@/hooks/useNavigation";
import { OUTING_DATA } from "./detail/outingData";
import type { OutingData } from "@/types/golf.types";

export const TournamentScreen = () => {
  const navigation = useAppNavigation();
  const [searchText, setSearchText] = useState("");

  const data: OutingData[] = OUTING_DATA as OutingData[];

  const filteredData = useMemo(() => {
    const query = searchText.toLowerCase().trim();
    if (!query) return data;

    return data.filter((item) =>
      [
        item.title,
        item.address,
        item.courseDetails?.name,
        item.courseDetails?.location,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase()
        .includes(query)
    );
  }, [data, searchText]);

  const handlePressCourse = (item: OutingData) => {
    navigation.navigate("OutingDetailScreen", {
      outingData: item,
      source: "Tournament",
    });
  };

  const renderCourse = ({ item }: { item: OutingData }) => (
    <TouchableOpacity
      key={item.id}
      style={styles.card}
      activeOpacity={0.8}
      onPress={() => handlePressCourse(item)}
    >
      <ImageBackground
        source={
          typeof item.image === "string" ? { uri: item.image } : item.image
        }
        style={styles.image}
        imageStyle={styles.imageRadius}
      >
        <View style={styles.overlay} />
        <View style={styles.info}>
          <Text style={styles.name} numberOfLines={1}>
            {item.courseDetails?.name || item.title}
          </Text>
          <View style={styles.location}>
            <Ionicons name="location-outline" size={13} color="#fff" />
            <Text style={styles.locationText} numberOfLines={1}>
              {item.courseDetails?.location || item.address}
            </Text>
          </View>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.safeArea} edges={["top"]}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.container}>
        <Text style={styles.title}>Sân đấu</Text>

        <View style={styles.search}>
          <Ionicons name="search" size={18} color="#9CA3AF" />
          <TextInput
            style={styles.input}
            placeholder="Nhập tên sân đấu"
            placeholderTextColor="#9CA3AF"
            value={searchText}
            onChangeText={setSearchText}
          />
        </View>

        {/* FlatList ✓ — dữ liệu động (search filtering + API data) */}
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
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#111827",
    paddingTop: 10,
    paddingBottom: 20,
  },
  search: {
    flexDirection: "row",
    alignItems: "center",
    height: 46,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#F3F4F6",
    backgroundColor: "#F9FAFB",
    paddingHorizontal: 12,
    marginBottom: 20,
  },
  input: {
    flex: 1,
    marginLeft: 8,
    fontSize: 15,
    color: "#1F2937",
  },
  scroll: {
    paddingBottom: 40,
  },
  card: {
    borderRadius: 16,
    overflow: "hidden",
    marginBottom: 16,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },
  image: {
    width: "100%",
    height: 180,
    justifyContent: "flex-end",
  },
  imageRadius: {
    borderRadius: 16,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.3)",
  },
  info: {
    padding: 16,
  },
  name: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 4,
  },
  location: {
    flexDirection: "row",
    alignItems: "center",
  },
  locationText: {
    color: "rgba(255,255,255,0.9)",
    fontSize: 13,
    marginLeft: 4,
    fontWeight: "400",
  },
  empty: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 100,
  },
  emptyText: {
    color: "#9CA3AF",
    fontSize: 15,
  },
});