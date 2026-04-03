import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
  StatusBar,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

interface BackHeaderProps {
  // Title hiển thị giữa header
  title?: string;
  // Hàm quay lại
  onBack: () => void;
  // Màu icon + text (mặc định trắng cho nền tối)
  tintColor?: string;
  // Nút action bên phải (optional)
  rightAction?: React.ReactNode;
  // Kiểu nền nút back: 'blur' (mờ tối, cho ảnh), 'clear' (trong suốt, cho nền sáng)
  variant?: "blur" | "clear";
}

/**
 * Header có nút Back luôn nằm DƯỚI status bar, không bị che khuất.
 * Sử dụng useSafeAreaInsets().top để tự động padding đúng chiều cao status bar.
 * 
 * Khi dùng cùng ScreenWrapper có extendBehindStatusBar=true,
 * header này sẽ nằm chồng lên background image nhưng vẫn dưới icon bar.
 */
export const BackHeader: React.FC<BackHeaderProps> = ({
  title,
  onBack,
  tintColor = "#fff",
  rightAction,
  variant = "blur",
}) => {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={[
        styles.container,
        {
          // paddingTop = chiều cao status bar (insets.top) + thêm khoảng cách nhỏ
          paddingTop: insets.top + 8,
        },
      ]}
    >
      <View style={styles.row}>
        {/* Nút Back */}
        <TouchableOpacity
          style={[
            styles.backBtn,
            variant === "blur" && styles.backBtnBlur,
            variant === "clear" && styles.backBtnClear,
          ]}
          onPress={onBack}
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
        >
          <Ionicons name="chevron-back" size={22} color={tintColor} />
        </TouchableOpacity>

        {/* Title (giữa) */}
        {title ? (
          <Text
            style={[styles.title, { color: tintColor }]}
            numberOfLines={1}
          >
            {title}
          </Text>
        ) : (
          <View style={{ flex: 1 }} />
        )}

        {/* Action bên phải hoặc spacer */}
        {rightAction ? (
          rightAction
        ) : (
          <View style={styles.spacer} />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // Nằm đè lên nội dung (absolute) để background phía sau vẫn hiển thị
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
    paddingHorizontal: 16,
    paddingBottom: 12,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  // Kiểu nền mờ tối — dùng cho header trên ảnh
  backBtnBlur: {
    backgroundColor: "rgba(0, 0, 0, 0.3)",
  },
  // Kiểu trong suốt — dùng cho nền sáng
  backBtnClear: {
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 3,
  },
  title: {
    flex: 1,
    fontSize: 18,
    fontWeight: "700",
    textAlign: "center",
    marginHorizontal: 8,
  },
  spacer: {
    width: 40, // cùng kích thước nút back để title căn giữa
  },
});
