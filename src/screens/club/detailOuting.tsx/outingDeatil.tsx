import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function OutingDetailScreen({ route, navigation }: any) {
  const { outingData } = route.params || {};
  const courseDetails = outingData?.courseDetails || {};

  const [activeTab, setActiveTab] = useState("Sân đấu");
  const tabs = ["Sân đấu", "Thể lệ", "Flight", "Kết quả"];

  return (
    <View style={styles.container}>
      {/* HEADER IMAGE */}
      <View style={styles.headerImageContainer}>
        <Image
          source={require("../../../../assets/images/image.png")}
          style={styles.headerImage}
        />

        <SafeAreaView style={styles.headerTop}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="chevron-back" size={24} color="#fff" />
          </TouchableOpacity>

          <Text style={styles.headerTitle}>Chi tiết outing</Text>

          <View style={{ width: 40 }} />
        </SafeAreaView>
      </View>

      <ScrollView style={{ marginTop: -50 }}>
        <View style={styles.mainInfoBox}>
          {/* TITLE */}
          <Text style={styles.mainTitle}>
            {String(outingData?.title || "")}
          </Text>

          {/* INFO */}
          <View style={styles.infoRow}>
            <Ionicons name="calendar-outline" size={16} color="#666" />
            <Text style={styles.infoText}>
              {String(outingData?.time || "")} {String(outingData?.date || "")}
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

          {/* TABS */}
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

          {/* TAB: SÂN ĐẤU */}
          {activeTab === "Sân đấu" && (
            <View style={styles.tabContent}>
              <Text style={styles.sectionTitle}>
                {String(courseDetails?.name || "")}
              </Text>

              <View style={styles.courseContactBox}>
                <View style={styles.infoRow}>
                  <Ionicons name="location-outline" size={18} color="#0055A5" />
                  <Text style={styles.courseInfoText}>
                    {String(courseDetails?.location || "")}
                  </Text>
                </View>

                <View style={styles.infoRow}>
                  <Ionicons name="golf-outline" size={18} color="#0055A5" />
                  <Text style={styles.courseInfoText}>
                    {String(courseDetails?.holes || "")}
                  </Text>
                </View>

                <View style={styles.infoRow}>
                  <Ionicons name="time-outline" size={18} color="#0055A5" />
                  <Text style={styles.courseInfoText}>
                    {String(courseDetails?.operatingHours || "")}
                  </Text>
                </View>

                <View style={styles.infoRow}>
                  <Ionicons name="call-outline" size={18} color="#0055A5" />
                  <Text style={styles.courseInfoText}>
                    {String(courseDetails?.phone || "")}
                  </Text>
                </View>
              </View>

              {/* DESCRIPTION */}
              <Text style={styles.sectionTitle}>Thông tin giới thiệu</Text>
              <Text style={styles.descText}>
                {String(courseDetails?.description || "")}
                <Text style={styles.readMore}> xem thêm</Text>
              </Text>

              {/* IMAGES */}
              <Text style={styles.sectionTitle}>Hình ảnh sân đấu</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {courseDetails?.courseImages?.map(
                  (img: string, idx: number) => (
                    <Image
                      key={idx}
                      source={{ uri: img }}
                      style={styles.courseImg}
                    />
                  ),
                )}
              </ScrollView>

              {/* TABLE */}
              <Text style={styles.sectionTitle}>Bảng điểm</Text>

              <ScrollView horizontal>
                <View>
                  {/* HEADER */}
                  <View style={[styles.tableRow, styles.tableHeader]}>
                    <Text style={[styles.cell, styles.colHole, bold]}>
                      Hole
                    </Text>
                    {courseDetails?.scorecard?.map((s: any) => (
                      <Text key={s.hole} style={[styles.cell, styles.colNum]}>
                        {String(s?.hole || "")}
                      </Text>
                    ))}
                  </View>

                  {/* ROW GENERATOR */}
                  {[
                    { label: "Black", key: "black", bg: "#F5F5F5" },
                    { label: "Blue", key: "blue", bg: "#D1E8FF" },
                    { label: "White", key: "white", bg: "#FFF" },
                    { label: "Red", key: "red", bg: "#FF7F8F" },
                  ].map((row) => (
                    <View
                      key={row.key}
                      style={[styles.tableRow, { backgroundColor: row.bg }]}
                    >
                      <Text style={[styles.cell, styles.colHole, bold]}>
                        {row.label}
                      </Text>
                      {courseDetails?.scorecard?.map((s: any) => (
                        <Text
                          key={`${row.key}-${s.hole}`}
                          style={[styles.cell, styles.colNum]}
                        >
                          {String(s?.[row.key] || "")}
                        </Text>
                      ))}
                    </View>
                  ))}
                </View>
              </ScrollView>

              <View style={{ height: 40 }} />
            </View>
          )}

          {/* TAB KHÁC */}
          {activeTab === "Thể lệ" && (
            <Text style={{ padding: 20 }}>Điều lệ</Text>
          )}
        </View>
      </ScrollView>
    </View>
  );
}

const bold = { fontWeight: "bold" } as const;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  headerImageContainer: { height: 240 },
  headerImage: { width: "100%", height: "100%", position: "absolute" },

  headerTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
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
    paddingTop: 24,
    paddingHorizontal: 20,
    paddingBottom: 40,
  },

  mainTitle: { fontSize: 20, fontWeight: "bold", marginBottom: 12 },

  infoRow: { flexDirection: "row", alignItems: "center", marginBottom: 8 },
  infoText: { marginLeft: 8, color: "#555" },

  tabContainer: {
    flexDirection: "row",
    marginTop: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#EEE",
  },

  tabItem: { flex: 1, alignItems: "center", paddingVertical: 12 },
  activeTabItem: { borderBottomWidth: 2, borderBottomColor: "#0055A5" },

  tabText: { color: "#888" },
  activeTabText: { color: "#0055A5", fontWeight: "bold" },

  tabContent: { paddingTop: 20 },

  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 12,
    marginTop: 8,
  },

  courseContactBox: {
    backgroundColor: "#F8F9FA",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },

  courseInfoText: { marginLeft: 12 },

  descText: { lineHeight: 22, marginBottom: 20 },
  readMore: { color: "#999", fontWeight: "bold" },

  courseImg: {
    width: 220,
    height: 160,
    borderRadius: 12,
    marginRight: 12,
  },

  tableRow: { flexDirection: "row", borderBottomWidth: 1, borderColor: "#EEE" },
  tableHeader: { backgroundColor: "#FFE4B5" },

  cell: {
    paddingVertical: 8,
    textAlign: "center",
    borderRightWidth: 1,
    borderColor: "#EEE",
  },

  colHole: { width: 100, paddingLeft: 10, textAlign: "left" },
  colNum: { width: 45 },
});
