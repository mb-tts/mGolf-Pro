import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export const NotificationSettingsScreen = () => {
  const navigation = useNavigation<any>();

  return (
    <SafeAreaView edges={["top"]} style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F4F6F8" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="chevron-back" size={20} color="#555" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Thông báo</Text>
        <View style={{ width: 40 }} />
      </View>

      {/* Main Card */}
      <View style={styles.card}>
        <TouchableOpacity
          style={styles.row}
          onPress={() => {
            navigation.navigate("OutingNotificationScreen");
          }}
        >
          <Text style={styles.rowText}>Thông báo outing</Text>
          <Ionicons name="chevron-forward" size={20} color="#C4C4C4" />
        </TouchableOpacity>

        <View style={styles.divider} />

        <TouchableOpacity
          style={styles.row}
          onPress={() => {
            navigation.navigate("PersonalNotificationScreen");
          }}
        >
          <Text style={styles.rowText}>Thông báo cá nhân</Text>
          <Ionicons name="chevron-forward" size={20} color="#C4C4C4" />
        </TouchableOpacity>
      </View>
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
