import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
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

      {/* Đăng nhập mạng xã hội */}
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
    </AuthLayout>
  );
};

const styles = StyleSheet.create({
  forgotRow: { alignItems: "flex-end", marginBottom: 4 },
  forgotText: { color: Colors.link, fontSize: 14 },
  dividerRow: { flexDirection: "row", alignItems: "center", marginVertical: 20 },
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
