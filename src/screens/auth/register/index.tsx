import React from "react";

import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuthNavigation } from "@/hooks/useNavigation";

import { AuthLayout } from "@/components/auth/AuthLayout";
import { AppInput } from "@/components/auth/AppInput";
import { AppButton } from "@/components/auth/AppButton";
import { useAuth } from "@/providers/auth.provider";
import { Colors } from "@/constants/colors";
import { registerSchema, RegisterForm } from "./register.schema";
import { KeyboardAvoidingView, Platform } from "react-native";

export const RegisterScreen = () => {
  const { register, isLoading } = useAuth();
  const navigation = useAuthNavigation();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterForm>({
    resolver: zodResolver(registerSchema),
    defaultValues: { fullName: "", vgaCode: "", phone: "" },
  });

  const onSubmit = async (data: RegisterForm) => {
    try {
      await register(data);
      navigation.navigate("SetPassword");
    } catch (e: unknown) {
      alert(e instanceof Error ? e.message : "Đăng ký thất bại");
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <AuthLayout
        title="Đăng ký"
        subtitle="Điền thông tin cá nhân của bạn tại đây"
      >
        <Controller
          control={control}
          name="fullName"
          render={({ field: { value, onChange, onBlur } }) => (
            <AppInput
              label="Họ và tên"
              placeholder="Nhập họ và tên"
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              error={errors.fullName?.message}
            />
          )}
        />

        <Controller
          control={control}
          name="vgaCode"
          render={({ field: { value, onChange, onBlur } }) => (
            <AppInput
              label="Mã VGA"
              placeholder="Nhập mã VGA"
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
          name="phone"
          render={({ field: { value, onChange, onBlur } }) => (
            <AppInput
              label="Số điện thoại"
              placeholder="Nhập số điện thoại"
              keyboardType="phone-pad"
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              error={errors.phone?.message}
            />
          )}
        />

        <AppButton
          title="Tiếp tục"
          loading={isLoading}
          onPress={handleSubmit(onSubmit)}
        />

        <Text style={styles.terms}>
          Bằng việc tiếp tục, bạn đã đồng ý với
          <Text style={styles.link}>Điều khoản sử dụng</Text>
        </Text>

        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <Text style={styles.bottomText}>
            Bạn đã có tài khoản mGolf?
            <Text style={styles.link}>Đăng nhập</Text>
          </Text>
        </TouchableOpacity>
      </AuthLayout>
    </KeyboardAvoidingView>
  );
};
const styles = StyleSheet.create({
  terms: {
    textAlign: "center",
    fontSize: 12,

    color: Colors.textSecondary,
    marginTop: 16,
    marginBottom: 12,
  },
  link: { color: Colors.link, fontWeight: "600" },
  bottomText: {
    textAlign: "center",
    fontSize: 13,
    color: Colors.textSecondary,
  },
});
