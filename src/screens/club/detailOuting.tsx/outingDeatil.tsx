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
  // Lấy data truyền từ Card sang
  const { outingData } = route.params;
  const { courseDetails } = outingData;

  const [activeTab, setActiveTab] = useState("Sân đấu");
  const tabs = ["Sân đấu", "Thể lệ", "Flight", "Kết quả"];

  return (
    <View style={styles.container}>
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
          <View style={{ width: 40 }} /> {/* Spacer để cân bằng Header */}
        </SafeAreaView>
      </View>

      <ScrollView style={{ marginTop: -50 }}>
        {/* === MAIN INFO BOX (Kéo lên đè 1 phần lên ảnh) === */}
        <View style={styles.mainInfoBox}>
          <Text style={styles.mainTitle}>{outingData.title}</Text>

          <View style={styles.infoRow}>
            <Ionicons name="calendar-outline" size={16} color="#666" />
            <Text style={styles.infoText}>
              {outingData.time} {outingData.date}
            </Text>
          </View>
          <View style={styles.infoRow}>
            <Ionicons name="location-outline" size={16} color="#666" />
            <Text style={styles.infoText}>{outingData.address}</Text>
          </View>
          <View style={styles.infoRow}>
            <Ionicons name="people-outline" size={16} color="#666" />
            <Text style={styles.infoText}>
              {outingData.participants} người tham gia
            </Text>
          </View>
          <View style={styles.infoRow}>
            <Ionicons name="airplane-outline" size={16} color="#666" />
            <Text style={styles.infoText}>{outingData.fly} fly</Text>
          </View>

          {/* === TABS === */}
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

          {/* === NỘI DUNG TAB "SÂN ĐẤU" === */}
          {activeTab === "Sân đấu" && courseDetails && (
            <View style={styles.tabContent}>
              <Text style={styles.sectionTitle}>{courseDetails.name}</Text>

              <View style={styles.courseContactBox}>
                <View style={styles.infoRow}>
                  <Ionicons name="location-outline" size={18} color="#0055A5" />
                  <Text style={styles.courseInfoText}>
                    {courseDetails.location}
                  </Text>
                </View>
                <View style={styles.infoRow}>
                  <Ionicons name="golf-outline" size={18} color="#0055A5" />
                  <Text style={styles.courseInfoText}>
                    {courseDetails.holes}
                  </Text>
                </View>
                <View style={styles.infoRow}>
                  <Ionicons name="time-outline" size={18} color="#0055A5" />
                  <Text style={styles.courseInfoText}>
                    {courseDetails.operatingHours}
                  </Text>
                </View>
                <View style={styles.infoRow}>
                  <Ionicons name="call-outline" size={18} color="#0055A5" />
                  <Text style={styles.courseInfoText}>
                    {courseDetails.phone}
                  </Text>
                </View>
              </View>

              <Text style={styles.sectionTitle}>Thông tin giới thiệu</Text>
              <Text style={styles.descText}>
                {courseDetails.description}{" "}
                <Text style={styles.readMore}>xem thêm</Text>
              </Text>

              <Text style={styles.sectionTitle}>Hình ảnh sân đấu</Text>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                style={styles.imageList}
              >
                {courseDetails.courseImages.map((img: string, idx: number) => (
                  <Image
                    key={idx}
                    source={{ uri: img }}
                    style={styles.courseImg}
                  />
                ))}
              </ScrollView>

              <Text style={styles.sectionTitle}>Bảng điểm (Scorecard)</Text>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                style={styles.tableWrapper}
              >
                <View>
                  <View style={[styles.tableRow, styles.tableHeader]}>
                    <Text
                      style={[
                        styles.cell,
                        styles.colHole,
                        { fontWeight: "bold" },
                      ]}
                    >
                      Hole
                    </Text>
                    {courseDetails.scorecard.map((s: any) => (
                      <Text
                        key={`h${s.hole}`}
                        style={[
                          styles.cell,
                          styles.colNum,
                          { fontWeight: "bold" },
                        ]}
                      >
                        {s.hole}
                      </Text>
                    ))}
                  </View>
                  <View
                    style={[styles.tableRow, { backgroundColor: "#F5F5F5" }]}
                  >
                    <Text
                      style={[
                        styles.cell,
                        styles.colHole,
                        { fontWeight: "bold" },
                      ]}
                    >
                      Black
                    </Text>
                    {courseDetails.scorecard.map((s: any) => (
                      <Text
                        key={`b${s.hole}`}
                        style={[styles.cell, styles.colNum]}
                      >
                        {s.black}
                      </Text>
                    ))}
                  </View>
                  <View
                    style={[styles.tableRow, { backgroundColor: "#D1E8FF" }]}
                  >
                    <Text
                      style={[
                        styles.cell,
                        styles.colHole,
                        { fontWeight: "bold" },
                      ]}
                    >
                      Blue
                    </Text>
                    {courseDetails.scorecard.map((s: any) => (
                      <Text
                        key={`bl${s.hole}`}
                        style={[styles.cell, styles.colNum]}
                      >
                        {s.blue}
                      </Text>
                    ))}
                  </View>
                  <View
                    style={[styles.tableRow, { backgroundColor: "#FFFFFF" }]}
                  >
                    <Text
                      style={[
                        styles.cell,
                        styles.colHole,
                        { fontWeight: "bold" },
                      ]}
                    >
                      White
                    </Text>
                    {courseDetails.scorecard.map((s: any) => (
                      <Text
                        key={`w${s.hole}`}
                        style={[styles.cell, styles.colNum]}
                      >
                        {s.white}
                      </Text>
                    ))}
                  </View>
                  <View
                    style={[styles.tableRow, { backgroundColor: "#FF7F8F" }]}
                  >
                    <Text
                      style={[
                        styles.cell,
                        styles.colHole,
                        { fontWeight: "bold" },
                      ]}
                    >
                      Red
                    </Text>
                    {courseDetails.scorecard.map((s: any) => (
                      <Text
                        key={`r${s.hole}`}
                        style={[styles.cell, styles.colNum]}
                      >
                        {s.red}
                      </Text>
                    ))}
                  </View>
                </View>
              </ScrollView>
              <View style={{ height: 40 }} />
            </View>
          )}

          {activeTab === "Thể lệ"  && <View>
          <Text style = {{padding: 20}}>
            Điều lệ
          </Text>
            
            </View>}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  headerImageContainer: { height: 240, position: "relative" },
  headerImage: { width: "100%", height: "100%", position: "absolute" },
  headerTop: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
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
  headerTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    textShadowColor: "rgba(0, 0, 0, 0.5)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  }, // Thêm shadow nhẹ để chữ luôn rõ trên ảnh sáng

  mainInfoBox: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    marginTop: 0, // Kéo box lên đè lên ảnh
    paddingTop: 24,
    paddingHorizontal: 20,
    paddingBottom: 40,
    minHeight: 600,
  },
  mainTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 12,
  },
  infoRow: { flexDirection: "row", alignItems: "center", marginBottom: 8 },
  infoText: { marginLeft: 8, color: "#555", fontSize: 14 },

  tabContainer: {
    flexDirection: "row",
    marginTop: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#EEE",
  },
  tabItem: { flex: 1, paddingVertical: 12, alignItems: "center" },
  activeTabItem: { borderBottomWidth: 2, borderBottomColor: "#0055A5" },
  tabText: { fontSize: 14, color: "#888" },
  activeTabText: { color: "#0055A5", fontWeight: "bold" },

  tabContent: { paddingTop: 20 },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 12,
    marginTop: 8,
  },
  courseContactBox: {
    backgroundColor: "#F8F9FA",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  courseInfoText: { marginLeft: 12, color: "#444", fontSize: 14 },

  descText: { fontSize: 14, color: "#555", lineHeight: 22, marginBottom: 20 },
  readMore: { color: "#999", fontWeight: "bold" },

  imageList: { flexDirection: "row", marginBottom: 24 },
  courseImg: { width: 220, height: 160, borderRadius: 12, marginRight: 12 },

  tableWrapper: {
    marginTop: 10,
    borderWidth: 1,
    borderColor: "#EEE",
    borderRadius: 8,
    overflow: "hidden",
  },
  tableRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#EEE",
  },
  tableHeader: { backgroundColor: "#FFE4B5" },
  cell: {
    paddingVertical: 8,
    textAlign: "center",
    fontSize: 13,
    borderRightWidth: 1,
    borderRightColor: "#EEE",
  },
  colHole: { width: 100, paddingLeft: 10, textAlign: "left" },
  colNum: { width: 45 },
});
