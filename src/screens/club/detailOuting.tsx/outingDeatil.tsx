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
import KetQua from "./ketqua";
export default function OutingDetailScreen({ route, navigation }: any) {
  const { outingData, source } = route.params || {};
  const courseDetails = outingData?.courseDetails || {};
  const headerImageSource =
    outingData?.image || require("../../../../assets/images/image.png");
  const isTournament = source === "Tournament";

  const [activeTab, setActiveTab] = useState("Sân đấu");
  const [showFullIntro, setShowFullIntro] = useState(false);
  const tabs = ["Sân đấu", "Thể lệ", "Flight", "Kết quả"];

  return (
    <View style={styles.container}>
      <View style={styles.headerImageContainer}>
        <Image source={headerImageSource} style={styles.headerImage} />
        <View style={styles.headerOverlay} />

        <SafeAreaView style={styles.headerTop}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="chevron-back" size={24} color="#fff" />
          </TouchableOpacity>

          <Text style={styles.headerTitle}>
            {isTournament ? "Thông tin sân đấu" : "Chi tiết outing"}
          </Text>

          {isTournament ? (
            <TouchableOpacity style={styles.actionButton} onPress={() => {}}>
              <Ionicons name="settings-outline" size={24} color="#fff" />
            </TouchableOpacity>
          ) : (
            <View style={{ width: 40 }} />
          )}
        </SafeAreaView>
      </View>

      <ScrollView
        style={{
          marginTop: -70,
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
        }}
      >
        <View style={styles.mainInfoBox1}>
          {isTournament ? (
            <>
              <Text style={styles.tournamentTitle}>
                {String(courseDetails?.name || outingData?.title || "")}
              </Text>
            </>
          ) : (
            <>
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
              {activeTab === "Sân đấu" && courseDetails && (
                <Sandau courseDetails={courseDetails} />
              )}
              {activeTab === "Thể lệ" && outingData.rules && (
                <Thele rules={outingData.rules} />
              )}
              {activeTab === "Flight" && outingData.flights && (
                <Filght flights={outingData.flights} />
              )}
              {activeTab === "Kết quả" && outingData.results && (
                <KetQua results={outingData.results} />
              )}
            </>
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

  mainInfoBox1: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 24, 
    minHeight: 520,
  },

  mainTitle: { fontSize: 20, fontWeight: "bold", marginBottom: 12 },

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

  actionButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(0,0,0,0.3)",
    justifyContent: "center",
    alignItems: "center",
  },

  tournamentTitle: {
    fontSize: 22,
    fontWeight: "700",
    marginTop: 12,
    marginBottom: 10,
    color: "#0F172A",
  },

});
