import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";

import { AppInput } from "../../../components/auth/AppInput";
import { AppButton } from "../../../components/auth/AppButton";
import { useAuth } from "../../../providers/auth.provider";
import { Colors } from "../../../constants/colors";
import { loginSchema, LoginForm } from "./login.schema";

const SOCIAL_LOGIN_LIST = [
  { key: "phone", icon: "call", color: "#0060AF" },
  { key: "google", icon: "logo-google", color: "#DB4437" },
  { key: "facebook", icon: "logo-facebook", color: "#1877F2" },
  { key: "qr", icon: "qr-code", color: "#0060AF" },
];

export const LoginScreen = () => {
  const { login, isLoading } = useAuth();
  const navigation = useNavigation<any>();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
    defaultValues: { vgaCode: "", password: "" },
  });

  const onSubmit = async (data: LoginForm) => {
    try {
      await login(data);
    } catch (e: any) {
      alert(e.message);
    }
  };

  return (
    <View style={styles.container}>
      {/* ── Nền xanh phối hợp Gradient và Ảnh hoa văn quả bóng golf ── */}
      <LinearGradient
        colors={["#003B6B", "#47ADFF", "#003B6B"]} // Đậm ở hai đầu, sáng rực ở giữa
        locations={[0, 0.5, 1]}
        style={styles.backgroundHeader}
      >
        <Image
          source={require("../../../../assets/images/golf_pattern.png")}
          style={styles.patternImage}
          resizeMode="cover"
        />

        <View style={styles.overlay} />

        <SafeAreaView style={styles.safe} edges={["top"]}>
          <View style={styles.header}>
            <Image
              source={require("../../../../assets/icons/icon.png")}
              style={styles.realLogo}
              resizeMode="contain"
            />
          </View>
        </SafeAreaView>
      </LinearGradient>

      {/* ── Phần Card trắng chồng lên ── */}
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
          <Text style={styles.title}>Đăng nhập</Text>
          <Text style={styles.subtitle}>Nhập VGA và mật khẩu</Text>

          {/* Form Inputs */}
          <Controller
            control={control}
            name="vgaCode"
            render={({ field: { value, onChange, onBlur } }) => (
              <AppInput
                label="Tên đăng nhập"
                placeholder="Nhập VGA"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                autoCapitalize="characters"
                error={errors.vgaCode?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="password"
            render={({ field: { value, onChange, onBlur } }) => (
              <AppInput
                label="Mật khẩu"
                placeholder="Nhập mật khẩu"
                password
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                error={errors.password?.message}
              />
            )}
          />

          {/* Quên mật khẩu */}
          <TouchableOpacity style={styles.forgotRow}>
            <Text style={styles.forgotText}>Quên mật khẩu?</Text>
          </TouchableOpacity>

          {/* Nút đăng nhập */}
          <AppButton
            title="Đăng nhập"
            loading={isLoading}
            onPress={handleSubmit(onSubmit)}
          />

          {/* Divider */}
          <View style={styles.dividerRow}>
            <View style={styles.line} />
            <Text style={styles.orText}>Hoặc</Text>
            <View style={styles.line} />
          </View>

          {/* Social login */}
          <View style={styles.socialRow}>
            {SOCIAL_LOGIN_LIST.map(({ key, icon, color }) => (
              <TouchableOpacity key={key} style={styles.socialBtn}>
                <Ionicons name={icon as any} size={24} color={color} />
              </TouchableOpacity>
            ))}
          </View>

          {/* Điều khoản sử dụng */}
          <Text style={styles.terms}>
            Bằng việc tiếp tục, bạn đã đồng ý với{"\n"}
            <Text style={styles.termsBold}>Điều khoản sử dụng</Text>
          </Text>

          {/* Link sang Đăng ký */}
          <TouchableOpacity
            onPress={() => navigation.navigate("Register")}
            style={styles.bottomLink}
          >
            <Text style={styles.bottomText}>
              Bạn chưa có tài khoản mGolf?{" "}
              <Text style={styles.link}>Tạo tài khoản</Text>
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFFFFF" },

  // Giao diện nền (độc lập cho màn hình Login)
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

  // Layout Card
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

  // Tiêu đề & Chú thích
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

  // Các thành phần form
  forgotRow: { alignItems: "flex-end", marginBottom: 4 },
  forgotText: { color: Colors.link, fontSize: 14 },
  dividerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 20,
  },
  line: { flex: 1, height: 1, backgroundColor: "#E8E8E8" },
  orText: { marginHorizontal: 12, color: "#999", fontSize: 13 },
  socialRow: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 16,
    marginBottom: 20,
  },
  socialBtn: {
    width: 52,
    height: 52,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
  },
  terms: {
    textAlign: "center",
    fontSize: 12,
    color: "#888",
    marginBottom: 12,
    lineHeight: 18,
  },
  termsBold: { fontWeight: "700", color: "#333" },
  link: { color: Colors.link, fontWeight: "600" },
  bottomLink: { paddingBottom: 10 },
  bottomText: { textAlign: "center", fontSize: 13, color: "#888" },
});
