import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import Sandau from "../../club/detailOuting.tsx/sandau";
import Thele from "../../club/detailOuting.tsx/thele";
import Filght from "../../club/detailOuting.tsx/flight";
import KetQua from "../../club/detailOuting.tsx/ketqua";
import { ScreenWrapper } from "@/components/common/ScreenWrapper";
import { BackHeader } from "@/components/common/BackHeader";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import type { AppStackParamList } from "@/types/navigation.types";
import type { IoniconsName, OutingSectionHeaderProps } from "@/types/golf.types";

type Props = NativeStackScreenProps<AppStackParamList, "OutingDetailScreen">;

export default function OutingDetailScreen({ route, navigation }: Props) {
  const { outingData } = route.params;
  const source = route.params.source;
  const courseDetails = outingData?.courseDetails;
  const headerImageSource = outingData?.image || require("../../../../assets/images/image.png");
  const isTournament = source === "Tournament";

  const [activeTab, setActiveTab] = useState("Sân đấu");
  const [showFullIntro, setShowFullIntro] = useState(false);
  const tabs = ["Sân đấu", "Thể lệ", "Flight", "Kết quả"];
  const insets = useSafeAreaInsets();

  // ─── 1. GIAO DIỆN DÀNH CHO "SÂN ĐẤU" ──────────────────────────────────────────
  const renderTournamentView = () => (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Ảnh Header */}
      <View style={styles.headerImageContainer}>
        <Image source={headerImageSource} style={styles.headerImage} />
        <View style={styles.headerOverlay} />
      </View>

      <BackHeader
        title="Thông tin sân đấu"
        onBack={() => navigation.goBack()}
        variant="blur"
        tintColor="#fff"
        rightAction={
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="settings-outline" size={20} color="#fff" />
          </TouchableOpacity>
        }
      />

      <View style={[styles.mainInfoBox, { paddingBottom: insets.bottom + 50 }]}>
        <Text style={styles.tournamentTitle}>
          {courseDetails?.name || outingData?.title || "Đang cập nhật..."}
        </Text>

        {/* ĐÃ SỬA: Gộp lại chỉ còn 1 khung duy nhất */}
        <View style={styles.tournamentCardWrapper}>
          <InfoRow icon="location-outline" text={courseDetails?.location} color="#2563EB" />
          <InfoRow icon="flag-outline" text={courseDetails?.holes} color="#2563EB" />
          <InfoRow icon="time-outline" text={courseDetails?.operatingHours} color="#2563EB" />
          <InfoRow icon="call-outline" text={courseDetails?.phone} color="#2563EB" />
        </View>

        {/* Nút Xem bản đồ */}
        <TouchableOpacity style={styles.tournamentMapButton}
        onPress={() => {
            // Lấy dữ liệu hố số 1 làm mặc định
            const firstHole = outingData?.courseDetails?.scorecard?.[0];
            
            navigation.navigate("HoleMapScreen", { 
              currentHole: firstHole,
              courseName: outingData?.courseDetails?.name 
            });
          }}>
          <Ionicons name="map-outline" size={18} color="#fff" style={{ marginRight: 8 }} />
          <Text style={styles.tournamentMapButtonText}>Xem bản đồ sân</Text>
        </TouchableOpacity>

        {/* Thông tin giới thiệu */}
        <SectionHeader title="Thông tin giới thiệu" hasLine />
        <Text style={styles.sectionText} numberOfLines={showFullIntro ? undefined : 4}>
          {courseDetails?.description || "Nội dung giới thiệu sân golf đang được cập nhật."}
        </Text>
        <TouchableOpacity onPress={() => setShowFullIntro(!showFullIntro)}>
          <Text style={styles.readMoreText}>{showFullIntro ? "thu gọn" : "xem thêm"}</Text>
        </TouchableOpacity>

        {/* Khám phá 18 lỗ */}
        <SectionHeader 
          title="Khám phá 18 lỗ" 
          rightText="Xem chi tiết" 
          onRightPress={() => navigation.navigate("HoleListScreen", { courseDetails })}
        />
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.rowScroll}>
          {(courseDetails.courseImages || []).slice(0, 4).map((uri: string, idx: number) => (
            <View key={idx} style={styles.holeImageWrapper}>
              <Image source={{ uri }} style={styles.holeImage} />
              <View style={styles.holeBadge}>
                <Text style={styles.holeBadgeText}>{idx + 1}</Text>
              </View>
            </View>
          ))}
        </ScrollView>

        {/* Hình ảnh và video */}
        <SectionHeader title="Hình ảnh và video" rightText="Xem tất cả" />
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.rowScroll}>
          {(courseDetails.courseImages || []).map((uri: string, idx: number) => (
            <Image key={idx} source={{ uri }} style={styles.mediaImage} />
          ))}
        </ScrollView>
      </View>
    </ScrollView>
  );

  // ─── 2. GIAO DIỆN DÀNH CHO "OUTING / GIẢI ĐẤU" ───────────────────────────────
  const renderOutingView = () => (
    <ScrollView style={styles.container} stickyHeaderIndices={[2]} showsVerticalScrollIndicator={false}>
      {/* [0] Ảnh Header */}
      <View style={styles.headerImageContainer}>
        <Image source={headerImageSource} style={styles.headerImage} />
        <View style={styles.headerOverlay} />
      </View>

      {/* [1] Nút Back */}
      <BackHeader title="Chi tiết outing" onBack={() => navigation.goBack()} variant="blur" tintColor="#fff" />

      {/* [2] Khối Thông Tin Gắn Chặt (Sticky) */}
      <View style={[styles.mainInfoBox, { marginBottom: 0, paddingBottom: 0 }]}>
        <Text style={styles.mainTitle}>{outingData?.title || "Giải đấu"}</Text>

        <InfoRow icon="calendar-outline" text={`${outingData?.time || ""} ${outingData?.date || ""}`} color="#666" />
        <InfoRow icon="location-outline" text={outingData?.address} color="#666" />
        <InfoRow icon="people-outline" text={`${outingData?.participants || 0} người tham gia`} color="#666" />
        <InfoRow icon="airplane-outline" text={`${outingData?.fly || 0} fly`} color="#666" />

        <View style={styles.tabContainer}>
          {tabs.map((tab) => (
            <TouchableOpacity
              key={tab}
              style={[styles.tabItem, activeTab === tab && styles.activeTabItem]}
              onPress={() => setActiveTab(tab)}
            >
              <Text style={[styles.tabText, activeTab === tab && styles.activeTabText]}>{tab}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* [3] Nội dung bên dưới Tabs */}
      <View style={{ flex: 1, backgroundColor: "#fff", paddingHorizontal: 16, paddingBottom: insets.bottom }}>
        {activeTab === "Sân đấu" && courseDetails && <Sandau courseDetails={courseDetails} />}
        {activeTab === "Thể lệ" && outingData?.rules && <Thele rules={outingData.rules} />}
        {activeTab === "Flight" && outingData?.flights && <Filght flights={outingData.flights} />}
        {activeTab === "Kết quả" && outingData?.results && <KetQua results={outingData.results} />}
      </View>
    </ScrollView>
  );

  return (
    <ScreenWrapper extendBehindStatusBar statusBarStyle="light-content" loadingDelay={0}>
      {isTournament ? renderTournamentView() : renderOutingView()}
    </ScreenWrapper>
  );
}

// ─── CÁC COMPONENT TÁI SỬ DỤNG LẠI (TỐI ƯU CODE) ─────────────────────────────

const InfoRow = ({ icon, text, color }: { icon: IoniconsName; text: string; color: string }) => {
  if (!text) return null;
  return (
    <View style={styles.infoRowShared}>
      <Ionicons name={icon} size={16} color={color} />
      <Text style={[styles.infoTextShared, { color: color === "#666" ? "#555" : "#1F2937" }]}>
        {text}
      </Text>
    </View>
  );
};

const SectionHeader = ({ title, rightText, hasLine, onRightPress }: OutingSectionHeaderProps) => (
  <View style={styles.sectionHeaderRow}>
    <Text style={styles.sectionTitle}>{title}</Text>
    {hasLine && <View style={styles.sectionTitleLine} />}
    {rightText && (
      <TouchableOpacity onPress={onRightPress}>
        <Text style={styles.linkText}>{rightText}</Text>
      </TouchableOpacity>
    )}
  </View>
);

// ─── STYLES ───────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  headerImageContainer: { height: 240 },
  headerImage: { width: "100%", height: "100%", position: "absolute" },
  headerOverlay: { ...StyleSheet.absoluteFillObject, backgroundColor: "rgba(0, 0, 0, 0.24)" },
  
  actionButton: {
    width: 40, height: 40, borderRadius: 20, backgroundColor: "rgba(0,0,0,0.3)",
    justifyContent: "center", alignItems: "center",
  },
  
  mainInfoBox: {
    backgroundColor: "#fff", borderTopLeftRadius: 30, borderTopRightRadius: 30,
    paddingTop: 3, paddingHorizontal: 16, marginTop: -24, overflow: "hidden",
  },
  
  mainTitle: { fontSize: 20, fontWeight: "bold", marginBottom: 12, marginTop: 15 },
  tournamentTitle: { fontSize: 22, fontWeight: "700", marginTop: 12, marginBottom: 10, color: "#0F172A" },
  
  infoRowShared: { flexDirection: "row", alignItems: "center", marginBottom: 10 },
  infoTextShared: { marginLeft: 10, fontSize: 14 },
  
  tabContainer: { flexDirection: "row", borderBottomWidth: 1, borderBottomColor: "#EEE" },
  tabItem: { flex: 1, alignItems: "center", paddingVertical: 12 },
  activeTabItem: { borderBottomWidth: 2, borderBottomColor: "#0055A5" },
  tabText: { color: "#888" },
  activeTabText: { color: "#0055A5", fontWeight: "bold" },
  
  // ĐÃ SỬA: Card hợp nhất 1 lớp viền
  tournamentCardWrapper: {
    backgroundColor: "#fff", 
    borderRadius: 16, 
    padding: 16, 
    marginBottom: 20,
    shadowColor: "#000", 
    shadowOpacity: 0.08, 
    shadowRadius: 10, 
    elevation: 4,
    borderWidth: 1, 
    borderColor: "#EFF6FF", // Đường viền xanh mỏng cho sang trọng
  },
  
  tournamentMapButton: {
    flexDirection: "row", justifyContent: "center", alignItems: "center",
    marginBottom: 20, backgroundColor: "#1D4ED8", borderRadius: 12,
    paddingVertical: 11, paddingHorizontal: 16, alignSelf: "flex-start",
  },
  tournamentMapButtonText: { color: "#fff", fontWeight: "600", fontSize: 14 },

  sectionHeaderRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginVertical: 12 },
  sectionTitle: { fontSize: 16, fontWeight: "700", color: "#111827" },
  sectionTitleLine: { flex: 1, height: 1, backgroundColor: "#2563EB", opacity: 0.2, marginLeft: 8 },
  linkText: { fontFamily: "Inter", fontWeight: "600", fontSize: 12, color: "#004FA1" },
  
  sectionText: { marginBottom: 14, color: "#111827", lineHeight: 20 },
  readMoreText: { fontSize: 13, color: "#6B7280", fontWeight: "600", marginBottom: 20 },
  
  rowScroll: { marginBottom: 16 },
  holeImageWrapper: { width: 96, height: 96, marginRight: 12, borderRadius: 12, overflow: "hidden" },
  holeImage: { width: "100%", height: "100%", borderRadius: 12 },
  holeBadge: {
    position: "absolute", top: 8, left: 8, backgroundColor: "rgba(0,0,0,0.5)",
    width: 24, height: 24, borderRadius: 12, justifyContent: "center", alignItems: "center",
  },
  holeBadgeText: { color: "#fff", fontWeight: "bold", fontSize: 12 },
  mediaImage: { width: 160, height: 110, borderRadius: 12, marginRight: 12 },
});