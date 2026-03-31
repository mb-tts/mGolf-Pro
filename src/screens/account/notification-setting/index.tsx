import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Switch,
  SafeAreaView,
  StatusBar,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

// Định nghĩa các màn hình con trong phần Thông báo
type ViewState = "main" | "outing" | "personal";

export default function NotificationSettingsScreen() {
  const navigation = useNavigation();

  // State điều khiển đang ở giao diện nào
  const [currentView, setCurrentView] = useState<ViewState>("main");

  // --- States cho các nút gạt (Switch) ---
  // Outing
  const [outingMatchResult, setOutingMatchResult] = useState(true);
  const [outingRank, setOutingRank] = useState(true);
  const [outingBirdie, setOutingBirdie] = useState(true);

  // Cá nhân
  const [personalMatchResult, setPersonalMatchResult] = useState(true);
  const [personalJoinMatch, setPersonalJoinMatch] = useState(true);

  // --- HÀM VẼ HEADER DÙNG CHUNG ---
  const renderHeader = (title: string, onBackPress: () => void) => (
    <View style={styles.header}>
      <TouchableOpacity style={styles.backButton} onPress={onBackPress}>
        <Ionicons name="chevron-back" size={20} color="#555" />
      </TouchableOpacity>
      <Text style={styles.headerTitle}>{title}</Text>
      <View style={{ width: 40 }} />
    </View>
  );

  // --- GIAO DIỆN 1: MAIN (ẢNH 1) ---
  const renderMainView = () => (
    <View style={styles.card}>
      <TouchableOpacity
        style={styles.row}
        onPress={() => setCurrentView("outing")}
      >
        <Text style={styles.rowText}>Thông báo outing</Text>
        <Ionicons name="chevron-forward" size={20} color="#C4C4C4" />
      </TouchableOpacity>

      <View style={styles.divider} />

      <TouchableOpacity
        style={styles.row}
        onPress={() => setCurrentView("personal")}
      >
        <Text style={styles.rowText}>Thông báo cá nhân</Text>
        <Ionicons name="chevron-forward" size={20} color="#C4C4C4" />
      </TouchableOpacity>
    </View>
  );

  // --- GIAO DIỆN 2: THÔNG BÁO OUTING (ẢNH 3) ---
  const renderOutingView = () => (
    <View style={styles.card}>
      <View style={styles.row}>
        <Text style={styles.rowText}>Thông báo kết quả trận đấu</Text>
        <Switch
          value={outingMatchResult}
          onValueChange={setOutingMatchResult}
          trackColor={{ true: "#0055A5", false: "#E0E0E0" }}
          style={{ transform: [{ scaleX: 1.2 }, { scaleY: 1.2 }] }}
        />
      </View>
      <View style={styles.divider} />

      <View style={styles.row}>
        <Text style={styles.rowText}>Thông báo thứ hạng</Text>
        <Switch
          value={outingRank}
          onValueChange={setOutingRank}
          trackColor={{ true: "#0055A5", false: "#E0E0E0" }}
          style={{ transform: [{ scaleX: 1.2 }, { scaleY: 1.2 }] }}
        />
      </View>
      <View style={styles.divider} />

      <View style={styles.row}>
        <Text style={styles.rowText}>Thông báo thành viên đạt birdie</Text>
        <Switch
          value={outingBirdie}
          onValueChange={setOutingBirdie}
          trackColor={{ true: "#0055A5", false: "#E0E0E0" }}
          style={{ transform: [{ scaleX: 1.2 }, { scaleY: 1.2 }] }}
        />
      </View>
    </View>
  );

  // --- GIAO DIỆN 3: THÔNG BÁO CÁ NHÂN (ẢNH 2) ---
  const renderPersonalView = () => (
    <View style={styles.card}>
      <View style={styles.row}>
        <Text style={styles.rowText}>Thông báo kết quả trận đấu</Text>
        <Switch
          value={personalMatchResult}
          onValueChange={setPersonalMatchResult}
          trackColor={{ true: "#0055A5", false: "#E0E0E0" }}
          style={{ transform: [{ scaleX: 1.2 }, { scaleY: 1.2 }] }}
          
        />
      </View>
      <View style={styles.divider} />

      <View style={styles.row}>
        <Text style={styles.rowText}>Thông báo tham gia trận đấu</Text>
        <Switch
          value={personalJoinMatch}
          onValueChange={setPersonalJoinMatch}
          trackColor={{ true: "#0055A5", false: "#E0E0E0" }}
          style={{ transform: [{ scaleX: 1.2 }, { scaleY: 1.2 }] }}
        />
      </View>
    </View>
  );

  // --- RENDER CHÍNH ---
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F4F6F8" />

      {/* LOGIC ĐIỀU HƯỚNG: 
        Nếu đang ở 'main' -> Nút Back sẽ quay về màn hình Tài khoản (navigation.goBack)
        Nếu đang ở 'outing' hoặc 'personal' -> Nút Back sẽ quay về chữ 'main'
      */}
      {currentView === "main" && (
        <>
          {renderHeader("Thông báo", () => navigation.goBack())}
          {renderMainView()}
        </>
      )}

      {currentView === "outing" && (
        <>
          {renderHeader("Thông báo outing", () => setCurrentView("main"))}
          {renderOutingView()}
        </>
      )}

      {currentView === "personal" && (
        <>
          {renderHeader("Thông báo cá nhân", () => setCurrentView("main"))}
          {renderPersonalView()}
        </>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4F6F8", // Nền xám nhạt giống thiết kế
  },

  // Header Styles
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  backButton: {
    width: 36,
    height: 36,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#E5E7EB", // Viền nhạt
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFF",
  },
  headerTitle: {
    fontSize: 17,
    fontWeight: "600",
    color: "#1F2937",
  },

  // Card & Rows Styles
  card: {
    backgroundColor: "#FFF",
    marginHorizontal: 16,
    marginTop: 20,
    borderRadius: 16,
    overflow: "hidden", // Quan trọng: Để bo góc thẻ cắt đi phần thừa của dòng
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  rowText: {
    fontSize: 15,
    color: "#374151",
  },
  divider: {
    height: 1,
    backgroundColor: "#F3F4F6",
    marginLeft: 16, // Kẻ viền thụt vào trong một chút giống iOS
  },
});
