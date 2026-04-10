
import {
  View,
  ScrollView,
  FlatList,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
} from "react-native";
import {
  SafeAreaView,
} from "react-native-safe-area-context";
import { FABButton } from "@/components/home/FABButton";
import { HomeHeader } from "@/components/home/HomeHeader";
import { IndexBanner } from "@/components/home/IndexBanner";
import { MatchCard } from "@/components/home/MatchCard";
import { SectionHeader } from "@/components/home/SectionHeader";
import { Colors } from "@/constants/colors";
import { MOCK_MATCHES, MOCK_ACHIEVEMENTS } from "@/constants/mock-data";
import { useAuth } from "@/providers/auth.provider";
import { AchievementCard } from "@/components/home/AchievementCard";
import AchiveBg from "@assets/icons/home/achive.svg";
import GolfPersonIcon from "@assets/icons/home/golfPerson.svg";
import LogoBackground from "@assets/icons/home/logobackground.svg";
import { ScreenWrapper } from "@/components/common/ScreenWrapper";
import { useAppNavigation } from "@/hooks/useNavigation";

export const HomeScreen = () => {
  const { user } = useAuth();
  const navigation = useAppNavigation();

  // Clone Chưa có data -> dành cho user b
  const hasMatches = user?.vgaCode === "a" && MOCK_MATCHES.length > 0;

  // Thành tích mảng rỗng nếu chưa có trận — dữ liệu ít, cố định → dùng .map()
  const achievements = hasMatches
    ? MOCK_ACHIEVEMENTS
    : MOCK_ACHIEVEMENTS.map((a) => ({ ...a, value: "-" }));

  return (
    <ScreenWrapper
      extendBehindStatusBar={!hasMatches}
      statusBarStyle={hasMatches ? "dark-content" : "light-content"}
    >
      <View
        style={[styles.safe, hasMatches && { backgroundColor: Colors.white }]}
      >
        {/* ẢNH GOLF Ở TRÊN CÙNG (Dùng cho Empty State hoặc Header cover) */}
        {!hasMatches && (
          <Image
            source={require("@assets/images/backgroundHeader.jpg")}
            style={styles.topBackgroundImage}
            resizeMode="cover"
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
              onPressAvatar={() => navigation.navigate("MainTabs")}
            />
          </SafeAreaView>
        )}

        {/* ScrollView ở đây hợp lý vì nội dung cố định, ít thay đổi */}
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={[
            styles.scroll,
            !hasMatches && { backgroundColor: "transparent" },
          ]}
          contentContainerStyle={[
            styles.scrollContent,
            !hasMatches && { paddingTop: 260 },
          ]}
        >
          {hasMatches && <IndexBanner index={12.5} />}

          <View style={styles.whiteSheet}>
            {!hasMatches && (
              <View style={StyleSheet.absoluteFillObject}>
                <LogoBackground
                  width={240}
                  height={320}
                  style={styles.logoBackground}
                />
              </View>
            )}

            {/* HIỂN THỊ GREETING BÊN TRONG WHITE SHEET NẾU EMPTY */}
            {!hasMatches && (
              <>
                <View style={styles.emptyGreetingWrapper}>
                  <Text style={styles.italicGreeting}>Xin chào,</Text>
                  <Text style={styles.greetingName}>{user?.fullName}</Text>
                </View>

                <IndexBanner index={12.5} />

                <View style={styles.emptyGreetingWrapper}>
                  <TouchableOpacity style={styles.playGolfBtn}>
                    <GolfPersonIcon
                      width={24}
                      height={24}
                      color={Colors.white}
                    />
                    <Text style={styles.playGolfText}>Chơi golf</Text>
                  </TouchableOpacity>
                </View>
              </>
            )}

            {/* Trận đấu của tôi — FlatList vì dữ liệu dynamic, có thể nhiều item */}
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

            {/* Thành tích — dữ liệu ít (3 items cố định) → dùng .map() thay FlatList */}
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
        {hasMatches && (
          <FABButton onPress={() => navigation.navigate("CreateFlight")} />
        )}
      </View>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  safe: {
    flex: 1,
  },
  scroll: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  scrollContent: {
    flexGrow: 1,
  },
  whiteSheet: {
    backgroundColor: Colors.white,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: 8,
    minHeight: "100%",
    elevation: 8,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: -6 },
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
    paddingBottom: 16,
    paddingTop: 4,
  },
  achievementWrapper: {
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#E8C96B",
    overflow: "hidden",
    padding: 16,
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
    marginTop: 8,
    marginBottom: 0,
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
  logoBackground: {
    position: "absolute",
    left: -40,
    top: 0,
    opacity: 0.05,
  },
});
