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

export const HomeScreen = () => {
  const { user } = useAuth();

  return (
    <SafeAreaView style={styles.safe} edges={["top"]}>
      <HomeHeader user={user!} clubName="MBF Club" />

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Index Banner */}
        <IndexBanner index={12.5} />

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
          <View style={styles.achievementRow}>
            {MOCK_ACHIEVEMENTS.map((item) => (
              <AchievementCard key={item.id} item={item} />
            ))}
          </View>
        </View>
      </ScrollView>

      {/* FAB */}
      <FABButton onPress={() => {}} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background },
  section: { paddingHorizontal: 16, marginBottom: 24 },
  horizontalList: { paddingRight: 16 },
  achievementRow: { flexDirection: "row", gap: 10 },
});
