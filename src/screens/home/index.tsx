import React from "react";
import { View, ScrollView, FlatList, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { FABButton } from "../../components/home/FABButton";
import { HomeHeader } from "../../components/home/HomeHeader";
import { IndexBanner } from "../../components/home/IndexBanner";
import { MatchCard } from "../../components/home/MatchCard";
import { SectionHeader } from "../../components/home/SectionHeader";
import { Colors } from "../../constants/colors";
import { MOCK_MATCHES, MOCK_ACHIEVEMENTS } from "../../constants/mock-data";
import { useAuth } from "../../providers/auth.provider";
import { AchievementCard } from "../../components/home/AchievementCard";
import AchiveBg from "../../../assets/icons/home/achive.svg";

export const HomeScreen = () => {
  const { user } = useAuth();

  return (
    <SafeAreaView style={styles.safe} edges={["top"]}>
      {/* Header nền xám */}
      <HomeHeader user={user!} clubName="MBF Club" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Index Banner — nằm trên nền xám */}
        <IndexBanner index={12.5} />

        {/* Khối trắng bo góc trên */}
        <View style={styles.whiteSheet}>
          {/* Trận đấu của tôi */}
          <View style={styles.section}>
            <SectionHeader title="Trận đấu của tôi" actionLabel="Xem tất cả" />
            <FlatList
              data={MOCK_MATCHES}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => <MatchCard match={item} />}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.horizontalList}
            />
          </View>

          {/* Thành tích của tôi */}
          <View style={styles.section}>
            <SectionHeader title="Thành tích của tôi" />

            <View style={styles.achievementWrapper}>
              {/* ✅ Bọc SVG trong View absolute */}
              <View style={StyleSheet.absoluteFillObject}>
                <AchiveBg
                  width="100%"
                  height="100%"
                  preserveAspectRatio="xMidYMid slice"
                />
              </View>

              {/* Các card */}
              <View style={styles.achievementRow}>
                {MOCK_ACHIEVEMENTS.map((item) => (
                  <AchievementCard key={item.id} item={item} />
                ))}
              </View>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* FAB */}
      <FABButton onPress={() => {}} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#F0F4F8", // ✅ nền xám nhạt hiển thị sau banner
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  whiteSheet: {
    backgroundColor: Colors.white, // ✅ nền trắng
    borderTopLeftRadius: 20, // ✅ bo góc trên trái
    borderTopRightRadius: 20, // ✅ bo góc trên phải
    paddingTop: 8,
    minHeight: "100%", // ✅ kéo dài tới cuối màn hình
  },
  section: {
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  horizontalList: {
    paddingRight: 16,
    gap: 12,
    paddingBottom: 16, // Để phần bóng (shadow) mờ bên dưới không bị cắt
    paddingTop: 4,
  },
  achievementWrapper: {
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#E8C96B",
    overflow: "hidden", // ✅ giữ để SVG không tràn ra ngoài bo góc
    padding: 16,
  },

  achiveBg: {
    position: "absolute", // ✅ nằm phía sau các card
    top: 0,
    left: 0,
    opacity: 0.25, // ✅ mờ để thấy hoa văn nhẹ
  },
  achievementRow: {
    flexDirection: "row",
    gap: 10,
  },
});
