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
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";

import { AppInput } from "../../../components/auth/AppInput";
import { AppButton } from "../../../components/auth/AppButton";
import { useAuth } from "../../../providers/auth.provider";
import { Colors } from "../../../constants/colors";
import {
  setPasswordSchema,
  SetPasswordForm,
} from "./set-password.schema";

export const SetPasswordScreen = () => {
  const { setPassword, isLoading } = useAuth();
  const navigation = useNavigation<any>();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SetPasswordForm>({
    resolver: zodResolver(setPasswordSchema),
    defaultValues: { password: "", confirmPassword: "" },
  });

  const onSubmit = async (data: SetPasswordForm) => {
    try {
      await setPassword(data);
      navigation.navigate("Login");
    } catch (e: any) {
      alert(e.message);
    }
  };

  return (
    <View style={styles.container}>
      {/* ── Nền xanh ── */}
      <LinearGradient
        colors={["#003B6B", "#47ADFF", "#003B6B"]}
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

      {/* ── Card trắng ── */}
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
          <Text style={styles.title}>Thiết lập mật khẩu</Text>
          <Text style={styles.subtitle}>
            Hãy đảm bảo mật khẩu mới của bạn đảm bảo các yếu tố bảo mật mà chúng
            tôi đưa ra.
          </Text>

          <Controller
            control={control}
            name="password"
            render={({ field: { value, onChange, onBlur } }) => (
              <AppInput
                label="Nhập mật khẩu"
                placeholder="Nhập mật khẩu"
                password
                required
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                error={errors.password?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="confirmPassword"
            render={({ field: { value, onChange, onBlur } }) => (
              <AppInput
                label="Nhập lại mật khẩu"
                placeholder="Nhập mật khẩu"
                password
                required
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                error={errors.confirmPassword?.message}
              />
            )}
          />

          <AppButton
            title="Hoàn tất đăng ký"
            loading={isLoading}
            onPress={handleSubmit(onSubmit)}
          />

          <Text style={styles.terms}>
            Bằng việc tiếp tục, bạn đã đồng ý với{"\n"}
            <Text style={styles.termsBold}>Điều khoản sử dụng</Text>
          </Text>

          <TouchableOpacity
            onPress={() => navigation.navigate("Login")}
            style={styles.bottomLink}
          >
            <Text style={styles.bottomText}>
              Bạn đã có tài khoản mGolf?{" "}
              <Text style={styles.link}>Đăng nhập</Text>
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

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
    lineHeight: 18,
  },
  terms: {
    textAlign: "center",
    fontSize: 12,
    color: "#888",
    marginTop: 16,
    marginBottom: 12,
    lineHeight: 18,
  },
  termsBold: { fontWeight: "700", color: "#333" },
  link: { color: Colors.link, fontWeight: "600" },
  bottomLink: { paddingBottom: 10 },
  bottomText: { textAlign: "center", fontSize: 13, color: "#888" },
});
