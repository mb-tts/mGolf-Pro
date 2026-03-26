import React from "react";
import { View, ScrollView, FlatList, StyleSheet, Text } from "react-native";
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
import GolfPersonIcon from "../../../assets/icons/home/golfPerson.svg";
import { ImageBackground, Image, TouchableOpacity } from "react-native";
import { ScreenWrapper } from "../../components/common/ScreenWrapper";

export const HomeScreen = ({ navigation }: any) => {
  const { user } = useAuth();

  // Clone Chưa có data -> dành cho user b
  const hasMatches = user?.vgaCode === "a" && MOCK_MATCHES.length > 0;

  // Thành tích mảng rỗng nếu chưa có trận
  const achievements = hasMatches
    ? MOCK_ACHIEVEMENTS
    : MOCK_ACHIEVEMENTS.map((a) => ({ ...a, value: "-" }));

  return (
    <ScreenWrapper>
      <View style={styles.safe}>
        {/* ẢNH GOLF Ở TRÊN CÙNG (Dùng cho Empty State hoặc Header cover) */}
        {!hasMatches && (
          <ImageBackground
            source={{
              uri: "https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa?q=80&w=2670&auto=format&fit=crop",
            }}
            style={styles.topBackgroundImage}
          />
        )}

        {/* HIỂN THỊ HEADER KHI CÓ DATA */}
        {hasMatches && (
          <SafeAreaView
            edges={["top"]}
            style={{ backgroundColor: Colors.white }}
          >
            <HomeHeader
              user={user!}
              clubName="MBF Club"
              onPressAvatar={() => navigation.navigate("Account")}
            />
          </SafeAreaView>
        )}

        <ScrollView
          showsVerticalScrollIndicator={false}
          style={styles.scroll}
          contentContainerStyle={[
            styles.scrollContent,
            !hasMatches && { paddingTop: 260 },
          ]}
        >
          {hasMatches && <IndexBanner index={12.5} />}

          <View style={styles.whiteSheet}>
            {!hasMatches && (
              <View style={StyleSheet.absoluteFillObject}>
                <ImageBackground
                  source={require("../../../assets/images/golf_pattern.png")}
                  style={{ flex: 1, opacity: 0.05 }}
                  resizeMode="cover"
                />
              </View>
            )}

            {/* HIỂN THỊ GREETING BÊN TRONG WHITE SHEET NẾU EMPTY */}
            {!hasMatches && (
              <View style={styles.emptyGreetingWrapper}>
                <Text style={styles.italicGreeting}>Xin chào,</Text>
                <Text style={styles.greetingName}>{user?.fullName}</Text>

                <IndexBanner index={12.5} />

                <TouchableOpacity style={styles.playGolfBtn}>
                  <GolfPersonIcon width={24} height={24} color={Colors.white} />
                  <Text style={styles.playGolfText}>Chơi golf</Text>
                </TouchableOpacity>
              </View>
            )}

            {/* Trận đấu của tôi (Chỉ hiện khi có data) */}
            {hasMatches && (
              <View style={styles.section}>
                <SectionHeader
                  title="Trận đấu của tôi"
                  actionLabel="Xem tất cả"
                />
                <FlatList
                  data={MOCK_MATCHES}
                  keyExtractor={(item) => item.id}
                  renderItem={({ item }) => <MatchCard match={item} />}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={styles.horizontalList}
                />
              </View>
            )}

            {/* Thành tích của tôi */}
            <View style={styles.section}>
              <SectionHeader title="Thành tích của tôi" />
              <View style={styles.achievementWrapper}>
                <View style={StyleSheet.absoluteFillObject}>
                  <AchiveBg
                    width="100%"
                    height="100%"
                    preserveAspectRatio="xMidYMid slice"
                  />
                </View>
                <View style={styles.achievementRow}>
                  {achievements.map((item) => (
                    <AchievementCard key={item.id} item={item} />
                  ))}
                </View>
              </View>
            </View>
          </View>
        </ScrollView>

        {/* FAB (Chỉ hiện khi có data) */}
        {hasMatches && <FABButton onPress={() => {}} />}
      </View>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: Colors.white, // Trắng cả khu vực status bar (tai thỏ)
  },
  scroll: {
    flex: 1,
    backgroundColor: Colors.white, // Backgroun phần thẻ IndexBanner cũng màu trắng
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

    // Thêm blur shadow từ phần bo góc trên (đổ lên trên)
    elevation: 8,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: -6 }, // Đẩy shadow đi ngược lên vùng trắng phía trên
    shadowOpacity: 0.1,
    shadowRadius: 16,
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
    overflow: "hidden", // giữ để SVG không tràn ra ngoài bo góc
    padding: 16,
  },

  achiveBg: {
    position: "absolute", // nằm phía sau các card
    top: 0,
    left: 0,
    opacity: 0.25, // mờ để thấy hoa văn nhẹ
  },
  achievementRow: {
    flexDirection: "row",
    gap: 10,
  },
  topBackgroundImage: {
    position: "absolute",
    top: 0,
    width: "100%",
    height: 350,
  },
  emptyGreetingWrapper: {
    alignItems: "center",
    marginTop: 20,
    marginBottom: 24,
  },
  italicGreeting: {
    fontFamily: "Meow Script",
    fontSize: 28,
    color: Colors.textSecondary,
    marginBottom: -4,
  },
  greetingName: {
    fontSize: 22,
    fontWeight: "700",
    color: "#1A1A1A",
    marginBottom: 20,
  },
  playGolfBtn: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.primary,
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 30,
    gap: 8,
    marginTop: 16,
    elevation: 4,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  playGolfText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: "600",
  },
});
