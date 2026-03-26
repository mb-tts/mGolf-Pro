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

      <View style={styles.mainInfoBox1}>
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
      </View>

      <ScrollView >
        <View style={styles.mainInfoBox2}>
          {/* TITLE */}

          {/* TAB: SÂN ĐẤU */}
          {activeTab === "Sân đấu" && courseDetails &&(
            <Sandau courseDetails={courseDetails}/>
          )}
          {/* TAB KHÁC */}
          {activeTab === "Thể lệ" && outingData.rules &&(
            <Thele rules={outingData.rules}/>
          )}

          {activeTab === "Flight" && outingData.flights &&(
            <Filght flights={outingData.flights}/>
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

  mainInfoBox1: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingTop: 24,
    paddingHorizontal: 20,
    marginTop: -70,
  },
  mainInfoBox2: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingTop: 0,
    paddingHorizontal: 20,
    paddingBottom: 40,
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

  tabContent: { paddingTop: 20 },
});
