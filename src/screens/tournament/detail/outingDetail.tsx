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
import Sandau from "../../club/detailOuting.tsx/sandau";
import Thele from "../../club/detailOuting.tsx/thele";
import Filght from "../../club/detailOuting.tsx/flight";
import KetQua from "../../club/detailOuting.tsx/ketqua";
import { ScreenWrapper } from "../../../components/common/ScreenWrapper";
import { BackHeader } from "../../../components/common/BackHeader";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function OutingDetailScreen({ route, navigation }: any) {
  const { outingData, source } = route.params || {};
  const courseDetails = outingData?.courseDetails || {};
  const headerImageSource =
    outingData?.image || require("../../../../assets/images/image.png");
  const isTournament = source === "Tournament";

  const [activeTab, setActiveTab] = useState("Sân đấu");
  const [showFullIntro, setShowFullIntro] = useState(false);
  const tabs = ["Sân đấu", "Thể lệ", "Flight", "Kết quả"];
  const insets = useSafeAreaInsets();

  return (
    <ScreenWrapper
      extendBehindStatusBar
      statusBarStyle="light-content"
      loadingDelay={0}
    >
      {isTournament ? (
        <ScrollView style={styles.container}>
          {/* HEADER IMAGE */}
          <View style={styles.headerImageContainer}>
            <Image source={headerImageSource} style={styles.headerImage} />
            <View style={styles.headerOverlay} />
          </View>

          {/* BackHeader */}
          <BackHeader
            title="Thông tin sân đấu"
            onBack={() => navigation.goBack()}
            variant="blur"
            tintColor="#fff"
            rightAction={
              <TouchableOpacity style={styles.actionButton} onPress={() => {}}>
                <Ionicons name="settings-outline" size={24} color="#fff" />
              </TouchableOpacity>
            }
          />

          <View style={[styles.mainInfoBox, { flex: 1, marginBottom: 0 }]}>
            {/* ScrollView lồng bên trong (giữ nguyên như code cũ của bạn) */}
            <ScrollView
              style={{ marginTop: 0 }}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{
                paddingBottom: insets.bottom + 50,
                flexGrow: 1,
              }}
            >
              <Text style={styles.tournamentTitle}>
                {String(courseDetails?.name || outingData?.title || "")}
              </Text>

              {/* Section thông tin sân */}
              <View style={styles.tournamentCardWrapper}>
                <View style={styles.tournamentDetailBox}>
                  <View style={styles.infoRowSmall}>
                    <Ionicons
                      name="location-outline"
                      size={16}
                      color="#2563EB"
                    />
                    <Text style={styles.infoTextSmall}>
                      {String(courseDetails?.location || "")}
                    </Text>
                  </View>
                  <View style={styles.infoRowSmall}>
                    <Ionicons name="flag-outline" size={16} color="#2563EB" />
                    <Text style={styles.infoTextSmall}>
                      {String(courseDetails?.holes || "")}
                    </Text>
                  </View>
                  <View style={styles.infoRowSmall}>
                    <Ionicons name="time-outline" size={16} color="#2563EB" />
                    <Text style={styles.infoTextSmall}>
                      {String(courseDetails?.operatingHours || "")}
                    </Text>
                  </View>
                  <View style={styles.infoRowSmall}>
                    <Ionicons name="call-outline" size={16} color="#2563EB" />
                    <Text style={styles.infoTextSmall}>
                      {String(courseDetails?.phone || "")}
                    </Text>
                  </View>
                </View>
              </View>

              {/* Button xem bản đồ */}
              <TouchableOpacity
                style={styles.tournamentMapButton}
                onPress={() => {}}
              >
                <Ionicons
                  name="map-outline"
                  size={18}
                  color="#fff"
                  style={{ marginRight: 8 }}
                />
                <Text style={styles.tournamentMapButtonText}>
                  Xem bản đồ sân
                </Text>
              </TouchableOpacity>

              {/* Thông tin giới thiệu */}
              <View style={styles.sectionTitleRow}>
                <Text style={styles.sectionTitle}>Thông tin giới thiệu</Text>
                <View style={styles.sectionTitleLine} />
              </View>
              <Text
                style={styles.sectionText}
                numberOfLines={showFullIntro ? undefined : 4}
                ellipsizeMode="tail"
              >
                {String(
                  courseDetails?.description ||
                    "Nội dung giới thiệu sân golf được cập nhật.",
                )}
              </Text>
              {!showFullIntro ? (
                <TouchableOpacity onPress={() => setShowFullIntro(true)}>
                  <Text style={styles.readMoreText}>xem thêm</Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity onPress={() => setShowFullIntro(false)}>
                  <Text style={styles.readMoreText}>thu gọn</Text>
                </TouchableOpacity>
              )}

              {/* Khám phá 18 lỗ */}
              <View style={[styles.sectionHeaderRow, { marginTop: 18 }]}>
                <Text style={styles.sectionSubTitle}>Khám phá 18 lỗ</Text>
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate("HoleListScreen", {
                      courseDetails,
                    })
                  }
                >
                  <Text style={styles.linkText}>Xem chi tiết</Text>
                </TouchableOpacity>
              </View>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                style={styles.rowScroll}
              >
                {(courseDetails.courseImages || [])
                  .slice(0, 4)
                  .map((uri: string, idx: number) => (
                    <View key={idx} style={styles.holeImageWrapper}>
                      <Image source={{ uri }} style={styles.holeImage} />
                      <View style={styles.holeBadge}>
                        <Text style={styles.holeBadgeText}>{idx + 1}</Text>
                      </View>
                    </View>
                  ))}
              </ScrollView>

              {/* Hình ảnh và video */}
              <View style={[styles.sectionHeaderRow, { marginTop: 18 }]}>
                <Text style={styles.sectionSubTitle}>Hình ảnh và video</Text>
                <TouchableOpacity onPress={() => {}}>
                  <Text style={styles.linkText}>Xem tất cả</Text>
                </TouchableOpacity>
              </View>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                style={styles.rowScroll}
              >
                {(courseDetails.courseImages || []).map((uri: string, idx: number) => (
                  <Image key={idx} source={{ uri }} style={styles.mediaImage} />
                ))}
              </ScrollView>
            </ScrollView>
          </View>
        </ScrollView>
      ) : (
        <ScrollView
          style={styles.container}
          stickyHeaderIndices={[2]} // Ghim phần tử ở vị trí Index 2
          showsVerticalScrollIndicator={false}
        >
          {/* [INDEX 0] HEADER IMAGE */}
          <View style={styles.headerImageContainer}>
            <Image source={headerImageSource} style={styles.headerImage} />
            <View style={styles.headerOverlay} />
          </View>

          {/* [INDEX 1] BackHeader */}
          <BackHeader
            title="Chi tiết outing"
            onBack={() => navigation.goBack()}
            variant="blur"
            tintColor="#fff"
          />

          {/* [INDEX 2] CỤM STICKY: Tiêu đề Outing & Thanh Tab */}
          <View
            style={[
              styles.mainInfoBox,
              { marginBottom: 0, paddingBottom: 0, backgroundColor: "#fff" },
            ]}
          >
            <Text style={styles.mainTitle}>
              {String(outingData?.title || "")}
            </Text>

            <View style={styles.infoRow}>
              <Ionicons name="calendar-outline" size={16} color="#666" />
              <Text style={styles.infoText}>
                {String(outingData?.time || "")}{" "}
                {String(outingData?.date || "")}
              </Text>
            </View>
            <View style={styles.infoRow}>
              <Ionicons name="location-outline" size={16} color="#666" />
              <Text style={styles.infoText}>
                {String(outingData?.address || "")}
              </Text>
            </View>
            <View style={styles.infoRow}>
              <Ionicons name="people-outline" size={16} color="#666" />
              <Text style={styles.infoText}>
                {String(outingData?.participants || 0)} người tham gia
              </Text>
            </View>
            <View style={styles.infoRow}>
              <Ionicons name="airplane-outline" size={16} color="#666" />
              <Text style={styles.infoText}>
                {String(outingData?.fly || 0)} fly
              </Text>
            </View>

            {/* Thanh Tab */}
            <View style={styles.tabContainer}>
              {tabs.map((tab) => (
                <TouchableOpacity
                  key={tab}
                  style={[
                    styles.tabItem,
                    activeTab === tab && styles.activeTabItem,
                  ]}
                  onPress={() => setActiveTab(tab)}
                >
                  <Text
                    style={[
                      styles.tabText,
                      activeTab === tab && styles.activeTabText,
                    ]}
                  >
                    {tab}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* [INDEX 3] PHẦN NỘI DUNG CONTENT (Cuộn dưới Tab) */}
          <View
            style={{
              flex: 1,
              backgroundColor: "#fff",
              paddingHorizontal: 16,
              paddingBottom: insets.bottom ,
            }}
          >
            {activeTab === "Sân đấu" && courseDetails && (
              <Sandau courseDetails={courseDetails} />
            )}
            {activeTab === "Thể lệ" && outingData?.rules && (
              <Thele rules={outingData.rules} />
            )}
            {activeTab === "Flight" && outingData?.flights && (
              <Filght flights={outingData.flights} />
            )}
            {activeTab === "Kết quả" && outingData?.results && (
              <KetQua results={outingData.results} />
            )}
          </View>
        </ScrollView>
      )}
    </ScreenWrapper>
  );
}

const bold = { fontWeight: "bold" } as const;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  headerImageContainer: { height: 240 },
  headerImage: { width: "100%", height: "100%", position: "absolute" },
  headerOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.24)",
  },

  headerTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 12,
    marginTop: 10,
  },

  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(0,0,0,0.3)",
    justifyContent: "center",
    alignItems: "center",
  },

  headerTitle: { color: "#fff", fontSize: 18, fontWeight: "bold" },

  mainInfoBox: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingTop: 3,
    paddingHorizontal: 16,

    marginTop: -24,
    overflow: "hidden",
  },

  mainTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 12,
    marginTop: 15,
  },

  infoRow: { flexDirection: "row", alignItems: "center", marginBottom: 8 },
  infoText: { marginLeft: 8, color: "#555" },

  tabContainer: {
    flexDirection: "row",
    marginTop: 0,
    borderBottomWidth: 1,
    borderBottomColor: "#EEE",
  },

  tabItem: { flex: 1, alignItems: "center", paddingVertical: 12 },
  activeTabItem: { borderBottomWidth: 2, borderBottomColor: "#0055A5" },

  tabText: { color: "#888" },
  activeTabText: { color: "#0055A5", fontWeight: "bold" },

  tabContent: { paddingTop: 20 },

  actionButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(0,0,0,0.3)",
    justifyContent: "center",
    alignItems: "center",
  },

  tournamentCardWrapper: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    marginBottom: 28,
    shadowColor: "#000",
    shadowOpacity: 0.12,
    shadowRadius: 14,
    elevation: 8,
    borderWidth: 1,
    borderColor: "rgba(15, 23, 42, 0.06)",
    marginHorizontal: 0,
    justifyContent: "center",
  },
  tournamentTitle: {
    fontSize: 22,
    fontWeight: "700",
    marginTop: 12,
    marginBottom: 10,
    color: "#0F172A",
  },
  tournamentInfos: {
    backgroundColor: "#F8FAFC",
    borderRadius: 12,
    padding: 13,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  tournamentDetailBox: {
    backgroundColor: "#fff",
    borderRadius: 14,
    padding: 14,
    marginTop: 6,
    borderWidth: 1,
    borderColor: "#EFF6FF",
  },
  infoRowSmall: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  infoTextSmall: {
    marginLeft: 8,
    color: "#1F2937",
    fontSize: 14,
  },
  tournamentMapButton: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 18,
    marginBottom: 16,
    backgroundColor: "#1D4ED8",
    borderRadius: 12,
    paddingVertical: 11,
    paddingHorizontal: 12,
    alignSelf: "flex-start",
  },
  tournamentMapButtonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 14,
  },

  sectionTitleRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
    marginBottom: 8,
  },
  sectionTitleLine: {
    flex: 1,
    height: 1,
    backgroundColor: "#2563EB",
    opacity: 0.2,
    marginLeft: 8,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#111827",
  },
  sectionText: {
    marginBottom: 14,
    color: "#111827",
    lineHeight: 20,
  },
  readMoreText: {
    fontSize: 13,
    color: "#6B7280",
    fontWeight: "600",
    textDecorationLine: "none",
  },
  linkText: {
    fontFamily: "Inter", // 👈 font Inter
    fontWeight: "600", // SemiBold
    fontSize: 12, // 👈 giảm từ 13 → 12
    lineHeight: 12 * 1.4, // 140%
    letterSpacing: -0.12, // -1%
    color: "#004FA1", // 👈 màu mới
    textDecorationLine: "none", // 👈 bỏ gạch chân
  },
  sectionHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  sectionSubTitle: {
    fontSize: 15,
    fontWeight: "600",
    color: "#334155",
  },

  rowScroll: {
    marginBottom: 16,
  },
  holeImageWrapper: {
    width: 96,
    height: 96,
    marginRight: 12,
    borderRadius: 12,
    overflow: "hidden",
  },
  holeImage: {
    width: "100%",
    height: "100%",
    borderRadius: 12,
  },
  holeBadge: {
    position: "absolute",
    top: 8,
    left: 8,
    backgroundColor: "rgba(0,0,0,0.5)",
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  holeBadgeText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 12,
  },
  mediaImage: {
    width: 160,
    height: 110,
    borderRadius: 12,
    marginRight: 12,
  },
});
