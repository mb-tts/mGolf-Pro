import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

import { AuthLayout } from "../../../components/auth/AuthLayout";
import { AppInput } from "../../../components/auth/AppInput";
import { AppButton } from "../../../components/auth/AppButton";
import { useAuth } from "../../../providers/auth.provider";
import { Colors } from "../../../constants/colors";
import { loginSchema, LoginForm } from "./login.schema";

const SOCIAL_LOGIN_LIST = [
  { key: "phone",    type: "vector", icon: "call",          color: "#0060AF" },
  { key: "google",   type: "image",  icon: require("../../../../assets/icons/google.png"), color: null }, // Dùng ảnh logo Google màu
  { key: "facebook", type: "vector", icon: "logo-facebook", color: "#1877F2" },
  {
    key: "qr",
    type: "image",
    icon: require("../../../../assets/icons/scanAuth.png"),
    color: null,
  },
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

  // HÀM XỬ LÝ ĐĂNG NHẬP MẠNG XÃ HỘI (Sẵn sàng để tích hợp thật)
  const onSocialLogin = (platform: string) => {
    console.log(`--- Tiếp tục với ${platform} ---`);
    switch (platform) {
      case "phone":
        // TODO: Mở màn hình nhập OTP số điện thoại
        break;
      case "google":
        // TODO: Gọi Google.logInAsync() hoặc expo-auth-session
        break;
      case "facebook":
        // TODO: Gọi Facebook.logInWithReadPermissionsAsync()
        break;
      case "qr":
        // TODO: Mở Camera để quét mã QR mGolf
        break;
    }
    // Thêm feedback cho người dùng thấy đã nhấn
    alert(`Tính năng đăng nhập bằng ${platform} đang được tích hợp.`);
  };

  const onSubmit = async (data: LoginForm) => {
    try {
      await login(data);
    } catch (e: any) {
      alert(e.message);
    }
  };

  return (
    <AuthLayout title="Đăng nhập" subtitle="Nhập VGA và mật khẩu">
      {/* Tên đăng nhập */}
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

      {/* Mật khẩu */}
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

      {/* Đăng nhập mạng xã hội (Clone logic) */}
      <View style={styles.socialRow}>
        {SOCIAL_LOGIN_LIST.map(({ key, icon, color, type }) => (
          <TouchableOpacity
            key={key}
            style={styles.socialBtn}
            onPress={() => onSocialLogin(key)}
            activeOpacity={0.7}
          >
            {type === "vector" ? (
              <Ionicons name={icon as any} size={28} color={color as any} />
            ) : (
              <Image 
                source={icon as any} 
                style={styles.socialIconImage} 
                resizeMode="contain" 
              />
            )}
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
    </AuthLayout>
  );
};

const styles = StyleSheet.create({
  forgotRow: { alignItems: "flex-end", marginBottom: 4 },
  forgotText: { color: Colors.link, fontSize: 14 },
  dividerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 16,
    gap: 8,
  },
  line: { flex: 1, height: 1, backgroundColor: "#F3F3F3" },
  orText: { marginHorizontal: 12, color: "#999", fontSize: 13 },
  socialRow: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 8,
    marginBottom: 20,
    minWidth: 335,
    minHeight: 56,
    borderRadius: 22,
  },
  socialBtn: {
    width: 77.75,
    height: 56,
    borderRadius: 12,
    backgroundColor: "#F8F8F8",
    alignItems: "center",
    justifyContent: "center",
  },
  socialIconImage: {
    width: 28,
    height: 28,
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
