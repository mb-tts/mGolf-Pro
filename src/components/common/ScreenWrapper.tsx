import React, { useState, useEffect } from "react";
import { View, StyleSheet, Animated } from "react-native";
import { useIsFocused } from "@react-navigation/native";
import { LoadingScreen } from "./LoadingScreen";

interface ScreenWrapperProps {
  children: React.ReactNode;
  loadingDelay?: number;
}

export const ScreenWrapper: React.FC<ScreenWrapperProps> = ({
  children,
  loadingDelay = 400, // Giảm nhẹ delay cho mượt hơn
}) => {
  const [showLoading, setShowLoading] = useState(true);
  const fadeOutAnim = React.useRef(new Animated.Value(1)).current; // Loading layer mờ đi
  const slideAnim = React.useRef(new Animated.Value(30)).current; // Nội dung trồi lên nhẹ

  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      // Chuẩn bị trạng thái
      setShowLoading(true);
      fadeOutAnim.setValue(1); 
      slideAnim.setValue(30);

      const timer = setTimeout(() => {
        // Chạy đồng bộ: Lớp Loading mờ dần đi để lộ nội dung bên dưới
        // Đồng thời nội dung đẩy nhẹ lên mượt mà
        Animated.parallel([
          Animated.timing(fadeOutAnim, {
            toValue: 0,
            duration: 400,
            useNativeDriver: true,
          }),
          Animated.spring(slideAnim, {
            toValue: 0,
            tension: 50,
            friction: 7,
            useNativeDriver: true,
          }),
        ]).start(({ finished }) => {
          if (finished) setShowLoading(false);
        });
      }, loadingDelay);

      return () => clearTimeout(timer);
    } else {
      setShowLoading(true);
      fadeOutAnim.setValue(1);
    }
  }, [isFocused]);

  return (
    <View style={styles.container}>
      {/* Nội dung thực đã nằm sẵn ở dưới, chỉ việc trồi lên */}
      <Animated.View
        style={[
          styles.content,
          {
            transform: [{ translateY: slideAnim }],
          },
        ]}
      >
        {children}
      </Animated.View>

      {/* Lớp Loading nằm ĐÈ lên trên và MỜ DẦN đi để lộ Content */}
      {showLoading && (
        <Animated.View
          pointerEvents="none"
          style={[StyleSheet.absoluteFillObject, { opacity: fadeOutAnim, zIndex: 99 }]}
        >
          <LoadingScreen />
        </Animated.View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
});
