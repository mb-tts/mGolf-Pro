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
import { Colors } from "../../constants/colors";

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

    {/* ── Phần Card trắng chứa nội dung form ── */}
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
  keyboard: { flex: 1, marginTop: 240 },
  card: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    elevation: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
  },
  cardContent: { paddingHorizontal: 24, paddingTop: 28, paddingBottom: 40 },
  title: {
    fontSize: 22,
    fontWeight: "700",
    color: "#1A1A1A",
    textAlign: "center",
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 13,
    color: "#999",
    textAlign: "center",
    marginBottom: 24,
  },
});
