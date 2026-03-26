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
import Sandau from "./sandau";
import Thele from "./thele";
import Filght from "./flight";
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
          <View style={{ width: 40 }} /> 
        </SafeAreaView>
      </View>
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
          <ScrollView showsVerticalScrollIndicator={false} style={{ marginTop: 0 , flex: 1, marginBottom: 30 }}>
          {/* === NỘI DUNG TAB "SÂN ĐẤU" === */}
          {activeTab === "Sân đấu" && courseDetails && (
            <Sandau courseDetails={courseDetails} />
          )}

          {/* === NỘI DUNG TAB "THỂ LỆ" === */}
          {activeTab === "Thể lệ" && outingData.rules && (
            <Thele rules={outingData.rules}/>
          )}

          {/* === NỘI DUNG TAB "FLIGHT" === */}
          {activeTab === "Flight" && outingData.flights && (
            <Filght flights = {outingData.flights}/>
          )}
          </ScrollView>
        </View>
      
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
    marginTop: -60, // Kéo box lên đè lên ảnh
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
    marginTop: 0,
    borderBottomWidth: 1,
    borderBottomColor: "#EEE",
  },
  tabItem: { flex: 1, paddingVertical: 12, alignItems: "center" },
  activeTabItem: { borderBottomWidth: 2, borderBottomColor: "#0055A5" },
  tabText: { fontSize: 14, color: "#888" },
  activeTabText: { color: "#0055A5", fontWeight: "bold" },

  tabContent: { paddingTop: 20 },

  flightCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    // Viền và bóng đổ nhẹ tạo cảm giác nổi
    borderWidth: 1,
    borderColor: '#F0F0F0',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2, 
  },
  flightHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  flightName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  viewDetailText: {
    fontSize: 14,
    color: '#0055A5', // Màu xanh đặc trưng cho text link
    fontWeight: '600',
  },
  playersGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  playerCard: {
    width: '48%', // Chiếm 48% để chia 2 cột, chừa 4% khoảng trống giữa
    backgroundColor: '#fff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#F0F0F0',
    padding: 12,
    alignItems: 'center',
    marginBottom: 12,
  },
  playerAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginBottom: 8,
  },
  playerName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
    textAlign: 'center',
  },
  playerStats: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statLabel: {
    fontSize: 12,
    color: '#888',
  },
  statValue: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#333',
  },
});
