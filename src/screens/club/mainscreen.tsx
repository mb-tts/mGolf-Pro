// File: src/screens/club/mainscreen.tsx
import React, { RefObject, useRef, useState } from "react";
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
import { MY_DATA } from "./ranking";
import IntroduceScreen from "./introduce";
import OutingScreen from "./outing";
import MemberScreen from "./member";
import RankingScreen from "./ranking";
import { PlayerRow } from "./ranking";
import { ScrollView } from "react-native-gesture-handler";
import { Keyboard } from "react-native"; // Thêm import Keyboard
import { useEffect } from "react"; // Thêm import useEffect
interface RankingScreenProps {
  mainScrollRef?: RefObject<any>;
}
const { width } = Dimensions.get("window");

const tabs = [
  { label: "Giới thiệu", key: "Introduce" },
  { label: "Outing", key: "Outing" },
  { label: "Ranking", key: "Ranking" },
  { label: "Thành viên", key: "Member" },
];
export default function ClubMainScreen({ mainScrollRef }: RankingScreenProps) {
  const [activeTab, setActiveTab] = useState(0);
  const insets = useSafeAreaInsets();
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => setKeyboardVisible(true),
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => setKeyboardVisible(false),
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);
  return (
    <ScreenWrapper>
      <StatusBar barStyle="light-content" />

      <ScrollView
        style={styles.container}
        stickyHeaderIndices={[2]} // Ghim cụm View ở index 1
        showsVerticalScrollIndicator={false}
        ref={mainScrollRef}
      >
        {/* [INDEX 0] Header: Chiều cao khung thu lại còn 180 */}
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

        {/* <View> */}
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
        <View>
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
            <View style={[styles.underline, { left: `${activeTab * 25}%` }]} />
          </View>
        </View>

        {/* </View> */}

        <View style={{ flex: 1, backgroundColor: "#fff" }}>
          {activeTab === 0 && <IntroduceScreen />}
          {activeTab === 1 && <OutingScreen />}
          {activeTab === 2 && <RankingScreen />}
          {activeTab === 3 && <MemberScreen />}
        </View>
      </ScrollView>
      {tabs[activeTab].key === "Ranking" && !isKeyboardVisible && (
        <TouchableOpacity
          style={styles.stickyBottomContainer}
          activeOpacity={0.9}
        >
          <PlayerRow item={MY_DATA} isSticky={true} />
        </TouchableOpacity>
      )}
    </ScreenWrapper>
  );
}

// ─── STYLES ───────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  stickyBottomContainer: {
    position: "absolute",
    width: "100%",
    bottom: 0,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#E0E0E0",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    // elevation: 10,
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    height: 240,
  },
  cover: {
    width: "100%",
    height: 280, // Cố định chiều cao ảnh là 280
    // position: "absolute",
    top: 0,
  },
  gradient: {
    position: "absolute",
    top: 0,
    width: "100%",
    height: 200, // Cố định bằng chiều cao ảnh
  },
  card: {
    position: "absolute",
    marginTop: 150,
    flexDirection: "row",
    backgroundColor: "#fff",
    marginHorizontal: 16,
    borderRadius: 12,
    padding: 12,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 3,
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
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    width: width,
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#fff",
    marginTop: 0,
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
