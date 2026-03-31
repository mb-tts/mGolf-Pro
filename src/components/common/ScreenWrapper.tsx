import React, { useState, useEffect } from "react";
import { View, StyleSheet, Animated, StatusBar, Platform } from "react-native";
import { useIsFocused } from "@react-navigation/native";
import { LoadingScreen } from "./LoadingScreen";

interface ScreenWrapperProps {
  children: React.ReactNode;
  loadingDelay?: number;
  // Cho phép background tràn ra phía sau status bar (icon bar)
  // Khi bật, StatusBar sẽ trong suốt và nội dung sẽ kéo lên phía sau
  extendBehindStatusBar?: boolean;
  // Kiểu chữ status bar: 'light' cho nền tối, 'dark' cho nền sáng
  statusBarStyle?: "light-content" | "dark-content";
  // Màu nền status bar (chỉ ảnh hưởng trên Android khi KHÔNG extend)
  statusBarBackgroundColor?: string;
}

export const ScreenWrapper: React.FC<ScreenWrapperProps> = ({
  children,
  loadingDelay = 400,
  extendBehindStatusBar = false,
  statusBarStyle = "dark-content",
  statusBarBackgroundColor = "transparent",
}) => {
  const [showLoading, setShowLoading] = useState(true);
  const [hasLoadedOnce, setHasLoadedOnce] = useState(false);
  const fadeOutAnim = React.useRef(new Animated.Value(1)).current;
  const slideAnim = React.useRef(new Animated.Value(30)).current;

  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      if (!hasLoadedOnce) {
        // --- LẦN ĐẦU TIÊN: Có hiện Loading xoay xoay ---
        setShowLoading(true);
        fadeOutAnim.setValue(1);
        slideAnim.setValue(30);

        const timer = setTimeout(() => {
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
            if (finished) {
              setShowLoading(false);
              setHasLoadedOnce(true);
            }
          });
        }, loadingDelay);
        return () => clearTimeout(timer);
      } else {
        // --- CÁC LẦN SAU: Không hiện Loading nữa ---
        setShowLoading(false);
        slideAnim.setValue(15);
        Animated.spring(slideAnim, {
          toValue: 0,
          tension: 80,
          friction: 8,
          useNativeDriver: true,
        }).start();
      }
    }
  }, [isFocused, hasLoadedOnce]);

  return (
    <View style={styles.container}>
      {/* StatusBar: khi extendBehindStatusBar = true → translucent + transparent */}
      <StatusBar
        barStyle={statusBarStyle}
        translucent={extendBehindStatusBar}
        backgroundColor={
          extendBehindStatusBar ? "transparent" : statusBarBackgroundColor
        }
      />

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
          style={[
            StyleSheet.absoluteFillObject,
            { opacity: fadeOutAnim, zIndex: 99 },
          ]}
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
