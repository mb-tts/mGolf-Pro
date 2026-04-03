import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../../../constants/colors";
import { ScreenWrapper } from "../../../components/common/ScreenWrapper";

// ── Types & Data ──
import { Course, Player, HoleCount, Route } from "./types";
import { MOCK_COURSES, MOCK_ALL_PLAYERS } from "./mock-data";

// ── Components ──
import { PickerField } from "./components/PickerField";
import { SegmentToggle } from "./components/SegmentToggle";
import { PlayerCard } from "./components/PlayerCard";
import { CoursePickerModal } from "./components/CoursePickerModal";
import { PlayerPickerModal } from "./components/PlayerPickerModal";
import { ScorerPickerModal } from "./components/ScorerPickerModal";
import { TeeTimePickerModal } from "./components/TeeTimePickerModal";


// ─── Component chính ─────────────────────────────────────────────────────────
export const CreateFlightScreen = ({ navigation }: any) => {
  const insets = useSafeAreaInsets();

  // ── Form State ──
  const [course, setCourse] = useState<Course | null>(null);
  const [holeCount, setHoleCount] = useState<HoleCount>(9);
  const [routeGo, setRouteGo] = useState<Route>("A");
  const [routeBack, setRouteBack] = useState<Route>("B");
  const [players, setPlayers] = useState<Player[]>([MOCK_ALL_PLAYERS[0]]);
  const [scorerId, setScorerId] = useState<string>("all");
  const [teeDate, setTeeDate] = useState("");
  const [teeTime, setTeeTime] = useState("");

  // ── Modal State ──
  const [showCourse, setShowCourse] = useState(false);
  const [showPlayer, setShowPlayer] = useState(false);
  const [showScorer, setShowScorer] = useState(false);
  const [showTeeTime, setShowTeeTime] = useState(false);

  // ── Derived ──
  const canContinue =
    !!course && players.length > 0 && !!scorerId && !!teeDate && !!teeTime;

  const scorerLabel =
    scorerId === "all"
      ? "Tất cả mọi người"
      : players.find((p) => p.id === scorerId)?.name +
          " - VGA:" +
          players.find((p) => p.id === scorerId)?.vga || "Tất cả mọi người";

  const teeTimeLabel = teeDate && teeTime ? `${teeDate}  ·  ${teeTime}` : "";

  // ── Handlers ──
  const handleRemovePlayer = (id: string) => {
    setPlayers((prev) => prev.filter((p) => p.id !== id));
    if (scorerId === id) setScorerId("all");
  };

  // const handleContinue = () => {
  //   if (!canContinue) return;
  //   console.log("── Flight Data ──", {
  //     courseId: course?.id,
  //     holeCount,
  //     routeGo,
  //     routeBack,
  //     players: players.map((p) => p.id),
  //     scorerId,
  //     teeDate,
  //     teeTime,
  //   });
  //   // TODO: navigation.navigate("FlightScoring", { ... });
  // };

  return (
    <ScreenWrapper extendBehindStatusBar statusBarStyle="dark-content">
      <SafeAreaView style={styles.container} edges={["bottom"]}>
        {/* ── Header ── */}
        {/* Header — paddingTop dùng insets.top để nút back luôn dưới icon bar */}
        <View style={[styles.header, { paddingTop: insets.top + 8 }]}>
          <TouchableOpacity
            style={styles.backBtn}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="chevron-back" size={22} color={Colors.text} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Tạo Flight</Text>
        </View>

        {/* ── Form ── */}
        <View style={styles.formCard}>
          <ScrollView
            style={styles.scroll}
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
          >
            {/* Sân đấu */}
            <PickerField
              label="Sân đấu"
              value={course?.name}
              placeholder="Chọn sân đấu"
              onPress={() => setShowCourse(true)}
            />

            {/* Hiện thêm khi đã chọn sân */}
            {course && (
              <>
                <SegmentToggle<HoleCount>
                  variant="pill"
                  options={[
                    { value: 9, label: "9 hố" },
                    { value: 18, label: "18 hố" },
                  ]}
                  selected={holeCount}
                  onSelect={setHoleCount}
                />
                <SegmentToggle<Route>
                  label="Đường đi"
                  options={[
                    { value: "A", label: "Đường A" },
                    { value: "B", label: "Đường B" },
                  ]}
                  selected={routeGo}
                  onSelect={setRouteGo}
                />
                <SegmentToggle<Route>
                  label="Đường về"
                  options={[
                    { value: "A", label: "Đường A" },
                    { value: "B", label: "Đường B" },
                  ]}
                  selected={routeBack}
                  onSelect={setRouteBack}
                />
              </>
            )}

            {/* Người chơi */}
            <View style={styles.section}>
              <Text style={styles.label}>Người chơi</Text>
              {players.length > 0 && (
                <View style={styles.playerList}>
                  {players.map((p, i) => (
                    <View key={p.id}>
                      <PlayerCard player={p} onRemove={handleRemovePlayer} />
                      {i < players.length - 1 && (
                        <View style={styles.divider} />
                      )}
                    </View>
                  ))}
                </View>
              )}
              {players.length < 4 && (
                <TouchableOpacity
                  style={styles.addBtn}
                  onPress={() => setShowPlayer(true)}
                >
                  <Ionicons
                    name="person-add-outline"
                    size={18}
                    color={Colors.primary}
                  />
                  <Text style={styles.addBtnText}>Thêm người chơi mới</Text>
                </TouchableOpacity>
              )}
            </View>

            {/* Người nhập điểm */}
            <PickerField
              label="Người nhập điểm"
              value={scorerLabel}
              placeholder="Chọn người nhập điểm"
              onPress={() => setShowScorer(true)}
            />

            {/* Tee time */}
            <PickerField
              label="Tee time"
              value={teeTimeLabel}
              placeholder="Chọn tee time"
              icon="calendar-outline"
              onPress={() => setShowTeeTime(true)}
            />
          </ScrollView>
        </View>

        {/* ── Footer ── */}
        <View style={styles.footerWrap}>
          <View style={styles.progressBar}>
            <View
              style={[
                styles.progressFill,
                { width: canContinue ? "50%" : "50%" },
              ]}
            />
          </View>
          <View style={styles.footer}>
            <TouchableOpacity
              style={[
                styles.continueBtn,
                canContinue && styles.continueBtnActive,
              ]}
              onPress={() => navigation.navigate("InstallGame")}
              disabled={!canContinue}
            >
              <Text
                style={[
                  styles.continueText,
                  canContinue && styles.continueTextActive,
                ]}
              >
                Tiếp tục
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* ══ Modals ══ */}
        <CoursePickerModal
          visible={showCourse}
          courses={MOCK_COURSES}
          selected={course}
          onSelect={setCourse}
          onClose={() => setShowCourse(false)}
        />
        <PlayerPickerModal
          visible={showPlayer}
          allPlayers={MOCK_ALL_PLAYERS}
          selectedPlayers={players}
          onConfirm={setPlayers}
          onClose={() => setShowPlayer(false)}
        />
        <ScorerPickerModal
          visible={showScorer}
          players={players}
          selected={scorerId}
          onSelect={setScorerId}
          onClose={() => setShowScorer(false)}
        />
        <TeeTimePickerModal
          visible={showTeeTime}
          selectedDate={teeDate}
          selectedTime={teeTime}
          onConfirm={(date, time) => {
            setTeeDate(date);
            setTeeTime(time);
          }}
          onClose={() => setShowTeeTime(false)}
        />
      </SafeAreaView>
    </ScreenWrapper>
  );
};

// ─── Styles ───────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F5F6FA" },

  header: { paddingHorizontal: 16, paddingTop: 8, paddingBottom: 12 },
  backBtn: {
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: Colors.white,
    justifyContent: "center",
    alignItems: "center",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 3,
    marginBottom: 16,
  },
  headerTitle: { fontSize: 26, fontWeight: "700", color: "#1A1A1A" },

  scroll: { flex: 1 },
  scrollContent: { paddingTop: 12 },

  formCard: {
    flex: 1,
    backgroundColor: Colors.white,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 16,
    paddingTop: 0,
    paddingBottom: 16,

    elevation: 6,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.06,
    shadowRadius: 12,
  },

  section: { marginBottom: 20 },
  label: { fontSize: 14, fontWeight: "600", color: "#404040", marginBottom: 8 },

  playerList: {
    borderWidth: 1,
    borderColor: "#EAEAEA",
    borderRadius: 16,
    marginBottom: 12,
    overflow: "hidden",
  },
  divider: { height: 1, backgroundColor: "#F0F0F0", marginHorizontal: 14 },

  addBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#D9EDFF",
    borderRadius: 16,
    height: 52,
    gap: 8,
    backgroundColor: "#FAFCFF",
    borderStyle: "dashed",
  },
  addBtnText: { fontSize: 14, color: Colors.primary, fontWeight: "600" },

  footerWrap: { backgroundColor: Colors.white },
  progressBar: { height: 3, backgroundColor: "#E8E8E8" },
  progressFill: { height: 3, backgroundColor: Colors.primary },
  footer: { paddingHorizontal: 16, paddingVertical: 16 },
  continueBtn: {
    height: 56,
    borderRadius: 16,
    backgroundColor: "#F0F0F0",
    justifyContent: "center",
    alignItems: "center",
  },
  continueBtnActive: {
    backgroundColor: Colors.primary,
    elevation: 4,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  continueText: { fontSize: 16, fontWeight: "700", color: "#9E9E9E" },
  continueTextActive: { color: Colors.white },
});
