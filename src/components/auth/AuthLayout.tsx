import { FC, ReactNode } from "react";
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
    {/* ── Nền xanh phối hợp Gradient và Ảnh hoa văn quả bóng golf ── */}
    <LinearGradient
      colors={["#003B6B", "#47ADFF", "#003B6B"]} // Đậm ở hai đầu, sáng rực ở giữa
      locations={[0, 0.5, 1]}
      style={styles.backgroundHeader}
    >
      <Image
        source={require("../../../assets/images/golf_pattern.png")}
        style={styles.patternImage}
        resizeMode="cover"
      />

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

    {/* ── Phần Nội dung: ScrollView bọc toàn bộ màn hình ── */}
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "padding"}
      style={{ flex: 1 }}
      keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 0}
    >
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={[styles.cardContent, { flexGrow: 1 }]}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        bounces={false}
      >
        {/* Khoảng trống này tương ứng với chiều cao của nền xanh (Header) */}
        <View style={styles.headerSpacer} />

        {/* Thân card trắng phủ kín từ đây trở xuống */}
        <View style={styles.card}>
          <Text style={styles.title}>{title}</Text>
          {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
          {children}
        </View>
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
    alignSelf: "center",
    opacity: 0.4,
    transform: [{ scale: 1.3 }],
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 51, 102, 0.2)",
  },
  safe: { flex: 1 },
  header: { alignItems: "center", paddingTop: 40 },
  realLogo: {
    width: 110,
    height: 110,
    marginTop: 20,
  },
  scrollView: { flex: 1 },
  headerSpacer: { height: 240 }, // Tạo khoảng đệm để lộ nền xanh
  card: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 24,
    paddingTop: 28,
    paddingBottom: 40,
    // Đổ bóng nổi bật
    elevation: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  cardContent: { paddingHorizontal: 0, paddingTop: 0, flexGrow: 1 },
  title: {
    fontFamily: "Inter",
    fontSize: 20,
    fontWeight: "800",
    color: "#292929",

    textAlign: "center",
    lineHeight: 28,
    letterSpacing: -0.2,
  },
  subtitle: {
    fontFamily: "Inter",
    fontSize: 12,
    fontWeight: "400",
    color: "#878787",

    textAlign: "center",
    lineHeight: 17,
    letterSpacing: -0.12,
    marginBottom: 24,
  },
});
