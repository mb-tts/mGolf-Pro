// File: src/screens/club/mainscreen.tsx
import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { ScreenWrapper } from "../../components/common/ScreenWrapper"; // Đảm bảo đường dẫn đúng

import IntroduceScreen from "./introduce";
import OutingScreen from "./outing";
import MemberScreen from "./member";
import RankingScreen from "./ranking";

const { width } = Dimensions.get("window");

const tabs = [
  { label: "Giới thiệu", key: "Introduce" },
  { label: "Outing", key: "Outing" },
  { label: "Ranking", key: "Ranking" },
  { label: "Thành viên", key: "Member" },
];

export default function ClubMainScreen() {
  const [activeTab, setActiveTab] = useState(0);
  const insets = useSafeAreaInsets();

  return (
    <ScreenWrapper>
      <StatusBar barStyle="light-content" />

      <View style={styles.container}>
        {/* Header với Cover Image */}
        <View style={styles.header}>
          <Image
            source={require("../../../assets/images/image.png")}
            style={styles.cover}
          />
          <LinearGradient
            colors={["rgba(0,0,0,0.4)", "transparent"]}
            style={styles.gradient}
          />
          <View style={styles.topBar}>
            <Image
              source={require("../../../assets/images/NewImage.png")}
              style={{ width: 40, height: 40 }}
            />
          </View>
          <Text style={[styles.headerTitle, { top: insets.top + 6 }]}>
            Câu lạc bộ
          </Text>
        </View>

        {/* Thông tin Club đè lên Header */}
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

        {/* Thanh Tabs */}
        <View style={styles.tabs}>
          {tabs.map((tab, index) => {
            const isActive = index === activeTab;
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
          {/* Đường gạch chân di chuyển theo tab đang chọn */}
          <View
            style={[
              styles.underline,
              { left: `${activeTab * 25}%` }, // chia đều 4 tab nên mỗi tab chiếm 25%
            ]}
          />
        </View>

        {/* Nội dung tương ứng với Tab */}
        <View style={{ flex: 1 }}>
          {activeTab === 0 && <IntroduceScreen />}
          {activeTab === 1 && <OutingScreen />}
          {activeTab === 2 && <RankingScreen />}
          {activeTab === 3 && <MemberScreen />}
        </View>
      </View>
    </ScreenWrapper>
  );
}

// ─── STYLES ───────────────────────────────────────────────────────────────────
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
    top: 25, 
    position: "absolute",
    right: 16,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  headerTitle: {
    marginTop: 20,
    position: "absolute",
    left: 16,
    color: "#fff",
    fontSize: 20,
    fontWeight: "600",
  },
  card: {
    flexDirection: "row",
    backgroundColor: "#fff",
    marginHorizontal: 16,
    marginTop: -100, // Kéo thẻ lên đè vào ảnh header
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
    borderRadius: 20,
    width: width,
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#fff",
    marginTop: 10,
    paddingVertical: 12,
  },
  tabItemWrap: {
    alignContent: "center",
    flex: 1,
    alignItems: "center",
    paddingVertical: 5,
  },
  tabItem: {
    color: "#888",
    fontSize: 14,
  },
  tabActive: {
    color: "#007AFF",
    fontWeight: "600",
  },
  underline: {
    position: "absolute",
    bottom: 0,
    width: "25%",
    height: 2,
    backgroundColor: "#007AFF",
  },
});