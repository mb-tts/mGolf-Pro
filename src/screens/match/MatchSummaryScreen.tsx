import React, { useState } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  Text,
  TouchableOpacity,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation, useRoute } from "@react-navigation/native";
import { ScreenWrapper } from "@/components/common/ScreenWrapper";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { AppStackParamList } from "@/types/navigation.types";
import { TabsNavigation, PlayerCards, ScoreTable } from "./matchsummary";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

interface HoleScore {
  holeId: number;
  playerScores: { score: number; relative: number; isTeam?: boolean }[];
}

type MatchSummaryScreenProps = NativeStackScreenProps<
  AppStackParamList,
  "MatchSummary"
>;

type MatchSummaryNavigationProp = NativeStackNavigationProp<AppStackParamList>;


const MatchSummaryScreen: React.FC<MatchSummaryScreenProps> = () => {
  const navigation = useNavigation<MatchSummaryNavigationProp>();  const route = useRoute<MatchSummaryScreenProps["route"]>();
  const insets = useSafeAreaInsets();
  const [activeTab, setActiveTab] = useState("team");

  // Dữ liệu mock nếu không có route.params
  const players = route.params?.players || [
    { name: "Tôi", avatar: "https://i.pravatar.cc/100?img=11" },
    { name: "Hoàng Anh", avatar: "https://i.pravatar.cc/100?img=12" },
    { name: "Xuân Anh", avatar: "https://i.pravatar.cc/100?img=13" },
    { name: "Hoàng Anh", avatar: "https://i.pravatar.cc/100?img=14" },
  ];
  const scoreData = route.params?.scoreData || {};
  const totalHoles = 5;

  const handleGoHome = () => {
    navigation.navigate("MainTabs");
  };

  const handleViewScorecard = () => {
    // navigation.navigate("Scorecard");
  };

  const calculatePlayerTotals = (playerIdx: number) => {
    let totalScore = 15;
    let totalRelative =
      playerIdx === 0 ? 5 : playerIdx === 1 ? 10 : playerIdx === 2 ? 15 : 20;
    let skinsCount = 1;

    return { totalScore, totalRelative, skinsCount };
  };

  const getHoleScores = (): HoleScore[] => {
    const holeScores: HoleScore[] = [];
    for (let holeId = 1; holeId <= totalHoles; holeId++) {
      const playerScores = players.map((_, playerIdx) => {
        const isTeam = holeId === 3;
        const score = -2;
        const relative = playerIdx < 2 || holeId === 3 ? 1 : -1;
        return { score, relative, isTeam };
      });
      holeScores.push({ holeId, playerScores });
    }
    return holeScores;
  };

  const holeScores = getHoleScores();

  return (
    <ScreenWrapper extendBehindStatusBar={false}>
      <View style={[styles.container, { paddingTop: insets.top }]}>
        {/* HEADER */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Tổng kết trận đấu</Text>
        </View>

        <TabsNavigation activeTab={activeTab} onTabChange={setActiveTab} />

        <ScrollView showsVerticalScrollIndicator={false} style={styles.content}>
          <PlayerCards
            players={players}
            calculatePlayerTotals={calculatePlayerTotals}
          />

          <ScoreTable players={players} holeScores={holeScores} />
        </ScrollView>

        {/* BOTTOM BUTTONS */}
        <View style={[styles.bottomActions, { paddingBottom: insets.bottom + 16 }]}>
          <TouchableOpacity style={styles.outlineBtn} onPress={handleGoHome}>
            <Text style={styles.outlineBtnText}>Trang chủ</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.primaryBtn} onPress={handleViewScorecard}>
            <Text style={styles.primaryBtnText}>Xem Scorecard</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScreenWrapper>
  );
};

const PRIMARY_BLUE = "#0061AF";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F9FA",
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    paddingTop: 24,
  },
  headerTitle: {
    fontSize: 26,
    fontWeight: "700",
    color: "#1A1A1A",
  },
  content: {
    flex: 1,
  },
  bottomActions: {
    flexDirection: "row",
    paddingHorizontal: 20,
    paddingTop: 16,
    gap: 12,
    backgroundColor: "#FFF",
    borderTopWidth: 1,
    borderTopColor: "#E5E7EB",
  },
  outlineBtn: {
    flex: 1,
    height: 48,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: PRIMARY_BLUE,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFF",
  },
  outlineBtnText: {
    fontSize: 15,
    fontWeight: "600",
    color: PRIMARY_BLUE,
  },
  primaryBtn: {
    flex: 1,
    height: 48,
    borderRadius: 12,
    backgroundColor: PRIMARY_BLUE,
    justifyContent: "center",
    alignItems: "center",
  },
  primaryBtnText: {
    fontSize: 15,
    fontWeight: "600",
    color: "#FFF",
  },
});

export default MatchSummaryScreen;