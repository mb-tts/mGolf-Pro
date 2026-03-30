import React from "react";
import { Text, TouchableOpacity, StyleSheet } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigation } from "@react-navigation/native";
import { AuthLayout } from "../../../components/auth/AuthLayout";
import { AppInput } from "../../../components/auth/AppInput";
import { AppButton } from "../../../components/auth/AppButton";
import { useAuth } from "../../../providers/auth.provider";
import { Colors } from "../../../constants/colors";
import { setPasswordSchema, SetPasswordForm } from "./set-password.schema";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

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
    <AuthLayout
      title="Thiết lập mật khẩu"
      subtitle="Hãy đảm bảo mật khẩu mới của bạn đảm bảo các yếu tố bảo mật mà chúng tôi đưa ra."
    >
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
