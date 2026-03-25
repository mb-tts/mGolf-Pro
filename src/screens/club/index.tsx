import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import IntroduceScreen from "./introduce";
import OutingScreen from "./outing";
import MemberScreen from "./member";

import { LinearGradient } from "expo-linear-gradient";
import RankingScreen from "./ranking";
const { width } = Dimensions.get("window");

const tabs = [
  { label: "Giới thiệu", key: "Introduce" },
  { label: "Outing", key: "Outing" },
  { label: "Ranking", key: "Ranking" },
  { label: "Thành viên", key: "Member" },
];

export const ClubScreen = () => {
  const [expanded, setExpanded] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  return (
    <View style={{ flex: 1 }}>
      <StatusBar barStyle="light-content" />

      <View style={styles.container}>
        {/* HEADER */}
        <View style={styles.header}>
          <Image
            source={require("../../../assets/images/image.png")}
            style={styles.cover}
          />

          <LinearGradient
            colors={["rgba(0,0,0,0.4)", "transparent"]}
            style={styles.gradient}
          />

          {/* Top bar */}
          <View style={styles.topBar}>
            <Image
              source={require("../../../assets/images/NewImage.png")}
              style={{ width: 40, height: 40 }}
            />
          </View>

          <Text style={styles.headerTitle}>Câu lạc bộ</Text>
        </View>

        {/* CARD */}
        <View style={styles.card}>
          <Image
            source={require("../../../assets/images/NewImage.png")}
            style={styles.avatar}
          />

          <View style={{ flex: 1 }}>
            <Text style={styles.clubName}>MBF Club</Text>
            <Text style={styles.memberText}>256 thành viên • 16 outing</Text>
          </View>
        </View>

        {/* TABS */}
        <View style={styles.tabs}>
          {tabs.map((tab, index) => {
            const isActive = index === activeTab; // activeTab vẫn là index số

            return (
              <TouchableOpacity
                key={index}
                style={styles.tabItemWrap}
                onPress={() => setActiveTab(index)}
              >
                <Text style={[styles.tabItem, isActive && styles.tabActive]}>
                  {tab.label}
                </Text>
              </TouchableOpacity>
            );
          })}

          {/* UNDERLINE */}
          <View
            style={[
              styles.underline,
              { left: `${activeTab * 25}%` }, // chia đều 4 tab
            ]}
          />
        </View>
        <View style={{ flex: 1 }}>
            {activeTab === 0 && <IntroduceScreen /> }
            {activeTab === 1 && <OutingScreen />}
            {activeTab === 2 && <RankingScreen />}
            {activeTab === 3 && <MemberScreen />}
          </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f2f2",
  },

  header: {
    height: 280,
  },

  cover: {
    width: "100%",
    height: "100%",
    position: "absolute",
  },

  gradient: {
    ...StyleSheet.absoluteFillObject,
  },

  topBar: {
    position: "absolute",
    top: 40,
    right: 16,
    flexDirection: "row",
    justifyContent: "space-between",
  },

  headerTitle: {
    position: "absolute",
    top: 40,
    left: 16,
    color: "#fff",
    fontSize: 20,
    fontWeight: "600",
  },

  card: {
    flexDirection: "row",
    backgroundColor: "#fff",
    marginHorizontal: 16,
    marginTop: -90,
    borderRadius: 12,
    padding: 12,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 3,
  },

  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
  },

  clubName: {
    fontWeight: "600",
    fontSize: 16,
  },

  memberText: {
    color: "#777",
    fontSize: 13,
  },

  tabs: {
    
    width: width,
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#fff",
    marginTop: 15,
    paddingVertical: 12,
  },

  tabItem: {
    color: "#888",
    fontSize: 14,
  },

  tabActive: {
    color: "#007AFF",
    fontWeight: "600",
  },

  section: {
    backgroundColor: "#fff",
    marginTop: 8,
    padding: 16,
  },

  sectionTitle: {
    fontWeight: "600",
    marginBottom: 10,
    fontSize: 15,
  },

  content: {
    color: "#555",
    lineHeight: 20,
  },

  more: {
    color: "#007AFF",
    marginTop: 6,
  },

  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
  },

  gridItem: {
    width: width / 2 - 30,
    height: 200,
    margin: 4,
    borderRadius: 10,
  },

  tabItemWrap: {
    alignContent: "center",
    flex: 1,
    alignItems: "center",
    paddingVertical: 5,
  },

  underline: {
    position: "absolute",
    bottom: 0,
    width: "25%",
    height: 2,
    backgroundColor: "#007AFF",
  },
});
