import React, { ReactNode } from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../../constants/colors";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

interface AuthLayoutProps {
  title: string;
  subtitle?: string;
  children: ReactNode;
}

export const AuthLayout: React.FC<AuthLayoutProps> = ({
  title,
  subtitle,
  children,
}) => (
  <View style={styles.container}>
    {/* Nền xanh phối hợp Gradient và Ảnh hoa văn quả bóng golf */}
    <LinearGradient
      colors={["#003B6B", "#47ADFF", "#003B6B"]} // Đậm ở hai đầu, sáng rực ở giữa
      locations={[0, 0.5, 1]}
      style={styles.backgroundHeader}
    >
      {/* 
          Dùng ảnh hoa văn quả bóng golf từ thư mục assets. 
          Lưu ý đi tìm ảnh gôn bạn vừa gởi và lưu vào d:\test\mGolf-Pro\assets\images\golf_pattern.png 
      */}
      <Image
        source={require("../../../assets/images/golf_pattern.png")}
        style={styles.patternImage}
        resizeMode="cover"
      />

      {/* Thêm một lớp phủ mờ màu xanh để làm hoa văn chìm hơn */}
      <View style={styles.overlay} />

      <SafeAreaView style={styles.safe} edges={["top"]}>
        <View style={styles.header}>
          <Image
            source={require("../../../assets/icons/icon.png")}
            style={styles.realLogo}
            resizeMode="contain"
          />
        </View>
      </SafeAreaView>
    </LinearGradient>

    {/* Card trắng chồng lên */}
    <KeyboardAvoidingView
      style={styles.keyboard}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView
        style={styles.card}
        contentContainerStyle={styles.cardContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        bounces={false}
      >
        <Text style={styles.title}>{title}</Text>
        {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
        {children}
      </ScrollView>
    </KeyboardAvoidingView>
  </View>
);

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFFFFF" },
  backgroundHeader: {
    height: 380,
    width: "100%",
    position: "absolute",
    top: 0,
    overflow: "hidden",
  },
  patternImage: {
    position: "absolute",
    alignSelf: "center", // Căn giữa ảnh
    opacity: 0.4,
    transform: [{ scale: 1.3 }], // Bạn có thể chỉnh scale để thu nhỏ/phóng to ảnh thật này
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 51, 102, 0.2)", // Giảm độ đậm của lớp phủ xanh
  },
  safe: { flex: 1 },
  header: { alignItems: "center", paddingTop: 40 },
  realLogo: {
    width: 110,
    height: 110,
    marginTop: 20,
  },
  keyboard: { flex: 1, marginTop: 240 },
  card: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
    elevation: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -10 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  cardContent: { paddingHorizontal: 28, paddingTop: 32, paddingBottom: 60 },
  title: {
    fontSize: 20,
    fontWeight: "600",
    color: "#1A1A1A",
    textAlign: "center",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 12,
    color: "#888888",
    textAlign: "center",
    marginBottom: 32,
  },
});
