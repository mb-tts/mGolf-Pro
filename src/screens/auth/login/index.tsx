import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuthNavigation } from "@/hooks/useNavigation";
import { Ionicons } from "@expo/vector-icons";
import { AuthLayout } from "@/components/auth/AuthLayout";
import { AppInput } from "@/components/auth/AppInput";
import { AppButton } from "@/components/auth/AppButton";
import { useAuth } from "@/providers/auth.provider";
import { Colors } from "@/constants/colors";
import { loginSchema, LoginForm } from "./login.schema";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const SOCIAL_LOGIN_LIST = [
  { key: "phone", icon: "call", color: "#0060AF" },
  { key: "google", icon: "logo-google", color: "#DB4437" },
  { key: "facebook", icon: "logo-facebook", color: "#1877F2" },
  { key: "qr", icon: "qr-code", color: "#0060AF" },
];

export const LoginScreen = () => {
  const { login, isLoading } = useAuth();
  const navigation = useAuthNavigation();

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
    } catch (e: unknown) {
      alert(e instanceof Error ? e.message : "Đăng nhập thất bại");
    }
  };

  return (
    <KeyboardAwareScrollView
      enableOnAndroid
      enableAutomaticScroll
      extraScrollHeight={50}
      enableResetScrollToCoords={false}
      keyboardOpeningTime={0}
      keyboardShouldPersistTaps="handled"
      contentContainerStyle={{ flexGrow: 1 }}
    >
      <AuthLayout title="Đăng nhập" subtitle="Nhập VGA và mật khẩu">
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

        <TouchableOpacity style={styles.forgotRow}>
          <Text style={styles.forgotText}>Quên mật khẩu?</Text>
        </TouchableOpacity>

        <AppButton
          title="Đăng nhập"
          loading={isLoading}
          onPress={handleSubmit(onSubmit)}
          style={styles.loginBtn}
        />

        <View style={styles.dividerRow}>
          <View style={styles.line} />
          <Text style={styles.orText}>Hoặc</Text>
          <View style={styles.line} />
        </View>

        <View style={styles.socialRow}>
          {SOCIAL_LOGIN_LIST.map(({ key, icon, color }) => (
            <TouchableOpacity key={key} style={styles.socialBtn} onPress={() => onSocialLogin(key)}>
              <Ionicons name={icon as React.ComponentProps<typeof Ionicons>["name"]} size={28} color={color} />
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.terms}>
          Bằng việc tiếp tục, bạn đã đồng ý với
          <Text style={[styles.link, { color: "#333333" }]}>
            Điều khoản sử dụng
          </Text>
        </Text>

        <TouchableOpacity
          onPress={() => navigation.navigate("Register")}
          style={styles.bottomLink}
        >
          <Text style={styles.bottomText}>
            Bạn chưa có tài khoản mGolf?
            <Text style={styles.link}>Tạo tài khoản</Text>
          </Text>
        </TouchableOpacity>
      </AuthLayout>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  forgotRow: { alignItems: "flex-end", marginBottom: 5 }, 
  forgotText: { color: Colors.link, fontSize: 16, fontWeight: "500" },
  loginBtn: { height: 52, borderRadius: 16, marginTop: 10 }, 
  dividerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
    marginBottom: 25,
  },
  line: { flex: 1, height: 1, backgroundColor: "#F0F0F0" },
  orText: { marginHorizontal: 15, color: "#999999", fontSize: 14 },
  socialRow: {
    minWidth: 335,
    minHeight: 56,
    flexDirection: "row",
    justifyContent: "center",
    gap: 6,
    marginBottom: 20,
  },
  socialBtn: {
    width: 77.75,
    height: 56,
    borderRadius: 16,
    backgroundColor: "#F8F9FA",
    alignItems: "center",
    justifyContent: "center",
    elevation: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  terms: {
    textAlign: "center",
    fontSize: 14,
    color: "#888888",
    marginBottom: 40,
  },
  link: { color: Colors.link, fontWeight: "700" },
  bottomLink: { paddingBottom: 20 },
  bottomText: { textAlign: "center", fontSize: 15, color: "#777777" },
});
